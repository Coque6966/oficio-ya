import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OficioYa | Encuentra profesionales para tu hogar",
  description: "La plataforma líder para contratar plomeros, electricistas y más.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OficioYa",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { MobileNav } from "@/components/mobile-nav";
import { PWAProvider } from "@/components/pwa-provider";
import { SplashScreen } from "@/components/splash-screen";

import { esES } from "@clerk/localizations";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es" className="dark">
        <body className={inter.className}>
          <PWAProvider>
            <SplashScreen />
            <Toaster />
            {children}
            <MobileNav />
          </PWAProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
