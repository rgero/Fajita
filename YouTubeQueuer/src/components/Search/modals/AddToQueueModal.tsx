import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';

import Modal from '../../ui/Modal';
import VideoCard from '../../ui/VideoCard';
import { Visibility } from '../../../interfaces/Visibility';
import VisibilityGroup from '../../ui/VisibilityGroup';
import { YoutubeResponse } from "../../../interfaces/YoutubeResponse";
import { useQueueProvider } from '../../../context/QueueContext';
import { useState } from 'react';

interface Props {
  open: boolean,
  videoData: YoutubeResponse,
  closeFn: () => void
}

const AddToQueueModal: React.FC<Props> = ({open, videoData, closeFn}) => {
  const [playNext, setPlayNext] = useState(false);
  const [selectedVisibility, setSelected] = useState<number>(Visibility.Normal);
  const {addVideoToQueue} = useQueueProvider();

  const handleSubmit = () => {
    setPlayNext(false);
    addVideoToQueue(videoData.id, playNext, selectedVisibility);
    closeFn();
  }

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setPlayNext(event.target.checked);
  }

  return (
    <Modal
      open={open}
      closeFn={closeFn}
    >
      <Grid container direction="column">
        <VideoCard data={videoData}/>
        <Grid item>
          <Grid item>
            <VisibilityGroup selected={selectedVisibility} setSelected={setSelected}/>
          </Grid>
          <Grid container direction="row" justifyContent="flex-end" spacing={3} alignItems="center" sx={{paddingTop: 2}}>
            <Grid item>
              <FormControlLabel 
                labelPlacement="start" 
                control={<Checkbox onChange={handleToggle} value={playNext}/>} 
                label="Play Next?" 
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSubmit} color="success">Add</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AddToQueueModal
