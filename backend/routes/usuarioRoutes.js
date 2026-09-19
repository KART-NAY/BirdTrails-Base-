const express = require("express");
const usuarioController = require("../controllers/usuarioController");

const router = express.Router();

router.post("/login", usuarioController.iniciarSesion);

router.post("/registro", usuarioController.registrarUsuario)

module.exports = router;