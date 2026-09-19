const listaFavoritos = document.getElementById("lista-favoritos");

const aves = {

    "Pava chillona": {
        imagen: "imagenes/pava_de_monte.png",
        comun: "Pava de monte",
        cientifico: "Chamaepetes goudotii",
        local: "Pava chillona"
    },

    "Pava de monte": {
        imagen: "imagenes/pava_de_monte.png",
        comun: "Pava de monte",
        cientifico: "Chamaepetes goudotii",
        local: "Pava chillona"
    },

    "Pava guacharacha": {
        imagen: "imagenes/pava_ guacharacha.jpg",
        comun: "Pava guacharaca",
        cientifico: "Ortalis columbiana",
        local: "Pava guacharacha"
    },

    "Perdiz común": {
        imagen: "imagenes/Perdiz_comun.jpg",
        comun: "Perdiz común",
        cientifico: "Colinus cristatus",
        local: "Perdiz"
    },

    "Paloma doméstica": {
        imagen: "imagenes/Paloma_comun.jpg",
        comun: "Paloma doméstica",
        cientifico: "Columba livia",
        local: "Paloma común"
    },

    "Paloma de collar": {
        imagen: "imagenes/paloma_de_collar.jpg",
        comun: "Paloma de collar",
        cientifico: "Streptopelia decaocto",
        local: "Paloma de collar"
    },

    "Paloma colorada": {
        imagen: "imagenes/paloma_colorada.jpg",
        comun: "Paloma colorada",
        cientifico: "Patagioenas cayennensis",
        local: "Paloma colorada"
    },

    "Caminera rabiblanca": {
        imagen: "imagenes/caminera_rabiblanca.jpg",
        comun: "Caminera rabiblanca",
        cientifico: "Leptotila verreauxi",
        local: "Caminera rabiblanca"
    },

    "Caminera cabeciazul": {
        imagen: "imagenes/caminera_cabeciazul.jpg",
        comun: "Caminera cabeciazul",
        cientifico: "Zenaida auriculata",
        local: "Caminera cabeciazul"
    },

    "Torcaza naguiblanca": {
        imagen: "imagenes/Torcaza_naguiblanca.jpg",
        comun: "Torcaza naguiblanca",
        cientifico: "Zenaida auriculata",
        local: "Torcaza naguiblanca"
    },

    "Tortolita diminuta": {
        imagen: "imagenes/Tortolita_diminuta.jpg",
        comun: "Tortolita diminuta",
        cientifico: "Columbina minuta",
        local: "Tortolita diminuta"
    }
};


const usuarioFavoritos = localStorage.getItem("usuario");


if (!usuarioFavoritos) {

    listaFavoritos.innerHTML = `
        <p>Debes iniciar sesión para ver tus favoritos.</p>
    `;

} else {

    const usuario = JSON.parse(usuarioFavoritos);

    cargarFavoritos(usuario.id);
}


async function cargarFavoritos(usuarioId) {

    try {

        const respuesta = await fetch(
           ` http://localhost:5500/api/favoritos?usuarioId=${usuarioId}`
        );

        const favoritos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(favoritos.mensaje);
        }

        if (favoritos.length === 0) {

            listaFavoritos.innerHTML = `
                <p>No tienes aves favoritas todavía.</p>
            `;

            return;
        }

        listaFavoritos.innerHTML = "";


        favoritos.forEach((favorito) => {

            const ave = aves[favorito.aveId];

            if (!ave) {
                return;
            }

            const elemento = document.createElement("article");

            elemento.classList.add("ave");

            elemento.innerHTML = `

                <img 
                    src="${ave.imagen}" 
                    alt="${ave.comun}"
                >

                <h3>Nombre común:</h3>
                <p>${ave.comun}</p>

                <h3>Nombre científico:</h3>
                <p><em>${ave.cientifico}</em></p>

                <h3>Nombre local:</h3>
                <p>${ave.local}</p>

                <button class="boton-eliminar-favorito">
                    Quitar de favoritos
                </button>

            `;


            const botonEliminar =
                elemento.querySelector(".boton-eliminar-favorito");


            botonEliminar.addEventListener("click", async () => {

                const confirmar = confirm(
                   ` ¿Quieres quitar "${ave.comun}" de tus favoritos?`
                );

                if (!confirmar) {
                    return;
                }


                try {

                    const respuesta = await fetch(
                        "http://localhost:3000/api/favoritos",
                        {
                            method: "DELETE",

                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                usuarioId: usuarioId,
                                aveId: favorito.aveId
                            })
                        }
                    );


                    const datos = await respuesta.json();


                    if (!respuesta.ok) {

                        alert(datos.mensaje);

                        return;
                    }


                    elemento.remove();


                    if (listaFavoritos.children.length === 0) {

                        listaFavoritos.innerHTML = `
                            <p>No tienes aves favoritas todavía.</p>
                        `;

                    }


                } catch (error) {

                    console.error("Error:", error);

                    alert(
                        "No se pudo eliminar el favorito."
                    );

                }

            });


            listaFavoritos.appendChild(elemento);

        });


    } catch (error) {

        console.error("Error:", error);

        listaFavoritos.innerHTML = `
            <p>No se pudieron cargar los favoritos.</p>
        `;
    }
}