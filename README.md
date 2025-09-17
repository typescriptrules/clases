# First steps to create your first API

## Facilities

#### First you need to install this packages

```bash
  npm install express cors dotenv multer moongose
  npm install -D @types/express @types/cors @types/multer ts-node nodemon
```

#### Then you need to add this to your scripts

```json
  "scripts": {
    "listen" : "nodemon ./src/app.ts"
  }
```

## Serve your API

#### After those installs you will start your service like this

```ts
    import "dotenv/config"
    import express from 'express'
    import cors from 'cors'

    const PORT = process.env.PORT || 3001

    const app = express()
    app.use(cors())

    app.listen(PORT, () => console.log(`Listen on port ${PORT}`))
```

## Create you first Route

#### Before we exposed our API but empty, know we can start defining our routes in our routes folder

```ts
    import { Router, type Request, type Response } from 'express'

    const router:Router = Router()
    /**
     * http://localhost:3002/books
     */

    router.get('/books', (req:Request, res:Response)=>{
        res.send({data: 'AQUI_VAN_LOS_MODELOS'})
    })

    export { router }
```

#### Afet defining our first route, you have to attach it to the app adding those lines

```ts
    import { router } from './routes/book.ts'
    app.use(router)
```

