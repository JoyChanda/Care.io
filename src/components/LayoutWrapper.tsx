"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const validRoutes = [
    "/",
    "/services",
    "/my-bookings",
    "/about",
    "/contact",
    "/our-team",
    "/login",
    "/register",
    "/admin",
    "/admin/payment-history",
  ];

  const isDynamicService = pathname.startsWith("/services/");
  const isDynamicBooking = pathname.startsWith("/booking/");
  const isKnownRoute = validRoutes.includes(pathname) || isDynamicService || isDynamicBooking;

  // We show nav/footer for known routes. 
  // If it's a 404 (unknown route), we hide them.
  const showNavFooter = isKnownRoute;

  return (
    <>
      {showNavFooter && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {showNavFooter && <Footer />}
    </>
  );
}
