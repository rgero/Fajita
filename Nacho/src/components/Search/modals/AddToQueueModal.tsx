import { AddCircle, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

import FajitaButton from '../../ui/Button';
import { Grid } from '@mui/material';
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

  const handleToggle = () => 
  {
    setPlayNext(!playNext);
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
              <FajitaButton onClick={handleToggle} icon={playNext ? <CheckBox color="success"/> : <CheckBoxOutlineBlank/>} title="Play Next"/>
            </Grid>
            <Grid item>
              <FajitaButton onClick={handleSubmit} icon={(<AddCircle color="success"/>)} title="Add"/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AddToQueueModal
