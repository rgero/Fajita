import HeaderMenuOption from "./HeaderMenuOption"
import { VideoLibrary } from "@mui/icons-material"
import { useModalContext } from "@context/modal/ModalContext";
import { useQueueContext } from "@context/queue/QueueContext";

const AddDirectVideoOption = () => {
  const {toggleAddDirectModalOpen} = useModalContext();
  const {isConnected} = useQueueContext();

  if (!isConnected) return null;

  return (
    <HeaderMenuOption 
      icon={<VideoLibrary/>} 
      text="Add Direct Video"
      onClick={toggleAddDirectModalOpen}
    />
  )
}

export default AddDirectVideoOption
