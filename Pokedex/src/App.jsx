import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000');
        setPokemon(result.data.results); 
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
    <div className="App">
      <h1>Pokémon List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ol>
          {pokemon.map((each_pokemon) => (
            <li key={each_pokemon.name}>{each_pokemon.name}</li> 
          ))}
        </ol>
      )}
    </div>
  );
}

export default App;
