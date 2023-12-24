// PokemonCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonDetailsModal from './PokemonDetailsModal';

const PokemonCard = ({ id, name, type }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemonDetails({
          id: response.data.id,
          type: response.data.types[0]?.type.name || 'Unknown',
          // Add more properties as needed
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        if (error.response && error.response.status === 404) {
          setPokemonDetails({
            id: 'N/A',
            type: 'Unknown',
          });
        } else {
          setPokemonDetails(null);
        }
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  const [showDetails, setShowDetails] = useState(false);

  const handleMoreClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  if (loading) return 'Loading...';

  return (
    <div className="bg-white rounded-md p-4 mb-4 shadow-md max-w-xs mx-auto" style={{ width: '200px', height: '200px' }}>
    <div className="flex flex-col h-full justify-between">
      <div>
        <p className="text-lg font-bold text-blue-500">{name}</p>
        <p className="text-gray-500">Type: {pokemonDetails?.type}</p>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-gray-500">#00{id}</p>
        </div>
        <img
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonDetails?.id}.svg`}
          alt={name}
          className="mb-2"
          style={{ width: '80px', height: '80px' }} // Fixed size for the image
        />
      </div>
    </div>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded mt-2 self-start hover:bg-blue-600 transition"
      onClick={handleMoreClick}
    >
      Show More
    </button>
    {showDetails && (
      <PokemonDetailsModal
        id={pokemonDetails.id}
        name={name}
        type={pokemonDetails.type}
        types={pokemonDetails.types}
        handleCloseDetails={handleCloseDetails}
      />
    )}
  </div>
  
  );
};

export default PokemonCard;
