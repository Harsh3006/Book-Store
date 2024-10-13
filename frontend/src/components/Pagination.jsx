const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const prevPage = currentPage > 1 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  // Function to calculate the page numbers to display
  const getPageNumbers = () => {
    const maxLinks = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxLinks / 2));
    let endPage = startPage + maxLinks - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxLinks + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      <button
        className="btn-base btn-tertiary"
        onClick={() => handlePageChange(prevPage)}
        disabled={currentPage === 1}
      >
        <span className="btn-icon-leading material-icons">arrow_back</span>
        <span className="d-none d-md-flex">Previous</span>
      </button>
      <ul className="pagination d-sm-flex d-none">
        {pageNumbers.map((pageNum) => (
          <li
            key={pageNum}
            className={`page-item ${pageNum === currentPage ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(pageNum)}
            >
              {pageNum}
            </button>
          </li>
        ))}
      </ul>
      <p id="id_mobile_pagination_text" className="d-block d-sm-none fw-medium">
        {`Page ${currentPage} of ${totalPages}`}
      </p>
      <button
        className="btn-base btn-tertiary"
        onClick={() => handlePageChange(nextPage)}
        disabled={currentPage === totalPages}
      >
        <span className="d-none d-md-flex">Next</span>
        <span className="btn-icon-trailing material-icons">arrow_forward</span>
      </button>
    </div>
  );
};

export default Pagination;
