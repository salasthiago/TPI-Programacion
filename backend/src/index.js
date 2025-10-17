import express from "express";
import cors from "cors";
import sequelize from "./models/index.js";
import usuarioRoutes from "./routes/usuario.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarioRoutes);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Base de datos sincronizada correctamente");
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();
