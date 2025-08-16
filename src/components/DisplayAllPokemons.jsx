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
    <div className="p-6">
  <h1 className="text-4xl font-extrabold mb-8 text-gray-800 border-b-2 border-red-500 pb-2 inline-block">
    Pokédex
  </h1>

  {loading ? (
    <div className="relative h-100 w-full">
      <div className="absolute top-1/2 left-1/2 loader-div"></div>
    </div>
  ) : (
    <>
      <div className="mb-8">
        <ol className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
          {pokemon.map((each_pokemon) => (
            <li key={each_pokemon.id} >
              <PokeCard pokemon={each_pokemon} />
            </li>
          ))}
        </ol>
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  )}
</div>
  );
}

export default DisplayAllPokemons;
