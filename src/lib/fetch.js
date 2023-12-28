import Cookies from "js-cookie";
import axios from "axios";
import { authTokenKey, apiBaseUrl } from "./config";

const MAX_RETRIES = 3;
const TIMEOUT = 100; // Timeout in milliseconds

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
  let token = Cookies.get(authTokenKey);

  if (token === undefined || token === null) {
    return false;
  } else {
    setAuthToken(token);

    for (let retryCount = 0; retryCount < MAX_RETRIES; retryCount++) {
      try {
        const check = await api.get("/employee_permission/check");
        if (check?.data?.Access) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
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
    }
  }
};

export const fetchEmployee = async () => {
  let token = Cookies.get(authTokenKey);
  setAuthToken(token);

  try {
    const check = await api.get("/employee/");
    return check;
    if (check?.data?.Access) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
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

export const fetchEmployeeDataFromMis = async (employeeId) => {
  let token = Cookies.get(authTokenKey);
  setAuthToken(token);

  const response = await api.get(`/employee/mis/${employeeId}/`);
  return response?.data?.message;
};

export default api;
