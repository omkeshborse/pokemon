import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    weight: "",
    height: "",
    types: [],
  });
  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(response.data);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }
  useEffect(() => {
    downloadPokemon();
  }, []);
  const { name, image, weight, height, types } = pokemon;
  return (
    <div className="pokemon-details-wrapper">
      <img className="pokemon-details-image" src={image} alt={name} />
      <div className="pokemon-details-name">
        <span>{name}</span>
      </div>
      <div className="pokemon-details-height">Height : {height}</div>
      <div className="pokemon-details-weight">Weight :{weight}</div>
      <div className="pokemon-details-types">
        {types.map((p) => {
          return <div key={p}>{p}</div>;
        })}
      </div>
    </div>
  );
}
export default PokemonDetails;
