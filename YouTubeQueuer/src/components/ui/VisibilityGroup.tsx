import { Box, ButtonGroup } from "@mui/material"

import VisibilityButton from "./VisibilityButton";

interface Props {
  selected: string| null,
  setSelected: (e: string| null) => void
}

const VisibilityGroup: React.FC<Props> = ({selected, setSelected}) => {
  const processChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedButton = e.currentTarget.getAttribute("id");
    setSelected(selectedButton);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingTop: "1rem",
      }}
    >
      <ButtonGroup variant="text" size="medium" aria-label="Visibility Button Group" fullWidth>
        <VisibilityButton id="hidden" activeButton={selected} processChange={processChange}>Secret</VisibilityButton>
        <VisibilityButton id="normal" activeButton={selected} processChange={processChange}>Normal</VisibilityButton>
        <VisibilityButton id="notify" activeButton={selected} processChange={processChange}>Shout</VisibilityButton>
      </ButtonGroup>
    </Box>
  )
}

export default VisibilityGroup
