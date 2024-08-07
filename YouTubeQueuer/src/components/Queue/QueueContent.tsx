import { DialogContent, useTheme } from "@mui/material"

import QueueList from "./QueueList"

const QueueContent = () => {
  const theme = useTheme();
  return (
    <DialogContent sx={{background: theme.palette.background.paper, paddingBottom: "120px"}}>
      <QueueList/>
    </DialogContent>
  )
}

export default QueueContent
