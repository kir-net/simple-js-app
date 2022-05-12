// pokemon repository
const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    if (isPokemon(pokemon)) {
      pokemonList.push(pokemon);
    }
  }

  // return pokemon by name
  function getByName(searchName) {
    const result = pokemonList.filter((pokemon) => pokemon.name === searchName);
    if (result.length === 0) {
      console.error(`Error: "${searchName}" is not in the List.`);
    }
    return result;
  }

  // GET the pokemon details using the URL
  function loadDetails(pokemon) {
    // start by clearing the modal to prevent previous image from re-appearing
    $(".modal-body").html("");
    const url = pokemon.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        // Now we add the details to the pokemon
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
      })
      .catch((e) => console.error(e));
  }

  // extract pokemons types
  function extractTypes(types) {
    const typesList = [];
    types.forEach((item) => {
      typesList.push(item.type.name);
    });
    return typesList.join(", ");
  }

  // hide modal
  function hideModal() {
    $("#modalContainer").removeClass("is-visible");
  }

  // show modal
  function showModal(pokemon) {
    $(".modal-close").on("click", () => {
      hideModal();
    });
    $(".modal-title").text(pokemon.name);

    $(".modal-body")
      .html("")
      .append(
        $("<div>")
          // append image
          .append(
            $("<img>")
              .attr("src", pokemon.imageUrl)
              .attr("alt", "Image of selected pokemon")
              .addClass("modal-image", "img-fluid")
          )
          // append table
          .append(
            $("<table>")
              // first row
              .append(
                $("<tr>")
                  .append($("<td>").addClass("emphasize").text("Height:"))
                  .append($("<td>").text(pokemon.height))
              )
              // second row
              .append(
                $("<tr>")
                  .append($("<td>").addClass("emphasize").text("Types:"))
                  .append($("<td>").text(extractTypes(pokemon.types)))
              )
          )
      ).delay(100).hide().fadeIn(150);
    $("#modalContainer").addClass("is-visible");
  }

  // show details when clicking a pokemon button
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon);
    });
  }

  // create list of pokemon buttons with names and images, and print on page
  function addListItem(pokemon) {
    $("#pokemon-list").append(
      $("<li>")
        .addClass("col list-group-item")
        .append(
          $("<button>")
            .text(pokemon.name)
            .addClass("list-item  btn  btn-primary")
            .attr("data-toggle", "modal")
            .attr("data-target", "#modalContainer")
            .on("click", () => {
              showDetails(pokemon);
            })
        )
    );
  }

  // fetch Pokemons from pokeapi
  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => console.error(e));
  }

  // return contained functions
  return {
    getAll,
    add,
    getByName,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
    extractTypes,
  };
})();

// print pokemons on screen
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
