import type { Metadata } from "next";
import "./globals.css";
import AuthHeader from "./components/AuthHeader";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "TPT",
  description: "트레이딩 피티",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </head>
      <body>
        <AuthHeader />
        {children}
        <Footer />
        <div id="portal-root" />
      </body>
    </html>
  );
}
