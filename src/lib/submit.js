import Cookies from "js-cookie";
import { authTokenKey, apiBaseUrl } from "./config";

export const submit = async (route, data, hasFile = false) => {
  try {
    let token = Cookies.get(authTokenKey);
    // console.log(token);

    // console.log(data);
    // return data;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (hasFile) {
      // If you have files, set Content-Type to "multipart/form-data"
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(apiBaseUrl + route, {
      method: "POST",
      headers: headers,
      body: hasFile ? data : JSON.stringify(data),
    });

    console.log(response);

    // if (!response.ok) {
    //   throw new Error("Failed to fetch data");
    // }
    // if (response.ok) {
    //   // Department created successfully
    //   // Optionally, you can redirect or perform other actions
    //   // console.log("Department created successfully");
    //   // console.log(response.json());
    // } else {
    //   // Handle errors from the API response
    //   console.error("Error creating department");
    // }

    return response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
