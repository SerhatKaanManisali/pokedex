async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/1`
    let response = await fetch(url);
    pokemonList = await response.json();
    console.log(pokemonList);
    renderPokemonList();
}


function renderPokemonList() {
    document.getElementById('pokemon-list').innerHTML += pokemonTemplate();
}


function pokemonTemplate() {
    return /*html*/`
        
    `;
}