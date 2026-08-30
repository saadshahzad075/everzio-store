"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Lock } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { CartItem } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { formatPrice } from "@/lib/utils";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";

const PAKISTAN_PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Gilgit-Baltistan",
  "Azad Kashmir",
  "Islamabad Capital Territory",
];

type Step = "info" | "payment" | "success";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("info");
  const [loading, setLoading] = useState(false);

  const shipping = subtotal >= 2000 ? 0 : 150;
  const total = subtotal + shipping;

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    setStep("success");
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main id="main-content">
        <div className="everzio-container py-8 md:py-12 max-w-5xl">

          {/* Progress steps */}
          {step !== "success" && (
            <FadeIn className="mb-8">
              <nav aria-label="Checkout steps">
                <ol className="flex items-center gap-2 text-sm" role="list">
                  {[
                    { id: "info", label: "Contact & Delivery" },
                    { id: "payment", label: "Payment" },
                  ].map((s, i) => (
                    <li key={s.id} className="flex items-center gap-2">
                      {i > 0 && (
                        <ChevronRight size={14} className="text-[--color-muted-fg]" aria-hidden="true" />
                      )}
                      <span
                        className={
                          step === s.id
                            ? "font-semibold text-[--color-fg]"
                            : "text-[--color-muted-fg]"
                        }
                        aria-current={step === s.id ? "step" : undefined}
                      >
                        {s.label}
                      </span>
                    </li>
                  ))}
                </ol>
              </nav>
            </FadeIn>
          )}

          <AnimatePresence mode="wait">
            {/* ---- SUCCESS ---- */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-16 gap-5"
              >
                <div className="w-20 h-20 rounded-full bg-[--color-success-light] flex items-center justify-center">
                  <CheckCircle2 size={40} className="text-[--color-success]" aria-hidden="true" />
                </div>
                <div>
                  <h1
                    className="font-display text-3xl font-semibold text-[--color-fg] mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Order Placed!
                  </h1>
                  <p className="text-[--color-muted-fg]">
                    Thank you for your order. We'll confirm it via WhatsApp/SMS shortly.
                  </p>
                </div>
                <div className="bg-[--color-surface-elevated] rounded-[--radius-xl] border border-[--color-border] p-6 max-w-sm w-full text-left space-y-2">
                  <p className="text-sm font-semibold text-[--color-fg]">What happens next?</p>
                  <ul className="text-sm text-[--color-muted-fg] space-y-1.5">
                    <li>• You'll receive an SMS confirmation within 1 hour</li>
                    <li>• Our team will call to confirm delivery address</li>
                    <li>• Delivery in 3–5 business days</li>
                    <li>• Pay on delivery — no payment needed now</li>
                  </ul>
                </div>
                <Link href="/shop">
                  <Button variant="primary" size="lg">Continue Shopping</Button>
                </Link>
              </motion.div>
            )}

            {/* ---- DELIVERY INFO ---- */}
            {step === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8"
              >
                <div className="lg:col-span-3">
                  <h1
                    className="font-display text-2xl md:text-3xl font-semibold text-[--color-fg] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Contact & Delivery
                  </h1>

                  <form id="info-form" onSubmit={handleSubmitInfo} className="space-y-4" noValidate>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="firstName" className="block text-xs font-semibold text-[--color-fg] mb-1.5">
                          First Name <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          required
                          autoComplete="given-name"
                          className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring] focus:border-transparent"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-xs font-semibold text-[--color-fg] mb-1.5">
                          Last Name <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          required
                          autoComplete="family-name"
                          className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring] focus:border-transparent"
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-[--color-fg] mb-1.5">
                        Phone Number <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="03XX-XXXXXXX"
                        className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring] focus:border-transparent"
                        aria-required="true"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[--color-fg] mb-1.5">
                        Email Address <span className="text-[--color-muted-fg] font-normal">(optional)</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-xs font-semibold text-[--color-fg] mb-1.5">
                        Full Address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="address"
                        type="text"
                        required
                        autoComplete="street-address"
                        placeholder="House / Flat No., Street, Area"
                        className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring] focus:border-transparent"
                        aria-required="true"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="city" className="block text-xs font-semibold text-[--color-fg] mb-1.5">
                          City <span aria-hidden="true">*</span>
                        </label>
                        <input
                          id="city"
                          type="text"
                          required
                          autoComplete="address-level2"
                          className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring] focus:border-transparent"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="province" className="block text-xs font-semibold text-[--color-fg] mb-1.5">
                          Province <span aria-hidden="true">*</span>
                        </label>
                        <select
                          id="province"
                          required
                          autoComplete="address-level1"
                          className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring] focus:border-transparent cursor-pointer"
                          aria-required="true"
                          defaultValue=""
                        >
                          <option value="" disabled>Select…</option>
                          {PAKISTAN_PROVINCES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-xs font-semibold text-[--color-fg] mb-1.5">
                        Delivery Notes <span className="text-[--color-muted-fg] font-normal">(optional)</span>
                      </label>
                      <textarea
                        id="notes"
                        rows={2}
                        placeholder="Any instructions for delivery…"
                        className="w-full px-3 py-2 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring] focus:border-transparent resize-none"
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg" fullWidth>
                      Continue to Payment
                    </Button>
                  </form>
                </div>

                {/* Order summary sidebar */}
                <OrderSummary items={items} subtotal={subtotal} shipping={shipping} total={total} />
              </motion.div>
            )}

            {/* ---- PAYMENT ---- */}
            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8"
              >
                <div className="lg:col-span-3">
                  <h2
                    className="font-display text-2xl md:text-3xl font-semibold text-[--color-fg] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Payment Method
                  </h2>

                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    {/* Payment options */}
                    <div className="space-y-3">
                      {/* COD — primary */}
                      <label className="flex items-start gap-3 p-4 rounded-[--radius-xl] border-2 border-[--color-primary] bg-[--color-primary-muted] cursor-pointer">
                        <input type="radio" name="payment" value="cod" defaultChecked className="mt-0.5 accent-[--color-primary]" aria-label="Cash on Delivery" />
                        <div>
                          <p className="font-semibold text-sm">Cash on Delivery</p>
                          <p className="text-xs text-[--color-muted-fg] mt-0.5">
                            Pay in cash when your order arrives. Available nationwide.
                          </p>
                        </div>
                        <span className="ml-auto px-2 py-0.5 rounded bg-[--color-success-light] text-[--color-success] text-xs font-semibold flex-shrink-0">
                          Recommended
                        </span>
                      </label>

                      {/* Bank transfer */}
                      <label className="flex items-start gap-3 p-4 rounded-[--radius-xl] border border-[--color-border] cursor-pointer hover:border-[--color-border-strong] transition-colors">
                        <input type="radio" name="payment" value="bank" className="mt-0.5" aria-label="Bank Transfer" />
                        <div>
                          <p className="font-semibold text-sm">Bank Transfer / EasyPaisa / JazzCash</p>
                          <p className="text-xs text-[--color-muted-fg] mt-0.5">
                            Send payment to our account and share screenshot via WhatsApp.
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={loading}
                        leftIcon={<Lock size={14} />}
                      >
                        Place Order — {formatPrice(total)}
                      </Button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep("info")}
                      className="w-full text-sm text-[--color-muted-fg] hover:text-[--color-fg] transition-colors text-center py-1"
                    >
                      ← Back to delivery info
                    </button>
                  </form>
                </div>

                <OrderSummary items={items} subtotal={subtotal} shipping={shipping} total={total} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Order summary sidebar
// ---------------------------------------------------------------------------
function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
}: {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}) {
  return (
    <aside className="lg:col-span-2" aria-label="Order summary">
      <div className="bg-[--color-surface-elevated] rounded-[--radius-xl] border border-[--color-border] p-5 space-y-4 sticky top-28">
        <h2 className="font-semibold text-sm text-[--color-fg]">Order Summary</h2>

        <ul className="space-y-3" role="list">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-[--radius-md] overflow-hidden bg-[--color-muted] flex-shrink-0">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[--color-primary] text-[--color-primary-fg] text-[10px] font-bold flex items-center justify-center" aria-label={`Qty: ${item.quantity}`}>
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium line-clamp-2">{item.product.name}</p>
                {item.variant && (
                  <p className="text-xs text-[--color-muted-fg]">{item.variant.value}</p>
                )}
              </div>
              <span className="text-xs font-semibold tabular-nums flex-shrink-0">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-[--color-border] pt-3 space-y-2 text-sm">
          <div className="flex justify-between text-[--color-muted-fg]">
            <span>Subtotal</span>
            <span className="tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-[--color-muted-fg]">
            <span>Shipping</span>
            <span className={shipping === 0 ? "text-[--color-success] font-medium" : "tabular-nums"}>
              {shipping === 0 ? "Free" : formatPrice(shipping)}
            </span>
          </div>
          <div className="flex justify-between font-bold text-base border-t border-[--color-border] pt-2">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
