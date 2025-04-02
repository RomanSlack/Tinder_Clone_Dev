import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tinder Clone App",
  description: "A demo Tinder-like app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto py-6 px-4 max-w-4xl">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}