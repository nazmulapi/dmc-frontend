import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "../lib/auth/server";
import CheckAuth from "../components/utils/CheckAuth";

export default async function Home() {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/login");
  } else {
    redirect("/dashboard");
  }

  return <CheckAuth />;
}
