import { Grid, Typography } from "@mui/material";

import Button from '../../ui/Button';
import { Close } from "@mui/icons-material";
import InfoSection from "../ui/InfoSection";
import ShareButtons from "../../ui/ShareButtons";
import StashButton from "./ui/StashButton";
import { useModalContext } from "@context/modal/ModalContext";
import { useSearchContext } from "@context/search/SearchContext";

const NoQueueAddOptions = () => {
  const {toggleAddToQueueModalOpen} = useModalContext();
  const {selectedResult} = useSearchContext();
  
  if (!selectedResult) return;
  const targetID = "video" in selectedResult ? selectedResult.video.video_id : selectedResult.id;


  return (
    <InfoSection>
      <Grid size={12} container justifyContent={"center"}>
          <Grid>
            <Typography>No Queue Connected</Typography>
          </Grid>
          <Grid container size={12} justifyContent="space-evenly" direction="row" spacing={1} alignItems="center">
              <ShareButtons targetID={targetID} />
              <StashButton targetID={targetID} />
              <Button onClick={toggleAddToQueueModalOpen} icon={<Close/>} title="Close"/>
          </Grid>
      </Grid>
    </InfoSection>
  )
}

export default NoQueueAddOptions
