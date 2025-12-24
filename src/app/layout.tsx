import "./globals.css";
import ThemeProviders from "./providers/ThemeProvider";
import LayoutWrapper from "../components/LayoutWrapper";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Care.IO | Professional Care Services",
  description: "Safe, reliable, and professional baby care, elderly care, and home care services.",
};

import AuthProvider from "./providers/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body 
        className="antialiased bg-base-100 text-base-content min-h-screen flex flex-col"
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <ThemeProviders>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </ThemeProviders>
        </AuthProvider>
        <Toaster 
          position="top-right" 
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#0f172a', // slate-900 (very dark)
              color: '#ffffff',
              border: '1px solid #334155',
              borderRadius: '16px',
              fontWeight: '600',
              backdropFilter: 'blur(8px)',
              padding: '16px 24px',
              fontSize: '14px',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            },
            success: {
              style: {
                background: '#065f46', // emerald-900
                border: '1px solid #059669', // emerald-600
              },
              iconTheme: {
                primary: '#34d399', // emerald-400
                secondary: '#fff',
              },
            },
            error: {
              style: {
                background: '#7f1d1d', // red-900
                border: '1px solid #dc2626', // red-600
              },
              iconTheme: {
                primary: '#f87171', // red-400
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
