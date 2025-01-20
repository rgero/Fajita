import { IconButton, InputAdornment, TextField, inputLabelClasses, useTheme } from "@mui/material";

import { Clear } from "@mui/icons-material";
import { useRef } from "react";

const SearchBar = ({value, setValue, additionalFnKeydown} : {value: string, setValue: ( result: string) => void, additionalFnKeydown?: () => void}) => {
  const theme = useTheme(); 
  const inputRef = useRef<HTMLInputElement>();

  const processClear = () => {
    setValue( "" );
    if (inputRef.current)
    {
      inputRef.current.focus();
    }
  }

  const processOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter")
    {
      (e.target as HTMLElement).blur();
      if (additionalFnKeydown)
      {
        additionalFnKeydown();
      }
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
      onKeyDown={processOnKeyDown}
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
