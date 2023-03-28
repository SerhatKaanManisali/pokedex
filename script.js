async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/pikachu'
    let response = await fetch(url);
    let responseAsJson = await response.json();
}