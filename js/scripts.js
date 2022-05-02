// pokemon repository 
let pokemonRepository = (function() {
   
    let pokemonList = [];   
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    // test if pokemon object to be added is valid
    function isPokemon(pokemon) {
        result = true;
        if (typeof pokemon !== 'object') {
            console.error(`Error: Only objects can be added.`);
            result = false;
        }
        if ( (result === true) && (typeof pokemon.name !== "string") ) {        
            console.error("Error: The new Pokemon's name must be a string.");
            result = false;
        } 
        return result;
    }

    // fetches Pokemons from pokeapi
    function loadList() {
        return fetch(apiUrl)
        .then(response => response.json())   
        .then(function(json){       
            json.results.forEach(function (item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        })
        .catch( e => console.error(e))
    }

    // GET the pokemon details using the URL
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
        .then(response => response.json()) 
        .then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        })
        .catch(e => console.error(e))
      }

    // show details when clicking a pokemon button
    function showDetails(pokemon) {
        loadDetails(pokemon)
        .then(function () {
            console.log(pokemon);
        });
    }

    // return pokemonList
    function getAll() {
        return pokemonList;
    }

    // add pokemon object to list
    function add(pokemon) {
        if (isPokemon(pokemon)){
            pokemonList.push(pokemon);
            //console.log(`${pokemon.name} was added successfully.`)
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
            showDetails(pokemon);
        });   
    }

    // return contained functions
    return {
        getAll: getAll,
        add: add,
        getByName: getByName,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    }  

})();




// print pokemons on screen
pokemonRepository.loadList()
.then(function(){
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
