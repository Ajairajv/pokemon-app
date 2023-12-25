import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Call onSearch with the updated search term
  };

  return (
    <div className="mb-4 md:mb-8 justify-center w-full">
      <div className="flex items-center justify-center w-full">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered input-primary w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-2 mb-2 md:mb-0" // Adjusted max-width here
        />
      </div>
    </div>
  );
};

export default SearchBar;
