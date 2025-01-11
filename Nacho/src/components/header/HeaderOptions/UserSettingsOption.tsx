import HeaderMenuOption from "./HeaderMenuOption";
import { Settings } from "@mui/icons-material";

const UserSettingsOption = ({setOpen} : {setOpen : (open: boolean) => void}) => {
  return (
    <HeaderMenuOption icon={<Settings/>} text="Settings" onClick={() => setOpen(true)}/>
  )
}

export default UserSettingsOption
