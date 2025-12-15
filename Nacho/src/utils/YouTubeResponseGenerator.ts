import { QueueData } from '@interfaces/QueueData';
import { YoutubeResponse } from '@interfaces/YoutubeResponse';

export const getVideoData = (queueData: QueueData): YoutubeResponse | null => {
  const currentlySelected = queueData.current_interaction;
  if (!currentlySelected) return null;

  return {
    id: currentlySelected.video.video_id,
    title: currentlySelected.video.title,
    thumbnail_src: currentlySelected.video.thumbnail,
    duration: currentlySelected.video.duration,
  };
};
