import { Router, type Request, type Response } from 'express'
import { checkPermissions, validateUserData } from '../middlewares/validateUser.ts'
import { getUsersWithoutStreams, getUsersWithStreams, streamUsersToClient, uploadUsersStream } from '../controllers/users.ts';
import cors from 'cors';

const router: Router = Router()

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:5500',
    ], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

// Crear usuario
router.post('/', cors(corsOptions), validateUserData, checkPermissions, (req: Request, res: Response) => {
    const { name, role } = req.body;
    res.status(201).json({
        message: "User did something successfully",
        user: { name, role },
    });
});

// Obtener usuarios (sin streams)
router.get('/',cors(corsOptions),getUsersWithoutStreams);

// Obtener usuarios (con streams)
router.get('/stream',cors(corsOptions),getUsersWithStreams);

// Stream directo al cliente
router.get('/stream/live',cors(corsOptions),streamUsersToClient);

// Subir usuarios usando streams
router.post('/upload',cors(corsOptions),uploadUsersStream);

// Ruta para comparar rendimiento
router.get('/performance-test', async (req: Request, res: Response) => {
    res.json({
        message: 'Test de rendimiento disponible',
        endpoints: {
            traditional: '/users',
            streaming: '/users/stream',
            realtime: '/users/stream/live'
        },
        tips: [
            'Usa /users para archivos pequeños',
            'Usa /users/stream para archivos grandes',
            'Usa /users/stream/live para respuestas en tiempo real'
        ]
    })
})

export { router }