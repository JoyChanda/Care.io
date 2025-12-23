import "./globals.css";
import ThemeProviders from "./providers/ThemeProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Care.IO | Trusted Care Services",
  description: "Reliable baby, elderly & sick care services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviders>
          <Navbar />
          {children}
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  );
}
