import { Feedback } from "@mui/icons-material";
import HeaderMenuOption from "./HeaderMenuOption";
import { useNavigate } from "react-router-dom";

const FeedbackOption = () => {
  const navigate = useNavigate();
  return (
    <HeaderMenuOption icon={<Feedback />} text="Log Feedback" onClick={()=> navigate('/feedback')} />
  )
}

export default FeedbackOption
