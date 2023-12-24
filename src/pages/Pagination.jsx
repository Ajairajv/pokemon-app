import React from 'react';

const Pagination = ({ gotoNextPage, gotoPrevPage }) => {
  return (
    <div className="flex justify-end mt-4">
      {gotoPrevPage && (
        <button
          className="order-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={gotoPrevPage}
        >
          Previous
        </button>
      )}
      {gotoNextPage && (
        <button
          className="order-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ml-4"
          onClick={gotoNextPage}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;