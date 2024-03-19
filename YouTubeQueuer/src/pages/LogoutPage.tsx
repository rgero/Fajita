import { deleteAllCookies } from "../services/apiAuthentication";
import { useEffect } from "react";

const LogoutPage = () => {
  useEffect( ()=> {
    deleteAllCookies();
  },[])

  return (
    <div>
      
    </div>
  )
}

export default LogoutPage
