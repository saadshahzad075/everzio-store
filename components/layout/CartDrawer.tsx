"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { overlayVariants, slideInRight } from "@/lib/motion";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, subtotal, savings, totalItems } =
    useCart();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[--z-overlay] bg-black/50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[--z-drawer] w-full sm:w-[420px] bg-[--color-surface] flex flex-col shadow-[--shadow-xl]"
            variants={prefersReduced ? overlayVariants : slideInRight}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="dialog"
            aria-modal="true"
            aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          >
            {/* ---- Header ---- */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[--color-border]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} aria-hidden="true" />
                <h2 className="font-semibold text-base">
                  Cart
                  {totalItems > 0 && (
                    <span className="ml-1.5 text-[--color-muted-fg] font-normal text-sm">
                      ({totalItems} item{totalItems !== 1 ? "s" : ""})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="flex items-center justify-center w-9 h-9 rounded-[--radius-md] hover:bg-[--color-muted] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
                aria-label="Close cart"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* ---- Items ---- */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                  <ShoppingBag size={48} className="text-[--color-muted-fg] opacity-30" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-base">Your cart is empty</p>
                    <p className="text-sm text-[--color-muted-fg] mt-1">
                      Add items to start shopping
                    </p>
                  </div>
                  <Button variant="outline" size="md" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-[--color-border]" role="list">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-3 p-4"
                      >
                        {/* Image */}
                        <Link
                          href={`/shop/${item.product.slug}`}
                          onClick={closeCart}
                          className="flex-shrink-0 rounded-[--radius-md] overflow-hidden bg-[--color-muted] w-20 h-20 relative"
                        >
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                          <Link
                            href={`/shop/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-medium text-sm leading-tight hover:text-[--color-accent] transition-colors line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          {item.variant && (
                            <p className="text-xs text-[--color-muted-fg]">
                              {item.variant.name}: {item.variant.value}
                            </p>
                          )}

                          <Price
                            price={item.product.price}
                            compareAtPrice={item.product.compareAtPrice}
                            size="sm"
                          />

                          {/* Controls */}
                          <div className="flex items-center justify-between mt-auto pt-1">
                            {/* Qty */}
                            <div className="flex items-center gap-1 border border-[--color-border] rounded-[--radius-md] h-8">
                              <button
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="flex items-center justify-center w-8 h-8 hover:bg-[--color-muted] rounded-l-[--radius-md] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--color-ring] touch-manipulation"
                                aria-label={`Decrease quantity of ${item.product.name}`}
                              >
                                <Minus size={12} aria-hidden="true" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="flex items-center justify-center w-8 h-8 hover:bg-[--color-muted] rounded-r-[--radius-md] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--color-ring] touch-manipulation"
                                aria-label={`Increase quantity of ${item.product.name}`}
                              >
                                <Plus size={12} aria-hidden="true" />
                              </button>
                            </div>

                            {/* Remove */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center justify-center w-8 h-8 text-[--color-muted-fg] hover:text-[--color-destructive] transition-colors rounded-[--radius-md] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--color-ring] touch-manipulation"
                              aria-label={`Remove ${item.product.name} from cart`}
                            >
                              <Trash2 size={14} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* ---- Footer / Checkout ---- */}
            {items.length > 0 && (
              <div className="border-t border-[--color-border] p-5 space-y-3 bg-[--color-surface-elevated]">
                {savings > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[--color-muted-fg]">You save</span>
                    <span className="font-semibold text-[--color-success]">
                      {formatPrice(savings)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-base">Subtotal</span>
                  <span className="font-bold text-lg tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-[--color-muted-fg]">
                  Shipping & taxes calculated at checkout
                </p>
                <Link href="/checkout" onClick={closeCart}>
                  <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight size={16} />}>
                    Checkout
                  </Button>
                </Link>
                <Link href="/cart" onClick={closeCart}>
                  <Button variant="outline" size="md" fullWidth>
                    View Cart
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CartDrawer;
