"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Truck } from "lucide-react";

const MESSAGES = [
  "🚚 Free Delivery on orders above PKR 2,000",
  "💳 Cash on Delivery available across Pakistan",
  "✨ New arrivals every week — Shop the latest",
  "🔄 Easy 7-day returns on all orders",
];

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[--z-sticky] bg-[--color-primary] text-[--color-primary-fg]"
      style={{ height: "var(--announcement-height)" }}
    >
      <div className="everzio-container h-full flex items-center justify-between gap-4">
        {/* Spacer (balances the close button) */}
        <div className="w-8 hidden sm:block" aria-hidden="true" />

        {/* Rotating messages */}
        <div className="flex-1 flex items-center justify-center overflow-hidden h-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="text-xs sm:text-sm font-medium text-center tracking-wide"
            >
              {MESSAGES[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setVisible(false)}
          className="flex items-center justify-center w-8 h-8 rounded-[--radius-sm] hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 flex-shrink-0"
          aria-label="Dismiss announcement"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default AnnouncementBar;
