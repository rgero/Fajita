import { Divider, Menu } from "@mui/material";

import CopyMenuOption from "./options/CopyMenuOption";
import { Interaction } from "../../interfaces/Interaction";
import StashMenuOption from "./options/StashMenuOption";
import TimeAddedMenuOption from "./options/TimeAddedMenuOption";
import YoutubeMenuOption from "./options/YoutubeMenuOption";
import { useSettings } from "../../context/SettingsContext";

interface QueueInfoMenuProps {
  data: Interaction;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const QueueInfoMenu: React.FC<QueueInfoMenuProps> = ({data, anchorEl, open, onClose}) => {
  const { infoOptions } = useSettings();  
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <TimeAddedMenuOption data={data} />
      <Divider/>
      {infoOptions.stash && ( <StashMenuOption youtubeId={data.youtube_id} onClose={onClose} />)}
      {infoOptions.youtube && ( <YoutubeMenuOption youtubeId={data.youtube_id} onClose={onClose} />)}
      {infoOptions.clipboard && ( <CopyMenuOption youtubeId={data.youtube_id} onClose={onClose} />)} 
    </Menu>
  );
};

export default QueueInfoMenu;
