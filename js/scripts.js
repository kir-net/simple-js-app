// set variables
let threshold = 12;   // threshold for printing comment on pokemons height

// pokemon repository 
let pokemonRepository = (function() {

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

    // function returns pokemonList
    function getAll() {
        return pokemonList;
    }

    // function adds pokemon object to list
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    
    return {
        getAll: getAll,
        add: add
    }  

})();

// get pokemonList from pokemonRepository
pokemonList = pokemonRepository.getAll();

// print page title
document.write("<h1>Available Pokémons</h1>");

//initiate list for printing pokemon items
document.write("<ul>");

// iterate through pokemon list and print it with height info to index.html 
pokemonList.forEach( function(pokemon) {
    let isBig = pokemon.height > threshold ? "- Wow, that's big!" : "";
    // add comment to pokemons taller than threshold
	document.write(
        `<li><b>${pokemon.name}</b><br> &nbsp&nbsp(height: ${pokemon.height}) ${isBig} </li>`
    );    
});
// close list tag
document.write("</ul>");