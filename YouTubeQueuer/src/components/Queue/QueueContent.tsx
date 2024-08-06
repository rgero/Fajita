import { DialogContent, useTheme } from "@mui/material"
import { RefObject, useEffect, useRef, useState } from "react";

import QueueList from "./QueueList"

const QueueContent = () => {
  const theme = useTheme();
  const contentRef: RefObject<HTMLDivElement> = useRef(null);

  const [itemRef, setItemRef] = useState<RefObject<HTMLDivElement>>( useRef(null) );

  useEffect( () => {
    if (itemRef?.current && contentRef.current) {
      const item = itemRef.current;
      console.log(item.offsetTop);
      contentRef.current.scrollTop = item.offsetTop;
    }
  }, [itemRef])

  return (
    <DialogContent ref={contentRef} sx={{background: theme.palette.background.paper}}>
      <QueueList setRef={setItemRef}/>
    </DialogContent>
  )
}

export default QueueContent
