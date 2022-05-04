const pokemon = document.querySelector("#pokemon");
const spinner = document.querySelector(".spinner");
const pokemonDetails = document.querySelector("#pokemon-details");
const ul = document.querySelector("ul");
const main = document.querySelector("main");
function addChosenPokemon(pokemon1) {
    const div = document.createElement("div");
    div.innerHTML = `
    <figure>
    <img src="${pokemon1.sprites.front_default}" alt="${pokemon1.name}"/>
    <figcaption><a href="pokemon.html?pokemon=${pokemon1.name}">${pokemon1.name}</a></figcaption>
    </figure>
    `;
    pokemonDetails.append(div);
}
function addAbilities(pokemon2) {
    const li = document.createElement("li");
    li.innerHTML = `
    <span class="ability-name">${pokemon2.name}</span>
    <br>
    <span class="ability-short-description">${pokemon2.effect_entries[1].short_effect}</span>
    `;
    ul.append(li);
}
const backButton = document.createElement("table");
backButton.classList.add("back-button");
backButton.innerHTML = `<a href="index.html">Back to List</a>`;
main.append(backButton);
const url = new URL(window.location);
console.log(url);
const queryString = new URLSearchParams(url.search);
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`).then((response)=>{
    return response.json();
}).then((parsedResponse1)=>{
    addChosenPokemon(parsedResponse1);
    return Promise.all(parsedResponse1.abilities.map((parsedResponse)=>parsedResponse.ability.url
    ).map((url1)=>{
        return fetch(url1).then((response)=>response.json()
        );
    }));
}).then((parsedResponse2)=>{
    spinner.classList.add("hidden");
    return parsedResponse2.map((parsedResponse)=>{
        return addAbilities(parsedResponse);
    });
});

//# sourceMappingURL=pokemon.dd3c7f85.js.map
