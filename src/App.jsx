import { Link } from "react-router-dom";
import "./App.css";
import CustomRoutes from "./Routes/CustomRoutes";
import Pokedex from "./components/Pokedex/Pokedex";
function App() {
  return (
    <div className="outer-pokedex-wrapper">
      {/* <Pokedex /> */}
      <Link to={"/"}>
        <h1 className="pokedex-heading">Pokedex</h1>
      </Link>
      <CustomRoutes />
    </div>
  );
}
export default App;
