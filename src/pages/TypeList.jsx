// TypeList.js
import React from 'react';

const TypeList = ({ types }) => {
  return (
    <div className="flex space-x-2">
      {types.map((type, index) => (
        <div
          key={index}
          className="text-white font-extrabold bg-white bg-opacity-20 border-white rounded-xl px-3 py-2"
          style={{ margin: '0 2px' }}
        >
          {type}
        </div>
      ))}
    </div>
  );
};

export default TypeList;