import { AddCircle, CheckBox, CheckBoxOutlineBlank, Favorite, FavoriteBorder } from '@mui/icons-material';

import Button from '../../ui/Button';
import FajitaButton from "../../ui/Button"
import { Grid } from "@mui/material"
import InfoSection from './InfoSection';
import { Priority } from '../../../interfaces/Priority';
import { Visibility } from '../../../interfaces/Visibility';
import VisibilityGroup from "../../ui/VisibilityGroup"
import toast from 'react-hot-toast';
import { useStashProvider } from "../../../context/StashContext";

interface AddToQueueOptionsProps {
  children?: React.ReactNode;
  priority: Priority;
  selectedVisibility: Visibility;
  setVisibility: (visibility: Visibility) => void;
  videoData: { id: string };
  runChecksAndSubmit: () => void;
  handleToggle: () => void;
}

const AddToQueueOptions: React.FC<AddToQueueOptionsProps> = ({children = null, priority, selectedVisibility, setVisibility, videoData, runChecksAndSubmit, handleToggle}) => {
  const {isInStash, addVideoToStash, deleteVideoFromStash} = useStashProvider();

  const processStash = async () => {
    try {
      if (isInStash(videoData.id)) {
        await deleteVideoFromStash(videoData.id);
        toast.success("Video Removed from Stash");
      } else {
        await addVideoToStash(videoData.id);
        toast.success("Video Added to Stash");
      }
    } catch {
      toast.error("Error Stashing Video");
    }
  }

  return (
    <InfoSection>
      <Grid item>
        <VisibilityGroup selected={selectedVisibility} setSelected={setVisibility}/>
      </Grid>
      <Grid container justifyContent={"space-between"} sx={{paddingTop: 2}}>
        {children ? (
          <Grid item>
            <Grid container direction="row" spacing={1} alignItems="center">
              {children}
            </Grid>
          </Grid>
        ) : (
          <Grid item>
            <Button onClick={processStash} icon={isInStash(videoData.id) ? <Favorite color="error"/> : <FavoriteBorder/>} title="Stash"/>
          </Grid>
        )}
        <Grid item>
          <Grid container direction="row" spacing={1} justifyContent="flex-end" alignItems="center">
            <Grid item>
              <FajitaButton onClick={handleToggle} icon={priority === Priority.playNext ? <CheckBox color="success"/> : <CheckBoxOutlineBlank/>} title="Play Next"/>
            </Grid>
            <Grid item>
              <FajitaButton onClick={runChecksAndSubmit} icon={(<AddCircle color="success"/>)} title="Add"/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </InfoSection>
  )
}

export default AddToQueueOptions
