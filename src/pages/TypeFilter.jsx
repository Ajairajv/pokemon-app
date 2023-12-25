import React, { useState } from 'react';

const TypeFilter = ({ types, onFilterChange }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleFilterChange = (type) => {
    setSelectedType(type);
    onFilterChange(type);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between w-full max-w-2xl mx-auto">
      <select
        className="select select-primary w-40 mx-2 mb-2 md:mb-0"
        id="type"
        onChange={(e) => handleFilterChange(e.target.value)}
        value={selectedType}
      >
        <option value="" disabled={!selectedType} hidden={!selectedType}>
          {selectedType ? `Filter: ${selectedType}` : 'Filter'}
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
