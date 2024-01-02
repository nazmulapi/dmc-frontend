import axios from "axios";
import { cookies } from "next/headers";
import { apiBaseUrl, authTokenKey, authUserKey } from "./config";

// const MAX_RETRIES = 3;
// const TIMEOUT = 5000; // Timeout in milliseconds

const api = axios.create({
  baseURL: apiBaseUrl,
  // timeout: TIMEOUT,
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
  let user = cookieStore.get(authUserKey);
  // console.log(user, token);

  if (!token?.value || !user?.value) {
    return false;
  } else {
    setAuthToken(token?.value);
    try {
      const checkToken = await api.get(`/employee/${user?.value}/`);
      // console.log(checkToken);
      if (!(checkToken?.data?.employee_id === user.value)) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
};

export default api;
