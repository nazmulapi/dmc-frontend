import Cookies from "js-cookie";
import axios from "axios";
import { authTokenKey, apiBaseUrl } from "./config";

// const MAX_RETRIES = 3;
// const TIMEOUT = 100; // Timeout in milliseconds

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

export const fetcher = async (route) => {
  try {
    let token = Cookies.get(authTokenKey);

    const response = await fetch(apiBaseUrl + route, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.error("Error in fetcher:", error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

// export const checkIsAuthenticated = async () => {
//   let token = Cookies.get(authTokenKey);

//   if (token === undefined || token === null) {
//     return false;
//   } else {
//     setAuthToken(token);

//     for (let retryCount = 0; retryCount < MAX_RETRIES; retryCount++) {
//       try {
//         const check = await api.get("/employee_permission/check");
//         if (check?.data?.Access) {
//           return true;
//         } else {
//           return false;
//         }
//       } catch (error) {
//         return false;
//         // Handle error or retry
//         // if (retryCount === MAX_RETRIES - 1) {
//         //   // If reached max retries, return false or handle appropriately
//         //   return false;
//         // }
//         // Optionally log the error
//         // console.error(
//         //   `Request failed, retrying (${retryCount + 1}/${MAX_RETRIES}):`,
//         //   error.message
//         // );

//         // Implement an exponential backoff if needed
//         // await new Promise(resolve => setTimeout(resolve, 2 ** retryCount * 1000));
//       }
//     }
//   }
// };

// export const fetchEmployee = async () => {
//   let token = Cookies.get(authTokenKey);
//   setAuthToken(token);

//   try {
//     const check = await api.get("/employee/");
//     return check;
//     if (check?.data?.Access) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     return false;
//     // Handle error or retry
//     // if (retryCount === MAX_RETRIES - 1) {
//     //   // If reached max retries, return false or handle appropriately
//     //   return false;
//     // }
//     // Optionally log the error
//     // console.error(
//     //   `Request failed, retrying (${retryCount + 1}/${MAX_RETRIES}):`,
//     //   error.message
//     // );

//     // Implement an exponential backoff if needed
//     // await new Promise(resolve => setTimeout(resolve, 2 ** retryCount * 1000));
//   }
// };

export const fetchEmployeeDataFromMis = async (employeeId) => {
  try {
    let token = Cookies.get(authTokenKey);
    setAuthToken(token);
    // headers["Content-Type"] = "multipart/form-data";
    const response = await api.get(`/employee/mis/${employeeId}/`);
    // console.log(response);

    if (!response.ok) {
      console.error("Error");
      return {
        error: true,
        message: "Failed to get data",
      };
    }

    // console.log("Successful");
    // console.log(response.json());
    // const responseData = await response.json();
    // return responseData;
    return response?.data?.message;
  } catch (error) {
    console.error("Failed: ", error);
    // throw error;
    return {
      error: true,
      message: "An error occurred. Please try again later.",
    };
  }
};

export default api;
