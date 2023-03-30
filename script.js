let currentPokemon

async function requestPokemon() {
    for (let i = 1; i < 13; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`
        let response = await fetch(url);
        currentPokemon = await response.json();
        renderPokemon(i);  

        console.log(currentPokemon)
    }
}


function renderPokemon(i) {
    let pokemonImage = currentPokemon['sprites']['other']['home']['front_default'];
    let rawPokemonName = currentPokemon['name'];
    let formattedPokemonName = capitalizeFirstLetter(rawPokemonName);
    pokemonCardTemplate(formattedPokemonName, i);
    document.getElementById(`pokemon-image${i}`).src = pokemonImage;
    renderTypeBadge(i);
}


function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


function pokemonCardTemplate(formattedPokemonName, i) {
    return document.getElementById('pokemon-list').innerHTML += /*html*/`
    <div class="card m-3" style="width: 18rem;">
        <img id="pokemon-image${i}" src="" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title text-center">${formattedPokemonName}</h5>
            <span id="type-badge${i}" class="badge bg-gradient"></span>
        </div>
    </div>
    `;
}


function renderTypeBadge(i) {
    let typeName = currentPokemon['types']['0']['type']['name'];
    let formattedTypeName = capitalizeFirstLetter(typeName);
    let typeBadge = document.getElementById(`type-badge${i}`);

    typeBadge.classList.add(`${typeName}-badge`);
    typeBadge.innerHTML = formattedTypeName;

    // TO DO: Show multiple types
}