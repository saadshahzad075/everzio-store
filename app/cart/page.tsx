"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/motion/FadeIn";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, savings, totalItems } = useCart();

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        <div className="everzio-container py-8 md:py-12">
          <FadeIn>
            <h1
              className="font-display text-3xl md:text-4xl font-semibold text-[--color-fg] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Cart
              {totalItems > 0 && (
                <span className="ml-2 text-lg font-normal text-[--color-muted-fg]">
                  ({totalItems} item{totalItems !== 1 ? "s" : ""})
                </span>
              )}
            </h1>
          </FadeIn>

          {items.length === 0 ? (
            <FadeIn className="flex flex-col items-center justify-center py-24 text-center gap-5">
              <ShoppingBag size={56} className="text-[--color-muted-fg] opacity-30" aria-hidden="true" />
              <div>
                <p className="text-xl font-semibold">Your cart is empty</p>
                <p className="text-[--color-muted-fg] mt-1">
                  Start shopping to add items to your cart.
                </p>
              </div>
              <Link href="/shop">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={16} />}>
                  Start Shopping
                </Button>
              </Link>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* ---- Cart items ---- */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-4 p-4 bg-[--color-surface] rounded-[--radius-xl] border border-[--color-border] shadow-[--shadow-xs]"
                    >
                      {/* Image */}
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="flex-shrink-0 rounded-[--radius-lg] overflow-hidden bg-[--color-muted] w-20 h-20 sm:w-24 sm:h-24 relative"
                      >
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="font-semibold text-sm leading-tight hover:text-[--color-accent] transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        {item.variant && (
                          <p className="text-xs text-[--color-muted-fg]">
                            {item.variant.name}: {item.variant.value}
                          </p>
                        )}
                        <Price price={item.product.price} compareAtPrice={item.product.compareAtPrice} size="sm" />

                        <div className="flex items-center justify-between pt-1">
                          {/* Qty */}
                          <div className="flex items-center border border-[--color-border] rounded-[--radius-md] h-8">
                            <button
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="flex items-center justify-center w-8 h-8 hover:bg-[--color-muted] rounded-l-[--radius-md] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--color-ring] touch-manipulation"
                              aria-label={`Decrease quantity of ${item.product.name}`}
                            >
                              <Minus size={12} aria-hidden="true" />
                            </button>
                            <span className="w-9 text-center text-sm font-medium tabular-nums" aria-live="polite">
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

                          {/* Line total + remove */}
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-sm tabular-nums">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[--color-muted-fg] hover:text-[--color-destructive] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--color-ring] rounded p-1 touch-manipulation"
                              aria-label={`Remove ${item.product.name} from cart`}
                            >
                              <Trash2 size={14} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="pt-2">
                  <Link href="/shop" className="text-sm text-[--color-accent] hover:text-[--color-accent-hover] font-medium transition-colors flex items-center gap-1">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* ---- Order summary ---- */}
              <div>
                <div className="bg-[--color-surface-elevated] rounded-[--radius-xl] border border-[--color-border] p-6 space-y-4 sticky top-28">
                  <h2 className="font-semibold text-base text-[--color-fg]">Order Summary</h2>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[--color-muted-fg]">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="tabular-nums">{formatPrice(subtotal)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-[--color-success]">
                        <span>Discount saved</span>
                        <span className="tabular-nums">-{formatPrice(savings)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[--color-muted-fg]">
                      <span>Shipping</span>
                      <span className="text-[--color-success] font-medium">
                        {subtotal >= 2000 ? "Free" : formatPrice(150)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold text-base border-t border-[--color-border] pt-3">
                    <span>Total</span>
                    <span className="tabular-nums">
                      {formatPrice(subtotal + (subtotal >= 2000 ? 0 : 150))}
                    </span>
                  </div>

                  {subtotal < 2000 && (
                    <p className="text-xs text-[--color-accent] bg-[--color-accent-light] rounded-[--radius-md] px-3 py-2">
                      Add {formatPrice(2000 - subtotal)} more for free delivery!
                    </p>
                  )}

                  <Link href="/checkout">
                    <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight size={16} />}>
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <p className="text-xs text-center text-[--color-muted-fg]">
                    Secure checkout • Cash on Delivery available
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
