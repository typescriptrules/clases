import { type Request, type Response } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Transform, pipeline } from 'stream'
import { promisify } from 'util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pipelineAsync = promisify(pipeline)

const USERS_FILE = path.join(__dirname, '../models/users-large.json')

/**
 * Controlador básico - SIN streams (para comparar)
 * Carga TODO el archivo en memoria de una vez
 */
export const getUsersWithoutStreams = async (req: Request, res: Response) => {
    try {
        console.log('📦 Cargando TODOS los usuarios en memoria...')
        
        const data = fs.readFileSync(USERS_FILE, 'utf8')
        
        // El archivo ahora es un array JSON válido, no NDJSON
        const users = JSON.parse(data)
        
        console.log(`💾 Cargados ${users.length} usuarios en memoria`)
        console.log(`📊 Memoria usada: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`)
        
        res.json({
            method: 'without-streams',
            totalUsers: users.length,
            memoryUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
            users: users.slice(0, 10) // Solo mostramos los primeros 10
        })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'Error reading users file', details: error.message })
    }
}

/**
 * Controlador CON streams - Procesa línea por línea
 * Sin cargar todo en memoria
 */
export const getUsersWithStreams = (req: Request, res: Response) => {
    console.log('🌊 Procesando usuarios con STREAMS...')
    
    const users: any[] = []
    let processedLines = 0
    
    // Stream de transformación personalizado
    const jsonTransform = new Transform({
        objectMode: true,
        transform(chunk: Buffer, encoding, callback) {
            const lines = chunk.toString().split('\n')
            console.log("chunk")
            for (const line of lines) {
                if (line.trim()) {
                    try {
                        const user = JSON.parse(line)
                        processedLines++
                        
                        // Solo guardamos los primeros 10 para la respuesta
                        if (users.length < 10) {
                            users.push(user)
                        }
                        
                        // Log cada 1000 usuarios procesados
                        if (processedLines % 1000 === 0) {
                            console.log(`📈 Procesados: ${processedLines} usuarios`)
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
            callback()
        }
    })
    
    const readStream = fs.createReadStream(USERS_FILE, { encoding: 'utf8' })
    
    readStream.pipe(jsonTransform)
    
    jsonTransform.on('end', () => {
        console.log(`✅ Stream completado. Total procesados: ${processedLines}`)
        console.log(`📊 Memoria usada: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`)
        
        res.json({
            method: 'with-streams',
            totalProcessed: processedLines,
            memoryUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
            users: users
        })
    })
    
    jsonTransform.on('error', (error) => {
        console.error('❌ Error en stream:', error)
        res.status(500).json({ error: 'Error processing users stream' })
    })
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
        res.write(`\n✅ Completado! Total: ${processedLines} usuarios procesados\n`)
        res.end()
    })
    
    jsonTransform.on('error', (error) => {
        res.write(`\n❌ Error: ${error.message}\n`)
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