import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "../../lib/auth/server";

import "../../styles/auth.scss";

export const metadata = {
  title: "Login",
  description: "DMC HRM",
};

export default async function RootLayout({ children }) {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) redirect("/dashboard");

  return <div>{children}</div>;
}
