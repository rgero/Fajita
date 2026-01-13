import HeaderMenuOption from "./HeaderMenuOption";
import { Person } from "@mui/icons-material";
import { useModalContext } from "@context/modal/ModalContext";

const UserOption = () => {
  const {toggleUserModalOpen} = useModalContext();

  return (
    <HeaderMenuOption 
      icon={<Person/>} 
      text="View Profile"
      onClick={toggleUserModalOpen}
    />
  )
}

export default UserOption
