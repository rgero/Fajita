import { CookieJSON } from "../interfaces/CookieJSON";
import axios from "axios";

interface keyable {
  [key: string]: string  
}

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export const getCurrentUser = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get_user_info`)
    .then( (response) => {
      if (response.status == 200 && response.data)
      {
        return response.data;
      }
    })
    .catch( (err) => {
    if (err.response.status == 401)
    {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/login`;
    }
  });
  return response;
}

export const logoutCurrentUser = () => {
  // Got to tell about Logout here?
  deleteAllCookies();
}