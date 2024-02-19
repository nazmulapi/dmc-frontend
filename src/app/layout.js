import { ToastContainer } from "react-toastify";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";
import "../styles/globals.scss";

export const metadata = {
  title: "Root",
  description: "DMC HRM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider>
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </MantineProvider>
      </body>
    </html>
  );
}
