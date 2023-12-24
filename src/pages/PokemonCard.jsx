// src/components/PokemonCard.js
import React, { useState } from 'react';

const PokemonCard = ({ id, name, type }) => {
  const imageUrl = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/1.svg`;
  const [showDetails, setShowDetails] = useState(false);

  const handleMoreClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div className="bg-white rounded p-4 mb-4 shadow-md">
      <img
        src={imageUrl}
        alt={name}
        className="mx-auto mb-2"
        style={{ maxWidth: '100px' }}
      />
      <p className="text-lg font-bold">{name}</p>
      <p className="text-gray-500">ID: {id}</p>
      <p className="text-gray-500">Type: {type}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={handleMoreClick}
      >
        More
      </button>

      {showDetails && (
        // Add modal or separate page for more details
        // Here you can display the image on the left and details on the right
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <img
              src={imageUrl}
              alt={name}
              className="mx-auto mb-2"
              style={{ maxWidth: '100px' }}
            />
            <div className="ml-4">
              <p className="text-lg font-bold">{name}</p>
              <p className="text-gray-500">ID: {id}</p>
              <p className="text-gray-500">Type: {type}</p>
              {/* Add more Pokemon details as needed */}
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              onClick={handleCloseDetails}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;