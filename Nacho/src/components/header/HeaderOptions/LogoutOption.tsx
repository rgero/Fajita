import HeaderMenuOption from "./HeaderMenuOption";
import { Logout } from "@mui/icons-material";

const LogoutOption = () => {
  const handleLogout = () =>
    {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/logout`;
    }

  return (
    <HeaderMenuOption icon={<Logout/>} text="Log out" onClick={handleLogout}/>
  )
}

export default LogoutOption
