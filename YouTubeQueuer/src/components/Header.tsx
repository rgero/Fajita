import { IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import UserAvatar from "../authentication/UserAvatar"
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {

  const processSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <nav className="sticky top-0 z-25 bg-gray-900 py-4 px-2 flex flex-row gap-x-2 items-center">
      <OutlinedInput
        id="outlined-search"
        type='text'
        className="flex-1"
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
      />
      <UserAvatar/>
    </nav>
  )
}

export default Header
