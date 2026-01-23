import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'ScamAware Jersey',
    template: '%s | ScamAware Jersey',
  },
  description: 'Helping Jersey residents identify and protect against scams. Check suspicious messages, learn about common scams, and get help if you\'ve been scammed.',
  keywords: ['scam', 'fraud', 'Jersey', 'JFSC', 'protection', 'awareness'],
  authors: [{ name: 'ScamAware Jersey' }],
  creator: 'ScamAware Jersey',
  publisher: 'ScamAware Jersey',
  metadataBase: new URL('https://scamaware.je'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://scamaware.je',
    siteName: 'ScamAware Jersey',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Theme initialization script

          This script runs before React hydration to prevent flash of wrong theme.
          For MVP, it simply sets the theme to 'light'. When dark mode is enabled,
          uncomment the full detection logic in themeInitScript.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
