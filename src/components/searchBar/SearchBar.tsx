import { useState, ReactNode } from "react";
import { TextField, Button, Box, InputAdornment, IconButton, Tooltip } from "@mui/material";
import { FiSearch, FiX } from "react-icons/fi";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onImport?: () => void;
  isImporting?: boolean;
  showImportButton?: boolean;
  extraContent?: ReactNode;
}

const SearchBar = ({
  onSearch,
  placeholder = "Search...",
  initialValue = "",
  onRefresh,
  isRefreshing = false,
  onImport,
  isImporting = false,
  showImportButton = false,
  extraContent,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSearch = () => {
    onSearch(searchQuery.trim());
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const SearchIcon = FiSearch as any;
  const CloseIcon = FiX as any;

  return (
    <Box className={styles["search-bar-container"]}>
      <TextField
        fullWidth
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        variant="outlined"
        className={styles["search-input"]}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon size={18} />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear} edge="end">
                <CloseIcon size={18} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
        className={styles["search-button"]}
      >
        Pretraži
      </Button>
      {extraContent}
      {showImportButton && onImport && (
        <Button
          variant="outlined"
          startIcon={<FileUploadIcon />}
          onClick={onImport}
          disabled={isImporting}
          className={styles["import-button"]}
        >
          {isImporting ? "Uvoz..." : "Uvezi CSV"}
        </Button>
      )}
      {onRefresh && (
        <Tooltip title="Osveži">
          <IconButton
            onClick={onRefresh}
            disabled={isRefreshing}
            className={styles["refresh-button"]}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default SearchBar;
