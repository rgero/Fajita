import { IconButton, useTheme } from "@mui/material"
import { useMemo, useState } from "react";

import { Interaction } from "../../interfaces/Interaction";
import { MoreVert } from "@mui/icons-material"
import QueueInfoMenu from "./QueueInfoMenu"
import { useSettings } from "../../context/SettingsContext";

interface QueueInfoButtonProps {
  interaction: Interaction;
  disableHanded?: boolean;
  smallButton?: boolean;
  offset?: string;
}


const QueueInfoButton = ({interaction, disableHanded = false, smallButton = false, offset = "10px"}: QueueInfoButtonProps) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const {isRightHanded} = useSettings();
  const isMenuOpen = Boolean(menuAnchorEl);
  const theme = useTheme();

  const overlayButtonStyle = useMemo(() => ({
    position: "absolute",
    top: offset,
    ...(!disableHanded && isRightHanded
      ? { right: offset }
      : { left: offset }),
    ...(smallButton && {
      padding: "4px",
      width: "32px",
      height: "32px",
      left: "5px",
    }),
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    '&:focus': {
      backgroundColor: theme.palette.background.paper,
    },
    '&:active': {
      backgroundColor: theme.palette.background.paper,
    },
  }), [disableHanded, isRightHanded, theme, smallButton]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <IconButton
        sx={overlayButtonStyle}
        onClick={handleMenuOpen}
        aria-label="Options"
        color={isMenuOpen ? "warning" : "default"}
      >
        <MoreVert/>
      </IconButton>
      <QueueInfoMenu
        data={interaction}
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
      />
    </>
  )
}

export default QueueInfoButton
