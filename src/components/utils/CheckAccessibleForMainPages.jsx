"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { authTokenKey, apiBaseUrl } from "../../lib/config";

const api = axios.create({
  baseURL: apiBaseUrl,
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

const CheckAccessibility = () => {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      let token = Cookies.get(authTokenKey);
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);

      if (token === undefined || token === null) {
        router.push("/auth/login");
      } else {
        setAuthToken(token);

        try {
          const checkToken = await api.get(`/employee/${user?.employee_id}/`);

          if (!(checkToken?.data?.employee_id === user.employee_id)) {
            router.push("/auth/login");
          }
        } catch (error) {
          router.push("/auth/login");
        }
      }
    };

    check();
  }, []);

  return <></>;
};

export default CheckAccessibility;
