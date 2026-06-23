import { Clear, Lock } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, inputLabelClasses, useTheme } from "@mui/material";

import { useRef } from "react";

const SearchBar = ({value, setValue, additionalFnKeydown, isLocked} : {value: string, setValue: ( result: string) => void, additionalFnKeydown?: () => void, isLocked?: boolean}) => {
  const theme = useTheme(); 
  const inputRef = useRef<HTMLInputElement>(null);

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

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="search field"
        onClick={processClear}
        size="small"
        sx={{
          visibility: value ? 'visible' : 'hidden', 
          opacity: value ? 1 : 0,
          transition: 'opacity 0.3s ease, visibility 0.3s ease'
        }}
      >
        <Clear/>
      </IconButton>
    </InputAdornment>
  )

  const startAdornment = isLocked ? (
    <InputAdornment position="start">
      <Lock color="warning"/>
    </InputAdornment>
  ) : (
    null
  )

  return (
    <TextField
      variant="filled"
      label={ !isLocked ? "Search" : undefined }
      hiddenLabel={isLocked}
      fullWidth
      value={value}
      onChange={(e) => setValue( e.target.value) }
      onKeyDown={processOnKeyDown}
      slotProps={{
        htmlInput: {
          enterKeyHint: "search",
          spellCheck: false,
          ref: inputRef,
        },
        input: {
          startAdornment: startAdornment,
          endAdornment: endAdornment,
        },
        inputLabel: {
          sx: {
            [`&.${inputLabelClasses.shrink}`]: {
              color: `${theme.palette.primary.contrastText}`
            }
          }
        },
      }}
    />
  )
}

export default SearchBar
