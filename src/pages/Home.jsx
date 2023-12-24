// src/pages/Home.js
import React from 'react';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import PokemonCard from './PokemonCard';

const Home = () => {
  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
  };

  const handleTypeFilter = (selectedType) => {
    // Implement your type filter logic here
    console.log('Filtering by type:', selectedType);
  };

  // Replace with your actual list of Pokemon types
  const types = ['Grass', 'Fire', 'Water'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r ">
      <SearchBar onSearch={handleSearch} />
      <TypeFilter onFilterChange={handleTypeFilter} types={types} />
      {/* Your other content goes here */}
      <PokemonCard/>
    </div>
  );
};

export default Home;

