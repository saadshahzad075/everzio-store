"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Heart, MessageCircle, Star, Check, Truck, Shield } from "lucide-react";
import type { Product, ProductVariant } from "@/lib/data";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl, buildProductWhatsAppMessage } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants?.[0] || null
  );
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const { toggle, has } = useWishlist();

  if (!product) return null;

  const isWishlisted = has(product.id);

  const handleAddToCart = () => {
    addItem(product, selectedVariant || undefined, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappMessage = buildProductWhatsAppMessage(
    product.name,
    selectedVariant?.name || undefined,
    quantity
  );
  const whatsappUrl = buildWhatsAppUrl(product.whatsappPhone, whatsappMessage);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[--z-modal] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-white rounded-[--radius-2xl] shadow-2xl overflow-hidden border border-slate-200 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image Gallery */}
            <div className="p-6 bg-slate-50 flex flex-col justify-between">
              <div className="relative aspect-square rounded-[--radius-xl] overflow-hidden bg-white shadow-sm border border-slate-200 mb-4">
                <Image
                  src={product.images[activeImage] || product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === i ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Product Details */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-5">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  {product.category}
                </span>

                <h2 className="text-2xl font-bold font-display text-slate-900 mt-1 mb-2">
                  {product.name}
                </h2>

                <div className="flex items-center gap-3 mb-3">
                  <Rating value={product.rating} count={product.reviewCount} size="sm" />
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
                    In Stock
                  </span>
                </div>

                <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" showSavings />

                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wider">
                      Option: {selectedVariant?.name}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            selectedVariant?.id === variant.id
                              ? "bg-[#090D16] text-white border-[#090D16]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400"
                          }`}
                        >
                          {variant.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action CTAs */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    variant="accent"
                    className="flex-1 btn-gold-glow h-12 text-sm font-semibold shadow-gold"
                  >
                    {added ? (
                      <>
                        <Check size={16} /> Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} /> Add to Cart
                      </>
                    )}
                  </Button>

                  <button
                    onClick={() => toggle(product.id)}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                      isWishlisted ? "bg-rose-50 border-rose-200 text-rose-500" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Heart size={18} className={isWishlisted ? "fill-rose-500" : ""} />
                  </button>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-emerald-600 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-700 transition-colors shadow-md"
                >
                  <MessageCircle size={17} className="fill-white text-emerald-600" />
                  Order Directly via WhatsApp (COD)
                </a>

                <div className="flex justify-between items-center text-slate-500 text-[11px] font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <Truck size={13} className="text-amber-500" /> Free delivery above PKR 2,000
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield size={13} className="text-amber-500" /> 7-Day Money Back Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default QuickViewModal;
