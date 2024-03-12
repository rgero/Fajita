import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";

import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import UserAvatar from "../authentication/UserAvatar"

const Header = () => {
  const [searchTerm, setTerm] = React.useState("");

  const processSubmit = (e) => {
    e.target.blur();

    // This is where I'd send off to make the request.
    alert(searchTerm);
  }

  return (
    <nav className="sticky top-0 z-25 bg-gray-900 py-4 px-2 flex flex-row gap-x-2 items-center">
      <OutlinedInput
        id="outlined-search"
        type='text'
        className="flex-1"
        value={searchTerm}
        onChange={(e) => setTerm( ()=> e.target.value) }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="search field"
              onClick={processSubmit}
              edge="end"
            >
              <SearchIcon/>
            </IconButton>
          </InputAdornment>
        }
        onKeyDown={(e) => {
          if (e.key === "Enter")
          {
            processSubmit(e);
          }
        }}
      />
      <UserAvatar/>
    </nav>
  )
}

export default Header
