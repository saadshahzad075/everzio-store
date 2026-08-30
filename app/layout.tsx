import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EVERZIO — Premium Lifestyle & Home Products",
  description:
    "Discover premium home, kitchen, and lifestyle essentials at EVERZIO. Smart products for modern living with Free Nationwide Shipping & Cash on Delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased bg-[--color-bg] text-[--color-fg]">
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[--z-toast] focus:px-4 focus:py-2 focus:bg-[--color-primary] focus:text-[--color-primary-fg] focus:rounded-[--radius-md] focus:shadow-lg"
              >
                Skip to main content
              </a>

              {/* Rotating Announcement Bar */}
              <AnnouncementBar />

              {/* Sticky Navbar */}
              <Navbar />

              {/* Main Page Content */}
              <div className="flex-1">{children}</div>

              {/* Footer */}
              <Footer />

              {/* Slide-in Cart Drawer */}
              <CartDrawer />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
