"use client";

import "./globals.css";
import ThemeProviders from "./providers/ThemeProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Define routes where navbar/footer should be hidden
  // Since we can't easily detect 404 via pathname alone, 
  // we will check if it's one of our known routes.
  // BUT a better way for 404 is to handle it in the 404 page itself 
  // by using fixed positioning and high z-index to cover everything.
  // OR, we can just check if the pathname is what would trigger a 404 
  // (not in our validRoutes list).
  
  const validRoutes = [
    "/",
    "/services",
    "/my-bookings",
    "/about",
    "/contact",
    "/auth/login",
    "/auth/register",
    "/booking", // and its dynamic children
  ];

  const isDynamicService = pathname.startsWith("/services/");
  const isDynamicBooking = pathname.startsWith("/booking/");
  const isKnownRoute = validRoutes.includes(pathname) || isDynamicService || isDynamicBooking;

  // If it's a 404 (not a known route), we hide navbar and footer
  const showNavFooter = isKnownRoute;

  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body className="antialiased bg-base-100 text-base-content min-h-screen flex flex-col">
        <ThemeProviders>
          {showNavFooter && <Navbar />}
          <main className="flex-grow">
            {children}
          </main>
          {showNavFooter && <Footer />}
        </ThemeProviders>
      </body>
    </html>
  );
}
