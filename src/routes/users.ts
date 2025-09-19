import { Router, type Request, type Response } from 'express'
import { checkPermission, validateUserData } from '../middleware/validateUser.ts'
import { getUsersWithoutStreams, getUsersWithStreams, streamUsersToClient, uploadUsersStream } from '../controllers/users.ts';

const router:Router = Router()
/**
 * http://localhost:3000/users
 */


router.post('/', validateUserData,  checkPermission, (req: Request, res: Response) => {
    const { name, role } = req.body;
    res.status(201).json({
        message: "User did something successfully",
        user: { name, role },
    });
})


// 🐌 Método tradicional - Carga todo en memoria
router.get('/without-streams', getUsersWithoutStreams)

// 🌊 Método con streams - Procesa línea por línea  
router.get('/with-streams', getUsersWithStreams)

// 📡 Stream directo al cliente - Respuesta en tiempo real
router.get('/stream-to-client', streamUsersToClient)

// 📤 Upload procesando con streams
router.post('/upload-stream', uploadUsersStream)

/**
 * RUTA PARA COMPARAR RENDIMIENTO
 */
router.get('/performance-test', async (req: Request, res: Response) => {
    const startTime = Date.now()
    const initialMemory = process.memoryUsage().heapUsed
    
    // Simular procesamiento
    console.log('🔥 Iniciando test de rendimiento...')
    
    res.json({
        message: 'Test de rendimiento disponible',
        endpoints: {
            traditional: '/users/without-streams',
            streaming: '/users/with-streams',
            realtime: '/users/stream-to-client'
        },
        tips: [
            'Usa /without-streams para archivos pequeños',
            'Usa /with-streams para archivos grandes',
            'Usa /stream-to-client para respuestas en tiempo real'
        ]
    })
})

export { router }