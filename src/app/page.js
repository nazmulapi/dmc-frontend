"use client";
// import Dashboard from './dashboard'
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "../lib/auth/client";

export default async function Home() {
  // const cookieStore = cookies();
  // const access_token = cookieStore.get("access_token");

  // const isAuthenticated = await checkIsAuthenticated();

  // if (access_token) {
  //   token = access_token;
  // }

  // if (!isAuthenticated) redirect("/auth/login");

  return (
    <>
      <main>
        Root page
        {/* {console.log(isAuthenticated ? "yes" : "No")} */}
      </main>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { req } = context;
//   const cookies = req.headers.cookie || "";
//   const isAuthenticated = await checkIsAuthenticated(cookies);

//   if (!isAuthenticated) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }
