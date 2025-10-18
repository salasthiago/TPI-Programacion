import express from "express";
import cors from "cors";
import sequelize from "./models/database.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import productoRoutes from "./routes/producto.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productoRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a SQLite exitosa");
    
    await sequelize.sync({ alter: true });
    console.log("✅ Base de datos sincronizada correctamente");
    
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
})();