# Users CRUD API  

API simple en **Node.js + Express + TypeScript** que maneja usuarios almacenados en un archivo JSON. Incluye middlewares de autenticación con **token fijo** y validación de datos.  

---

## Requisitos  
- Node.js ≥ 18  
- npm  

---

## Instalación  
1. Clonar el repositorio  
2. Instalar dependencias:  
   ```bash
   npm install
   ```  
3. Crear un archivo `.env` en la raíz con:  
   ```env
   PORT=3000
   FIXED_TOKEN=supersecreto123
   ```  
4. Iniciar el servidor en modo desarrollo:  
   ```bash
   npm run dev
   ```  

El servidor estará disponible en:  
👉 `http://localhost:3000`  

---

## Endpoints  

Todos los endpoints bajo `/users` requieren el header:  

```
Authorization: Bearer supersecreto123
```

| Método  | Endpoint                  | Body (JSON) | Notas |
|---------|---------------------------|-------------|-------|
| **GET** | `/users`                  | –           | Lista todos los usuarios |
| **POST**| `/users`                  | `{ "name": "Sharon", "email": "sharon@mail.com", "role": "admin" }` | Crea un usuario nuevo |
| **GET** | `/users/:id`              | –           | Obtiene un usuario por ID |
| **PUT** | `/users/:id`              | `{ "name": "Nuevo Nombre" }` | Actualiza un usuario existente |
| **DELETE** | `/users/:id`           | –           | Requiere además `x-role: admin` en headers |

---

## Ejemplo rápido con Postman  

### Crear usuario  
- **POST** `http://localhost:3000/users`  
- Headers:  
  ```
  Authorization: Bearer supersecreto123
  ```  
- Body (raw JSON):  
  ```json
  {
    "name": "Sharon",
    "email": "sharon@mail.com",
    "role": "admin"
  }
  ```

### Eliminar usuario  
- **DELETE** `http://localhost:3000/users/1`  
- Headers:  
  ```
  Authorization: Bearer supersecreto123
  x-role: admin
  ```
