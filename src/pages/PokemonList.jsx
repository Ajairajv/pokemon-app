// PokemonList.js
import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemon }) => {
  return (
    <div className="flex flex-wrap justify-between">
      {pokemon.map(({ name, id, type }) => (
        <PokemonCard key={name} id={id} name={name} type={type} />
      ))}
    </div>
  );
};

export default PokemonList;