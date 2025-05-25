interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }: PaginationProps) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Logic to display limited page numbers
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="flex items-center justify-center bg-gray-100 rounded-md px-2 py-1">
      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-blue-600'
        }`}
        aria-label="Previous page"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Page numbers */}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`w-8 h-8 mx-1 flex items-center justify-center rounded-md ${
            currentPage === number
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          {number}
        </button>
      ))}
      
      {/* Ellipsis if needed */}
      {endPage < totalPages && (
        <span className="mx-1 text-gray-600">...</span>
      )}
      
      {/* Last page if not included in the range */}
      {endPage < totalPages && (
        <button
          onClick={() => paginate(totalPages)}
          className="w-8 h-8 mx-1 flex items-center justify-center rounded-md text-gray-700 hover:bg-gray-200"
        >
          {totalPages}
        </button>
      )}
      
      {/* Next button */}
      <button
        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-blue-600'
        }`}
        aria-label="Next page"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
