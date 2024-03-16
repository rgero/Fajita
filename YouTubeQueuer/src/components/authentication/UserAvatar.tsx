import { Avatar } from "@mui/material";
import { useDarkMode } from "../../context/DarkModeContext";

const UserAvatar = () => {
  const { toggleDarkMode } = useDarkMode();

  // This should probably change to the First input Letter.
  return (
    <Avatar onClick={toggleDarkMode} >H</Avatar>  
  )
}

export default UserAvatar
