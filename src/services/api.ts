import axios from 'axios';

const API_URL = "http://localhost:3000";


// CRUD para users
// obtener todos los usuarios
export async function getUsers() {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
}

// obtener usuario por id
export async function getUserById(id: number) {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
}

// crear usuario
export async function createUser(user: any) {
    const response = await axios.post(`${API_URL}/users`, user, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
}

// actualizar usuario por id
export async function updateUserById(id: number, user: any) {
    const response = await axios.put(`${API_URL}/users/${id}`, user, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
}

// eliminar usuario por id
export async function deleteUserById(id: number) {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
}





// CRUD para books
// obtener todos los libros
export async function getBooks() {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
}

// obtener libro por id
export async function getBookById(id: number) {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
}

// crear libro
export async function createBook(book: any){
    const response = await axios.post(`${API_URL}/books`, book, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
}

// actualizar libro por id
export async function updateBookById(id: number, book: any) {
    const response = await axios.put(`${API_URL}/books/${id}`, book, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
}

// eliminar libro por id
export async function deleteBookById(id: number) {
    const response = await axios.delete(`${API_URL}/books/${id}`);
    return response.data;
}