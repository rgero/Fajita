import { useCallback, useEffect, useState } from "react";

import BlankCard from "./BlankCard";
import FooterCard from "./FooterCard";
import { Interaction } from "../../interfaces/Interaction";
import Spinner from "../ui/Spinner";
import { useQueueProvider } from "../../context/queue/QueueContext";
import { useSocketProvider } from "../../context/WebSocketContext";

interface ProgressResponse {
  queue_id: string,
  progress: number
}

const CurrentPlayingPresenter = () => {
  const {socket} = useSocketProvider();
  const {isLoading, queueData} = useQueueProvider();
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

  if (isLoading)
  {
    return (<Spinner/>)
  }

  // If we have nothing in the queue
  if (!queueData.interactions || queueData.interactions.length === 0 || !queueData.current_interaction)
  {
    return (<BlankCard/>)
  }

  const title: string =  queueData.current_interaction.video.title;
  const imageURL: string = queueData.current_interaction.video.thumbnail;
  const targetUser: string = queueData.current_interaction.user.first_name;
  const duration: number = queueData.current_interaction.video.duration;

  const currentIndex = queueData.interactions.findIndex((option: Interaction) => option.index === queueData.current_index) + 1;
  const total = queueData.interactions.length;

  return (<FooterCard title={title} imageURL={imageURL} percentComplete={currentProgress/duration} currentIndex={currentIndex} total={total} user={targetUser}/>)

}

export default CurrentPlayingPresenter
