let pokemons = [];


async function getPokemons() {
    for (let i = 1; i < 21; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let rawData = await fetch(url);
        let sortedData = await rawData.json();
        pokemons.push(sortedData);
    }
    console.log(pokemons);
    renderPokemons();
}


function renderPokemons() {
    for (let j = 0; j < pokemons.length; j++) {
        const pokemon = pokemons[j];
        let name = pokemon['name'];
        let formattedName = capitalizeFirstLetter(name);
        let id = pokemon['id'];
        let image = pokemon['sprites']['other']['home']['front_default'];
        let types = pokemon['types'];
        let pokemonList = document.getElementById('pokemon-list');
        pokemonList.innerHTML += pokemonTemplate(j, formattedName, id, image);
        renderBackground(j);
        renderType(j, types);
    }
}


function pokemonTemplate(j, formattedName, id, image) {
    return /*html*/`
        <div id="card${j}" class="card pokemon-card m-3 text-center border-3 rounded-4" style="width: 20rem;">
            <span class="fs-1 text-white">#${id}</span>
            <img src="${image}" class="card-img-top" onclick="showDetails(${j})">
            <div id="card-body${j}" class="card-body">
                <h5 class="card-title fs-1 text-white mt-5">${formattedName}</h5>
            </div>
        </div>
    `;
}


function renderBackground(j) {
    let card = document.getElementById(`card${j}`);
    let type = pokemons[j]['types']['0']['type']['name'];
    card.classList.add(`${type}-card`);
}


function renderType(j, types) {
    let cardBody = document.getElementById(`card-body${j}`);

    for (let t = 0; t < types.length; t++) {
        const type = types[t]['type']['name'];
        let formattedType = capitalizeFirstLetter(type);
        cardBody.innerHTML += /*html*/`
            <span id="${j}type${t}" class="card-text badge fs-6">${formattedType}</span>
        `;

        document.getElementById(`${j}type${t}`).classList.add(`${type}-badge`)
    }
}


function showDetails(j) {
    toggleVisibility('detailed-card', 'flex');
    
    let detailedCardBody = document.getElementById('detailed-card-background');
    let type = pokemons[j]['types']['0']['type']['name'];
    detailedCardBody.classList.add(`${type}-card`);

    let detailedPokemonId = document.getElementById('detailed-pokemon-id');
    let id = pokemons[j]['id'];
    detailedPokemonId.innerHTML = `#${id}`

    let detailedPokemonImage = document.getElementById('detailed-pokemon-image');
    let image = pokemons[j]['sprites']['other']['home']['front_default'];
    detailedPokemonImage.src = image;
    detailedPokemonImage.style.pointerEvents = 'none';
}


function hideDetails() {
    toggleVisibility('detailed-card', 'none');
    // fix bug where background-color doesn't reset
}


function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


function toggleVisibility(id, visibility) {
    document.getElementById(id).style.display = visibility;
}


function doNotClose(event) {
    event.stopPropagation();
}