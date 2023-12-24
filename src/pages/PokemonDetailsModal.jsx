import React from 'react';

const PokemonDetailsModal = ({ id, name, type, types, speed, specialDefense, specialAttack, handleCloseDetails }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"> {/* Increased z-index to 50 */}
      <div className="bg-white p-4 rounded w-[80%] flex flex-col relative z-50"> {/* Increased z-index to 50 */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
              alt={name}
              className="mx-auto mb-2"
              style={{ maxWidth: '100px' }}
            />
            <p className="text-lg font-bold text-blue-500">{name}</p>
            <p className="text-gray-500">ID: {id}</p>
            <p className="text-gray-500">Type: {type}</p>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleCloseDetails}
          >
            Close
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {/* Check if types is defined before mapping over it */}
          {types?.map((type, index) => (
            <div key={index} className="text-center">
              <img
                src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
                alt={name}
                className="mx-auto mb-2"
                style={{ maxWidth: '80px' }}
              />
              <p className="text-gray-500">{type.type.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-lg font-bold text-blue-500">Status:</p>
          <p className="text-gray-500">Speed: {speed}</p>
          <p className="text-gray-500">Special Defense: {specialDefense}</p>
          <p className="text-gray-500">Special Attack: {specialAttack}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailsModal;
