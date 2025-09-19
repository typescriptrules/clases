# 🧩 Mi Estructura

---

## 📁 controllers
Aquí viven los **jefes de tráfico 🚦**.  
Ellos reciben los mensajes de los usuarios y deciden a dónde deben ir (qué hacer con esos mensajes).

---

## 📁 interfaces
Aquí están los **dibujitos de cómo deben lucir las cosas 🎨**.  
Son como los moldes para asegurarnos de que todos los objetos tengan la misma forma.

---

## 📁 middlewares
Son los **Interceptores 🛡️ de la puerta**.  
Revisan cada petición que entra y deciden si puede pasar o no (como revisar un boleto antes de entrar 🎟️), también pueden inyectar datos, verificar formas, y todo lo que necesites de procesar en tu petición antes de resolverla (enviarla al controller).

---

## 📁 models
Estos son los **planos de construcción 🏗️**.  
Nos dicen cómo se ven los datos que guardamos en nuestra base de datos (como fichas con nombre, edad, etc.).

---

## 📁 routes
Las **carreteras 🛣️** de la aplicación.  
Dicen qué camino debe seguir el usuario para llegar a cada lugar (por ejemplo: `/login`, `/users`, etc.).

---

## 📁 services
Los **ayudantes 🤖** que hacen el trabajo difícil.  
Ellos hacen cálculos, hablan con la base de datos o hacen magia detrás de escena ✨.

---

## 📁 types
Una **cajita de etiquetas 🏷️**.  
Aquí guardamos tipos que usamos en muchos lugares para que todo funcione bien y ordenado.

---

## 📁 utils
Una **caja de herramientas 🧰**.  
Son funciones pequeñas que nos ayudan a no repetir el mismo código muchas veces.

---

## 📄 app.ts
Este es el **botón de encendido 💡**.  
Es el archivo principal que inicia todo el proyecto y conecta todas las piezas.

---

## 🏁 Cómo empezar
1. Instala las dependencias con:
   ```bash
   npm install

## Dónde continuar?

Para leer sobre el archivo [app.ts](https://github.com/typescriptrules/clases/blob/clase-6-otra-vez/Express.md) haz click [aquí](https://github.com/typescriptrules/clases/blob/clase-6-otra-vez/Express.md)