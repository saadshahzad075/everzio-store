import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";

export default function TermsPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        <div className="everzio-container py-8 md:py-16 max-w-3xl">
          <FadeIn className="space-y-6">
            <h1
              className="font-display text-3xl md:text-4xl font-semibold text-[--color-fg]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Terms & Conditions
            </h1>
            <p className="text-xs text-[--color-muted-fg]">Last updated: August 30, 2026</p>

            <div className="prose prose-stone max-w-none text-sm text-[--color-muted-fg] space-y-4 leading-relaxed">
              <p>
                Welcome to EVERZIO. By accessing or using our website and placing orders, you agree to be bound by the following terms and conditions.
              </p>
              <h2 className="text-base font-semibold text-[--color-fg] pt-2">1. Orders & Pricing</h2>
              <p>
                All prices are listed in Pakistani Rupees (PKR) and include applicable sales taxes. We reserve the right to modify prices or correct errors without prior notice. An order is confirmed once verified by our team.
              </p>
              <h2 className="text-base font-semibold text-[--color-fg] pt-2">2. Cash on Delivery</h2>
              <p>
                For Cash on Delivery (COD) orders, payment must be handed to the courier representative in full before opening the sealed shipment box.
              </p>
              <h2 className="text-base font-semibold text-[--color-fg] pt-2">3. Intellectual Property</h2>
              <p>
                All content, trademarks, visual design tokens, imagery, and text on this platform are the property of EVERZIO and protected by intellectual property laws.
              </p>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </>
  );
}
