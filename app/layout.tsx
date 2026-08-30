import type { Metadata, Viewport } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------
const cormorant = Cormorant({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default: "EVERZIO — Premium Lifestyle Products",
    template: "%s | EVERZIO",
  },
  description:
    "Discover premium home, kitchen, electronics, and lifestyle products at EVERZIO. Smart choices, delivered simply. Pakistan's trusted online store.",
  keywords: [
    "everzio",
    "online shopping pakistan",
    "premium products",
    "home essentials",
    "kitchen gadgets",
    "lifestyle accessories",
    "COD pakistan",
    "free delivery",
  ],
  authors: [{ name: "EVERZIO" }],
  creator: "EVERZIO",
  publisher: "EVERZIO",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://everzio.com",
    siteName: "EVERZIO",
    title: "EVERZIO — Premium Lifestyle Products",
    description:
      "Smart products for modern living. Free delivery across Pakistan. Cash on Delivery available.",
    images: [
      {
        url: "https://everzio.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EVERZIO — Premium Lifestyle Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EVERZIO — Premium Lifestyle Products",
    description:
      "Smart products for modern living. Free delivery across Pakistan.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
};

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
