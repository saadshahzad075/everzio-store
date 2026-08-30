"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export function FlashDealTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 38, seconds: 52 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-y bg-[#090D16] text-white relative overflow-hidden" aria-label="Flash sale offer">
      {/* Glow Orbs & Light Rings */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 80% 20%, rgba(245,158,11,0.25) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 20% 80%, rgba(225,29,72,0.2) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="everzio-container relative z-10">
        <FadeIn>
          <div className="glass-dark rounded-[--radius-2xl] p-8 md:p-12 border border-amber-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            {/* Left Content */}
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider">
                <Zap size={14} className="text-amber-400 fill-amber-400" />
                24-Hour Weekend Flash Deal
              </span>
              <h2
                className="font-display text-3xl sm:text-5xl font-semibold leading-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Special Flash Sale —{" "}
                <span className="gold-gradient-text italic font-serif">Save Up To 45%</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Grab top-rated premium items at unbelievable discounts before stock runs out. Free Cash on Delivery & nationwide shipping included.
              </p>

              {/* Scarcity Bar */}
              <div className="space-y-1.5 pt-2 max-w-md mx-auto lg:mx-0">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Claimed: 82%</span>
                  <span className="text-amber-400">Only 18 Items Left</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* Countdown Display & CTA */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Hours */}
                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center text-2xl sm:text-4xl font-bold font-mono text-amber-400 shadow-inner">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-2">
                    Hours
                  </span>
                </div>

                <span className="text-2xl sm:text-4xl font-bold text-amber-400 -mt-6">:</span>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center text-2xl sm:text-4xl font-bold font-mono text-amber-400 shadow-inner">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-2">
                    Mins
                  </span>
                </div>

                <span className="text-2xl sm:text-4xl font-bold text-amber-400 -mt-6">:</span>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center text-2xl sm:text-4xl font-bold font-mono text-rose-400 shadow-inner">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-2">
                    Secs
                  </span>
                </div>
              </div>

              <Link href="/shop?filter=sale">
                <Button
                  variant="accent"
                  size="lg"
                  className="btn-gold-glow text-base font-semibold px-8 h-13 shadow-gold"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Shop Flash Deals Now
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default FlashDealTimer;
