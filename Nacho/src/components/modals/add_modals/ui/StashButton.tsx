import { Favorite, FavoriteBorder } from "@mui/icons-material";

import Button from "@components/ui/Button";
import { Grid } from "@mui/material";
import toast from "react-hot-toast";
import { useStashContext } from "@context/stash/StashContext";

const StashButton: React.FC<{ targetID: string }> = ({ targetID }) => {
  const { isInStash, addVideoToStash, deleteVideoFromStash } = useStashContext();

  const processStash = async () => {
    try {
      if (isInStash(targetID)) {
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
      <Button onClick={processStash} icon={isInStash(targetID) ? <Favorite/> : <FavoriteBorder/>} title="Stash" color={isInStash(targetID) ? "error" : "default"}/>
    </Grid>
  );
};

export default StashButton