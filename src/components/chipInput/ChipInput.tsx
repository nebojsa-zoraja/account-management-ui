import React, { FC, useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import chipStyles from "./ChipInput.module.scss";

interface ChipInputProps {
  label?: string;
  styles: { [key: string]: string };
  selectedItems: string[];
  onItemsChange: (newItems: string[]) => void;
}

const ChipInput: FC<ChipInputProps> = ({
  label = "",
  selectedItems,
  onItemsChange,
  styles,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const trimmedValue = inputValue.trim();

      if (trimmedValue && !selectedItems.includes(trimmedValue)) {
        onItemsChange([...selectedItems, trimmedValue]);
        setInputValue("");
      }
    }
  };

  const handleDelete = (chipToDelete: string) => () => {
    const newItems = selectedItems.filter((chip) => chip !== chipToDelete);
    onItemsChange(newItems);
  };

  return (
    <TextField
      fullWidth
      className={styles["input-field"]}
      variant="outlined"
      label={label}
      placeholder="Unesi vrednost pa stisni , ili Enter"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      size="small"
      InputProps={{
        startAdornment: (
          <Box className={chipStyles["chip-container"]}>
            {selectedItems.map((item) => (
              <Chip key={item} label={item} onDelete={handleDelete(item)} />
            ))}
          </Box>
        ),
      }}
    />
  );
};

export default ChipInput;
