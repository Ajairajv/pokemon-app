// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="mb-4 md:mb-8">
      <h1 className="text-center text-3xl font-bold mb-4">Pokedex</h1>
      <div className="flex items-center justify-center w-full">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          className="input input-bordered input-primary w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-2 mb-2 md:mb-0"
        />
        <button
          className="btn btn-outline mx-2 btn-primary"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
