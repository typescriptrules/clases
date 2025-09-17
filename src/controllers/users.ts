import type { Request, Response } from 'express'
import fs, { read } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Transform, pipeline } from 'stream'
import { promisify } from 'util'
import { 
    getUserStreamService,
    getUserByNameService,
    addUserService,
    updateUserService,
    deleteUserService
 } from '../services/users.service.ts'
import { type HttpErrorStatus } from '../types/types.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pipelineAsync = promisify(pipeline)

const USERS_FILE = path.join(__dirname, '../models/users-large.jsonl')

// Este controlador NO usa ningún servicio, todo el procesamiento está aquí mismo
export const getUsersWithoutStreams = async (req: Request, res: Response) => {
    try {
        console.log('---Cargando TODOS los usuarios en memoria...---')
        
        const data = fs.readFileSync(USERS_FILE, 'utf8')
        const lines = data.split('\n').filter(line => line.trim())
        const users = lines.map(line => JSON.parse(line))
        
        console.log(`---Cargados ${users.length} usuarios en memoria---`)
        console.log(`---Memoria usada: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`)

        res.json({
            method: 'without-streams',
            totalUsers: users.length,
            memoryUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
            users: users.slice(0, 10) // Solo mostramos los primeros 10
        })
    } catch (error) {
        res.status(500).json({ error: 'Error reading users file' })
    }
}

//controller with stream and service
export const getUsersWithStreams = async (req: Request, res: Response) => { 
    console.log('---Procesando usuarios con streams...---')
    const { transform, result } = getUserStreamService()
    const readStream = fs.createReadStream(USERS_FILE, { encoding: 'utf8' });

    readStream.pipe(transform);

    transform.on('finish', () => {
        console.log(`---Procesamiento completado. Total líneas procesadas: ${result.totalProcessed}---`);
        console.log(`---Memoria usada: ${result.memoryUsage}---`);

        res.json({
            method: 'with-streams',
            totalProcessed: result.totalProcessed,
            memoryUsed: result.memoryUsage,
            users: result.users
        });
    });
}

//controller that uses service to get user by name
export const getUserByName = async (req: Request, res: Response) => {
    let statusCode: HttpErrorStatus = 500
    const name = req.params.name as string
    try {
        const user = await getUserByNameService(name)
        if (user) {
            res.json({ user })
        } else {
            let statusCode: HttpErrorStatus = 404
            res.status(statusCode).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' })
    }
}

//controller that uses service to add a new user
export const addUser = async (req: Request, res: Response) => {
    const { name, role } = req.body
    if (!name || !role ){
        let statusCode: HttpErrorStatus = 400
        return res.status(statusCode).json({ error: 'Name and role are required' })
    }
    try {
        const newUser = { name, role }
        const addedUser = await addUserService(newUser)
        res.status(201).json({ message: 'User added', user: addedUser })
    } catch (error) {
        res.status(500).json({ error: 'Error adding user' })
    }
}

// controller that uses service to update a user by name
export const updateUser = async (req: Request, res: Response) => {
    const name = req.params.name as string
    const { role } = req.body
    if (!name){
        let statusCode: HttpErrorStatus = 400
        return res.status(statusCode).json({ error: 'Name is required' })
    }
    try {
        const updatedUser = await updateUserService(name, { role })
        if (updatedUser) {
            res.json({ message: 'User updated', user: updatedUser })
        } else {
            let statusCode: HttpErrorStatus = 404
            res.status(statusCode).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' })
    }
}

/**
 * Endpoint que STREAM la respuesta al cliente
 * Envía usuarios uno por uno sin esperar a que termine todo
 */
export const streamUsersToClient = (req: Request, res: Response) => {
    console.log('📡 Streaming usuarios al cliente...')
    
    // Headers para Server-Sent Events
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    })
    
    let processedLines = 0
    
    const jsonTransform = new Transform({
        objectMode: true,
        transform(chunk: Buffer, encoding, callback) {
            const lines = chunk.toString().split('\n')
            
            for (const line of lines) {
                if (line.trim()) {
                    try {
                        const user = JSON.parse(line)
                        processedLines++
                        
                        // Enviar cada usuario inmediatamente al cliente
                        res.write(`Usuario ${processedLines}: ${user.name} (${user.role})\n`)
                        
                        // Simular procesamiento lento
                        if (processedLines % 100 === 0) {
                            res.write(`--- Procesados ${processedLines} usuarios ---\n`)
                        }
                    } catch (err) {
                        // Línea inválida
                    }
                }
            }
            callback()
        }
    })
    
    const readStream = fs.createReadStream(USERS_FILE, { encoding: 'utf8' })
    
    readStream.pipe(jsonTransform)
    
    jsonTransform.on('end', () => {
        res.write(`\n---Completado! Total: ${processedLines} usuarios procesados\n`)
        res.end()
    })
    
    jsonTransform.on('error', (error) => {
        res.write(`\n---Error: ${error.message}\n`)
        res.end()
    })
    
    // Manejar desconexión del cliente
    req.on('close', () => {
        console.log('🔌 Cliente desconectado')
        readStream.destroy()
    })
}

/**
 * Controlador para subir archivo de usuarios usando streams
 * Procesa el archivo mientras se sube, sin guardarlo completo
 */
export const uploadUsersStream = async (req: Request, res: Response) => {
    console.log('📤 Procesando archivo subido con streams...')
    
    let processedUsers = 0
    let validUsers = 0
    let errors = 0
    
    // Transform stream para procesar cada línea
    const processTransform = new Transform({
        objectMode: true,
        transform(chunk: Buffer, encoding, callback) {
            const lines = chunk.toString().split('\n')
            
            for (const line of lines) {
                if (line.trim()) {
                    processedUsers++
                    try {
                        const user = JSON.parse(line)
                        
                        // Validar estructura del usuario
                        if (user.name && user.role && typeof user.name === 'string') {
                            validUsers++
                            // Aquí podrías guardar en base de datos uno por uno
                            // await saveUserToDatabase(user)
                        } else {
                            errors++
                        }
                    } catch (err) {
                        errors++
                    }
                }
            }
            callback()
        }
    })
    
    try {
        // Procesar el stream del request body
        await pipelineAsync(
            req,
            processTransform
        )
        
        res.json({
            message: 'Archivo procesado con streams',
            stats: {
                totalLines: processedUsers,
                validUsers,
                errors,
                memoryUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`
            }
        })
        
    } catch (error) {
        res.status(500).json({ error: 'Error processing uploaded file' })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const name = req.params.name as string;
    if(!name){
        let statusCode: HttpErrorStatus = 400;
        return res.status(statusCode).json({ error: 'Name is required' });
    }
    try {
        const deletedUser = await deleteUserService(name);
        if(deletedUser){
            res.json({ message: 'User deleted', user: deletedUser });
        } else {
            let statusCode: HttpErrorStatus = 404;
            res.status(statusCode).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
}