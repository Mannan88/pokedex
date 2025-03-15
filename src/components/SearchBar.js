import React from 'react';
const SearchBar = ({ onSearch,searchValue,onInputChange }) => {
 

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchValue);
    };

    return ( 
        <div class="search_bar">
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchValue}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Search for a Pokémon..."
            />
            <button id="searchButton" type="submit">Search</button>
        </form>
        </div>
    );
};

export default SearchBar;  
