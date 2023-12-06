"use client";

import { redirect } from "next/navigation";
import { useAuth } from "../lib/auth/hook";

const CheckAuth = () => {
  const { isLoading, error } = useAuth();

  if (!isLoading) redirect("/auth/login");

  return <>{console.log(isLoading ? "Loading" : "Done")}</>;
};

export default CheckAuth;
