const usuarioGuardado = localStorage.getItem("usuario");

const enlacesSesion = document.querySelectorAll(
    'a[href="login.html"]'
);

if (usuarioGuardado) {

    const usuario = JSON.parse(usuarioGuardado);

    enlacesSesion.forEach((enlace) => {

        enlace.textContent = `Hola, ${usuario.nombre}`;

        enlace.href = "#";

        enlace.addEventListener("click", (event) => {

            event.preventDefault();

            const cerrarSesion = confirm(
                "¿Quieres cerrar sesión?"
            );

            if (cerrarSesion) {

                localStorage.removeItem("usuario");

                window.location.href = "index.html";
            }

        });

    });

}