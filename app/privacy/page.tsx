import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-xs text-[--color-muted-fg]">Last updated: August 30, 2026</p>

            <div className="prose prose-stone max-w-none text-sm text-[--color-muted-fg] space-y-4 leading-relaxed">
              <p>
                At EVERZIO, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.
              </p>
              <h2 className="text-base font-semibold text-[--color-fg] pt-2">1. Information We Collect</h2>
              <p>
                When you make a purchase or create an account, we collect contact information such as your name, phone number, delivery address, and email address to fulfill your orders and provide customer support.
              </p>
              <h2 className="text-base font-semibold text-[--color-fg] pt-2">2. How We Use Your Information</h2>
              <p>
                We use your information strictly to process orders, communicate delivery updates via SMS/WhatsApp, answer support inquiries, and improve your shopping experience. We never sell your personal data to third parties.
              </p>
              <h2 className="text-base font-semibold text-[--color-fg] pt-2">3. Data Security</h2>
              <p>
                We employ industry-standard encryption protocols and secure storage measures to protect your data from unauthorized access, disclosure, or alteration.
              </p>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </>
  );
}
