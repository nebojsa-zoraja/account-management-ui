import React from "react";
import styles from "./Pagination.module.scss";
import { IPagination } from "./IPagination";

const Pagination: React.FC<IPagination> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={styles["pagination-container"]}>
      <div className={styles["pagination-info"]}>
        Prikazano {startItem}-{endItem} od {totalItems}
      </div>
      <div className={styles["pagination"]}>
        <button
          className={`${styles["pagination-button"]} ${
            currentPage === 1 ? styles["disabled"] : ""
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className={styles["ellipsis"]}>
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              className={`${styles["pagination-button"]} ${
                currentPage === page ? styles["active"] : ""
              }`}
              onClick={() => handlePageClick(page as number)}
            >
              {page}
            </button>
          );
        })}

        <button
          className={`${styles["pagination-button"]} ${
            currentPage === totalPages ? styles["disabled"] : ""
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;
