import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
// import usePokemonList from "../../Hooks/usePokemonList.js";
import usePokemonDetails from "../../Hooks/usePokemonDetails.js";
function PokemonDetails({ pokemonName }) {
  const { id } = useParams();
  const [pokemon] = usePokemonDetails(id, pokemonName);
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
      {pokemon.types && pokemon.similarPokemon && (
        <div className="similar-pokemon-wrapper">
          more {pokemon.types[0]} types of pokemon
          <ul>
            {pokemon.similarPokemon.map((p) => {
              // console.log(p);
              return <li key={p.pokemon.name}>{p.pokemon.name}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
export default PokemonDetails;

/* 

 const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    weight: "",
    height: "",
    types: [],
  });

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log("response.data.types", response.data.types[0].type.name);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }
  const [pokemonListState] = usePokemonList(
    `https://pokeapi.co/api/v2/type/fire`,
    true
  );
  useEffect(() => {
    downloadPokemon();
    // console.log("pokemonListState==>", pokemonListState);
  }, []);

*/
