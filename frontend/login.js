console.log("login.js se cargó correctamente");

const formulario = document.getElementById("formulario-login");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
        const respuesta = await fetch(
            "http://localhost:5500/api/usuarios/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
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

        alert("Inicio de sesión exitoso");

        localStorage.setItem(
        "usuario",
        JSON.stringify(datos.usuario)
        );

window.location.href = "index.html";

    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo conectar con el servidor");
    }
});