// pokemon repository 
let pokemonRepository = (function() {
   
    let pokemonList = [];   
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    // test if pokemon object to be added is valid
    function isPokemon(pokemon) {
        if (typeof pokemon !== "object") {
            console.error(`Error: Only objects can be added.`);
            return false;
        }
        if (typeof pokemon.name !== "string") {        
            console.error("Error: The new Pokemon's name must be a string.");
            return false;
        } 
        return true;
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
    
    // create list of pokemon buttons with names and images, and print on page
    function addListItem(pokemon) {

      $('#pokemon-list').append(
        $('<li>')
          .addClass('col list-group-item')
          .append(
            $('<button>')
            .text(pokemon.name)
            .addClass('list-item  btn  btn-primary')
            .attr('data-toggle', 'modal')
            .attr('data-target', '#modalContainer')
            .on("click", function(){
              showDetails(pokemon)
            })
          )
      )
    }

    // fetch Pokemons from pokeapi
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
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
        .then(response => response.json()) 
        .then(function (details) { 
          
          // Now we add the details to the pokemon
          pokemon.imageUrl = details.sprites.front_default;         
          pokemon.height = details.height;
          pokemon.types = details.types;
        })
        .catch(e => console.error(e))
      }

    // extract pokemons types
    function extractTypes(types) {
      typesList = [];
      types.forEach(function(item){
        typesList.push(item.type.name);
      });
      return typesList.join(", ");
    }

    // show details when clicking a pokemon button
    function showDetails(pokemon) {
        loadDetails(pokemon)
        .then(function () {
          showModal(pokemon)
        });
    }
 
    // show modal
    function showModal(pokemon) {
      
      $('.modal-close').on('click', function(){
        hideModal();
      });
      $('.modal-title').text(pokemon.name);

      $('.modal-body').html("").append(
        $('<div>')
        // append image
        .append(
          $('<img>')
            .attr('src', pokemon.imageUrl)
            .attr('alt', 'Image of selected pokemon')
            .addClass('modal-image', 'img-fluid')
        )          
        // append table
        .append(
          $('<table>')
            // first row
            .append($('<tr>')
              .append($('<td>')
                .addClass('emphasize')
                .text('Height:')
              )
              .append($('<td>')
                .text(pokemon.height)
              )
            )
            // second row
            .append($('<tr>')
              .append($('<td>')
                .addClass('emphasize')
                .text('Types:')
              )             
              .append($('<td>')
                .text(extractTypes(pokemon.types))
              )
            )
        )      
      )
      $('#modalContainer').addClass('is-visible');
    }
    
    // hide modal
    function hideModal() {
      $('#modalContainer').removeClass('is-visible');
    }

    // return contained functions
    return {
        getAll: getAll,
        add: add,
        getByName: getByName,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        extractTypes: extractTypes
    }  
})();


// print pokemons on screen
pokemonRepository.loadList()
.then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
  
});
