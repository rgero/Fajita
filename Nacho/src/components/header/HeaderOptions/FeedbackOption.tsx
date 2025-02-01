import { Feedback } from "@mui/icons-material";
import HeaderMenuOption from "./HeaderMenuOption";

const FeedbackOption = ({setOpen} : {setOpen : (open: boolean) => void}) => {
  return (
    <HeaderMenuOption icon={<Feedback />} text="Log Feedback" onClick={() => setOpen(true)} />
  )
}

export default FeedbackOption
