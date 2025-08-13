import { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "./PokeCard";

function DisplayAllPokemons() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const result = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=200"
        );

         const details = await Promise.all(
          result.data.results.map(async (p) => {
            const res = await axios.get(p.url);
            return res.data;
          })
        );

        setPokemon(details);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setPokemon([]);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  return (
    <div>
      <h1>All Pokémons</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ol className="grid  gap-4 grid-cols-3 row-auto">
          {pokemon.map((each_pokemon) => (
            <li key={each_pokemon.id}>
              <PokeCard pokemon={each_pokemon} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default DisplayAllPokemons;
