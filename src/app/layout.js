import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import "../styles/globals.scss";

export const metadata = {
  title: "Root",
  description: "DMC HRM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
