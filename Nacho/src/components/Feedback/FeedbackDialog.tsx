import { Container } from "@mui/material"
import Dialog from "../ui/Dialog"
import FeedbackForm from "./FeedbackForm"

const FeedbackDialog = ({open, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) => {
  return (
    <Dialog open={open} setOpen={setOpen} title={"Feedback"}>
      <Container sx={{marginTop: "20px"}}>
        <FeedbackForm/>
      </Container>
    </Dialog>
  )
}

export default FeedbackDialog
