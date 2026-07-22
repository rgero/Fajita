import HeaderMenuOption from "./HeaderMenuOption"
import { VideoLibrary } from "@mui/icons-material"
import { useModalContext } from "@context/modal/ModalContext";
import { useSettings } from "@context/settings/SettingsContext";

const AddDirectVideoOption = () => {
  const {toggleAddDirectModalOpen} = useModalContext();
  const {enableExperimental} = useSettings();

  if (!enableExperimental) return null;

  return (
    <HeaderMenuOption 
      icon={<VideoLibrary/>} 
      text="Add Direct Video"
      onClick={toggleAddDirectModalOpen}
    />
  )
}

export default AddDirectVideoOption
