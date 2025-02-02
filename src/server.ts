import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./swaggerOptions";

dotenv.config();
const app = express();

const specs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

// Carga dinamica de rutas
const routesDir = path.join(__dirname, "api");
fs.readdirSync(routesDir).forEach((file) => {
  import(path.join(routesDir, file)).then((route) => {
    const routeName = file.replace(".ts", "");
    app.use(`/api/${routeName}`, route.default);
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/api-docs`);
});
