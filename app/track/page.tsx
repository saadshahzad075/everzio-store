"use client";

import { useState } from "react";
import { Search, Package, CheckCircle2, Clock, Truck } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSearched(true);
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        <div className="everzio-container py-8 md:py-16 max-w-3xl">
          <FadeIn className="text-center mb-10">
            <p className="text-xs font-semibold text-[--color-accent] uppercase tracking-widest mb-2">
              Real-Time Updates
            </p>
            <h1
              className="font-display text-3xl md:text-5xl font-semibold text-[--color-fg] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Track Your Order
            </h1>
            <p className="text-[--color-muted-fg] text-base">
              Enter your Order Number and Mobile Number to view live status updates.
            </p>
          </FadeIn>

          <form onSubmit={handleSearch} className="bg-[--color-surface] p-6 md:p-8 rounded-[--radius-2xl] border border-[--color-border] shadow-[--shadow-sm] space-y-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="track-order-id" className="block text-xs font-semibold mb-1">
                  Order ID / Number *
                </label>
                <input
                  id="track-order-id"
                  type="text"
                  required
                  placeholder="e.g. EVZ-8492"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
                />
              </div>
              <div>
                <label htmlFor="track-phone" className="block text-xs font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  id="track-phone"
                  type="tel"
                  placeholder="03XX-XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-[--radius-md] border border-[--color-border] bg-[--color-surface] text-sm focus:outline-none focus:ring-2 focus:ring-[--color-ring]"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} rightIcon={<Search size={14} />}>
              Track Order Status
            </Button>
          </form>

          {searched && (
            <FadeIn className="bg-[--color-surface-elevated] p-6 rounded-[--radius-2xl] border border-[--color-border] space-y-6">
              <div className="flex items-center justify-between border-b border-[--color-border] pb-4">
                <div>
                  <p className="text-xs text-[--color-muted-fg]">Order #{orderId.toUpperCase()}</p>
                  <p className="font-semibold text-lg text-[--color-fg]">Status: In Transit</p>
                </div>
                <span className="px-3 py-1 bg-[--color-accent-light] text-[--color-accent] text-xs font-semibold rounded-full">
                  Dispatched
                </span>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[--color-border]">
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-[--color-success] text-white flex items-center justify-center">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Order Confirmed</p>
                    <p className="text-xs text-[--color-muted-fg]">Aug 30, 2026 • 10:15 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-[--color-success] text-white flex items-center justify-center">
                    <Package size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Packed & Ready</p>
                    <p className="text-xs text-[--color-muted-fg]">Aug 30, 2026 • 02:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-[--color-accent] text-white flex items-center justify-center">
                    <Truck size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">In Transit (Courier Partner)</p>
                    <p className="text-xs text-[--color-muted-fg]">Out for delivery to destination city</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-[--color-muted] text-[--color-muted-fg] flex items-center justify-center">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Delivered</p>
                    <p className="text-xs text-[--color-muted-fg]">Expected by Sep 01, 2026</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
