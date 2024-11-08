import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import NextImage from "next/image";
import NextLink from "next/link";
import { Toaster } from "src/components/ui/sonner";
import { QueryProvider } from "src/providers/QueryProvider";
import { SolanaProvider } from "src/providers/SolanaProvider";
import { WalletMenu } from "./WalletMenu";

const gilroy = localFont({
  src: [
    {
      path: "./fonts/Gilroy.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Gilroy-Italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Gilroy-SemiBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Gilroy-Bold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
});

const gtWalsheimPro = localFont({
  src: [
    {
      path: "./fonts/GTWalsheimPro.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GTWalsheimPro-Bold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gtWalsheimPro",
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
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${gilroy.variable} ${gtWalsheimPro.variable} font-body antialiased`}
      >
        <QueryProvider>
          <SolanaProvider>
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
              <div className="container mx-auto flex h-24 max-w-screen-2xl items-center px-5 md:px-12">
                <div>
                  <NextLink
                    className="mr-4 flex items-center space-x-2 lg:mr-6"
                    href="/"
                  >
                    <NextImage
                      src="/logo.png"
                      alt="logo"
                      width={0}
                      height={0}
                      className="h-6 w-6"
                    />
                  </NextLink>
                </div>
                <nav className="ml-auto flex items-center">
                  <WalletMenu />
                </nav>
              </div>
            </header>
            <main>
              {/*  */}
              {children}
            </main>
          </SolanaProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
