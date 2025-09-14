import { Artifact } from "../interfaces/Artifact";
import { Interaction } from "../interfaces/Interaction";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

export const copyToClipboard = (interaction: Interaction|Artifact|null) => {
  if (!interaction)
  {
    toast.error("Nothing currently playing to copy")
    return;
  }  
  copy(`https://www.youtube.com/watch?v=${interaction.video.video_id}`)
  toast.success("Copied to clipboard");
}

export const copyVideoIDToClipboard = (videoID: string) => {
  copy(`https://www.youtube.com/watch?v=${videoID}`)
  toast.success("Copied to clipboard");
}
