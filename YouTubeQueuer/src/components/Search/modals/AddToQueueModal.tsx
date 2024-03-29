import { Button, Checkbox, FormControlLabel, Grid, Modal } from '@mui/material';

import ModalCard from './ModalCard';
import { YoutubeResponse } from "../../../interfaces/YoutubeResponse";
import { useState } from 'react';

interface Props {
  open: boolean,
  videoData: YoutubeResponse,
  closeFn: () => void
  submitFn: (playNext: boolean) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '80%', md: "45%"},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

const AddToQueueModal: React.FC<Props> = ({open, videoData, closeFn, submitFn}) => {
  const [playNext, setPlayNext] = useState(false);

  const handleSubmit = () => {
    const isPlayNext = playNext;
    setPlayNext(false);
    submitFn(isPlayNext);
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
        <ModalCard videoData={videoData}/>
        <Grid item>
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
