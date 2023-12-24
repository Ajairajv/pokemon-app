// PokemonList.js
import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemon }) => {
  return (
    <div className="flex flex-wrap justify-between ">
      {pokemon.map(({ name, id, type }) => (
        <div key={name} className="mb-4">
        <PokemonCard id={id} name={name} type={type} />
      </div>
      ))}
    </div>
  );
};

export default PokemonList;