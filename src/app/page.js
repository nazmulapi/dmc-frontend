import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "../lib/auth/server";

export default async function Home() {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/login");
  } else {
    redirect("/dashboard");
  }

  return <></>;
}
