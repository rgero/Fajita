import { AddCircle, DoNotDisturb } from '@mui/icons-material';
import { Grid, Typography } from "@mui/material"

import FajitaButton from "../../ui/Button"
import InfoSection from './InfoSection';

interface IsInQueueWarningProps {
  handleInQueue: (accepted: boolean) => void;
}

const IsInQueueWarning: React.FC<IsInQueueWarningProps> = ({ handleInQueue }) => {
  return (
    <InfoSection>
      <Grid item>
        <Typography variant="h6">Warning: This video is already in the queue.</Typography>
      </Grid>
      <Grid item>
        <Grid container justifyContent="space-around">
          <Grid item>
            <FajitaButton onClick={() => handleInQueue(false)} icon={<DoNotDisturb />} title="Cancel"/>
          </Grid>
          <Grid item>
            <FajitaButton onClick={() => handleInQueue(true)} icon={<AddCircle color="success"/>} title="Add"/>
          </Grid>
        </Grid>
      </Grid>
    </InfoSection>
  )
}

export default IsInQueueWarning
