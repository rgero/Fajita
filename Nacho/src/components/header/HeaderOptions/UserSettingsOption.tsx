import HeaderMenuOption from "./HeaderMenuOption";
import { Settings } from "@mui/icons-material";
import { useDialogContext } from '@context/dialog/DialogContext';

const UserSettingsOption = () => {
  const {toggleSettingsOpen} = useDialogContext();
  return (
    <HeaderMenuOption icon={<Settings/>} text="Settings" onClick={toggleSettingsOpen}/>
  )
}

export default UserSettingsOption
