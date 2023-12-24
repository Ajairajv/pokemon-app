// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleTypeFilter = (selectedType) => {
    console.log('Filtering by type:', selectedType);
  };

  const types = ['Grass', 'Fire', 'Water'];

  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  const extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(currentPageUrl);
        setLoading(false);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemon(response.data.results.map(p => ({
          name: p.name,
          id: extractIdFromUrl(p.url),
          type: 'Unknown'
        })));
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
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

  if (loading) return "Loading...";

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r">
      <SearchBar onSearch={handleSearch} />
      <TypeFilter onFilterChange={handleTypeFilter} types={types} />

      <div className='flex flex flex-start justify-content'>
        <PokemonList pokemon={filteredPokemon} />
      </div>

      <button className='space-between'>
        <Pagination
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        />
      </button>
    </div>
  );
};

export default Home;
