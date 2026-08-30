"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type WishlistContextValue = {
  items: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("everzio-wishlist");
      if (stored) setItems(JSON.parse(stored) as string[]);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem("everzio-wishlist", JSON.stringify(items));
  }, [items]);

  const toggle = useCallback((productId: string) => {
    setItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const has = useCallback((productId: string) => items.includes(productId), [items]);

  return (
    <WishlistContext.Provider value={{ items, toggle, has, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
