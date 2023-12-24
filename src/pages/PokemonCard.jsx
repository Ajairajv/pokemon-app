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
    <div className="bg-white rounded-md p-4 mb-4 shadow-md max-w-xs mx-auto relative" style={{ width: '230px', height: '200px' }}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            {/* Display the name of the Pokemon */}
            <p className="text-lg font-bold text-blue-500">{name}</p>
            {/* Display the ID to the right of the name */}
            <p className="text-sm text-gray-500 ml-2">#00{id}</p>
          </div>
          {/* Display the Type of the Pokemon */}
          <p className="text-gray-500">Type: {pokemonDetails?.type}</p>
        </div>
        <div className="flex items-end justify-between">
          {/* Move the "Show More" button to the bottom-left */}
          <button
          className="bg-blue-500 text-white px-2 py-1 rounded self-start hover:bg-blue-600 transition text-xs" // Adjusted padding and font size
          onClick={handleMoreClick}
          style={{ alignSelf: 'flex-end' }} // Align to the bottom-left
        >
          Show More
        </button>
          {/* Display the Pokemon image */}
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonDetails?.id}.svg`}
            alt={name}
            className="mb-2"
            style={{ width: '80px', height: '80px' }} // Fixed size for the image
          />
        </div>
      </div>
      {/* Display the Pokemon Details Modal if showDetails is true */}
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
