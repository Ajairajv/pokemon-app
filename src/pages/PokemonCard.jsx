// PokemonCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonDetailsModal from './PokemonDetailsModal';
import TypeList from './TypeList';

// Define a mapping of types to colors
const typeColors = {
  normal: '#BABAAE',
  fighting: '#A75543',
  flying: '#78A2FF',
  poison: '#A95CA0',
  ground: '#EECC55',
  rock: '#CCBD72',
  bug: '#C2D21E',
  ghost: '#7975D7',
  steel: '#C4C2DB',
  fire: '#fc5a03',
  water: '#56ADFF',
  grass: '#04c243',
  electric: '#fac825',
  psychic: '#FA65B4',
  ice: '#96F1FF',
  dragon: '#8673FF',
  dark: '#8D6855',
  fairy: '#F9AEFF',
  // Add more types as needed
};

const PokemonCard = ({ id, name }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const types = response.data.types.map((type) => type.type.name);
        setPokemonDetails({
          id: response.data.id,
          types: types.length > 0 ? types : ['Unknown'],
          speed: response.data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
          specialDefense: response.data.stats.find((stat) => stat.stat.name === 'special-defense').base_stat,
          specialAttack: response.data.stats.find((stat) => stat.stat.name === 'special-attack').base_stat,
          defense: response.data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
          attack: response.data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
          hp: response.data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
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

  if (loading) {
    return (
      <button className="btn">
        <span className="loading loading-spinner"></span>
        Loading...
      </button>
    );
  }
  

  return (
    <div
      className={`rounded-md p-4 mb-4 shadow-md max-w-xs mx-auto relative overflow-hidden ${
        pokemonDetails?.types?.[0]?.toLowerCase()
      }`}
      style={{
        height: '300px',
        width: '330px',
        background: typeColors[pokemonDetails?.types?.[0]?.toLowerCase()] || '#BABAAE',
      }}
    >
      <div className="flex flex-col h-full justify-between bg-opacity-20 bg-gray-200">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-bold text-white">{name}</p>
            <p className="text-2xl text-white text-opacity-70 font-calligraphy ml-2">#00{id}</p>

          </div>
          <div className="flex items-center">
            {pokemonDetails?.types?.length > 0 && (
              <div className="border-white rounded-md px-2">
                <TypeList types={pokemonDetails.types} />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <button
            className="border-white border bg-transperent text-white px-2 py-1 font-bold rounded self-start hover:bg-white hover:bg-opacity-20  transition text-xs"
            onClick={handleMoreClick}
            style={{ alignSelf: 'flex-end' }}
          >
            See Status
          </button>
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonDetails?.id}.svg`}
            alt={name}
            className="mb-2"
            style={{ width: '90px', height: '110px' }}
          />
        </div>
      </div>
      {showDetails && (
        <PokemonDetailsModal
          id={pokemonDetails.id}
          name={name}
          types={pokemonDetails.types}
          speed={pokemonDetails.speed}
          specialDefense={pokemonDetails.specialDefense}
          specialAttack={pokemonDetails.specialAttack}
          defense={pokemonDetails.defense}
          attack={pokemonDetails.attack}
          hp={pokemonDetails.hp}
          handleCloseDetails={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default PokemonCard;

