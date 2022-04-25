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
]

document.write("<h1>Available Pokémons</h1>")
document.write("<ul>")
// iterate through pokemon list and print it with height info to index.html 
for ( i = 0; i<pokemonList.length; i++ ) {
    // add comment to pokemons taller than threshold
    let isBig = pokemonList[i].height > threshold ? " - Wow, that's big!" : "";
	document.write(
        `<li><b>${pokemonList[i].name}</b> (height: ${pokemonList[i].height}) ${isBig} </li>`
    );
}
document.write("</ul>")