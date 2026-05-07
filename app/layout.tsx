import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import GlobalContactModal from "./components/GlobalContactModal";
import { ToastProvider } from "./components/Toast";

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
      lang="ru"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body
        className={`${montserrat.className} min-h-full flex flex-col bg-background text-foreground`}
      >
        <ToastProvider>
          <Navbar />
          <main className="flex min-h-0 flex-1 flex-col pt-16 md:pt-[72px]">{children}</main>
          <GlobalContactModal />
        </ToastProvider>
      </body>
    </html>
  );
}
