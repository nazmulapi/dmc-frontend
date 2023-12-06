import axios from "axios";
import { apiBaseUrl } from "../config";

const api = axios.create({
  baseURL: apiBaseUrl,
  // timeout: TIMEOUT,
});

export const login = async (credentials) => {
  try {
    const response = await api.post("/login/", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Something went wrong";
  }
};

export const logout = async () => {
  // try {
  //   const response = await api.post("/logout/");
  //   return response.data;
  // } catch (error) {
  //   throw error.response?.data || error.message || "Something went wrong";
  // }

  return true;
};

export default api;
