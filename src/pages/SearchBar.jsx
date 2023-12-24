import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="mb-4 md:mb-8">
      <h1 className="text-center text-3xl font-bold mb-4">Pokedex</h1>
      <div className="flex items-center justify-center w-full">
        <input
          type="text"
          placeholder="Search Pokemon"
          className="input input-bordered input-primary w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-2 mb-2 md:mb-0"
        />
        <button
          className="btn btn-outline mx-2 btn-primary"
          onClick={() => onSearch('')} // Replace with your search logic
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

