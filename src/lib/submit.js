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
      Authorization: `Bearer ${token ? token : ""}`,
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
      console.error("Error");
      // throw new Error("Failed to submit data");

      return {
        error: true,
        message: "Failed to submit data",
      };
    }

    // console.log("Successful");
    // console.log(response.json());

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Failed: ", error);
    // throw error;
    return {
      error: true,
      message: "An error occurred. Please try again later.",
    };
  }
};

export const deleteItem = async (route) => {
  let token = Cookies.get(authTokenKey);

  try {
    const response = await fetch(apiBaseUrl + route, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });

    // console.log(response);

    if (!response.ok) {
      return {
        error: true,
        message: "Failed to delete",
      };
    }

    // console.log("Successful");

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Failed: ", error);
    return {
      error: true,
      message: error.response?.data || error?.message || "Something went wrong",
    };
  }
};

export const forgotEmailSubmit = async (route, data) => {
  try {
    const response = await fetch(apiBaseUrl + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log(response);

    if (!response.ok) {
      // console.error("Error");
      return {
        error: true,
        message: "Failed to send mail",
      };
    }

    // console.log("Successful");

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Failed: ", error);
    return {
      error: true,
      message: error?.message || "Something went wrong",
    };
  }
};

export const forgotPasswordSubmit = async (route, data, token) => {
  try {
    const response = await fetch(apiBaseUrl + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Reset-Token": token,
      },
      body: JSON.stringify(data),
    });

    // console.log(response);

    if (!response.ok) {
      console.error("Error");
      return {
        error: true,
        message: "Failed to submit data",
      };
    }

    // console.log("Successful");

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Failed: ", error);
    return {
      error: true,
      message: error?.message || "Something went wrong",
    };
  }
};

export const syncManual = async (route) => {
  try {
    let token = Cookies.get(authTokenKey);

    const headers = {
      Authorization: `Bearer ${token ? token : ""}`,
    };

    headers["Content-Type"] = "application/json";

    const response = await fetch(apiBaseUrl + route, {
      method: "GET",
      headers: headers,
    });

    // console.log(response);

    if (!response.ok) {
      console.error("Error");
      return {
        error: true,
        message: "Failed to sync",
      };
    }
    console.log("Successful");

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Failed: ", error);
    return {
      error: true,
      message: error?.message || "Failed to sync",
    };
  }
};
