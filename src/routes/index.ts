import { Router } from 'express';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PATH_ROUTES = join(__dirname);

const router:Router = Router();

const cleanFileName = (fileName: string) => {
    return fileName.split('.').shift();
}

export async function initRoutes(){
    for (const file of readdirSync(PATH_ROUTES)) {
        const cleanName = cleanFileName(file);
        if (cleanName !== 'index') {
            const moduleRoute = await import(`./${cleanName}.ts`);
            router.use(`/${cleanName}`, moduleRoute.router);
        }
    }
}

export { router };