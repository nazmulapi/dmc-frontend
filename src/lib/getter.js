// import { authTokenKey, apiBaseUrl } from "./config";

export const getLoggedInUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};
