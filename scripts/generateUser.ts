import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const USERS_FILE = path.join(__dirname, '../src/models/users-large.jsonl')

const roles = ['admin', 'user', 'moderator', 'guest']
const names = [
    'Carlos', 'Ana', 'Luis', 'María', 'José', 'Carmen', 'David', 'Laura',
    'Miguel', 'Elena', 'Pablo', 'Sofia', 'Diego', 'Isabel', 'Antonio',
    'Patricia', 'Fernando', 'Lucía', 'Ricardo', 'Valeria'
]

function generateUser(id: string) {
    const name = names[Math.floor(Math.random() * names.length)]
    const role = roles[Math.floor(Math.random() * roles.length)]
    const email = `${name.toLowerCase()}${id}@example.com`
    
    return {
        id,
        name: `${name} ${id}`,
        role,
        email,
        createdAt: new Date().toISOString(),
        isActive: Math.random() > 0.1 // 90% activos
    }
}

async function generateUsersFile(totalUsers: number = 10000) {
    console.log(`📝 Generando archivo con ${totalUsers} usuarios...`)
    
    // Crear directorio si no existe
    const modelsDir = path.dirname(USERS_FILE)
    if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir, { recursive: true })
    }
    
    const writeStream = fs.createWriteStream(USERS_FILE)
    
    for (let i = 1; i <= totalUsers; i++) {
        const user = generateUser(i)
        writeStream.write(JSON.stringify(user) + '\n')
        
        // Log progreso cada 1000 usuarios
        if (i % 1000 === 0) {
            console.log(`📈 Generados: ${i}/${totalUsers} usuarios`)
        }
    }
    
    writeStream.end()
    
    return new Promise((resolve) => {
        writeStream.on('finish', () => {
            console.log(`✅ Archivo generado: ${USERS_FILE}`)
            console.log(`📊 Total usuarios: ${totalUsers}`)
            
            const stats = fs.statSync(USERS_FILE)
            console.log(`💾 Tamaño archivo: ${Math.round(stats.size / 1024 / 1024 * 100) / 100} MB`)
            
            resolve(true)
        })
    })
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    const totalUsers = parseInt(process.argv[2]) || 10000
    generateUsersFile(totalUsers)
        .then(() => console.log('🎉 Generación completada'))
        .catch(console.error)
}