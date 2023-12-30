import Cookies from "js-cookie";
import axios from "axios";
import { authTokenKey, apiBaseUrl } from "./config";

// const MAX_RETRIES = 3;
// const TIMEOUT = 100; // Timeout in milliseconds

const api = axios.create({
  // baseURL: "https://crossorigin.me/http://10.10.23.57:8000",
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

export const checkIsAccessible = async (page) => {
  let token = Cookies.get(authTokenKey);
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  if (page === "auth" && (token === undefined || token === null)) {
    return true;
  } else if (page === "main" && (token === undefined || token === null)) {
    return false;
  }

  setAuthToken(token);

  try {
    const check = await api.get(`/employee/${user?.employee_id}/`);

    if (!(check?.data?.employee_id === user.employee_id)) {
      if (page === "auth") {
        return true;
      } else if (page === "main") {
        return false;
      }
    } else {
      if (page === "auth") {
        return false;
      } else if (page === "main") {
        return true;
      }
    }
  } catch (error) {
    // if (page === "auth") {
    //   return true;
    // }
    return;
    // Handle error or retry
    // if (retryCount === MAX_RETRIES - 1) {
    //   // If reached max retries, return false or handle appropriately
    //   return false;
    // }
    // Optionally log the error
    // console.error(
    //   `Request failed, retrying (${retryCount + 1}/${MAX_RETRIES}):`,
    //   error.message
    // );

    // Implement an exponential backoff if needed
    // await new Promise(resolve => setTimeout(resolve, 2 ** retryCount * 1000));
  }
};

export default api;
