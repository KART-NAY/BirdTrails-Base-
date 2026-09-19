const mongoose = require("mongoose");

const favoritoSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    aveId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Favorito", favoritoSchema)