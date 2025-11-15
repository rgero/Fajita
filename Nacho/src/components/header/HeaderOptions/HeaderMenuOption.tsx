import { MenuItem, SvgIconProps, Typography } from "@mui/material";

import { ReactElement } from "react";

interface GenericMenuItemProps {
  icon: ReactElement<SvgIconProps>;
  text: string;
  color: string;
  onClick?: () => void;
}

const HeaderMenuOption = ({ icon, text, color = "", onClick }: GenericMenuItemProps) => {
  return (
    <MenuItem onClick={onClick ? onClick : () => {}}>
      {icon}
      <Typography sx={{ marginLeft: "5px" }} color={color}>{text}</Typography>
    </MenuItem>
  );
};

export default HeaderMenuOption;
