import { Autocomplete, TextField } from "@mui/material";
import { FC } from "react";

interface SearchSelectProps {
  options: Array<{ value: string | number; label: string }>;
  value: string | number;
  onChange: (name: string, value: string | number | null) => void; // <-- update here
  className?: string;
  name?: string;
  size?: "small" | "medium";
}

const SearchSelect: FC<SearchSelectProps> = ({
  className,
  options,
  value,
  onChange,
  name,
  size = "small",
}) => {
  const selectedOption =
    options.find((option) => option.value === value) || null;

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      value={selectedOption}
      onChange={(_, newValue) =>
        onChange(name ?? "", newValue ? newValue.value : null)
      }
      isOptionEqualToValue={(option, value) => option.value === value.value}
      className={className}
      size={size}
      fullWidth
      renderInput={(params) => (
        <TextField {...params} name={name} size={size} />
      )}
    />
  );
};

export default SearchSelect;
