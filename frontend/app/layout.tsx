import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stay Awhile",
  description:
    "Inspired by Airbnb, Stay Awhile is a platform for people to share their homes with others. Test!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="pt-32">{children}</div>
        <LoginModal />
        <SignupModal />
      </body>
    </html>
  );
}
