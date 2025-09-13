import { Menu } from "@mui/material";
import StashMenuOption from "./options/StashMenuOption";
import YoutubeMenuOption from "./options/YoutubeMenuOption";

interface SearchMenuProps {
  youtubeId: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const InfoMenu: React.FC<SearchMenuProps> = ({youtubeId, anchorEl, open, onClose}) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <StashMenuOption youtubeId={youtubeId} onClose={onClose} />
      <YoutubeMenuOption youtubeId={youtubeId} onClose={onClose} />
    </Menu>
  );
};

export default InfoMenu;
