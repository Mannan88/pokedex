import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import PokemonDisplay from './components/PokemonDisplay';
import PokemonList from './scrollPage/Details.js';
import './App.css';

function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?');
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get(nextUrl);
                setPokemonList((prevList) => mergeUniquePokemon(prevList, response.data.results));
                setNextUrl(response.data.next);
            } catch (error) {
                console.error('error fetching Pokemon List', error);
            }
        };
        fetchList();
    }, [nextUrl]);
    const mergeUniquePokemon = (prevList, newList) => {
        const existingNames = new Set(prevList.map((pokemon) => pokemon.name));
        return [...prevList, ...newList.filter((pokemon) => !existingNames.has(pokemon.name))];
    };

    const [pokemon, setPokemon] = useState('');

    const fetchPokemon = async (pokemon_name) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon_name.toLowerCase()}`);
            setPokemon(response.data);
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
            setPokemon(null);
        }
    };
    const handlePokemonSelect = (pokemonName) => {
        setSearchInput(pokemonName);
        fetchPokemon(pokemonName);
    };

    return (

        <div className="App">
        <div className="left">
            <h1>Pokédex</h1>
            <div className="all_pokemons">
                <PokemonList pokemonList={pokemonList} onPokemonSelect={handlePokemonSelect} />
            </div>
        </div>
        <div className="search_bar">
            <SearchBar
                onSearch={fetchPokemon}
                searchValue={searchInput}
                onInputChange={setSearchInput} // Update input directly if user types
            />
            <PokemonDisplay pokemon={pokemon} />
        </div>
    </div>
    );
}

export default App;
