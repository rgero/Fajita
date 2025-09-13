import { Divider, Menu } from "@mui/material";

import { Interaction } from "../../interfaces/Interaction";
import StashMenuOption from "./options/StashMenuOption";
import TimeAddedMenuOption from "./options/TimeAddedMenuOption";
import YoutubeMenuOption from "./options/YoutubeMenuOption";

interface QueueInfoMenuProps {
  data: Interaction;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const QueueInfoMenu: React.FC<QueueInfoMenuProps> = ({data, anchorEl, open, onClose}) => {  
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <TimeAddedMenuOption data={data} />
      <Divider/>
      <StashMenuOption youtubeId={data.youtube_id} onClose={onClose} />
      <YoutubeMenuOption youtubeId={data.youtube_id} onClose={onClose} />
    </Menu>
  );
};

export default QueueInfoMenu;
