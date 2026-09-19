const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

const iniciarSesion = async (correo, contrasena) => {

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
        throw new Error("Correo o contraseña incorrectos");
    }

    const contrasenaCorrecta = await bcrypt.compare(
        contrasena,
        usuario.contrasena
    );

    if (!contrasenaCorrecta) {
        throw new Error("Correo o contraseña incorrectos");
    }

    return {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo
    };
};


const registrarUsuario = async (nombre, correo, contrasena) => {

    const usuarioExistente = await Usuario.findOne({ correo });

    if (usuarioExistente) {
        throw new Error("El correo ya está registrado");
    }

    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

    const nuevoUsuario = new Usuario({
        nombre,
        correo,
        contrasena: contrasenaEncriptada
    });

    await nuevoUsuario.save();

    return {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo
    };
};

module.exports = {
    iniciarSesion,
    registrarUsuario
};