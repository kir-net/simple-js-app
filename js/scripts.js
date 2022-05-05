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
        
        let pokemonList  = document.querySelector(".pokemon-list");  
        let listItem     = document.createElement("li");
        let button       = document.createElement("button");    
        
        button.innerText = pokemon.name;
        button.classList.add("list-item"); 
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });   
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
            showModal(`${pokemon.name}`, 
              `Height: ${pokemon.height}`,  
              extractedTypes = extractTypes(pokemon.types), 
              pokemon.imageUrl
            );
        });
    }

    let modalContainer = document.querySelector("#modal-container");
    function showModal(title, text, array, url) {
      modalContainer.innerHTML = "";
      let modal = document.createElement("div");
      modal.classList.add("modal");
  
      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "Close";
      closeButtonElement.addEventListener("click", hideModal);
  
      let titleElement = document.createElement("h1");
      titleElement.innerText = title;

      let imageDiv = document.createElement("div");
      let imageElement = document.createElement("img");
      imageElement.classList.add("modal-image");
      imageElement.src = url;
      imageDiv.appendChild(imageElement);
  
      let contentElement = document.createElement("p");
      contentElement.innerText = `${text} \n\n Types:\n ${array}`;
      
  
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imageDiv);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);  
  
      modalContainer.classList.add("is-visible");
    }
  
    function hideModal() {
      modalContainer.classList.remove("is-visible");
    }
  
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
        hideModal();  
      }
    });

    modalContainer.addEventListener("click", (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  
    document.querySelector("#show-modal").addEventListener("click", () => {
      showModal("Modal title", "This is the modal content!");
    });
  
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
