export const server =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3004"
    : "http://113.212.109.147:3004";

export const authTokenKey = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY;
export const authUserKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY;
export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const constants = {};
