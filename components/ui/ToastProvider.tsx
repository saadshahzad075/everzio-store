"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShoppingBag, Heart, Info, X } from "lucide-react";

type ToastType = "success" | "cart" | "wishlist" | "info";

interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (title: string, message?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, message?: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Floating Toasts Container */}
      <div className="fixed top-20 right-4 z-[--z-toast] flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="pointer-events-auto flex items-center justify-between gap-3 p-4 bg-[#090D16] text-white rounded-[--radius-xl] shadow-2xl border border-amber-500/30 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  {toast.type === "cart" ? (
                    <ShoppingBag size={16} />
                  ) : toast.type === "wishlist" ? (
                    <Heart size={16} className="fill-rose-500 text-rose-500" />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{toast.title}</p>
                  {toast.message && (
                    <p className="text-[11px] text-slate-300 mt-0.5">{toast.message}</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: () => {},
    };
  }
  return context;
}
