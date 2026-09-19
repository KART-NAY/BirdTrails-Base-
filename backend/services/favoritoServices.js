const Favorito = require("../models/Favorito");

const agregarFavorito = async (usuarioId, aveId) => {

    const favoritoExistente = await Favorito.findOne({
        usuarioId,
        aveId
    });

    if (favoritoExistente) {
        throw new Error("El ave ya está en favoritos");
    }

    const nuevoFavorito = new Favorito({
        usuarioId,
        aveId
    });

    await nuevoFavorito.save();

    return nuevoFavorito;
};


const obtenerFavoritos = async (usuarioId) => {

    const favoritos = await Favorito.find({
        usuarioId: usuarioId
    });

    return favoritos;
};


const eliminarFavorito = async (usuarioId, aveId) => {

    const favoritoEliminado = await Favorito.findOneAndDelete({
        usuarioId,
        aveId
    });

    if (!favoritoEliminado) {
        throw new Error("El favorito no existe");
    }

    return favoritoEliminado;
};


module.exports = {
    agregarFavorito,
    obtenerFavoritos,
    eliminarFavorito
};