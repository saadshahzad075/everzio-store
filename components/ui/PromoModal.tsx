"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Sparkles, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Show modal after 4 seconds on initial visit if not dismissed before
    const dismissed = localStorage.getItem("everzio-promo-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("everzio-promo-dismissed", "true");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("WELCOME10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[--z-modal] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#090D16] text-white rounded-[--radius-2xl] shadow-2xl p-6 sm:p-8 border border-amber-500/30 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 90% 10%, rgba(245,158,11,0.3) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-colors z-20"
              aria-label="Close discount popup"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="relative z-10 text-center space-y-4 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center mx-auto shadow-gold">
                <Gift size={28} />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                <Sparkles size={13} />
                Exclusive Welcome Offer
              </span>

              <h3
                className="font-display text-3xl sm:text-4xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get <span className="gold-gradient-text italic font-serif">10% OFF</span>
                <br />
                Your First Order
              </h3>

              <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                Use discount code at checkout to claim your savings. Valid on all collections across Pakistan.
              </p>

              {/* Coupon Box */}
              <div className="p-3 bg-white/10 border border-amber-500/40 rounded-[--radius-lg] flex items-center justify-between gap-3 max-w-xs mx-auto backdrop-blur-md">
                <div className="text-left pl-2">
                  <p className="text-[10px] text-amber-300 uppercase tracking-widest font-bold">
                    Coupon Code
                  </p>
                  <p className="font-mono text-lg font-bold text-white tracking-widest">
                    WELCOME10
                  </p>
                </div>
                <Button
                  onClick={handleCopyCode}
                  size="sm"
                  variant="accent"
                  className="btn-gold-glow text-xs font-semibold px-3 h-9"
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>

              <button
                onClick={handleClose}
                className="text-xs text-slate-400 hover:text-white underline pt-2 block mx-auto transition-colors"
              >
                No thanks, I will shop full price
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PromoModal;
