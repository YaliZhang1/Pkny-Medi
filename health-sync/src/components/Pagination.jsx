import React, { useState } from "react";
import "../styles/pagination.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pagesToShow = 4;
  const [startPage, setStartPage] = useState(1);

  const hasLeftEllipsis = startPage > 1;
  const hasRightEllipsis = startPage + pagesToShow < totalPages;

  const visiblePages = Array.from(
    { length: Math.min(pagesToShow, totalPages) },
    (_, i) => startPage + i
  );

  console.log("Start Page:", startPage);
  console.log("Total Pages:", totalPages);
  console.log("Has Left Ellipsis:", hasLeftEllipsis);
  console.log("Has Right Ellipsis:", hasRightEllipsis);
  console.log("Visible Pages:", visiblePages);

  return (
    <div className="pagination">
      <button
        className="prev-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src="./left-arrow.png" alt="Prev" />
      </button>

      {hasLeftEllipsis && (
        <button
          className="page-btn"
          onClick={() => setStartPage(Math.max(startPage - pagesToShow, 1))}
        >
          ...
        </button>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`page-btn ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {hasRightEllipsis && (
        <button
          className="page-btn"
          onClick={() =>
            setStartPage(
              Math.min(startPage + pagesToShow, totalPages - pagesToShow + 1)
            )
          }
        >
          ...
        </button>
      )}

      <button
        className="next-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src="./right-arrow.png" alt="Next" />
      </button>
    </div>
  );
}
