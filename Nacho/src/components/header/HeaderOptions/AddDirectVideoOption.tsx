import HeaderMenuOption from "./HeaderMenuOption"
import { VideoLibrary } from "@mui/icons-material"
import { useModalContext } from "@context/modal/ModalContext";
import { useQueueContext } from "@context/queue/QueueContext";
import { useSettings } from "@context/settings/SettingsContext";

const AddDirectVideoOption = () => {
  const {toggleAddDirectModalOpen} = useModalContext();
  const {isConnected} = useQueueContext();
  const {enableExperimental} = useSettings();

  if (!enableExperimental || !isConnected) return null;

  return (
    <HeaderMenuOption 
      icon={<VideoLibrary/>} 
      text="Add Direct Video"
      onClick={toggleAddDirectModalOpen}
    />
  )
}

export default AddDirectVideoOption
