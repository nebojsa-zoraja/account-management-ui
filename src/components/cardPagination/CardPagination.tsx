import React from "react";
import { Box, Typography, IconButton, Select, MenuItem, FormControl } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import styles from "./CardPagination.module.scss";

interface CardPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

const CardPagination: React.FC<CardPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [6, 10, 20, 50],
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleFirstPage = () => onPageChange(1);
  const handlePreviousPage = () => onPageChange(currentPage - 1);
  const handleNextPage = () => onPageChange(currentPage + 1);
  const handleLastPage = () => onPageChange(totalPages);

  return (
    <Box className={styles["pagination-container"]}>
      <Box className={styles["info-section"]}>
        <Typography variant="body2" color="text.secondary">
          Prikazano {startItem}-{endItem} od {totalItems}
        </Typography>
      </Box>

      <Box className={styles["controls-section"]}>
        {onPageSizeChange && (
          <Box className={styles["page-size-section"]}>
            <Typography variant="body2" color="text.secondary">
              Po stranici:
            </Typography>
            <FormControl size="small" variant="outlined">
              <Select
                value={itemsPerPage}
                onChange={(e) => onPageSizeChange(e.target.value as number)}
                className={styles["page-size-select"]}
              >
                {pageSizeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        <Typography variant="body2" color="text.secondary">
          Stranica {currentPage} od {totalPages}
        </Typography>

        <Box className={styles["buttons-container"]}>
          <IconButton
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            size="small"
            className={styles["icon-button"]}
          >
            <FirstPageIcon />
          </IconButton>
          <IconButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            size="small"
            className={styles["icon-button"]}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            size="small"
            className={styles["icon-button"]}
          >
            <ChevronRightIcon />
          </IconButton>
          <IconButton
            onClick={handleLastPage}
            disabled={currentPage === totalPages || totalPages === 0}
            size="small"
            className={styles["icon-button"]}
          >
            <LastPageIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CardPagination;
