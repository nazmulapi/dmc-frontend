import classEase from "classease";
import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageItem = (pageNumber) => (
    <BootstrapPagination.Item
      key={pageNumber}
      active={pageNumber === currentPage}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </BootstrapPagination.Item>
  );

  const renderPageRange = (start, end) => {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(renderPageItem(i));
    }
    return range;
  };

  return (
    <BootstrapPagination>
      <BootstrapPagination.First
        disabled={currentPage === 1}
        className={classEase(currentPage === 1 && "disabled")}
        onClick={() => onPageChange(1)}
      />

      <BootstrapPagination.Prev
        disabled={currentPage === 1}
        className={classEase(currentPage === 1 && "disabled")}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {totalPages >= 5 ? (
        <>
          {currentPage === 1 || currentPage === 2
            ? renderPageRange(1, 5)
            : currentPage === totalPages - 1
            ? renderPageRange(totalPages - 4, totalPages)
            : currentPage === totalPages
            ? renderPageRange(totalPages - 4, totalPages)
            : currentPage > 2 || currentPage < totalPages - 2
            ? renderPageRange(currentPage - 2, currentPage + 2)
            : ""}
        </>
      ) : (
        renderPageRange(1, totalPages)
      )}

      {/* {currentPage > 2 && (
        <>
          {renderPageItem(1)}
          <span className="ellipsis">...</span>
          {renderPageRange(currentPage - 1, currentPage + 1)}
        </>
      )} */}

      {/* {currentPage > 2 && <span className="ellipsis">...</span>} */}

      {/* {currentPage > 2 &&
        currentPage < totalPages &&
        renderPageRange(currentPage, currentPage + 1)} */}

      {/* {currentPage < totalPages - 1 && <span className="ellipsis">...</span>}

      {totalPages > 1 && renderPageItem(totalPages)} */}

      <BootstrapPagination.Next
        disabled={currentPage === totalPages}
        className={classEase(currentPage === totalPages && "disabled")}
        onClick={() => onPageChange(currentPage + 1)}
      />

      <BootstrapPagination.Last
        disabled={currentPage === totalPages}
        className={classEase(currentPage === totalPages && "disabled")}
        onClick={() => onPageChange(totalPages)}
      />
    </BootstrapPagination>
  );
};

export default Pagination;
