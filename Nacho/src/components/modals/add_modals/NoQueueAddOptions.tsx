import { Favorite, FavoriteBorder, Share, YouTube } from "@mui/icons-material";

import Button from '../../ui/Button';
import { Grid } from "@mui/material";
import InfoSection from "../ui/InfoSection";
import { OpenYouTubeURL } from "@utils/OpenYoutubeURL";
import { copyVideoIDToClipboard } from "@utils/CopyToClipboard";
import toast from "react-hot-toast";
import { useSearchContext } from "@context/search/SearchContext";
import { useSettings } from "@context/settings/SettingsContext";
import { useStashContext } from "@context/stash/StashContext";

const NoQueueAddOptions = () => {
  const {isInStash, addVideoToStash, deleteVideoFromStash} = useStashContext();
  const {selectedResult} = useSearchContext();
  const {shareOptions} = useSettings();
  
  if (!selectedResult) return;
  const targetID = "video" in selectedResult ? selectedResult.video.video_id : selectedResult.id;

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
  }

  return (
    <InfoSection>
      <Grid size={12} container justifyContent={"center"} sx={{paddingTop: 1}}>
          <Grid container direction="row" spacing={1} alignItems="center">
            {shareOptions.clipboard ? (
              <Grid>
                <Button onClick={()=> copyVideoIDToClipboard(targetID)} icon={(<Share/>)} title="Copy"/>
              </Grid>
            ) : null }
            {shareOptions.youtube ? (
              <Grid>
                <Button onClick={() => OpenYouTubeURL(targetID)} icon={(<YouTube color="error"/>)} title="YouTube"/>
              </Grid>   
            ) : null }
            <Grid>
              <Button onClick={processStash} icon={isInStash(targetID) ? <Favorite/> : <FavoriteBorder/>} title="Stash" color={isInStash(targetID) ? "error" : "default"}/>
            </Grid>
          </Grid>
      </Grid>
    </InfoSection>
  )
}

export default NoQueueAddOptions
