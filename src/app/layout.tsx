import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "src/components/ui/sonner";

const gilroy = localFont({
  src: "./fonts/Gilroy.ttf",
  variable: "--font-gilroy",
  weight: "100 900",
});
const gtWalsheimPro = localFont({
  src: "./fonts/GTWalsheimPro.woff",
  variable: "--font-gtWalsheimPro",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Solana Explorer",
  description: "Explore Solana blocks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${gilroy.variable} ${gtWalsheimPro.variable} antialiased font-body`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
