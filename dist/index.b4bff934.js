const api = "https://pokeapi.co/api/v2/pokemon/?limit=50&offset=251";
const spinner = document.querySelector(".spinner");
const pokemonListing = document.querySelector("#pokemon-listing");
function addPokemon(pokemon) {
    const div = document.createElement("div");
    div.innerHTML = `
    <figure>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
    <figcaption><a href="pokemon.html?pokemon=${pokemon.name}">${pokemon.name}</a></figcaption>
    </figure>
    `;
    pokemonListing.append(div);
}
fetch(api).then((response)=>{
    console.log(response);
    return response.json();
}).then((parsedResponse)=>{
    const urls = parsedResponse.results.map((result)=>result.url
    );
    return Promise.all(urls.map((url)=>fetch(url).then((response)=>response.json()
        )
    ));
}).then((responses)=>{
    spinner.classList.add("hidden");
    responses.forEach((response)=>{
        addPokemon(response);
    });
});

//# sourceMappingURL=index.b4bff934.js.map