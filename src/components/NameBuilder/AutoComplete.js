import React, { useState, useEffect } from "react";
import { TextField, FormControl, Paper, MenuItem } from "@material-ui/core";

export default function AutoComplete({
  optionsList,
  label,
  onChange,
  value,
  renderOption,
}) {
  useEffect(() => {}, []);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const handleItemClick = (obj) => {
    setInputValue(renderOption(obj));
    onChange(obj);
  };
  const valueLabel = renderOption(value);
  useEffect(() => {
    if (inputValue === valueLabel) setOpen(false);
    else if (inputValue !== "") setOpen(true);
    else setOpen(false);
  }, [inputValue, value, valueLabel]);

  const inputProps = {
    onFocus: () => {
      setOpen(true);
    },
  };
  return (
    <FormControl style={{ maxHeight: 200 }}>
      <TextField
        variant='outlined'
        label={label}
        inputProps={inputProps}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      {open && (
        <Paper>
          {optionsList
            .filter((option) => {
              const str = renderOption(option);
              const reg = new RegExp(inputValue, "i");
              return reg.test(str);
            })
            .map((option) => (
              <MenuItem onClick={() => handleItemClick(option)}>
                {renderOption(option)}
              </MenuItem>
            ))}
        </Paper>
      )}
    </FormControl>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
