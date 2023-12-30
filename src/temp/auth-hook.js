import { useEffect, useState } from "react";
// import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import axios from "axios";
import { authTokenKey, apiBaseUrl } from "../lib/config";

const MAX_RETRIES = 3;
const TIMEOUT = 100; // Timeout in milliseconds

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

export const useAuth = () => {
  const [state, setState] = useState({
    isLoading: true,
    error: false,
    user: {},
  });

  useEffect(() => {
    const checkIsAuthenticated = async () => {
      let token = Cookies.get(authTokenKey);

      if (token === undefined || token === null) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isError: false,
        }));
      } else {
        setAuthToken(token);

        for (let retryCount = 0; retryCount < MAX_RETRIES; retryCount++) {
          try {
            const check = await api.get("/employee_permission/check");
            if (check?.data?.Access) {
              // return true;
              setState((prev) => ({
                ...prev,
                isLoading: false,
                isError: false,
              }));
              return;
            } else {
              // return false;
              setState((prev) => ({
                ...prev,
                isLoading: false,
                isError: false,
              }));
              return;
            }
          } catch (error) {
            setState((prev) => ({ ...prev, isLoading: false, isError: true }));
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
        }
      }
    };

    checkIsAuthenticated();

    // if (error || !data?.isAuthenticated) {
    //   router.push('/login'); // Redirect to the login page if not authenticated
    // }
  }, []);

  return {
    isLoading: state?.isLoading,
    user: state?.user,
    error: state?.error,
  };
};
