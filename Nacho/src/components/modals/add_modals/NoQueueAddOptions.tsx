import { Grid, Stack, Typography } from "@mui/material";

import Button from '../../ui/Buttons/Button';
import { Close } from "@mui/icons-material";
import InfoSection from "../ui/InfoSection";
import ShareButtons from "../../ui/Buttons/ShareButtons";
import StashButton from "../../ui/Buttons/StashButton";
import { useModalContext } from "@context/modal/ModalContext";
import { useSearchContext } from "@context/search/SearchContext";

const NoQueueAddOptions = () => {
  const {toggleAddToQueueModalOpen} = useModalContext();
  const {selectedResult} = useSearchContext();
  
  if (!selectedResult) return;
  const targetID = "video" in selectedResult ? selectedResult.video.video_id : selectedResult.id;


  return (
    <InfoSection>
      <Stack spacing={2} sx={{ alignItems: "center", width: "100%" }}>
          <Typography>No Queue Connected</Typography>
          <Grid container size={12} spacing={1} sx={{ justifyContent: "space-evenly", alignItems: "center" }}>
              <ShareButtons targetID={targetID} />
              <StashButton targetID={targetID} />
              <Button onClick={toggleAddToQueueModalOpen} icon={<Close/>} title="Close"/>
          </Grid>
      </Stack>
    </InfoSection>
  )
}

export default NoQueueAddOptions
