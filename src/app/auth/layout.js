// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { authTokenKey } from "../../lib/config";
// import Accessible from "../../components/utils/CheckAccessibleForAuthPages";
import { checkIsAuthenticated } from "../../lib/check";
import "../../styles/auth.scss";

export const metadata = {
  title: "Login",
  description: "DMC HRM",
};

export default async function RootLayout({ children }) {
  // const cookieStore = cookies();
  // let token = cookieStore.get(authTokenKey);
  // // if (!(token === undefined || token === null)) {
  // //   redirect("/dashboard");
  // // }

  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <>
      {/* <Accessible /> */}
      <div>{children}</div>
    </>
  );
}
