import { Interaction } from "../interfaces/Interaction";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

export const copyToClipboard = (interaction: Interaction|null) => {
  if (!interaction)
  {
    toast.error("Nothing currently playing to copy")
    return;
  }
  
  copy(`https://www.youtube.com/watch?v=${interaction.video.video_id}`)
  toast.success("Copied to clipboard");
}