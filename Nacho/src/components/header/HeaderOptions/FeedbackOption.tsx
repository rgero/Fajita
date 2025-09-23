import { Feedback } from "@mui/icons-material";
import HeaderMenuOption from "./HeaderMenuOption";
import { useDialogContext } from "../../../context/dialog/DialogContext";

const FeedbackOption = () => {
  const {toggleFeedbackOpen} = useDialogContext();
  return (
    <HeaderMenuOption icon={<Feedback />} text="Log Feedback" onClick={toggleFeedbackOpen} />
  )
}

export default FeedbackOption
