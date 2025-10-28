import express from "express";
import cors from "cors";
import path from "path";
import sequelize from "./models/database.js";
import { inicializarDatos } from "./seeders/init.js";

import usuarioRoutes from "./routes/usuario.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";

const app = express();
const PORT = 3000;

// ===== Middleware global =====
app.use(cors());
app.use(express.json());

// ===== Servir archivos estáticos (imágenes subidas) =====
// Esto permite acceder a las imágenes como: http://localhost:3000/uploads/vinilos/archivo.jpg
app.use(express.static(path.resolve("public")));

// ===== Rutas =====
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/carrito", carritoRoutes);

// ===== Conexión y sincronización con la base de datos =====
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a SQLite exitosa");

    await sequelize.sync({ force: false });
    console.log("✅ Base de datos sincronizada correctamente");

    // Inicializar datos de ejemplo si la BD está vacía
    await inicializarDatos();

    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
})();
