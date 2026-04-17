import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Driftwall — Stop agent drift before it becomes a breach",
  description:
    "Pre-deploy red teaming, runtime monitoring, and on-chain audit trails for production AI agents.",
  metadataBase: new URL("https://driftwall.app"),
  openGraph: {
    title: "Driftwall — Agent Security Platform",
    description: "Stop agent drift before it becomes a breach.",
    type: "website",
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  manifest: undefined,
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <ToastProvider>
          <Nav />
          <main className="relative">{children}</main>
          <Footer />
        </ToastProvider>
        <a
          href="https://www.intellistake.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-3 right-3 z-50 inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-white/50 hover:text-white/80 hover:border-white/20 transition-all"
        >
          POWERED BY
          <Image
            src="https://singularityventurehub.ai/assets/ISTK-logo-vertical-dark-BOGI81pH.png"
            alt="Intellistake (ISTK) logo"
            width={28}
            height={28}
            className="opacity-70"
            unoptimized
          />
        </a>
      </body>
    </html>
  );
}
