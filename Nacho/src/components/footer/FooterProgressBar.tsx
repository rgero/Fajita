import { useCallback, useEffect, useState } from "react";

import { LinearProgress } from "@mui/material";
import { useQueueContext } from "@context/queue/QueueContext";
import { useSocketProvider } from "@context/websocket/WebsocketContext";

interface ProgressResponse {
  queue_id: string,
  progress: number
}

const FooterProgressBar = () => {
  const {socket} = useSocketProvider();
  const {queueData} = useQueueContext();
  const [currentProgress, setProgress] = useState<number>(0);
  
  const processProgress = useCallback( (progressResponse: ProgressResponse) => {
    if (progressResponse.queue_id == queueData.id)
    {
      setProgress(progressResponse.progress);
    }
  }, [queueData])

  useEffect(() => {
    if (!socket) return;
    socket.on("player_progress", processProgress);
    return () => {
      socket.off("player_progress", processProgress);
    };
  }, [socket, processProgress]);

  const duration: number = queueData.current_interaction.video.duration;
  const percentComplete = currentProgress / duration;

  return (
    <LinearProgress variant="determinate" value={Math.round(percentComplete * 100)} sx={{marginTop: "5px"}} />
  )
}

export default FooterProgressBar
