import { Menu, MenuItem, Typography } from "@mui/material";

import { Interaction } from "../../interfaces/Interaction";
import { formatDistanceToNow } from "date-fns";

interface QueueInfoMenuProps {
  data: Interaction;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const QueueInfoMenu: React.FC<QueueInfoMenuProps> = ({data, anchorEl, open, onClose}) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem>
        <Typography>{formatDistanceToNow(data.created_at, { addSuffix: true })}</Typography>
      </MenuItem>
    </Menu>
  );
};

export default QueueInfoMenu;
