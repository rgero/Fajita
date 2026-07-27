import { Favorite, FavoriteBorder } from "@mui/icons-material";

import Button from "@components/ui/Buttons/Button";
import { Grid } from "@mui/material";
import toast from "react-hot-toast";
import { useStashContext } from "@context/stash/StashContext";

const StashButton: React.FC<{ targetID: string; disabled?: boolean }> = ({ targetID, disabled = false }) => {
  const { isInStash, addVideoToStash, deleteVideoFromStash } = useStashContext();

  const isStashed = isInStash(targetID);
  
  const IconComponent = isStashed ? Favorite : FavoriteBorder;
  const iconColor = disabled ? "disabled" : isStashed ? "error" : "inherit";

  const processStash = async () => {
    if (disabled) return;
    try {
      if (isStashed) {
        await deleteVideoFromStash(targetID);
        toast.success("Video Removed from Stash");
      } else {
        await addVideoToStash(targetID);
        toast.success("Video Added to Stash");
      }
    } catch {
      toast.error("Error Stashing Video");
    }
  };

  return (
    <Grid>
      <Button 
        onClick={processStash} 
        icon={<IconComponent color={iconColor} />} 
        title="Stash" 
        color={isStashed ? "error" : "default"} 
        disabled={disabled}
      />
    </Grid>
  );
};

export default StashButton;