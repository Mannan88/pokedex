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

  function StatBox({ label, value, color }) {
    return (
      <div className={`${color} p-3 rounded-lg border-2 border-gray-400`}>
        <p className="text-xs font-bold text-gray-600 uppercase">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    );
  }

  // Helper function for type colors
  function getTypeColor(type) {
    const colors = {
      normal: 'bg-gray-400 text-white',
      fire: 'bg-red-500 text-white',
      water: 'bg-blue-500 text-white',
      electric: 'bg-yellow-400 text-gray-800',
      grass: 'bg-green-500 text-white',
      ice: 'bg-blue-200 text-gray-800',
      fighting: 'bg-red-700 text-white',
      poison: 'bg-purple-600 text-white',
      ground: 'bg-yellow-600 text-white',
      flying: 'bg-indigo-300 text-gray-800',
      psychic: 'bg-pink-500 text-white',
      bug: 'bg-green-400 text-white',
      rock: 'bg-yellow-700 text-white',
      ghost: 'bg-purple-800 text-white',
      dragon: 'bg-indigo-700 text-white',
      dark: 'bg-gray-800 text-white',
      steel: 'bg-gray-500 text-white',
      fairy: 'bg-pink-300 text-gray-800'
    };
    return colors[type] || 'bg-gray-300 text-gray-800';
  }

  if (loading) return <div className="relative h-150 w-full">
    <div className="absolute top-1/2 left-1/2 loader-div" ></div>   {/* loader-div class is defined in index.css */}
  </div>
  if (!pokemonData) return <p className="text-center mt-10 text-red-600">Pokémon not found</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 font-mono">
      {/* Pokédex Machine Body */}
      <div className="bg-red-700 shadow-lg rounded-md p-6 border-6 border-gray-800 relative overflow-hidden">

        {/* Pokédex Screen Bezel */}
        <div className="bg-gray-800 rounded-md p-4 border-4 border-gray-600 ">
          {/* Screen Content */}
          <div className="bg-gradient-to-b from-gray-100 to-gray-400 rounded-sm p-6 border-2 border-gray-500">

            {/* Header with LED indicator */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-600 mr-2 animate-pulse"></div>
                <h1 className="text-4xl font-bold text-gray-800 uppercase tracking-wider">
                  {pokemonData.name} 
                </h1>
              </div>
              <div className="text-sm bg-gray-800 text-white px-2 py-1 rounded">
                POKÉDEX ENTRY  #{pokemonData.id.toString().padStart(4, '0')}
              </div>
            </div>

            {/* Main pokemon info Grid */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image */}
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="bg-white border-4 border-gray-800 rounded-lg p-4 w-full h-64 flex items-center justify-center">
                  <img
                    className="h-56 object-contain"
                    src={pokemonData.sprites.other['official-artwork'].front_default}
                    alt={pokemonData.name}
                  />
                </div>
                <div className="mt-4 w-full bg-gray-200 p-2 rounded-lg border-2 border-gray-400 text-center">
                  <p className="font-bold text-gray-800">TYPE</p>
                  <div className="flex justify-center gap-2 mt-1">
                    {pokemonData.types.map((type, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${getTypeColor(type.type.name)}`}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel - Stats */}
              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-2 gap-4">
                  <StatBox label="HP" value={pokemonData.stats[0].base_stat} color="bg-green-100" />
                  <StatBox label="Attack" value={pokemonData.stats[1].base_stat} color="bg-red-100" />
                  <StatBox label="Defense" value={pokemonData.stats[2].base_stat} color="bg-blue-100" />
                  <StatBox label="Sp. Atk" value={pokemonData.stats[3].base_stat} color="bg-purple-100" />
                  <StatBox label="Sp. Def" value={pokemonData.stats[4].base_stat} color="bg-yellow-100" />
                  <StatBox label="Speed" value={pokemonData.stats[5].base_stat} color="bg-pink-100" />
                  <StatBox label="Height" value={`${pokemonData.height / 10}m`} color="bg-gray-100" />
                  <StatBox label="Weight" value={`${pokemonData.weight / 10}kg`} color="bg-gray-100" />
                </div>

                <div className="mt-6 bg-gray-200 p-3 rounded-lg border-2 border-gray-400">
                  <p className="font-bold text-gray-800 mb-1">ABILITIES</p>
                  <div className="flex flex-wrap gap-2">
                    {pokemonData.abilities.map((ability, index) => (
                      <span key={index} className="bg-gray-300 px-2 py-1 rounded text-sm">
                        {ability.ability.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <a href="/" className="bg-red-500 hover:bg-red-700 text-md text-white font-semibold py-3 px-8 rounded-full border-2 border-gray-800 shadow-lg transition-all duration-200 hover:scale-105 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                EXPLORE OTHER POKÉMON
              </a>
            </div>
          </div>
        </div>

        {/* Pokédex buttons */}
        <div className="flex justify-between mt-6 px-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 border-1 border-blue-900"></div>
            <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-yellow-900"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-gray-900"></div>
            <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-gray-900"></div>
            <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default PokemonInfo;
