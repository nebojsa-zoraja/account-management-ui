import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";

interface SelectDropdownProps {
  options: Array<{ value: string | number; label: string }>;
  value: string | number;
  onChange: (e: SelectChangeEvent<string | number>) => void;
  className?: string;
  name?: string;
  size?: "small" | "medium";
}

const SelectDropdown: FC<SelectDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  name,
  size = "small",
}) => {
  return (
    <Select
      name={name}
      size={size}
      className={className}
      fullWidth
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectDropdown;
