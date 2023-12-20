import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { authTokenKey } from "../lib/config";

export default async function Home() {
  const cookieStore = cookies();
  let token = cookieStore.get(authTokenKey);

  if (token === undefined || token === null) {
    redirect("/auth/login");
  } else {
    redirect("/dashboard");
  }

  // redirect("/dashboard");

  return <></>;
}
