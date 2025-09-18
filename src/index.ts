import logger from './utils/logger.ts';
import {
    getUsers,
    createUser,
    updateUserById,
    deleteUserById,
    getBooks,
    createBook,
    updateBookById,
    deleteBookById
} from './services/api.ts';
import { readLogFile } from './services/logReader.ts';
import { sendReportEmail } from './services/emailService.ts';
import cron from 'node-cron';


// programar el envío para cada minuto
cron.schedule("* * * * *", async () => {
    logger.info("Enviando reporte automático de logs");

    const logContent = await readLogFile();
    await sendReportEmail(logContent);

    logger.info("Reporte enviado");
});

async function main(){
    logger.info("Cliente iniciado");

    try{
        // users
        // todos los usuarios
        const users = await getUsers();
        logger.info("Usuarios actuales:");
        console.log(users);

        // crear usuario
        const newUserResponse = await createUser({
            id: 15,
            name: 'Jose Manuel',
            role: 'admin',
            email: 'jose@mail.com',
            createdAt: new Date().toISOString(),
            isActive: true,
        });

        const newUser = newUserResponse.user;

        logger.info("Usuario creado:")
        console.log(newUser);

        // actualizar usuario por id (toma el id del usuario que se acaba de crear)
        const updateUser = await updateUserById(newUser.id, {
            ...newUser,
            name: 'Joselo',
        })
        logger.info("Usuario actualizado");
        console.log(updateUser);

        // eliminar usuario por id
        await deleteUserById(newUser.id); // toma el id del usuario que se acaba de crear
        logger.info(`Usuario con id ${newUser.id} eliminado`)






        // books
        // obtener todos los libros
        const books = await getBooks();
        logger.info("Libros actuales:");
        console.log(books);

        // crear libro
        const newBookResponse = await createBook({
            id: "10",
            author: "Jose Monsalve",
            name: "Aprendiendo Node.js",
            owner: "Jose MOnsalve",
        });

        const newBook = newBookResponse.book;
        logger.info("Libro creado:");
        console.log(newBook);

        // actualizar libro por id (toma el id del libro que se acaba de crear)
        const updateBook = await updateBookById(newBook.id, {
            ...newBook,
            owner: 'Stiven',
        });
        logger.info("Libro actualizado:");
        console.log(updateBook);

        // eliminar libro por id
        await deleteBookById(newBook.id); // toma el id del libro que se acaba de crear
        logger.info(`Libro con id ${newBook.id} eliminado`);


    } catch(err: any) {
        logger.error(`Error en la ejecución del cliente: ${err.message}`);
    }
}

main();
process.stdin.resume(); // para que Node no se finalice y se ejecute otra vez el cron
