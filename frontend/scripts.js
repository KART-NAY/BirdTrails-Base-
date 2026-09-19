const botonesFavorito = document.querySelectorAll(".boton-favorito");

botonesFavorito.forEach((boton) => {

    boton.addEventListener("click", async () => {

        const usuarioGuardado = localStorage.getItem("usuario");

        if (!usuarioGuardado) {
            alert("Debes iniciar sesión para agregar favoritos.");
            return;
        }

        const usuario = JSON.parse(usuarioGuardado);

        const aveId = boton.dataset.ave;

        try {

            const respuesta = await fetch(
                "http://localhost:5500/api/favoritos",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        usuarioId: usuario.id,
                        aveId: aveId
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                alert(datos.mensaje);
                return;
            }

            alert("Ave agregada a favoritos");

        } catch (error) {

            console.error("Error:", error);

            alert("No se pudo conectar con el servidor");

        }

    });

});