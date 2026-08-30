import { Truck, Clock, ShieldCheck, DollarSign } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";

export default function ShippingPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        <div className="everzio-container py-8 md:py-16 max-w-4xl">
          <FadeIn className="text-center mb-12">
            <p className="text-xs font-semibold text-[--color-accent] uppercase tracking-widest mb-2">
              Delivery Policy
            </p>
            <h1
              className="font-display text-3xl md:text-5xl font-semibold text-[--color-fg] mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Shipping & Delivery Information
            </h1>
            <p className="text-[--color-muted-fg] text-base max-w-xl mx-auto">
              We deliver to every corner of Pakistan safely, swiftly, and reliably.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-[--color-surface] border border-[--color-border] rounded-[--radius-xl] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[--color-accent-light] flex items-center justify-center text-[--color-accent]">
                <Truck size={20} />
              </div>
              <h2 className="font-semibold text-lg">Standard Nationwide Shipping</h2>
              <p className="text-sm text-[--color-muted-fg] leading-relaxed">
                Free delivery on all orders above PKR 2,000. Flat rate of PKR 150 applies for orders under PKR 2,000 across all provinces in Pakistan.
              </p>
            </div>

            <div className="p-6 bg-[--color-surface] border border-[--color-border] rounded-[--radius-xl] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[--color-accent-light] flex items-center justify-center text-[--color-accent]">
                <Clock size={20} />
              </div>
              <h2 className="font-semibold text-lg">Delivery Timelines</h2>
              <p className="text-sm text-[--color-muted-fg] leading-relaxed">
                Major cities (Karachi, Lahore, Islamabad/Rawalpindi): 2–3 business days.<br />
                Other regions & rural areas: 3–5 business days. Same-day dispatch for orders placed before 3pm PKT.
              </p>
            </div>

            <div className="p-6 bg-[--color-surface] border border-[--color-border] rounded-[--radius-xl] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[--color-accent-light] flex items-center justify-center text-[--color-accent]">
                <DollarSign size={20} />
              </div>
              <h2 className="font-semibold text-lg">Cash on Delivery (COD)</h2>
              <p className="text-sm text-[--color-muted-fg] leading-relaxed">
                Pay in cash when your package arrives at your doorstep. No prepayment or credit card required. Please have exact change ready.
              </p>
            </div>

            <div className="p-6 bg-[--color-surface] border border-[--color-border] rounded-[--radius-xl] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[--color-accent-light] flex items-center justify-center text-[--color-accent]">
                <ShieldCheck size={20} />
              </div>
              <h2 className="font-semibold text-lg">Package Inspection</h2>
              <p className="text-sm text-[--color-muted-fg] leading-relaxed">
                All packages are sealed with branded tamper-evident tape. If the seal is broken or damaged, please do not accept the package and notify us immediately on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
