import { MenuItem, Typography } from "@mui/material"
import { formatDistanceToNow, isValid } from "date-fns"

import { Interaction } from '@interfaces/Interaction';
import { toZonedTime } from "date-fns-tz";

interface TimeAddedMenuOptionProps {
  data: Interaction
}

const TimeAddedMenuOption = ({data}: TimeAddedMenuOptionProps) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(data.created_at);
  const addedAt = data.created_at ? new Date(data.created_at) : null;
  console.log(addedAt);
  const localDate = addedAt && isValid(addedAt) ? toZonedTime(addedAt, timeZone) : null;
  return (
    <MenuItem style={{ pointerEvents: 'none' }}>
      <Typography>{localDate ? `Added ${formatDistanceToNow(localDate, { addSuffix: true })}` : "Added time unavailable"}</Typography>
    </MenuItem>
  )
}

export default TimeAddedMenuOption
