import { useState, useEffect } from "react";
import axios from "axios";
import DisplayAllPokemons from "../components/DisplayAllPokemons";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

function Home() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllPokemons() {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1200"
        );
        setAllPokemons(res.data.results);
      } catch (error) {
        console.error("Error fetching all Pokémon:", error);
      }
    }
    fetchAllPokemons();
  }, []);

  const fetchPokemon = async (pokemon_name) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon_name.toLowerCase()}`
      );
      setPokemon(response.data);
      navigate(`/${response.data.name}`);
      setIsFocused(false);
      setSearchValue("");
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setPokemon(null);
    }
  };

  const filteredPokemons = allPokemons.filter((p) =>
    p.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar Container */}
      <div className="relative max-w-md mx-auto">
        <SearchBar
          onSearch={fetchPokemon}
          searchValue={searchValue}
          onInputChange={setSearchValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        />

        {/* Dropdown */}
        {isFocused && searchValue.trim() !== "" && filteredPokemons.length > 0 && (
          <div
            className="
              absolute top-full left-0 w-full 
              bg-white border border-gray-300 rounded-b-lg shadow-lg 
              max-h-40 overflow-y-scroll 
              z-50
              transition-all duration-200 ease-out 
              transform opacity-100 scale-y-100 origin-top
            "
          >
            {filteredPokemons.map((pokemon) => (
              <div
                key={pokemon.name}
                onClick={() => fetchPokemon(pokemon.name)}
                className="cursor-pointer hover:bg-gray-200 p-2"
              >
                {pokemon.name}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <DisplayAllPokemons />
      </div>
    </div>
  );
}

export default Home;
