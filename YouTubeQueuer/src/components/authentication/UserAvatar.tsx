import { UserResponse, useUser } from "./hooks/useUser";

import { Avatar } from "@mui/material";
import { useDarkMode } from "../../context/DarkModeContext";

const UserAvatar = () => {
  const { toggleDarkMode } = useDarkMode();
  const {user}: UserResponse = useUser();

  // This should probably change to the First input Letter.
  return (
    <Avatar onClick={toggleDarkMode} >{user?.name[0]}</Avatar>  
  )
}

export default UserAvatar
