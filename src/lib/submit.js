import Cookies from "js-cookie";
import { authTokenKey, apiBaseUrl } from "./config";

export const submit = async (route, data, hasFile = false) => {
  try {
    let token = Cookies.get(authTokenKey);
    // console.log(token);
    // console.log(data);
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }
    // return data;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (!hasFile) {
      headers["Content-Type"] = "application/json";
    }
    // else {
    //   headers["Content-Type"] = "multipart/form-data";
    // }

    const response = await fetch(apiBaseUrl + route, {
      method: "POST",
      headers: headers,
      body: hasFile ? data : JSON.stringify(data),
    });

    // console.log(response);

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }
    if (response.ok) {
      console.log("Successful");
      // console.log(response.json());
    } else {
      console.error("Error");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Failed: ", error);
    throw error;
  }
};
