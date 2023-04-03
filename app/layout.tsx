import { Nunito } from "next/font/google"
import Navbar from "./components/navbar/Navbar"

import './globals.css'
import ClientOnly from "./components/ClientOnly";

export const metadata = {
  title: 'Stay Awhile',
  description: 'Inspired by Airbnb',
}

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
