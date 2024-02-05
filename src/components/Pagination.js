// Pagination.js

import React from 'react';
import { Button } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = [];
  const totalVisiblePages = 5; // Adjust the number of visible pages as needed

  // Calculate the range of visible pages
  const startPage = Math.max(1, currentPage - Math.floor(totalVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + totalVisiblePages - 1);

  // Populate the array of visible pages
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <div className="pagination-container">
      {currentPage > 1 && (
        <Button onClick={() => onPageChange(currentPage - 1)} className="pagination-button">
          &lt; Prev
        </Button>
      )}

      {visiblePages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${page === currentPage ? 'active' : ''}`}
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages && (
        <Button onClick={() => onPageChange(currentPage + 1)} className="pagination-button">
          Next &gt;
        </Button>
      )}
    </div>
  );
};

export default Pagination;
