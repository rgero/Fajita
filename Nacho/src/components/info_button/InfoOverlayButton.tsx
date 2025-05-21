import { IconButton, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

import InfoMenu from "./InfoMenu";
import { MoreVert } from "@mui/icons-material";
import { useSettings } from "../../context/SettingsContext";

interface InfoOverlayButtonProps {
  youtubeId: string;
  disableHanded?: boolean;
  smallButton?: boolean;
}

const InfoOverlayButton = ({youtubeId, disableHanded = false, smallButton = false}: InfoOverlayButtonProps) => {
  const theme = useTheme();
  const { isRightHanded } = useSettings();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);

  const overlayButtonStyle = useMemo(() => ({
    position: "absolute",
    top: "10px",
    ...(!disableHanded && isRightHanded
      ? { right: "10px" }
      : { left: "10px" }),
    ...(smallButton && {
      padding: "4px",
      width: "32px",
      height: "32px",
      left: "5px",
    }),
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
  }), [disableHanded, isRightHanded, theme, smallButton]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
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
        size={smallButton ? "small" : "medium"}
      >
        <MoreVert fontSize={smallButton ? "small" : "medium"} />
      </IconButton>
      <InfoMenu
        youtubeId={youtubeId}
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
      />
    </>
  );
};

export default InfoOverlayButton;
