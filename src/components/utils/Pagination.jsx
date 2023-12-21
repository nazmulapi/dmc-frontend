import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageItems = [];

  const MAX_PAGES = 5; // Maximum number of pages to show in pagination

  const renderEllipsis = (key) => (
    <BootstrapPagination.Ellipsis key={key} disabled />
  );

  // Function to render individual page item
  const renderPageItem = (pageNumber) => (
    <BootstrapPagination.Item
      key={pageNumber}
      active={pageNumber === currentPage}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </BootstrapPagination.Item>
  );

  // Function to render a range of pages with ellipsis in between
  const renderPageRange = (start, end) => {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(renderPageItem(i));
    }
    return range;
  };

  if (totalPages <= MAX_PAGES) {
    // If total pages are less than or equal to the maximum pages to show
    pageItems.push(...renderPageRange(1, totalPages));
  } else {
    // If total pages are more than the maximum pages to show, include ellipsis
    const showEllipsisStart = currentPage > MAX_PAGES - 2;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (showEllipsisStart) {
      pageItems.push(renderPageItem(1));
      pageItems.push(renderEllipsis("start"));
    }

    if (showEllipsisEnd && !showEllipsisStart) {
      pageItems.push(renderPageRange(1, 2));
      pageItems.push(renderEllipsis("middle"));
    }

    const start = showEllipsisStart ? currentPage - 1 : 2;
    const end = showEllipsisEnd ? totalPages - 1 : MAX_PAGES - 2;

    pageItems.push(...renderPageRange(start, end));

    if (showEllipsisEnd) {
      pageItems.push(renderEllipsis("end"));
      pageItems.push(renderPageItem(totalPages));
    }
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
