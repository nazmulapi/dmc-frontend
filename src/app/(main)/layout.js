// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { authTokenKey } from "../../lib/config";
// import Accessible from "../../components/utils/CheckAccessibleForMainPages";
import SideMenu from "../../components/app-layouts/SideMenu";
import Navbar from "../../components/app-layouts/TopNavbar";
import { checkIsAuthenticated } from "../../lib/check";
import "../../styles/main.scss";

export const metadata = {
  title: "Dashboard",
  description: "DMC HRM",
};

export default async function RootLayout({ children }) {
  // const cookieStore = cookies();
  // let token = cookieStore.get(authTokenKey);
  // if (token === undefined || token === null) {
  //   redirect("/auth/login");
  // }

  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/login");
  }

  return (
    <>
      {/* <Accessible /> */}
      <div className="wrapper">
        <div className="side_nav">
          <SideMenu />
        </div>
        <div className="content shadow float-end">
          <div>
            <Navbar />
          </div>
          <div className="m-3 p-3 bg-white rounded">{children}</div>
        </div>
      </div>
    </>
  );
}
