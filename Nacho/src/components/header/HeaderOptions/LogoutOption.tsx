import HeaderMenuOption from "./HeaderMenuOption";
import { Logout } from "@mui/icons-material";
import { deleteAllCookies } from "../../../services/apiAuthentication";

const LogoutOption = () => {
  const handleLogout = () =>
    {
      deleteAllCookies();
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`;
    }

  return (
    <HeaderMenuOption icon={<Logout/>} text="Log out" onClick={handleLogout}/>
  )
}

export default LogoutOption
