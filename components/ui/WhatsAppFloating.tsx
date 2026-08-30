"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloating() {
  const whatsappUrl = "https://wa.me/923000000000?text=Hello%20EVERZIO%20Store%2C%20I%20have%20an%20inquiry%20about%20your%20products.";

  return (
    <div className="fixed bottom-6 right-6 z-[--z-sticky] group">
      {/* Pulse effect */}
      <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping group-hover:opacity-75 transition-opacity" />

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 transition-colors border border-emerald-400/40 font-semibold text-xs sm:text-sm"
        aria-label="Order or inquire on WhatsApp"
      >
        <MessageCircle size={20} className="fill-white text-emerald-600" />
        <span className="hidden sm:inline">Order on WhatsApp</span>
      </motion.a>
    </div>
  );
}

export default WhatsAppFloating;
