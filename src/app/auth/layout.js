import "../../styles/auth.scss";

export const metadata = {
  title: "DMC HRM",
  description: "Developed By API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
