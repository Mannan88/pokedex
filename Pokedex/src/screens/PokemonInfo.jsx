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

  useEffect(() => {
  if (pokemonData) {
    console.log(pokemonData.types);
  }
}, [pokemonData]);


  if (loading) return <p>Loading...</p>;
  if (!pokemonData) return <p>Pokémon not found</p>;

  return (
    <div>
      <h1>{pokemonData.name}</h1>
      <img
        src={pokemonData.sprites.other['official-artwork'].front_default} 
        alt={pokemonData.name}
      />
           
            <p className='info'>Type: {pokemonData.types.map(type => type.type.name).join(', ')}</p>
             <p className='info'>Hp: {pokemonData.stats[0].base_stat}</p>
            <p className='info'>Attack: {pokemonData.stats[1].base_stat}</p>
            <p className='info'>Sp-Attack: {pokemonData.stats[3].base_stat}</p>
             <p className='info'>Defense: {pokemonData.stats[2].base_stat}</p>
            <p className='info'>Sp-Defense: {pokemonData.stats[4].base_stat}</p>
             <p className='info'>Height: {pokemonData.height}</p>
            <p className='info'>Weight: {(pokemonData.weight)/10}Kg</p>
    </div>
  );
}

export default PokemonInfo;
