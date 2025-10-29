import { MenuItem, Typography } from "@mui/material"

import { Interaction } from '@interfaces/Interaction';
import { formatDistanceToNow } from "date-fns"
import { toZonedTime } from "date-fns-tz";

interface TimeAddedMenuOptionProps {
  data: Interaction
}

const TimeAddedMenuOption = ({data}: TimeAddedMenuOptionProps) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(data.created_at + "Z", timeZone)
  return (
    <MenuItem style={{ pointerEvents: 'none' }}>
      <Typography>Added {formatDistanceToNow(localDate, { addSuffix: true })}</Typography>
    </MenuItem>
  )
}

export default TimeAddedMenuOption
