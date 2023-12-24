// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

const extractIdFromUrl = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(''); // State to store the selected type
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleTypeFilter = (type) => {
    console.log('Filtering by type:', type);
    setSelectedType(type);
  };

  const types = ['Grass', 'Fire', 'Water'];

  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(currentPageUrl);
        setLoading(false);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemon(
          response.data.results.map((p) => ({ name: p.name, id: extractIdFromUrl(p.url), type: 'Unknown' }))
        );
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  // Filter Pokémon by search term and selected type
  const filteredPokemon = pokemon.filter((p) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const lowerCaseType = selectedType.toLowerCase();

    return (
      p.name.toLowerCase().includes(lowerCaseSearchTerm) &&
      (selectedType === '' || p.type.toLowerCase() === lowerCaseType)
    );
  });

  if (loading) return 'Loading...';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r ">
      <SearchBar onSearch={handleSearch} />
      <TypeFilter types={types} onFilterChange={handleTypeFilter} />

      <div className="d-flex justify-content-center mt-5">
        <PokemonList pokemon={filteredPokemon} />
      </div>

      <button className="space-between">
        <Pagination gotoNextPage={nextPageUrl ? gotoNextPage : null} gotoPrevPage={prevPageUrl ? gotoPrevPage : null} />
      </button>
    </div>
  );
};

export default Home;



