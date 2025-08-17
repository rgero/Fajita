import { Container } from "@mui/material"
import Dialog from "../ui/Dialog"
import FeedbackForm from "./FeedbackForm"
import { useDialogContext } from "../../context/DialogContext";

const FeedbackDialog = () => {
  const {feedbackOpen, toggleFeedbackOpen} = useDialogContext();
  return (
    <Dialog open={feedbackOpen} setOpen={toggleFeedbackOpen} title={"Feedback"}>
      <Container sx={{marginTop: "20px"}}>
        <FeedbackForm/>
      </Container>
    </Dialog>
  )
}

export default FeedbackDialog
