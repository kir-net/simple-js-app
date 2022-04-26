// set variables
let threshold = 12;

// pokemon objects
let pokemonList = [
    {
        name: "Chamelake",
        height: 3,
        types: ['bushes','walls','solid']
    },
    {
        name: "Birdagon",
        height: 8,
        types: ['sky','gaseous']
    },
    {
        name: "Kittiger",
        height: 18,
        types: ['trees','caves','solid']     
    },
    {
        name: "Turtog",
        height: 2,
        types: ['lakes','boats','liquid']
    }
];

document.write("<h1>Available Pokémons</h1>");
document.write("<ul>");
// iterate through pokemon list and print it with height info to index.html 
pokemonList.forEach( function(pokemon) {
    let isBig = pokemon.height > threshold ? "- Wow, that's big!" : "";
    // add comment to pokemons taller than threshold
	document.write(
        `<li><b>${pokemon.name}</b><br> &nbsp&nbsp(height: ${pokemon.height}) ${isBig} </li>`
    );    
});
document.write("</ul>");