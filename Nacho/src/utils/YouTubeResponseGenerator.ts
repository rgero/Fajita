import { Interaction } from '@interfaces/Interaction';
import { YoutubeResponse } from '@interfaces/YoutubeResponse';

export const getVideoData = (targetInteraction: Interaction|null): YoutubeResponse | null => {
  const currentlySelected = targetInteraction;
  if (!currentlySelected || !currentlySelected.video) return null;

  return {
    id: currentlySelected.video.video_id,
    title: currentlySelected.video.title,
    thumbnail_src: currentlySelected.video.thumbnail,
    duration: currentlySelected.video.duration,
  };
};
