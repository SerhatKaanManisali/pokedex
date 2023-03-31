let currentPokemon

async function requestPokemon() {
    for (let i = 1; i < 50; i++) {
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
    renderCardBackground(i);
}


function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


function pokemonCardTemplate(formattedPokemonName, i) {
    return document.getElementById('pokemon-list').innerHTML += /*html*/`
    <div id="card-background${i}" class="card m-3" style="width: 18rem;">
        <img id="pokemon-image${i}" src="" class="card-img-top">
        <div id="card-body${i}" class="card-body">
            <h5 class="card-title text-center">${formattedPokemonName}</h5>
        </div>
    </div>
    `;
}


function renderTypeBadge(i) {
    let typeList = currentPokemon['types'];
    let cardBody = document.getElementById(`card-body${i}`);
    
    for (let t = 0; t < typeList.length; t++) {
        const type = typeList[t]['type']['name'];
        let formattedType = capitalizeFirstLetter(type);

        cardBody.innerHTML += /*html*/`
            <span id="${t}types${i}" class="badge">${formattedType}</span>
        `;
        
        document.getElementById(`${t}types${i}`).classList.add(`${type}-badge`);
    }
}


function renderCardBackground(i) {
    let cardBackground = document.getElementById(`card-background${i}`);
    let type = currentPokemon['types']['0']['type']['name']
    cardBackground.classList.add(`${type}-card`)
}