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

const StatusBar = ({ label, value }) => {
  const statusWidth = getStatusWidth(value);

  return (
    <div className="flex flex-col items-start mb-4">
      <p className="text-white italic">{label}</p>
      <p className="text-white font-extrabold">{value}</p>
      <div
        className={`status-bar ${statusWidth.color} border-white border-2 mt-2 overflow-hidden`}
        style={{
          width: `${statusWidth.width}px`,
          height: `${statusWidth.height}px`,
          borderRadius: statusWidth.rounded,
        }}
      >
        <div
          className={`status-filled ${statusWidth.colorClass}`}
          style={{
            width: `${statusWidth.filledWidth}px`,
            height: `${statusWidth.height}px`,
            opacity: '0.8',
          }}
        ></div>
      </div>
    </div>
  );
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
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-transparent border-white border-2 p-8 rounded w-[80%] flex relative z-50 backdrop-filter backdrop-blur-lg">
        <div className="flex-1 mr-6 bg-transparent">
          <div className="mb-4">
            <p className="text-lg font-bold text-white">{name}</p>
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
              alt={name}
              className="mx-auto mb-2"
              style={{ maxWidth: '100px' }}
            />
          </div>
          <div className="flex flex-col gap-4">
            {types?.map((type, index) => (
              <div key={index} className="text-center">
                <p className="text-white italic">{type.type && type.type.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="mt-6">
            <p className="text-lg font-bold text-white mb-4">Status:</p>
            <div className="status-container">
              <StatusBar label="Speed" value={speed} />
              <StatusBar label="Special Defense" value={specialDefense} />
              <StatusBar label="Special Attack" value={specialAttack} />
              <StatusBar label="Defense" value={defense} />
              <StatusBar label="Attack" value={attack} />
              <StatusBar label="HP" value={hp} />
            </div>
          </div>
        </div>
      </div>
      <button
        className="absolute top-4 right-4  text-white px-6 py-3 rounded"
        onClick={handleCloseDetails}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
};

export default PokemonDetailsModal;

