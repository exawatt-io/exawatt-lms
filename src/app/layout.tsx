import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ExaWatt - Power Markets Learning Platform",
  description: "Master electricity markets with interactive simulations and AI-powered learning. Professional education for energy traders, analysts, and market participants.",
  keywords: "electricity markets, power trading, energy education, market simulation, LMS",
  authors: [{ name: "ExaWatt" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "ExaWatt - Power Markets Learning Platform",
    description: "Master electricity markets with interactive simulations and AI-powered learning.",
    siteName: "ExaWatt",
  },
  twitter: {
    card: "summary_large_image",
    title: "ExaWatt - Power Markets Learning Platform",
    description: "Master electricity markets with interactive simulations and AI-powered learning.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} antialiased bg-dark-950`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
