const favoritoService = require("../services/favoritoService");

const agregarFavorito = async (req, res) => {

    try {

        const { usuarioId, aveId } = req.body;

        if (!usuarioId || !aveId) {
            return res.status(400).json({
                mensaje: "usuarioId y aveId son obligatorios"
            });
        }

        const favorito = await favoritoService.agregarFavorito(
            usuarioId,
            aveId
        );

        res.status(201).json({
            mensaje: "Ave agregada a favoritos",
            favorito: favorito
        });

    } catch (error) {

        res.status(400).json({
            mensaje: error.message
        });

    }
};

const obtenerFavoritos = async (req, res) => {

    try {

        const { usuarioId } = req.query;

        if (!usuarioId) {
            return res.status(400).json({
                mensaje: "usuarioId es obligatorio"
            });
        }

        const favoritos = await favoritoService.obtenerFavoritos(usuarioId);

        res.status(200).json(favoritos);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }
};

const eliminarFavorito = async (req, res) => {

    try {

        const { usuarioId, aveId } = req.body;

        if (!usuarioId || !aveId) {
            return res.status(400).json({
                mensaje: "usuarioId y aveId son obligatorios"
            });
        }

        const favorito = await favoritoService.eliminarFavorito(
            usuarioId,
            aveId
        );

        res.status(200).json({
            mensaje: "Ave eliminada de favoritos",
            favorito: favorito
        });

    } catch (error) {

        res.status(404).json({
            mensaje: error.message
        });

    }
};

module.exports = {
    agregarFavorito,
    obtenerFavoritos,
    eliminarFavorito
};