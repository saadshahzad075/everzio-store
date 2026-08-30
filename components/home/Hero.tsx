"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const prefersReduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReduced ? 0 : 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0.3 : 0.6, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section
      className="relative min-h-[92dvh] flex items-center overflow-hidden bg-[#090D16]"
      aria-label="Hero section"
    >
      {/* ---- Ambient Lighting & Mesh Background ---- */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Radial Gold & Indigo Gradients */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 75% 35%, rgba(217,119,6,0.3) 0%, transparent 70%),
              radial-gradient(ellipse 50% 70% at 15% 75%, rgba(245,158,11,0.2) 0%, transparent 65%),
              radial-gradient(ellipse 90% 90% at 50% 50%, rgba(15,23,42,0.95) 0%, transparent 100%)
            `,
          }}
        />

        {/* Subtle Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Floating Pulsing Glowing Orbs */}
        {!prefersReduced && (
          <>
            <motion.div
              className="absolute w-96 h-96 rounded-full blur-[120px] opacity-25"
              style={{
                background: "radial-gradient(circle, #F59E0B, transparent)",
                top: "15%",
                right: "12%",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-72 h-72 rounded-full blur-[100px] opacity-20"
              style={{
                background: "radial-gradient(circle, #D97706, transparent)",
                bottom: "20%",
                left: "5%",
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </>
        )}
      </div>

      {/* ---- Hero Content ---- */}
      <div className="everzio-container relative z-10 py-16 md:py-24">
        <div className="max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-7"
          >
            {/* Live Campaign Pill */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-[--radius-pill] bg-white/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm">
                <Sparkles size={13} className="text-amber-400" aria-hidden="true" />
                Exclusive New Collection 2026
              </span>
            </motion.div>

            {/* Editorial Display Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-white leading-[1.04]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem, 7.5vw, 5.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              Curated Luxury
              <br />
              For Your{" "}
              <span className="gold-gradient-text italic font-serif">
                Modern Life
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-xl font-normal"
            >
              Discover handpicked home, kitchen, and lifestyle essentials crafted for elegance. Fast nationwide delivery & Cash on Delivery across Pakistan.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/shop">
                <Button
                  variant="accent"
                  size="lg"
                  className="btn-gold-glow text-base font-semibold px-8 h-13 shadow-gold"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Explore Collection
                </Button>
              </Link>
              <Link href="/shop?filter=bestsellers">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 h-13 px-7 text-base backdrop-blur-sm"
                >
                  Best Sellers
                </Button>
              </Link>
            </motion.div>

            {/* Value Props Strip */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg"
            >
              <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm font-medium">
                <Truck size={16} className="text-amber-400 flex-shrink-0" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm font-medium">
                <ShieldCheck size={16} className="text-amber-400 flex-shrink-0" />
                <span>100% Genuine</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs sm:text-sm font-medium">
                <RotateCcw size={16} className="text-amber-400 flex-shrink-0" />
                <span>Easy Returns</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--color-bg), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}

export default Hero;
