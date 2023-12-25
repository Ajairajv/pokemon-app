// Home.js
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
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    // Reload the current page with the new search term
    setCurrentPageUrl('https://pokeapi.co/api/v2/pokemon');
  };

  const handleTypeFilter = async (type) => {
    setSelectedType(type);
    setLoading(true);

    try {
      if (type !== '') {
        const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
        const typePokemonUrls = typeResponse.data.pokemon.map((entry) => entry.pokemon.url);

        // Fetch details of Pokemon based on URLs
        const pokemonDetailsPromises = typePokemonUrls.map((url) => axios.get(url));
        const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
        const filteredPokemon = pokemonDetailsResponses.map((response) => ({
          name: response.data.name,
          id: extractIdFromUrl(response.data.forms[0].url),
          type: type,
        }));

        setPokemon(filteredPokemon);
      } else {
        // If type is empty, fetch all Pokemon
        const response = await axios.get(currentPageUrl);
        setPokemon(
          response.data.results.map((p) => ({
            name: p.name,
            id: extractIdFromUrl(p.url),
            type: 'Unknown',
          }))
        );
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results.map((type) => type.name));
      } catch (error) {
        console.error('Error fetching Pokemon types:', error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(currentPageUrl);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemon(
          response.data.results.map((p) => ({
            name: p.name,
            id: extractIdFromUrl(p.url),
            type: 'Unknown',
          }))
        );
        setLoading(false);
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

  if (loading) return 'Loading...';

  // Filter the Pokemon based on search term and selected type
  const filteredPokemon = pokemon.filter((p) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const lowerCaseType = selectedType.toLowerCase();

    return (
      p.name.toLowerCase().includes(lowerCaseSearchTerm) &&
      (selectedType === '' || p.type.toLowerCase() === lowerCaseType)
    );
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r">
      {/* SearchBar and TypeFilter */}
      <div className="container mx-auto mt-5 flex flex-col md:flex-row gap-8">
        {/* SearchBar with increased width */}
        <SearchBar onSearch={handleSearch} className="w-full md:w-3/4" />

        {/* TypeFilter with reduced width */}
        <TypeFilter types={types} onFilterChange={handleTypeFilter} className="w-full md:w-1/4" />
 
      </div>

      {/* Container for Pokemon cards */}
      <PokemonList pokemon={filteredPokemon} />

      {/* Container for Pagination buttons */}
      <div className="flex  justify-between mt-4 p-4">
      <Pagination gotoPrevPage={prevPageUrl ? gotoPrevPage : null} />
      <Pagination gotoNextPage={nextPageUrl ? gotoNextPage : null}  />
    </div>
    </div>
  );
};

export default Home;
