import Cookies from "js-cookie";
import { authTokenKey, apiBaseUrl } from "./config";

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
