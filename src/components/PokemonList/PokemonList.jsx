import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokedex_url, setPokedex_url] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  async function downloadPokemon() {
    // download list of 20 pokemon
    setIsLoading(true);
    const response = await axios.get(pokedex_url);
    // console.log(response.data);
    // console.log(response.data.results);
    // get the array of pokemon form response(name ,url )
    const pokemonResult = response.data.results;
    console.log("pokemonResult", response.data.next, response.data.previous);
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
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
    console.log(pokeListResult);
    setPokemonList(pokeListResult);
    setIsLoading(false);
  }
  useEffect(() => {
    downloadPokemon();
  }, [pokedex_url]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {isLoading ? (
          <section className="spinner">
            <span className="loader"></span>
          </section>
        ) : (
          <>
            {pokemonList.map((p) => {
              console.log(p);
              return <Pokemon key={p.id} name={p.name} image={p.image} id={p.id} />;
            })}
          </>
        )}
      </div>
      <div className="controls">
        <button
          disabled={prevUrl === null}
          onClick={() => {
            setPokedex_url(prevUrl);
          }}
        >
          Prev
        </button>
        <button
          disabled={nextUrl === null}
          onClick={() => {
            setPokedex_url(nextUrl);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default PokemonList;
