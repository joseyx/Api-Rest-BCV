export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API REST",
      version: "1.0.0",
      description: "Documentación de mi API REST con Express y TypeScript",
    },
  },
  apis: ["./src/api/*.ts"],
};