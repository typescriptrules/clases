Aquí tienes tu README reorganizado y con mejor formato:

---

# 🚀 Guía rápida: Express + TypeScript

Pasos claros para configurar un proyecto con **Express**, **TypeScript**, **CORS** y **dotenv**.

---

## 1️⃣ Inicializa el proyecto

```bash
mkdir mi-proyecto
cd mi-proyecto
npm init -y
```

---

## 2️⃣ Instala dependencias

### Express + TypeScript

```bash
npm install express
npm install -D typescript ts-node @types/express @types/node
```

### CORS

```bash
npm install cors
npm install -D @types/cors
```

### dotenv

```bash
npm install dotenv
npm install -D @types/dotenv
```
### nodemonpm install nodemon

```bash
npm install nodemon
npm install -D @types/nodemon
```
---

## 3️⃣ Configuración de TypeScript

Inicializa la configuración:

```bash
npx tsc --init
```

En `tsconfig.json` ajusta estas opciones:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true
  }
}
```

---

## 4️⃣ Crea la carpeta `src` y el archivo `index.ts`

Ejemplo básico con **Express + CORS + dotenv**:

```ts
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor Express con TypeScript funcionando 🚀");
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
```

---

## 5️⃣ Ejemplo mínimo de servidor

```ts
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor Express con TypeScript funcionando");
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
```

---

## 6️⃣ Ejecutar con `ts-node-dev`

Instala el paquete:

```bash
npm install -D ts-node-dev
```

En el `package.json`, agrega el script:

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
}
```

Ejecuta el servidor:

```bash
npm run dev
```

---

✅ Listo. Ahora tienes un servidor Express con TypeScript, CORS y dotenv configurado.


