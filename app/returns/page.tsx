import { RotateCcw, CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";

export default function ReturnsPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        <div className="everzio-container py-8 md:py-16 max-w-4xl">
          <FadeIn className="text-center mb-12">
            <p className="text-xs font-semibold text-[--color-accent] uppercase tracking-widest mb-2">
              Hassle-Free Policy
            </p>
            <h1
              className="font-display text-3xl md:text-5xl font-semibold text-[--color-fg] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Returns & Exchange Policy
            </h1>
            <p className="text-[--color-muted-fg] text-base max-w-xl mx-auto">
              Your complete satisfaction is guaranteed with our 7-day easy return policy.
            </p>
          </FadeIn>

          <div className="space-y-8">
            <div className="p-6 bg-[--color-surface] border border-[--color-border] rounded-[--radius-xl] space-y-4">
              <div className="flex items-center gap-3">
                <RotateCcw className="text-[--color-accent]" size={24} />
                <h2 className="font-semibold text-xl">7-Day Money-Back Guarantee</h2>
              </div>
              <p className="text-sm text-[--color-muted-fg] leading-relaxed">
                If you receive a defective, damaged, or incorrect item, or simply change your mind, you can return or exchange it within 7 days of delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[--color-surface-elevated] border border-[--color-border] rounded-[--radius-xl] space-y-3">
                <div className="flex items-center gap-2 text-[--color-success]">
                  <CheckCircle size={20} />
                  <h3 className="font-semibold text-base text-[--color-fg]">Eligible for Return</h3>
                </div>
                <ul className="text-sm text-[--color-muted-fg] space-y-2 list-disc list-inside">
                  <li>Unused products in original packaging</li>
                  <li>All tags, accessories, and manuals intact</li>
                  <li>Damaged or defective items reported within 48h</li>
                  <li>Incorrect item sent by error</li>
                </ul>
              </div>

              <div className="p-6 bg-[--color-surface-elevated] border border-[--color-border] rounded-[--radius-xl] space-y-3">
                <div className="flex items-center gap-2 text-[--color-destructive]">
                  <AlertCircle size={20} />
                  <h3 className="font-semibold text-base text-[--color-fg]">Non-Returnable Items</h3>
                </div>
                <ul className="text-sm text-[--color-muted-fg] space-y-2 list-disc list-inside">
                  <li>Items damaged due to misuse or neglect</li>
                  <li>Products missing original packaging or tags</li>
                  <li>Personal care hygiene items (once opened)</li>
                  <li>Clearance / final sale items</li>
                </ul>
              </div>
            </div>

            <div className="p-6 bg-[--color-primary] text-[--color-primary-fg] rounded-[--radius-xl] space-y-3">
              <div className="flex items-center gap-2 text-[--color-accent-alt]">
                <HelpCircle size={20} />
                <h3 className="font-semibold text-base text-white">How to Initiate a Return</h3>
              </div>
              <ol className="text-sm text-white/80 space-y-2 list-decimal list-inside leading-relaxed">
                <li>Send a photo/video of the item to our WhatsApp (+92 300 0000000) or email support@everzio.com with your order number.</li>
                <li>Our team will review your request within 24 hours and approve the return.</li>
                <li>Our rider will pick up the item from your doorstep (or you can dispatch it via courier).</li>
                <li>Refund/Exchange processed within 2–3 business days after product inspection via JazzCash, EasyPaisa, or Bank Transfer.</li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
