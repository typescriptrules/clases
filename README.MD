# 📚 Estructura del Proyecto

Este proyecto sigue una organización por carpetas que separa responsabilidades, facilitando la escalabilidad y el mantenimiento.  

---

## 📁 controllers/

Aquí van las funciones que responden a las peticiones **HTTP**.  
- Ejemplo: alguien hace un `GET /books`, entonces el controller decide qué hacer:  
  - Llamar a un servicio.  
  - Manejar errores.  
  - Devolver la respuesta al cliente.  

👉 **Analogía:** Piensa en el controller como el **mesero**: recibe la orden, la lleva a la cocina (*service/modelo*) y luego trae el plato al cliente (*respuesta*).

---

## 📁 models/

Se encargan de manejar los **datos** y la comunicación con la **base de datos**.  
- En este caso, no hay DB real, así que se usa un archivo `.json` (`getBooks.json`) como base de datos **falsa**.

---

## 📁 service/

Aquí se encuentra la **lógica de negocio**.  
- El service decide cómo obtener o procesar los datos:  
  - Hoy desde un JSON.  
  - Mañana desde MongoDB, MySQL u otra base.  

👉 Ventaja: si cambias de JSON a SQL, **solo actualizas el service**, no el controller.

---

## 📁 routes/

Aquí defines los **endpoints**.  
- Ejemplo:  
  - `GET /books`  
  - `POST /books`  

El router únicamente indica:  
> "Cuando llegue esta ruta, llama a este controller".

---

## 📁 interfaces/

Aquí defines **contratos en TypeScript**.  
- Ejemplo: cómo debe lucir un `Book`:  
  ```ts
  interface Book {
    id: string;
    title: string;
    author: string;
  }
