import { Router, type Request, type Response } from 'express'
import { checkPermissions, validateUserData } from '../middlewares/validateUser.ts'
import { getUsersWithoutStreams, getUsersWithStreams, streamUsersToClient, uploadUsersStream } from '../controllers/users.ts';
import cors from 'cors';

const router:Router = Router()

const corsOptions = {
    origin: 'http://localhost:3000/users', // Aquí puedes especificar el origen permitido
    methods: ['GET', 'POST', 'UPDATE', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    optionsSuccessStatus: 200 // Algunos navegadores (como IE11) requieren este valor para respuestas 204
};
/**
 * http://localhost:3002/users
 */


router.post('/', validateUserData,  checkPermissions, cors(corsOptions), (req: Request, res: Response) => {
    const { name, role } = req.body;
    res.status(201).json({
        message: "User did something successfully",
        user: { name, role },
    });
})


// 🐌 Método tradicional - Carga todo en memoria
router.get('/without-streams', getUsersWithoutStreams, cors(corsOptions))

// 🌊 Método con streams - Procesa línea por línea
router.get('/with-streams', getUsersWithStreams, cors(corsOptions))

// 📡 Stream directo al cliente - Respuesta en tiempo real
router.get('/stream-to-client', streamUsersToClient, cors(corsOptions))

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