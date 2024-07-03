import { ReactElement } from "react";
import { SvgIconProps } from "@mui/material";

export interface DrawerOption {
  key: string,
  label: string,
  icon: ReactElement<SvgIconProps>,
  func: () => void
}