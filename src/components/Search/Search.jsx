import useDebounce from "../../Hooks/useDebounce";
import "./Search.css";
function Search({ updateSearchTerm }) {
  const debouncedCallback = useDebounce((e) =>
    updateSearchTerm(e.target.value) , 500
  );
  return (
    <div className="search-wrapper">
      <input
        id="pokemon-name-search"
        type="text"
        placeholder="pokemon name..."
        onChange={(e) => debouncedCallback(e, "12345")}
      />
    </div>
  );
}
export default Search;
