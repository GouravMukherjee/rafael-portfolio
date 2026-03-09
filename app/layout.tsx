import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rafael Ibarra — Photographer",
  description:
    "Nature. Light. Moments. Visual storyteller and photographer — capturing the extraordinary in the ordinary.",
  keywords: ["photography", "Rafael Ibarra", "nature", "landscape", "portrait", "street"],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    title: "Rafael Ibarra — Photographer",
    description: "Nature. Light. Moments. Every frame is a decision.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafael Ibarra — Photographer",
    description: "Nature. Light. Moments.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceMono.variable} ${dmSans.variable}`}
    >
      <body>
        <GrainOverlay />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
