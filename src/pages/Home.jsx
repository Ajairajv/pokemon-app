// src/pages/Home.js
import React from 'react';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import PokemonCard from './PokemonCard';
import PokemonList from './PokemonList';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import Pagination from './Pagination';

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

  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(currentPageUrl, {
          cancelToken: new axios.CancelToken(c => (cancel = c))
        });
        setLoading(false);
        setNextPageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemon(response.data.results.map(p => p.name));
      } catch (error) {
        if (axios.isCancel(error)) {
          // Request was canceled
        } else {
          // Handle other errors
        }
      }
    };
  
    let cancel;
    fetchData();
  
    return () => cancel();
  }, [currentPageUrl]);
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."
  


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r ">
      <SearchBar onSearch={handleSearch} />
      <TypeFilter onFilterChange={handleTypeFilter} types={types} />
     

      {/* Your list of Pokemon  goes here */}
      <PokemonList pokemon={pokemon}/>

      
      {/* Your other content goes here */}
      <PokemonCard/>


      {/* prev and next button */}
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </div>
  );
};

export default Home;

