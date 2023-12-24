// src/components/TypeFilter.js
import React from 'react';

const TypeFilter = ({ types, onFilterChange }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <select
        className="select select-primary w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-2"
        id="type"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="" disabled selected>
          Filter by Type
        </option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;
