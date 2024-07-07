import axios from "axios";

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
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get_user_info`, {withCredentials: true})
    .then( (response) => {
      if (response.status == 200 && response.data)
      {
        return response.data;
      }
    })
    .catch( (err) => {
      console.log(err);
  });
  return response;
}

export const logoutCurrentUser = () => {
  deleteAllCookies();
}