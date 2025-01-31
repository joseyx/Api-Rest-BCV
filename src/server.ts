import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();
const app = express();

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
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
