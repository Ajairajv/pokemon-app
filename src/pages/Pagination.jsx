import React from 'react';

const Pagination = ({ gotoNextPage, gotoPrevPage }) => {
  return (
    <div className="join grid grid-cols-2">
      {gotoPrevPage && (
        <button
          className="join-item btn btn-outline"
          onClick={gotoPrevPage}
        >
          Previous page
        </button>
      )}
      {gotoNextPage && (
        <button
          className="join-item btn btn-outline"
          onClick={gotoNextPage}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
