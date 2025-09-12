# 💡 Ejercicio: API de Gestión de Tareas Tipada en TypeScript

### Vas a construir una pequeña API de gestión de tareas (To-Do) usando Node.js con el módulo http. La API debe exponer endpoints para crear, listar, actualizar y eliminar tareas, todo en memoria (sin base de datos).

**El reto está en:**
1. Definir tipos robustos en TypeScript.
2. Usar genéricos, map types y utility types.
3. Manejar correctamente el tipado de las respuestas y errores de la API.

## Requisitos Técnicos

- Una tarea (Task) tiene:
 - id: string
 - title: string
 - description?: string
 - status: "pending" | "in-progress" | "done"
 - createdAt: Date
 - updateddAt?: Date

**Hint** usar Readonly y Partial en algunos momentos para evitar mutaciones indebidas.

## Genéricos y Utility Types

### Crear un tipo genérico ApiResponse<T> que tenga la forma:
```ts
   type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
   };
```
- Usar Pick, Omit y Partial para:

 - CreateTaskDTO (no debe tener id, createdAt, updatedAt).

 - UpdateTaskDTO (debe ser Partial<CreateTaskDTO>).

## Interfaces para la API

### Definir una interfaz genérica para representar un Controller:

```ts
interface Controller<T> {
  getAll(): ;
  getById(id: string):;
  create(input: CreateTaskDTO):;
  update(id: string, input: UpdateTaskDTO): ;
  delete(id: string): ;
}
```
**Hint** Utility Type Promise, El TaskController deberá implementar esta interfaz.

## Servidor HTTP

### Usar solo http.createServer.

- Endpoints:

 - GET /tasks → lista todas las tareas

 - GET /tasks/:id → devuelve una tarea

 - POST /tasks → crea una tarea

 - PUT /tasks/:id → actualiza una tarea

 - DELETE /tasks/:id → elimina una tarea

 - Responder con JSON tipado en base a ApiResponse<T>.

## Utilidades

1. Implementar validaciones tipadas con un tipo genérico Validator<T>:
```ts
type Validator<T> = (input: T) => string[]; 
```
2. Crear un type ExtractKeysOfType<T, U> que permita extraer las claves de T cuyo tipo sea U.
Ejemplo:
```ts
type StringKeys = ExtractKeysOfType<Task, string>; 
// "id" | "title" | "description"
```
3. Agregar un endpoint GET /tasks/status/:status que filtre tareas por estado usando narrowing types.

## Objetivo de Aprendizaje

 - Practicar generics, utility types, map types y interfaces.

 - Entender cómo levantar un servidor HTTP sin frameworks.

 - Diseñar APIs con tipado robusto.

 - Manejar validaciones y respuestas tipadas.


revisar: [Documentación módulo http](https://nodejs.org/api/http.html)