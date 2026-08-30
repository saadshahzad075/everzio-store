"use client";

import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WishlistProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </WishlistProvider>
  );
}
