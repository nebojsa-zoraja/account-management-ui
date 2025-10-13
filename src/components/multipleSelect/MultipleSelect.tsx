import { Autocomplete, TextField } from "@mui/material";
import React from "react";

interface MultipleSelectProps<T> {
  styles: { [key: string]: string };
  setFunction: React.Dispatch<React.SetStateAction<any>>;
  objectState: any;
  options: { label: string; value: T }[];
  name: string;
}

const MultipleSelect = <T,>({
  styles,
  setFunction,
  objectState,
  options,
  name,
}: MultipleSelectProps<T>) => {
  return (
    <Autocomplete
      className={styles["input-field"]}
      multiple
      options={options}
      renderInput={(params) => <TextField {...params} />}
      size="small"
      onChange={(event, newValue) =>
        setFunction((prev: any) => ({
          ...prev,
          [name]: newValue.map((item) => item.value as T),
        }))
      }
      value={
        options.filter((option) =>
          objectState[name].includes(option.value as T)
        ) || []
      }
    />
  );
};

export default MultipleSelect;
