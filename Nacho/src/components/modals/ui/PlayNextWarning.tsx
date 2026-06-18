import { Box, Grid, Typography } from "@mui/material"
import { SelfImprovement, Speed, Star } from '@mui/icons-material';

import Button from "../../ui/Button"
import InfoSection from "./InfoSection";
import { PlayNextCondition } from "../interfaces/PlayNextCondition";

interface PlayNextWarningProps {
  handleSubmit: (condition: PlayNextCondition) => void;
}

const PlayNextWarning: React.FC<PlayNextWarningProps> = ({ handleSubmit }) => {
  return (
    <InfoSection>
      <Box sx={{ alignSelf: "center" }}>
        <Typography variant="h6">Warning: Someone else has used their play next.</Typography>
      </Box>
      <Grid container sx={{ justifyContent: "space-around" }}>
          <Button onClick={() => handleSubmit(PlayNextCondition.Rejected)} icon={<Speed/>} title="Nevermind"/>
          <Button onClick={() => handleSubmit(PlayNextCondition.Accepted)} icon={<SelfImprovement color="warning"/>} title="I'll wait"/>
          <Button onClick={() => handleSubmit(PlayNextCondition.Impatient)} icon={<Star color="success"/>} title="Me First!"/>
        </Grid>
    </InfoSection>
  )
}

export default PlayNextWarning
