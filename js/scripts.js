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
        if (typeof pokemon !== 'object') {
            console.error(`Error: Only objects can be added.`);
        }
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

    // create list of pokemon buttons and print on page
    function addListItem(pokemon) {
        let pokemonList  = document.querySelector('.pokemon-list');  
        let listItem     = document.createElement('li');
        let button       = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('list-item'); 
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function () {
            console.log(pokemon.name);
        });   
    }

    // return contained functions
    return {
        getAll: getAll,
        add: add,
        getByName: getByName,
        addListItem: addListItem
    }  

})();

// get pokemonList from pokemonRepository
pokemonList = pokemonRepository.getAll();

// print pokemon list on screen
pokemonList.forEach( function(pokemon) {
    pokemonRepository.addListItem(pokemon);   
});
