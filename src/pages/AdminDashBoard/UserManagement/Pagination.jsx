import React, { useState, useEffect } from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const [visiblePages, setVisiblePages] = useState([]);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const getVisiblePages = (page, total) => {
      if (total < 7) return Array.from({ length: total }, (_, i) => i + 1);

      if (page < 5) {
        return [1, 2, 3, 4, 5, '...', total];
      } else if (page > total - 4) {
        return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, '...', page - 1, page, page + 1, '...', total];
      }
    };

    setVisiblePages(getVisiblePages(currentPage, totalPages));
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    if (page !== '...' && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trở lại
          </button>
        </li>
        {visiblePages.map((page, index) => (
          <li key={index} className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <button 
              className={`page-link  ${page === currentPage ? 'bg-info text-white' : ''}`} 
              onClick={() => handlePageChange(page)}
              disabled={page === '...'}
            >
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Tiếp
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;