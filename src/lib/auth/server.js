import { cookies } from "next/headers";
import axios from "axios";
import { authTokenKey, apiBaseUrl } from "../config";

const MAX_RETRIES = 3;
const TIMEOUT = 5000; // Timeout in milliseconds

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: TIMEOUT,
});

// Function to set the Bearer Token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const checkIsAuthenticated = async () => {
  const cookieStore = cookies();
  let token = cookieStore.get(authTokenKey);
  // let user = cookieStore.get("user");

  if (token === undefined || token === null) {
    return false;
  } else {
    setAuthToken(token);
    // const check = await api.get("/employee/DMC24/");
    // console.log(check);
    return true;
    if (check?.employee_id) {
      return true;
    } else {
      return false;
    }
  }
};

export default api;
