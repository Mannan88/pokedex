import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PokemonInfo() {
  const { pokename } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokename}`
        );
        setPokemonData(result.data);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setPokemonData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [pokename]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!pokemonData) return <p className="text-center mt-10 text-red-600">Pokémon not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 font-mono">
      <div className="bg-white shadow-xl rounded-lg p-6 text-center">
        <div className="text-center relative">
          <a className="absolute top-1 left-1 text-5 hover:font-bold group flex items-center gap-1"
            href="/">
            <span className="transition-all duration-300 ease-in-out group-hover:-translate-x-1">
              ⬅️
            </span>
            explore other pokemons
          </a>
          <h1 className="text-4xl font-bold capitalize text-gray-800 mb-6">
            {pokemonData.name}
          </h1>
        </div>

        <img
          className="w-64 mx-auto mb-6"
          src={pokemonData.sprites.other['official-artwork'].front_default}
          alt={pokemonData.name}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-lg text-gray-700">
          <p><span className="font-semibold">Type:</span> {pokemonData.types.map(type => type.type.name).join(', ')}</p>
          <p><span className="font-semibold">HP:</span> {pokemonData.stats[0].base_stat}</p>
          <p><span className="font-semibold">Attack:</span> {pokemonData.stats[1].base_stat}</p>
          <p><span className="font-semibold">Defense:</span> {pokemonData.stats[2].base_stat}</p>
          <p><span className="font-semibold">Sp. Attack:</span> {pokemonData.stats[3].base_stat}</p>
          <p><span className="font-semibold">Sp. Defense:</span> {pokemonData.stats[4].base_stat}</p>
          <p><span className="font-semibold">Height:</span> {pokemonData.height}</p>
          <p><span className="font-semibold">Weight:</span> {pokemonData.weight / 10} kg</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfo;
