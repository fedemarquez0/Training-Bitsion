# Sistema de Gestión de Clientes con ASP .NET Web API y Angular

El proyecto se enfoca en el desarrollo de un sistema de gestión de clientes que permite realizar operaciones como alta, baja y modificación de información de los mismos. Este sistema está diseñado para ser implementado en entornos web, utilizando distintas tecnologías tanto en el lado del cliente como en el servidor.

## Tecnologías Utilizadas

### ASP .NET Web API

Se emplea ASP .NET Web API para construir la capa de servicios RESTful que permite la comunicación entre el cliente y el servidor.

### Angular 17 con NgZorro

Angular 17 es utilizado en el lado del cliente para construir la interfaz de usuario dinámica y receptiva. NgZorro es una librería que se integra con Angular para proporcionar componentes visuales y herramientas de interfaz de usuario predefinidas que agilizan el desarrollo y mejoran la apariencia del sistema.

### Base de Datos SQL Server

Se emplea SQL Server como gestor de base de datos para almacenar y administrar la información de los clientes.

### Autenticación mediante Google Firebase

Google Firebase se utiliza para gestionar la autenticación de usuarios en el sistema. Proporciona un conjunto de herramientas para autenticación segura, lo que incluye la posibilidad de iniciar sesión mediante cuentas de Google, lo cual simplifica el proceso de registro y acceso al sistema.

### Postman

Postman se utiliza para probar y documentar la Web API. Esta herramienta permite enviar solicitudes HTTP a la API, facilitando la verificación del funcionamiento correcto de los endpoints y la validación de las respuestas recibidas.

## Instalaciones:
- [Node.js 20.11.1](https://nodejs.org/en/download)
- [Angular 17.3.0](https://angular.io/guide/setup-local#install-the-angular-cli)
- [Visual Studio 2022](https://visualstudio.microsoft.com/es/downloads/)
- [SQL Server](https://www.microsoft.com/es-ar/sql-server/sql-server-downloads)

## Clonar Repositorio:
Para clonar el repositorio, ejecuta los siguientes comandos en tu terminal:
```bash
git init
git clone https://github.com/fedemarquez0/Training-Bitsion.git
```

## Ejecutar proyecto:
### Backend .NET Web API
1. Abrir proyecto `backend` con Visual Studio 2022.
2. Ejecutar proyecto localmente.
### FrontEnd Angular 17
1. Ejecuta los siguientes comandos en la terminal:
```bash
npm install
ng serve --open
```
### Crear tabla en SQL
1. Ejecutar el archivo `SQLScript.sql`.
### Probar Web API con Postman
1. Importar archivo `Clientes.postman_collection.json` el cual contiene ejemplos para el funcionamiento.