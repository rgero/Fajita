import { Grid, Typography } from "@mui/material"
import { SelfImprovement, Speed, Star } from '@mui/icons-material';

import FajitaButton from "../../ui/Button"
import InfoSection from "./InfoSection";
import { PlayNextCondition } from "../interfaces/PlayNextCondition";

interface PlayNextWarningProps {
  handleSubmit: (condition: PlayNextCondition) => void;
}

const PlayNextWarning: React.FC<PlayNextWarningProps> = ({ handleSubmit }) => {
  return (
    <InfoSection>
      <Grid item alignSelf={"center"}>
        <Typography variant="h6">Warning: Someone else has used their play next.</Typography>
      </Grid>
      <Grid item>
        <Grid container justifyContent={"space-around"}>
          <FajitaButton onClick={() => handleSubmit(PlayNextCondition.Rejected)} icon={<Speed/>} title="Nevermind"/>
          <FajitaButton onClick={() => handleSubmit(PlayNextCondition.Accepted)} icon={<SelfImprovement color="warning"/>} title="I'll wait"/>
          <FajitaButton onClick={() => handleSubmit(PlayNextCondition.Impatient)} icon={<Star color="success"/>} title="Me First!"/>
        </Grid>
      </Grid>
    </InfoSection>
  )
}

export default PlayNextWarning
