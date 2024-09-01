import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

import ReduxProvider from "@/store/ReduxProvider";
import "./globals.css";

const inter = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goollooper | Admin Panel",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`bg-backGroundColor ${inter.className}`}>
          <ToastContainer />
        <ReduxProvider>
          {children}
        </ReduxProvider>
        </body>
        <Script
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAoQH4pdrX59zY5xcJrAUEgEqF5r4qRHes&libraries=places"
        ></Script>
      </html>
  );
}
