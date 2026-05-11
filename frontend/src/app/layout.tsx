import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Market Vision | Team Application",
  description: "Market Vision is building a focused team of individuals who are serious about growth, skills, and financial development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-primary-text bg-background`}>
        {children}
      </body>
    </html>
  );
}
