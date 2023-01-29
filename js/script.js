
const getCharacters = async () => {
    const datos = await fetch("https://rickandmortyapi.com/api/character");
    const data = await datos.json();
    return data;
}

const crearTemplates = (personajes) => {
    let templateAllCards = [];
    personajes.forEach(personaje => {
        let templateCard = `
        <div data-id-personaje="${personaje.id}" class="card-personaje">
            <div class="card-img-personaje">
                <img src="${personaje.image}" alt="${personaje.name}">
            </div>
            <div class="card-contenido-personaje">
                <h4>${personaje.name}</h4>
                <hr>
                <div class="texto-card">
                    <p><strong>Especie: </strong>${personaje.species}</p>
                    <p><strong>Genero: </strong>${personaje.gender}</p>
                    <p><strong>Ubicación: </strong>${personaje.location.name}</p>
                    <p><strong>Origen: </strong>${personaje.location.name}</p>
                </div>
            </div>
        </div>
        `;
        templateAllCards += templateCard;
    });

    return templateAllCards;
}

const llenarCards = async () => {
    const resultadoApi = await getCharacters();
    const personajes = resultadoApi.results;

    $contenedorCards = document.querySelector(".contenedor-cards-personajes");
    $contenedorCards.innerHTML = crearTemplates(personajes);

    /* Agregar Evento click */
    const $cards = $contenedorCards.querySelectorAll(".card-personaje");
    $cards.forEach(card => {
        card.addEventListener('click', () => {
            console.log(card.getAttribute("data-id-personaje"));
            console.log(personajes.filter(personaje => personaje.id == card.getAttribute("data-id-personaje")));
        })
    });

}


llenarCards();