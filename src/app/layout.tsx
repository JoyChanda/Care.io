import "./globals.css";
import ThemeProviders from "./providers/ThemeProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Care.IO | Professional Care Services",
  description: "Safe, reliable, and professional baby care, elderly care, and home care services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body className="antialiased bg-base-100 text-base-content min-h-screen flex flex-col">
        <ThemeProviders>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProviders>
      </body>
    </html>
  );
}
