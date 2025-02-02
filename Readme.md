# API Challenge

Este proyecto es una API REST construida con Express y TypeScript que permite obtener y almacenar tasas de cambio. La API incluye documentación generada con Swagger y utiliza Prisma como ORM para interactuar con una base de datos PostgreSQL.

## Requisitos

- Node.js (v23)
- PostgreSQL
- npm (v11)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/api-challenge.git
   cd api-challenge
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

  Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```properties
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos?schema=public"
   ```

4. Configura la base de datos:

   Asegúrate de tener PostgreSQL instalado y ejecutándose. Luego, ejecuta las migraciones de Prisma para configurar la base de datos:

   ```bash
   npx prisma migrate dev --name init
   ```

## Ejecución

### Modo Desarrollo

Para ejecutar el proyecto en modo desarrollo con recarga automática:

```bash
npm run dev
```

### Modo Producción

Para compilar y ejecutar el proyecto en modo producción:

```bash
npm run build
npm start
```

## Endpoints

### Obtener la tasa de cambio actual

```http
GET /api/rates/current
```

#### Respuestas

- **200 OK**: Devuelve la tasa de cambio actual.
- **404 Not Found**: No se encontró ninguna tasa de cambio.
- **500 Internal Server Error**: Error interno del servidor.

### Obtener el historial de tasas de cambio

```http
GET /api/rates/history
```

#### Parámetros de Query

- start_date (Opcional): Fecha de inicio del rango (formato `YYYY-MM-DD`).

- end_date (Opcional): Fecha de fin del rango (formato `YYYY-MM-DD`).

#### Respuestas

- **200 OK**: Devuelve el historial de tasas de cambio.
- **400 Bad Request**: Fecha de inicio o fin no válida.
- **404 Not Found**: No se encontraron tasas de cambio en el rango especificado.
- **500 Internal Server Error**: Error interno del servidor.

## Documentación de la API

La documentación de la API está disponible en Swagger. Una vez que el servidor esté en ejecución, puedes acceder a la documentación en:

```
http://localhost:3000/api-docs
```

## Tareas Programadas

El proyecto incluye una tarea programada que ejecuta un scraping diario a las 9:15 AM para obtener la tasa de cambio y almacenarla en la base de datos.

## Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm test
```

## Estructura del Proyecto

- **src/**: Contiene el código fuente del proyecto.
  - **api/**: Contiene los archivos de rutas de la API.
  - **jobs/**: Contiene las tareas programadas.
  - **services/**: Contiene los servicios de scraping.
  - **tests/**: Contiene los archivos de pruebas unitarias.
  - **client.ts**: Configuración del cliente de Prisma.
  - **server.ts**: Configuración y arranque del servidor.
  - **swaggerOptions.ts**: Configuración de Swagger.
- **prisma/**: Contiene el esquema de Prisma y las migraciones.
- **.env**: Archivo de variables de entorno.
- **package.json**: Archivo de configuración de npm.
