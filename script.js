let pokemons = [];


async function getPokemons() {
    for (let i = 1; i < 11; i++) {
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
        let id = pokemon['id']
        let image = pokemon['sprites']['other']['home']['front_default'];
        pokemonTemplate(j, name, id, image);
    }
}


function pokemonTemplate(j, name, id, image) {
    let pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML += /*html*/`
        <div id="card${j}" class="card m-3 text-center" style="width: 18rem;">
            <span class="fs-1">${id}</span>
            <img src="${image}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title fs-1">${name}</h5>
                <span class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</span>
            </div>
        </div>
    `;
    function addClass ();
}


function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


function addClass() {
    
}