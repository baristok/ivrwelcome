import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LenisProvider from "./lenis-provider";
import "./globals.css";
import { Component } from "@/components/ui/tidal-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const siteName = "Marka Adı";
const siteDescription =
  "Logo tabanlı kimlik, video arka plan ve dark mode uyumlu modern bir açılış deneyimi sunan geçici site şablonu.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "marka sitesi",
    "video hero",
    "dark mode",
    "landing page",
    "modern web sitesi",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    siteName,
    url: siteUrl,
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 1200,
        alt: `${siteName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/images/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      {
        url: "/images/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  themeColor: "#04060c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground font-sans dark">
        <Component />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
