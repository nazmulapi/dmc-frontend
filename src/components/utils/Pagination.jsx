import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageItems = [];

  for (let i = 1; i <= totalPages; i++) {
    pageItems.push(
      <BootstrapPagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </BootstrapPagination.Item>
    );
  }

  return (
    <BootstrapPagination>
      <BootstrapPagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {pageItems}

      <BootstrapPagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </BootstrapPagination>
  );
};

export default Pagination;
