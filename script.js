let pokemons = [];
let currentIndex = 0;
let startIndex = 1
let endIndex = 51
let loading = true;



async function getPokemons() {
    for (let i = startIndex; i < endIndex; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let rawData = await fetch(url);
        let sortedData = await rawData.json();
        pokemons.push(sortedData);
    }
    renderPokemons();
}


function renderPokemons() {
    let pokemonList = document.getElementById('pokemon-list');

    for (let j = startIndex - 1; j < endIndex - 1; j++) {
        const pokemon = pokemons[j];
        let name = pokemon['name'];
        let formattedName = capitalizeFirstLetter(name);
        let id = pokemon['id'];
        let image = pokemon['sprites']['other']['home']['front_default'];
        let types = pokemon['types'];

        pokemonList.innerHTML += pokemonTemplate(j, formattedName, id, image);
        renderBackground(j);
        renderType(j, types);
        checkSpinner();
    }
    loading = false;
    checkSpinner();
}


function pokemonTemplate(j, formattedName, id, image) {
    return /*html*/`
        <div id="card${j}" class="card pokemon-card m-3 text-center border-3 rounded-4" style="width: 18rem;">
            <span class="fs-1 text-white">#${id}</span>
            <div class="d-flex justify-content-center"><img src="${image}" class="card-img-top" onclick="showDetails(${j})"></div>
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
    currentIndex = j;
    toggleVisibility('detailed-card', 'flex');
    toggleVisibility('previous-button', 'flex');
    toggleVisibility('next-button', 'flex');
    renderDetailedBackground(j);
    renderDetailedId(j);
    renderDetailedImage(j)
    renderAbout(j);
    renderMoves(j);
    checkArrow(currentIndex);
    renderStats(currentIndex);
    document.getElementById('pokemon-list').classList.add('blur');
}


function hideDetails(currentIndex) {
    toggleVisibility('detailed-card', 'none');
    toggleVisibility('previous-button', 'none');
    toggleVisibility('next-button', 'none');

    let detailedCardBackground = document.getElementById('detailed-card-background');
    let type = pokemons[currentIndex]['types']['0']['type']['name'];

    detailedCardBackground.classList.remove(`${type}-card`);
    document.getElementById('pokemon-list').classList.remove('blur');

    resetChart();
}


function renderDetailedBackground(j) {
    let detailedCardBackground = document.getElementById('detailed-card-background');
    let type = pokemons[j]['types']['0']['type']['name'];
    detailedCardBackground.classList.add(`${type}-card`);
}


function renderDetailedId(j) {
    let detailedPokemonId = document.getElementById('detailed-pokemon-id');
    let id = pokemons[j]['id'];
    detailedPokemonId.innerHTML = `#${id}`
}


function renderDetailedImage(j) {
    let detailedPokemonImage = document.getElementById('detailed-pokemon-image');
    let image = pokemons[j]['sprites']['other']['home']['front_default'];
    detailedPokemonImage.src = image;
    detailedPokemonImage.style.pointerEvents = 'none';
}


function renderAbout(j) {
    renderName(j);
    renderTypes(j);
    renderGeneralInfo(j);
}


function renderTypes(j) {
    let types = pokemons[j]['types']
    let detailedTypes = document.getElementById('detailed-types');
    detailedTypes.innerHTML = ''

    for (let t = 0; t < types.length; t++) {
        const type = types[t]['type']['name'];
        let formattedType = capitalizeFirstLetter(type);
        detailedTypes.innerHTML += /*html*/`
            <span id="${j}detailed-type${t}" class="badge fs-5 text-white">${formattedType}</span>
        `;
        document.getElementById(`${j}detailed-type${t}`).classList.add(`${type}-badge`);
    }
}


function renderGeneralInfo(j) {
    let generalInfo = document.getElementById('general-info');
    let height = pokemons[j]['height'];
    let weight = pokemons[j]['weight'];
    let formattedHeight = formatNumber(`${height}`);
    let formattedWeight = formatNumber(`${weight}`);

    generalInfo.innerHTML = /*html*/`
        <h5>height: ${formattedHeight}m</h5>
        <h5>weight: ${formattedWeight}kg</h5>
    `;
}


function renderName(j) {
    let name = document.getElementById('name');
    let pokemonName = pokemons[j]['name']
    let formattedPokemonName = capitalizeFirstLetter(pokemonName);

    name.innerHTML = /*html*/`
        <h5 class="fs-1 text-center">${formattedPokemonName}</h5>
    `;
}


function renderMoves(j) {
    let movesList = document.getElementById('moves');
    movesList.innerHTML = '';
    let moves = pokemons[j]['moves']
    for (let m = 0; m < moves.length; m++) {
        const move = moves[m]['move']['name'];
        let formattedMove = capitalizeFirstLetter(move);
        movesList.innerHTML += /*html*/`
            <li class="list-group-item">${formattedMove}</li>
        `;
    }
}


function previousImage(currentIndex) {
    resetChart();
    currentIndex--;
    showDetails(currentIndex);
    toggleVisibility('stats', 'none');
}


function nextImage(currentIndex) {
    resetChart();
    currentIndex++;
    showDetails(currentIndex);
    toggleVisibility('stats', 'none');
}


function checkArrow(currentIndex) {
    if (currentIndex == 0) {
        toggleVisibility('previous-button', 'none');
    } else {
        toggleVisibility('previous-button', 'flex');
    }

    if (currentIndex == pokemons.length - 1) {
        toggleVisibility('next-button', 'none');
    } else {
        toggleVisibility('next-button', 'flex');
    }
}


function filterPokemons() {
    let input = document.getElementById('search-bar').value;
    input = input.toLowerCase();
    console.log(input);

    let pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = '';

    for (let j = 0; j < pokemons.length; j++) {
        const pokemon = pokemons[j];
        let name = pokemon['name'];
        let formattedName = capitalizeFirstLetter(name);
        let id = pokemon['id'];
        let image = pokemon['sprites']['other']['home']['front_default'];
        let types = pokemon['types'];
        if (name.toLowerCase().includes(input)) {
            pokemonList.innerHTML += pokemonTemplate(j, formattedName, id, image);
            renderBackground(j);
            renderType(j, types);
        }
    }
}


function showMorePokemons() {
    startIndex = startIndex + 50
    endIndex = endIndex + 50
    loading = true;
    toggleVisibility('more-content', 'none');
    checkSpinner();
    getPokemons();
}


function checkSpinner() {
    if (loading == false) {
        toggleVisibility('loader-container', 'none');
        toggleVisibility('more-content', 'block');
    } else {
        toggleVisibility('loader-container', 'flex');
    }
}


function formatNumber(number) {
    if (number >= 10) {
        number = number.slice(0, -1);
    } else {
        number = '0,' + number;
    }
    return number;
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