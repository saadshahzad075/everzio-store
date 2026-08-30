"use client";

import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
import type { Product, ProductVariant } from "@/lib/data";

// ---------------------------------------------------------------------------
// Cart types
// ---------------------------------------------------------------------------
export type CartItem = {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD"; payload: { product: Product; variant?: ProductVariant; quantity?: number } }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "HYDRATE"; payload: CartItem[] };

// ---------------------------------------------------------------------------
// Cart reducer
// ---------------------------------------------------------------------------
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.payload };

    case "ADD": {
      const { product, variant, quantity = 1 } = action.payload;
      const itemId = variant ? `${product.id}-${variant.id}` : product.id;
      const existing = state.items.find((i) => i.id === itemId);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { id: itemId, product, variant, quantity }],
      };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload.id),
      };

    case "UPDATE_QTY":
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };

    case "CLEAR":
      return { ...state, items: [] };

    case "OPEN":
      return { ...state, isOpen: true };

    case "CLOSE":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Cart context
// ---------------------------------------------------------------------------
type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  savings: number;
  addItem: (product: Product, variant?: ProductVariant, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("everzio-cart");
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("everzio-cart", JSON.stringify(state.items));
  }, [state.items, hydrated]);

  const addItem = useCallback(
    (product: Product, variant?: ProductVariant, qty = 1) =>
      dispatch({ type: "ADD", payload: { product, variant, quantity: qty } }),
    []
  );

  const removeItem = useCallback(
    (id: string) => dispatch({ type: "REMOVE", payload: { id } }),
    []
  );

  const updateQty = useCallback(
    (id: string, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { id, quantity } }),
    []
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE" }), []);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = state.items.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0
  );
  const savings = state.items.reduce((s, i) => {
    const diff = (i.product.compareAtPrice ?? i.product.price) - i.product.price;
    return s + diff * i.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        totalItems,
        subtotal,
        savings,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
