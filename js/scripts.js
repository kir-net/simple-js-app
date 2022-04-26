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

    // return pokemonList
    function getAll() {
        return pokemonList;
    }

    // add pokemon object to list
    function add(pokemon) {
        Object.keys(pokemon).forEach(function(key) {
            if (! Object.keys(pokemonList[0]).includes(key)) {
                console.error(`Error: The key "${key}" is not suitable.`);
            }
        });
        if (typeof pokemon.name !== "string") {
            console.error("Error: The new Pokemon's name must be a string.");
        } else {
            pokemonList.push(pokemon);
            console.log(`${pokemon.name} was added successfully.`)
        }     
    }
    
    // return pokemon by name
    function getByName(searchName) {
        result = pokemonList.filter(pokemon => pokemon.name === searchName);
        if (result.length == 0) {
            console.error(`Error: "${searchName}" is not in the List.`);
        } else {
            return result;
        }
    }  

    return {
        getAll: getAll,
        add: add,
        getByName: getByName
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