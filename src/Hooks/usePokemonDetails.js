import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonDetails(id, pokemonName) {
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    weight: "",
    height: "",
    types: [],
    similarPokemon: [],
  });
  async function downloadPokemon() {
    try {
      let response;
      if (pokemonName) {
        response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
      } else {
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      }
      const pokemonOdSameType = await axios.get(
        `https://pokeapi.co/api/v2/type/${response.data.types[0].type.name}`
      );
      // console.log("pokemonOdSameType", pokemonOdSameType.data.pokemon);
      // console.log("response.data.types", response.data.types[0].type.name);
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
        similarPokemon: pokemonOdSameType.data.pokemon,
      });
      setPokemonListState({
        ...pokemonListState,
        type: response.data.types[0].type.name,
      });
    } catch (error) {
      console.log("Some thing went wrong", error);
    }
  }

  useEffect(() => {
    downloadPokemon();

    // console.log("pokemonListState==>", pokemonListState);
  }, []);

  return [pokemon];
}

export default usePokemonDetails;
