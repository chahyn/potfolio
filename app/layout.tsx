import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CHAHYNE OS v1.0 — Chahine Ouled Ouhiba Portfolio",
  description:
    "Interactive desktop OS portfolio for Chahine Ouled Ouhiba — Software Engineer, AI & Computer Vision Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} bg-[#0f0c29]`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
