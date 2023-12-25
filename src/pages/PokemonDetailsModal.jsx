// PokemonDetailsModal.js
import React from 'react';

const getStatusWidth = (value) => {
  const maxBarWidth = 200;
  const maxBarHeight = 20;

  const filledWidth = (value / 100) * maxBarWidth;
  let colorClass = '';

  if (value > 90) {
    colorClass = 'bg-green-500';
  } else if (value > 70) {
    colorClass = 'bg-orange-500';
  } else {
    colorClass = 'bg-yellow-500';
  }

  return {
    width: maxBarWidth,
    height: maxBarHeight,
    color: 'bg-gray-400',
    filledWidth: filledWidth,
    rounded: filledWidth === maxBarWidth ? 'rounded-full' : 'rounded-l-full',
    colorClass: colorClass,
  };
};

const PokemonDetailsModal = ({
  id,
  name,
  types,
  speed,
  specialDefense,
  specialAttack,
  defense,
  attack,
  hp,
  handleCloseDetails,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-[80%] flex relative z-50">
        <div className="flex-1 mr-6">
          <div className="mb-4">
            <p className="text-lg font-bold text-blue-500">{name}</p>
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
              alt={name}
              className="mx-auto mb-2"
              style={{ maxWidth: '100px' }}
            />
          </div>
          <div className="flex flex-wrap gap-4">
          {types?.map((type, index) => (
              <div key={index} className="text-center">
                <p className="text-gray-500">{type.type && type.type.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="mt-6">
            <p className="text-lg font-bold text-blue-500">Status:</p>
            <div className="status-container grid grid-cols-2 gap-4">
              <div className="text-gray-500">Speed:</div>
              <div className={`status-bar ${getStatusWidth(speed).color}`} style={{ width: `${getStatusWidth(speed).width}px`, height: `${getStatusWidth(speed).height}px`, borderRadius: getStatusWidth(speed).rounded }}>
                <div className={`status-filled ${getStatusWidth(speed).colorClass}`} style={{ width: `${getStatusWidth(speed).filledWidth}px`, height: `${getStatusWidth(speed).height}px` }}>
                  <span className="text-black">{speed}</span>
                </div>
              </div>
              <div className="text-gray-500">Special Defense:</div>
              <div className={`status-bar ${getStatusWidth(specialDefense).color}`} style={{ width: `${getStatusWidth(specialDefense).width}px`, height: `${getStatusWidth(specialDefense).height}px`, borderRadius: getStatusWidth(specialDefense).rounded }}>
                <div className={`status-filled ${getStatusWidth(specialDefense).colorClass}`} style={{ width: `${getStatusWidth(specialDefense).filledWidth}px`, height: `${getStatusWidth(specialDefense).height}px` }}>
                  <span className="text-black">{specialDefense}</span>
                </div>
              </div>
                <div className="text-gray-500">Special Attack:</div>
                <div className={`status-bar ${getStatusWidth(specialAttack).color}`} style={{ width: `${getStatusWidth(specialAttack).width}px`, height: `${getStatusWidth(specialAttack).height}px`, borderRadius: getStatusWidth(specialAttack).rounded }}>
                  <div className={`status-filled ${getStatusWidth(specialAttack).colorClass}`} style={{ width: `${getStatusWidth(specialAttack).filledWidth}px`, height: `${getStatusWidth(specialAttack).height}px` }}>
                    <span className="text-black">{specialAttack}</span>
                  </div>
                </div>
                <div className="text-gray-500">Defense:</div>
                <div className={`status-bar ${getStatusWidth(defense).color}`} style={{ width: `${getStatusWidth(defense).width}px`, height: `${getStatusWidth(defense).height}px`, borderRadius: getStatusWidth(defense).rounded }}>
                  <div className={`status-filled ${getStatusWidth(defense).colorClass}`} style={{ width: `${getStatusWidth(defense).filledWidth}px`, height: `${getStatusWidth(defense).height}px` }}>
                    <span className="text-black">{defense}</span>
                  </div>
                </div>
                <div className="text-gray-500">Attack:</div>
                <div className={`status-bar ${getStatusWidth(attack).color}`} style={{ width: `${getStatusWidth(attack).width}px`, height: `${getStatusWidth(attack).height}px`, borderRadius: getStatusWidth(attack).rounded }}>
                  <div className={`status-filled ${getStatusWidth(attack).colorClass}`} style={{ width: `${getStatusWidth(attack).filledWidth}px`, height: `${getStatusWidth(attack).height}px` }}>
                    <span className="text-black">{attack}</span>
                  </div>
                </div>
                <div className="text-gray-500">HP:</div>
                <div className={`status-bar ${getStatusWidth(hp).color}`} style={{ width: `${getStatusWidth(hp).width}px`, height: `${getStatusWidth(hp).height}px`, borderRadius: getStatusWidth(hp).rounded }}>
                  <div className={`status-filled ${getStatusWidth(hp).colorClass}`} style={{ width: `${getStatusWidth(hp).filledWidth}px`, height: `${getStatusWidth(hp).height}px` }}>
                    <span className="text-black">{hp}</span>
                  </div>
                </div>


            </div>
          </div>
        </div>
      </div>
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded"
        onClick={handleCloseDetails}
      >
        Close
      </button>
    </div>
  );
};

export default PokemonDetailsModal;



