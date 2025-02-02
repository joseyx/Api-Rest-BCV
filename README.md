# API Challenge

This project is a REST API built with Express and TypeScript that allows you to obtain and store exchange rates. The API includes documentation generated with Swagger and uses Prisma as an ORM to interact with a PostgreSQL database.

## Languages
- [Español (Spanish)](README.es.md)

## Requirements

- Node.js (v23)
- PostgreSQL
- npm (v11)

## Installation

1. Clone the repository:

  ```bash
   git clone https://github.com/joseyx/Api-Rest-BCV.git
   cd Api-Rest-BCV
  ```

2. Install the dependencies:

  ```bash
  npm install
  ```

3. Configure the environment variables:

  Create a `.env` file at the root of the project with the following content:

  ```properties
  DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
  ```

4. Set up the database:

  Make sure you have PostgreSQL installed and running. Then, run the Prisma migrations to set up the database:

  ```bash
  npx prisma migrate dev --name init
  ```

5. Seed the database with pre-generated data:

  Run the seed script to insert predefined data into the database:

  ```bash
  npm run seed
  ```

## Running

### Development Mode

To run the project in development mode with automatic reload:

```bash
npm run dev
```

### Production Mode

To compile and run the project in production mode:

```bash
npm run build
npm start
```

## Endpoints

### Get the current exchange rate

```http
GET /api/rates/current
```

#### Responses

- **200 OK**: Returns the current exchange rate.
- **404 Not Found**: No exchange rate found.
- **500 Internal Server Error**: Internal server error.

### Get the exchange rate history

```http
GET /api/rates/history
```

#### Query Parameters

- start_date (Optional): Start date of the range (format `YYYY-MM-DD`).

- end_date (Optional): End date of the range (format `YYYY-MM-DD`).

#### Responses

- **200 OK**: Returns the exchange rate history.
- **400 Bad Request**: Invalid start or end date.
- **404 Not Found**: No exchange rates found in the specified range.
- **500 Internal Server Error**: Internal server error.

## API Documentation

The API documentation is available in Swagger. Once the server is running, you can access the documentation at:

```
http://localhost:3000/api-docs
```

## Scheduled Tasks

The project includes a scheduled task that performs a daily scraping at 9:15 AM to obtain the exchange rate and store it in the database.

## Tests

To run the unit tests:

```bash
npm test
```

## Project Structure

- **src/**: Contains the project's source code.
  - **api/**: Contains the API route files.
  - **jobs/**: Contains the scheduled tasks.
  - **services/**: Contains the scraping services.
  - **tests/**: Contains the unit test files.
  - **client.ts**: Prisma client configuration.
  - **server.ts**: Server configuration and startup.
  - **swaggerOptions.ts**: Swagger configuration.
- **prisma/**: Contains the Prisma schema and migrations.
- **.env**: Environment variables file.
- **package.json**: npm configuration file.
