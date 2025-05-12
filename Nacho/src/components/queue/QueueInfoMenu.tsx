import { Menu, MenuItem, Typography } from "@mui/material";

import { Interaction } from "../../interfaces/Interaction";
import { formatDistanceToNow } from "date-fns";
import { toZonedTime } from 'date-fns-tz'

interface QueueInfoMenuProps {
  data: Interaction;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const QueueInfoMenu: React.FC<QueueInfoMenuProps> = ({data, anchorEl, open, onClose}) => {  
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(data.created_at + "Z", timeZone)
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem style={{ pointerEvents: 'none' }}>
        <Typography>Added {formatDistanceToNow(localDate, { addSuffix: true })}</Typography>
      </MenuItem>
    </Menu>
  );
};

export default QueueInfoMenu;
