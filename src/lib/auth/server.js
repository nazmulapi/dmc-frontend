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

  if (token === undefined || token === null) {
    return false;
  } else {
    setAuthToken(token);
    const check = await api.get("/employee_permission/check");
    if (check?.data?.Access) {
      return true;
    } else {
      return false;
    }
  }
};

export default api;
