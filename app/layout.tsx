import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import GlobalContactModal from "./components/GlobalContactModal";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TechZone Motors",
  description: "TechZone Motors — выбирайте и покупайте лучшие питбайки",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className={`${montserrat.className} min-h-full flex flex-col`}>
        <Navbar />
        <main className="flex min-h-0 flex-1 flex-col pt-14">{children}</main>
        <GlobalContactModal />
      </body>
    </html>
  );
}
