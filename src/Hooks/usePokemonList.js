import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: "",
    isLoading: true,
    pokedex_url: "https://pokeapi.co/api/v2/pokemon/",
    nextUrl: "",
    prevUrl: "",
  });
  async function downloadPokemon() {
    // download list of 20 pokemon
    // setIsLoading(true);
    setPokemonListState({ ...pokemonListState, isLoading: true });
    const response = await axios.get(pokemonListState.pokedex_url);
    // console.log("TypeList", response.data.pokemon.slice(0, 5));
    // console.log(response.data.results);
    // get the array of pokemon form response(name ,url )
    // const pokemonResult = response.data.results;
    // console.log("pokemonResult", response.data.next, response.data.previous);
    // setNextUrl(response.data.next);
    // setPrevUrl(response.data.previous);

    setPokemonListState((state) => ({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));

    //iterating over the array of pokemon and using their url to create an array of promise

    //that will fetch those 20 pokemon

    const pokemonResultPromise = response.data.results.map((pokemon) =>
      axios.get(pokemon.url)
    );

    // passing that array to axios.all it give result  if all promise get resolve the it show data
    // console.log(pokemonResultPromise);
    const pokemonData = await axios.all(pokemonResultPromise); // array 20 pokemon data
    // console.log("pokemonData :", pokemonData);

    // now iterate 20 pokemon data of each pokemon and extract id,name,image , types
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;

      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        types: pokemon.types,
      };
    });
    // console.log(pokeListResult);
    // setPokemonList(pokeListResult);
    // setIsLoading(false);

    setPokemonListState((state) => ({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokemonListState.pokedex_url]);
  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
