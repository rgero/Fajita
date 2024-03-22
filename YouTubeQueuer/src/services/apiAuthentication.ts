import { CookieJSON } from "../interfaces/CookieJSON";

interface keyable {
  [key: string]: string  
}

const generateCookieJSON = () => {
  const parsedCookie:keyable = document.cookie.split('; ').reduce((prev: keyable, current) => {
    const [name, ...value]: string[] = current.split('=');
    prev[name] = value.join('=');
    return prev;
  }, {});

  return {
    email: parsedCookie.user_email,
    id: parseInt(parsedCookie.user_id),
    name: parsedCookie.first_name
  }
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

export const getCurrentUser = () => {
  const cookieJSON: CookieJSON = generateCookieJSON();
  return cookieJSON;
}

export const logoutCurrentUser = () => {
  // Got to tell about Logout here?
  deleteAllCookies();
}