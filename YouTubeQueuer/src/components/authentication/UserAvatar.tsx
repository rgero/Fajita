import { Avatar } from "@mui/material";
import { useDarkMode } from "../../context/DarkModeContext";
import { useUser } from "./hooks/useUser";

const UserAvatar = () => {
  const { toggleDarkMode } = useDarkMode();
  const {user} = useUser();

  // This should probably change to the First input Letter.
  return (
    <Avatar onClick={toggleDarkMode} >{user?.name[0]}</Avatar>  
  )
}

export default UserAvatar
