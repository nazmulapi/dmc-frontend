import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";

export const metadata = {
  title: "Root",
  description: "DMC HRM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
