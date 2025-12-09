import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "made By Anik Das",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <div className="bg-gray-200/50">
          <Navbar />
          <div className="flex overflow-x-clip pt-25 pb-3">
            <div className="">
              <Sidebar />
            </div>
            <div className="overflow-x-clip  w-full mx-3  ">
              {children}
            </div>
          </div>
          <div className="mx-3 bg-whtie">
            <Footer/>
          </div>
        </div>
      </body>
    </html>
  );
}
