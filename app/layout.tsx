import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import HeroBackground from "@/components/HeroBackground";
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
        <HeroBackground />
        <ToastProvider>
          <Nav />
          <main className="relative">{children}</main>
          <Footer />
        </ToastProvider>
        <a
          href="https://www.intellistake.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group fixed bottom-3 right-3 z-50 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/10"
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/40 transition-colors group-hover:text-white/70">
            Powered by
          </span>
          <Image
            src="https://singularityventurehub.ai/assets/ISTK-logo-vertical-dark-BOGI81pH.png"
            alt="Intellistake"
            width={20}
            height={20}
            className="opacity-60 transition-opacity group-hover:opacity-90"
            unoptimized
          />
          <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-white/40 transition-colors group-hover:text-white/70">
            Intellistake
          </span>
        </a>
      </body>
    </html>
  );
}
