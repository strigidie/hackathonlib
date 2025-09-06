import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foodiet - Smart Food & Activity Tracking",
  description: "Performance nutrition meets intelligent tracking. Track your calories with AI-powered food recognition and discover smarter food swaps.",
  keywords: ["nutrition", "fitness", "food tracking", "calories", "health", "wellness", "PWA"],
  authors: [{ name: "Foodiet Team" }],
  creator: "Foodiet",
  publisher: "Foodiet",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://foodiet.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Foodiet - Smart Food & Activity Tracking",
    description: "Performance nutrition meets intelligent tracking. Track your calories with AI-powered food recognition and discover smarter food swaps.",
    url: 'https://foodiet.app',
    siteName: 'Foodiet',
    images: [
      {
        url: '/icons/icon-512x512.svg',
        width: 512,
        height: 512,
        alt: 'Foodiet App Icon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Foodiet - Smart Food & Activity Tracking",
    description: "Performance nutrition meets intelligent tracking. Track your calories with AI-powered food recognition and discover smarter food swaps.",
    images: ['/icons/icon-512x512.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icons/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Foodiet',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Foodiet',
    'application-name': 'Foodiet',
    'msapplication-TileColor': '#00d4aa',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#00d4aa',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
