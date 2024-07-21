import { Button, Checkbox, FormControlLabel, Grid, Modal, useTheme } from '@mui/material';

import VideoCard from '../../ui/VideoCard';
import { Visibility } from '../../../interfaces/Visibility';
import VisibilityGroup from '../../ui/VisibilityGroup';
import { YoutubeResponse } from "../../../interfaces/YoutubeResponse";
import { offsetHexColor } from '../../../utils/HexColorOffset';
import { useState } from 'react';

interface Props {
  open: boolean,
  videoData: YoutubeResponse,
  closeFn: () => void
  submitFn: (playNext: boolean, visibility: number) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '80%', md: "45%"},
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const AddToQueueModal: React.FC<Props> = ({open, videoData, closeFn, submitFn}) => {
  const [playNext, setPlayNext] = useState(false);
  const [selectedVisibility, setSelected] = useState<number>(Visibility.Normal);

  const theme = useTheme();
  const colorOffset = 30;
  style.bgcolor = theme.palette.mode == "light" ? 'background.paper' : offsetHexColor(theme.palette.background.paper, colorOffset);

  const handleSubmit = () => {
    const isPlayNext = playNext;
    setPlayNext(false);
    submitFn(isPlayNext, selectedVisibility);
  }

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
    setPlayNext(event.target.checked);
  }

  return (
    <Modal
      open={open}
      onClose={closeFn}
    >
      <Grid container direction="column" sx={style}>
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
