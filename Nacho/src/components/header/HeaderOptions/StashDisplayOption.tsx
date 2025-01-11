import { Favorite } from "@mui/icons-material"
import HeaderMenuOption from "./HeaderMenuOption"

const StashDisplayOption = ({setOpen} : {setOpen : (open: boolean) => void}) => {
  return (
    <HeaderMenuOption icon={<Favorite/>} text="View Stash" onClick={() => setOpen(true)}/>
  )
}

export default StashDisplayOption
