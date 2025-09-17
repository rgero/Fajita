import CopyMenuOption from "./options/CopyMenuOption";
import { Menu } from "@mui/material";
import StashMenuOption from "./options/StashMenuOption";
import YoutubeMenuOption from "./options/YoutubeMenuOption";
import { useSettings } from "../../context/SettingsContext";

interface SearchMenuProps {
  youtubeId: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const InfoMenu: React.FC<SearchMenuProps> = ({youtubeId, anchorEl, open, onClose}) => {
  const { infoOptions } = useSettings();
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      {infoOptions.stash && ( <StashMenuOption youtubeId={youtubeId} onClose={onClose} />)}
      {infoOptions.youtube && ( <YoutubeMenuOption youtubeId={youtubeId} onClose={onClose} />)}
      {infoOptions.clipboard && ( <CopyMenuOption youtubeId={youtubeId} onClose={onClose} />)} 
    </Menu>
  );
};

export default InfoMenu;
