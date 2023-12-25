// TypeList.js
import React from 'react';

const TypeList = ({ types }) => {
  return (
    <ul>
      {types.map((type, index) => (
        <li key={index}>{type}</li>
      ))}
    </ul>
  );
};

export default TypeList;
