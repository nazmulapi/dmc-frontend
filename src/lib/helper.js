import { apiBaseUrl } from "./config";

export const getGreeting = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  return greeting;
};

export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim().length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  return false;
};

export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    // timeZoneName: "short",
  };

  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};

export const getTime = (dateString) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
  };

  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};

export const getDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};

export const getStoragePath = (path) => {
  return apiBaseUrl + path;
};
