import { IconButton, InputAdornment, TextField, inputLabelClasses, useTheme } from "@mui/material";

import { Clear } from "@mui/icons-material";
import { useRef } from "react";

const SearchBar = ({value, setValue, onKeyDown} : {value: string, setValue: ( result: string) => void, onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void}) => {
  const theme = useTheme(); 
  const inputRef = useRef<HTMLInputElement>();

  const processClear = () => {
    setValue( "" );
    if (inputRef.current)
    {
      inputRef.current.focus();
    }
  }

  const endAdornment = value.length != 0 ? (
    <InputAdornment position="end">
      <IconButton
        aria-label="search field"
        onClick={processClear}
        size="small"
      >
        <Clear/>
      </IconButton>
    </InputAdornment>
  ) : (null)

  return (
    <TextField
      variant="filled"
      label="Search"
      fullWidth
      inputRef={inputRef}
      value={value}
      onChange={(e) => setValue( e.target.value) }
      inputProps={{
        enterKeyHint: "search",
        spellCheck: false
      }}
      InputProps={{
        endAdornment: endAdornment
      }}
      onKeyDown={onKeyDown}
      InputLabelProps={{
        sx: {
          [`&.${inputLabelClasses.shrink}`]: {
            color: `${theme.palette.primary.contrastText}`
          }
        }
      }}
    />
  )
}

export default SearchBar
