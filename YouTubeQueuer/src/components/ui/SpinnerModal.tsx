import { Backdrop, CircularProgress } from "@mui/material"

type Props = {
  isOpen: boolean
}

const SpinnerModal: React.FC<Props> = ({isOpen}) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default SpinnerModal
