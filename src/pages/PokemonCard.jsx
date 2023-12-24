// PokemonCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          // Handle the case where the Pokemon is not found
          setPokemonDetails({
            id: 'N/A',
            type: 'Unknown',
            // Add more default properties as needed
          });
        } else {
          // Handle other errors
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
    <div className="bg-white rounded p-4 mb-4 shadow-md" style={{ minWidth: '200px' }}>
      <img
        src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonDetails.id}.svg`}
        alt={name}
        className="mx-auto mb-2"
        style={{ maxWidth: '100px' }}
      />
      <p className="text-lg font-bold text-blue-500">{name}</p>
      <p className="text-gray-500">ID: {pokemonDetails.id}</p>
      <p className="text-gray-500">Type: {pokemonDetails.type}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={handleMoreClick}
      >
        More
      </button>

      {showDetails && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonDetails.id}.svg`}
              alt={name}
              className="mx-auto mb-2"
              style={{ maxWidth: '100px' }}
            />
            <div className="ml-4">
              <p className="text-lg font-bold text-blue-500">{name}</p>
              <p className="text-gray-500">ID: {pokemonDetails.id}</p>
              <p className="text-gray-500">Type: {pokemonDetails.type}</p>
              {/* Add more Pokemon details as needed */}
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={handleCloseDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
