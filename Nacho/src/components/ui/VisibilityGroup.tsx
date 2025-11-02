import { Box, ButtonGroup } from "@mui/material"

import { Visibility } from '@interfaces/Visibility';
import VisibilityButton from "./VisibilityButton";

interface Props {
  selected: number,
  setSelected: (e: number) => void
}

const VisibilityGroup: React.FC<Props> = ({selected, setSelected}) => {
  const processChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedButton = parseInt(e.currentTarget.getAttribute("id") as string);
    setSelected(selectedButton);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingTop: "0.5rem",
      }}
    >
      <ButtonGroup variant="text" size="medium" aria-label="Visibility Button Group" fullWidth>
        <VisibilityButton id={Visibility.Hidden} activeButton={selected} processChange={processChange}>Secret</VisibilityButton>
        <VisibilityButton id={Visibility.Normal} activeButton={selected} processChange={processChange}>Normal</VisibilityButton>
        <VisibilityButton id={Visibility.Notify} activeButton={selected} processChange={processChange}>Shout</VisibilityButton>
      </ButtonGroup>
    </Box>
  )
}

export default VisibilityGroup
