function SearchBar({ onSearch, searchValue, onInputChange, onFocus, onBlur }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchValue);
    }
  };

  return (
    <input
      type="text"
      value={searchValue}
      onChange={(e) => onInputChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search Pokémon..."
      onFocus={onFocus}   
      onBlur={onBlur}   
      className="border border-gray-300 rounded p-2 w-full"
    />
  );
}

export default SearchBar;
