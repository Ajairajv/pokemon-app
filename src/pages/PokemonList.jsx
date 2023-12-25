// PokemonList.js
import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemon }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {pokemon.map(({ name, id, type }) => (
        <div key={name} className="mb-4">
          <PokemonCard id={id} name={name} type={type} />
         
 
        </div>
      ))}
    </div>
  );
};

export default PokemonList;