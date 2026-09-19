console.log("registro.js se cargó correctamente");

const formulario = document.getElementById("formulario-registro");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("confirmar-contrasena").value;

    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        const respuesta = await fetch(
            "http://localhost:5500/api/usuarios/registro",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: nombre,
                    correo: correo,
                    contrasena: contrasena
                })
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            alert(datos.mensaje);
            return;
        }

        alert("Cuenta creada correctamente");

        formulario.reset();

        window.location.href = "login.html";

    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar con el servidor");
    }
});