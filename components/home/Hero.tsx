"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const prefersReduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: prefersReduced ? 0 : 0.12, delayChildren: 0.2 },
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
      className="relative min-h-[90dvh] flex items-center overflow-hidden bg-[--color-primary]"
      aria-label="Hero section"
    >
      {/* ---- Background pattern ---- */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Gradient mesh */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 70% 40%, rgba(161,98,7,0.25) 0%, transparent 70%),
              radial-gradient(ellipse 60% 80% at 10% 80%, rgba(202,138,4,0.12) 0%, transparent 60%)
            `,
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating orbs */}
        {!prefersReduced && (
          <>
            <motion.div
              className="absolute w-64 h-64 rounded-full blur-3xl opacity-15"
              style={{
                background: "radial-gradient(circle, #CA8A04, transparent)",
                top: "20%",
                right: "15%",
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-48 h-48 rounded-full blur-3xl opacity-10"
              style={{
                background: "radial-gradient(circle, #A16207, transparent)",
                bottom: "25%",
                left: "8%",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </>
        )}
      </div>

      {/* ---- Content ---- */}
      <div className="everzio-container relative z-10">
        <div className="max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Campaign badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[--radius-pill] bg-white/10 border border-white/20 text-white/90 text-xs font-medium tracking-wide backdrop-blur-sm">
                <Sparkles size={12} aria-hidden="true" />
                New Arrivals This Week
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-white leading-[1.05]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: 600,
              }}
            >
              Products That
              <br />
              <em className="not-italic" style={{ color: "var(--color-accent-alt)" }}>
                Elevate
              </em>{" "}
              Your Life
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-white/70 text-lg leading-relaxed max-w-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Premium home, kitchen, and lifestyle products — curated for
              modern living in Pakistan. Smart choices, delivered simply.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <Link href="/shop">
                <Button
                  variant="accent"
                  size="lg"
                  rightIcon={<ArrowRight size={16} />}
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="/shop?filter=bestsellers">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  Best Sellers
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-2"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[--color-primary] bg-[--color-muted] overflow-hidden"
                    aria-hidden="true"
                    style={{
                      background: `hsl(${i * 40 + 20}, 30%, 70%)`,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-white/60">
                <span className="text-white font-semibold">10,000+</span> happy customers across Pakistan
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ---- Bottom gradient fade ---- */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--color-bg), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}

export default Hero;
