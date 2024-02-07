// // Pagination.js

// import React from 'react';
// import { Button } from '@mui/material';

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const visiblePages = [];
//   const totalVisiblePages = 5; // Adjust the number of visible pages as needed

//   // Calculate the range of visible pages
//   const startPage = Math.max(1, currentPage - Math.floor(totalVisiblePages / 2));
//   const endPage = Math.min(totalPages, startPage + totalVisiblePages - 1);

//   // Populate the array of visible pages
//   for (let i = startPage; i <= endPage; i++) {
//     visiblePages.push(i);
//   }

//   return (
//     <div className="pagination-container">
//       {currentPage > 1 && (
//         <Button onClick={() => onPageChange(currentPage - 1)} className="pagination-button">
//           &lt; Prev
//         </Button>
//       )}

//       {visiblePages.map((page) => (
//         <Button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`pagination-button ${page === currentPage ? 'active' : ''}`}
//         >
//           {page}
//         </Button>
//       ))}

//       {currentPage < totalPages && (
//         <Button onClick={() => onPageChange(currentPage + 1)} className="pagination-button">
//           Next &gt;
//         </Button>
//       )}
//     </div>
//   );
// };

// export default Pagination;





import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [goToPage, setGoToPage] = useState('');

  const visiblePages = [];
  const totalVisiblePages = Math.min(totalPages, 5); // Adjust the number of visible pages dynamically

  // Calculate the range of visible pages
  const startPage = Math.max(1, currentPage - Math.floor(totalVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + totalVisiblePages - 1);

  // Populate the array of visible pages
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  const handleGoToPageChange = (e) => {
    setGoToPage(e.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPage);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
    setGoToPage('');
  };

  return (
    <div className="pagination-container">
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        First
      </Button>

      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Prev
      </Button>

      {startPage > 1 && <span className="ellipsis">...</span>}

      {visiblePages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${page === currentPage ? 'active' : ''}`}
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && <span className="ellipsis">...</span>}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </Button>

      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Last
      </Button>

      <TextField
        label="Go to page"
        variant="outlined"
        type="number"
        value={goToPage}
        onChange={handleGoToPageChange}
        className="go-to-page-input"
      />
      <Button
        onClick={handleGoToPage}
        disabled={!goToPage || isNaN(parseInt(goToPage)) || parseInt(goToPage) < 1 || parseInt(goToPage) > totalPages}
        className="go-to-page-button"
      >
        Go
      </Button>
    </div>
  );
};

export default Pagination;
