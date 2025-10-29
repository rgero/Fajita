import { Favorite } from "@mui/icons-material"
import HeaderMenuOption from "./HeaderMenuOption"
import { useDialogContext } from '@context/dialog/DialogContext';

const StashDisplayOption = () => {
  const {toggleStashOpen} = useDialogContext();
  return (
    <HeaderMenuOption icon={<Favorite/>} text="View Stash" onClick={toggleStashOpen}/>
  )
}

export default StashDisplayOption
