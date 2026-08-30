"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { FadeIn } from "@/components/motion/FadeIn";

const HOTSPOTS = [
  {
    id: "spot-1",
    top: "35%",
    left: "28%",
    title: "Scented Soy Wax Candle",
    feature: "Hand-poured 100% natural lavender soy wax",
    price: "PKR 3,499",
    slug: "scented-soy-wax-candle-set",
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b5c2?w=800&q=80",
  },
  {
    id: "spot-2",
    top: "65%",
    left: "58%",
    title: "Ceramic Coffee Dripper",
    feature: "High-fired thermal extraction ribs",
    price: "PKR 2,899",
    slug: "minimalist-ceramic-coffee-dripper",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  },
  {
    id: "spot-3",
    top: "42%",
    left: "78%",
    title: "Sunset Ambient Projection Lamp",
    feature: "180° Rotating HD crystal lens, 16 RGB halo modes",
    price: "PKR 3,999",
    slug: "smart-led-sunset-projection-lamp",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
  },
];

export function HotspotBanner() {
  const [activeSpot, setActiveSpot] = useState<string | null>("spot-1");

  return (
    <section className="section-y" aria-labelledby="hotspot-heading">
      <div className="everzio-container">
        <FadeIn className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
            <Sparkles size={14} className="text-amber-500" />
            Interactive Lookbook
          </p>
          <h2
            id="hotspot-heading"
            className="font-display text-3xl md:text-5xl font-semibold text-slate-900 mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Explore Modern Living
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Tap or hover over the interactive glowing hotspots below to discover featured essentials.
          </p>
        </FadeIn>

        {/* Interactive Canvas */}
        <FadeIn>
          <div className="relative overflow-hidden rounded-[--radius-2xl] min-h-[480px] md:min-h-[580px] bg-slate-900 shadow-2xl border border-slate-200">
            {/* Background Lifestyle Image */}
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80"
              alt="EVERZIO Interactive Luxury Lifestyle Showcase"
              fill
              className="object-cover opacity-80"
              priority
            />

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Interactive Hotspots */}
            {HOTSPOTS.map((spot) => {
              const isActive = activeSpot === spot.id;

              return (
                <div
                  key={spot.id}
                  className="absolute z-20"
                  style={{ top: spot.top, left: spot.left }}
                >
                  {/* Glowing Pulse Button */}
                  <button
                    onClick={() => setActiveSpot(isActive ? null : spot.id)}
                    onMouseEnter={() => setActiveSpot(spot.id)}
                    className="relative flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white shadow-gold focus:outline-none"
                    aria-label={`Show ${spot.title}`}
                  >
                    <span className="absolute -inset-2 rounded-full bg-amber-400 opacity-40 animate-ping" />
                    <span className="w-3 h-3 rounded-full bg-white" />
                  </button>

                  {/* Floating Popover Card */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 bg-white/95 backdrop-blur-md rounded-[--radius-xl] shadow-2xl border border-slate-200 z-30"
                      >
                        <div className="flex gap-3 items-center">
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                            <Image
                              src={spot.image}
                              alt={spot.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {spot.title}
                            </p>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {spot.feature}
                            </p>
                            <p className="text-xs font-extrabold text-amber-600 mt-1">
                              {spot.price}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={`/shop/${spot.slug}`}
                          className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#090D16] text-white text-xs font-semibold hover:bg-amber-600 transition-colors"
                        >
                          View Details <ArrowRight size={12} />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default HotspotBanner;
