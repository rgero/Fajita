import { IconButton, useTheme } from "@mui/material"

import InfoMenu from "./InfoMenu";
import { MoreVert } from "@mui/icons-material";
import { useSettings } from "../../context/SettingsContext";
import { useState } from "react";

const InfoOverlayButton = ({youtubeId, disableHanded} : {youtubeId: string, disableHanded?: boolean}) => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const {isRightHanded} = useSettings();
  const isMenuOpen = Boolean(menuAnchorEl);

  const styles = {
    overlayButton: {
      position: "absolute",
      top: "10px",
      left: (!disableHanded && isRightHanded) ? null : "10px",
      right: (!disableHanded && isRightHanded) ? "10px" : null,
      zIndex: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };


  return (
    <>
      <IconButton
        sx={styles.overlayButton}
        onClick={handleMenuOpen}
        aria-label="Options"
        color={isMenuOpen ? "warning" : "default"}
      >
        <MoreVert/>
      </IconButton>
      <InfoMenu
        youtubeId={youtubeId}
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
      /> 
    </>
  )
}

export default InfoOverlayButton
