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

export const sortBy = (array, key) => {
  return array.slice().sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (typeof valueA === "string") {
      return valueA.localeCompare(valueB);
    } else {
      return valueA - valueB;
    }
  });
};

export const convertTimeTo12HourFormat = (timeString) => {
  // Parse the time string to a Date object
  const time = new Date("2000-01-01T" + timeString);

  // Get hours, minutes, and seconds
  let hours = time.getHours();
  let minutes = time.getMinutes();

  // Determine AM or PM
  const amPM = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // "0" hour should be "12"

  // Add leading zero to hours if less than 10
  hours = hours < 10 ? "0" + hours : hours;

  // Add leading zero to minutes if needed
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the 12-hour format string
  const time12Hour = hours + ":" + minutes + " " + amPM;

  return time12Hour;
};
