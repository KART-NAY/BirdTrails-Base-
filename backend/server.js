const express = require("express");
const cors = require("cors");

const conectarDB = require("./config/database");
const usuarioRoutes = require("./routes/usuarioRoutes");
const favoritoRoutes = require("./routes/favoritoRoutes");  

const app = express();

app.use(cors());
app.use(express.json());

// Conectar a MongoDB
conectarDB();

// Rutas


app.use("/api/usuarios", usuarioRoutes);
app.use("/api/favoritos", favoritoRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        mensaje: "Servidor funcionando correctamente"
    });
});

const PORT = 5500;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});