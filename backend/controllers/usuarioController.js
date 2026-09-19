const usuarioService = require("../services/usuarioService");

const iniciarSesion = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({
                mensaje: "Correo y contraseña son obligatorios"
            });
        }

        const usuario = await usuarioService.iniciarSesion(
            correo,
            contrasena
        );

        res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            usuario: usuario
        });

    } catch (error) {
        res.status(401).json({
            mensaje: error.message
        });
    }
};


const registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, contrasena } = req.body;

        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({
                mensaje: "Nombre, correo y contraseña son obligatorios"
            });
        }

        const usuario = await usuarioService.registrarUsuario(
            nombre,
            correo,
            contrasena
        );

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: usuario
        });

    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
};

module.exports = {
    iniciarSesion,
    registrarUsuario
};