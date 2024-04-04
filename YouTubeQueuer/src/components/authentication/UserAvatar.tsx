import { UserResponse, useUser } from "./hooks/useUser";

import { Avatar } from "@mui/material";
import HeaderMenu from "../ui/HeaderMenu";
import { useState } from "react";

const UserAvatar = () => {
  const {user}: UserResponse = useUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar onClick={handleClick}>{user?.name[0]}</Avatar>
      <HeaderMenu anchorEl={anchorEl} closeFn={handleClose}/>
    </>  
  )
}

export default UserAvatar
