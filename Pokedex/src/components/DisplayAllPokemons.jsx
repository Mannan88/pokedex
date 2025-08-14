import { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "./PokeCard";
import Pagination from "./Pagination";

function DisplayAllPokemons() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20; 
  const totalPokemons = 1302; 
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * pokemonsPerPage;
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`
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
  }, [currentPage]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Pokémons</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ol className="grid gap-4 grid-cols-3">
            {pokemon.map((each_pokemon) => (
              <li key={each_pokemon.id}>
                <PokeCard pokemon={each_pokemon} />
              </li>
            ))}
          </ol>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}

export default DisplayAllPokemons;
