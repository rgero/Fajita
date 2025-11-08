import { Avatar } from "@mui/material";
import HeaderMenu from "../header/HeaderMenu";
import { useAuth } from "@context/authentication/AuthenticationContext";
import { useState } from "react";

const UserAvatar = () => {
  const {user} = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const userAvatarURL = user?.picture ? user.picture : "default-user.jpg";

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar onClick={handleClick} src={userAvatarURL}/>
      <HeaderMenu anchorEl={anchorEl} closeFn={handleClose}/>
    </>  
  )
}

export default UserAvatar
