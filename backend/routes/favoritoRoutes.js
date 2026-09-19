const express = require("express");
const favoritoController = require("../controllers/favoritoController");

const router = express.Router();

router.post("/", favoritoController.agregarFavorito);
router.get("/", favoritoController.obtenerFavoritos);
router.delete("/", favoritoController.eliminarFavorito)

module.exports = router;