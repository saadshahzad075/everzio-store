"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/lib/data";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/components/ui/ToastProvider";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { heartVariants } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const BADGE_VARIANT_MAP: Record<string, "new" | "sale" | "hot" | "featured"> = {
  new: "new",
  sale: "sale",
  hot: "hot",
  featured: "featured",
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [adding, setAdding] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const prefersReduced = useReducedMotion();
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { showToast } = useToast();

  const isWishlisted = has(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (adding) return;
    setAdding(true);
    addItem(product);
    showToast("Added to Cart", product.name, "cart");
    await new Promise((r) => setTimeout(r, 600));
    setAdding(false);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    showToast(
      isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      product.name,
      "wishlist"
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <TiltCard maxTilt={6}>
        <article className="group relative bg-[--color-surface] rounded-[--radius-xl] border border-[--color-border] hover:border-amber-500/40 shadow-[--shadow-card] hover:shadow-[--shadow-lg] transition-all duration-300 flex flex-col h-full overflow-hidden">
          <Link
            href={`/shop/${product.slug}`}
            className="block flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
          >
            {/* ---- Image Container ---- */}
            <div
              className="relative overflow-hidden bg-slate-100 aspect-[3/4]"
              onMouseEnter={() => product.images[1] && setImageIndex(1)}
              onMouseLeave={() => setImageIndex(0)}
            >
              {/* Primary Image */}
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority={priority}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={cn(
                  "object-cover transition-all duration-700 ease-out",
                  imageIndex === 1 && !prefersReduced
                    ? "opacity-0 scale-105"
                    : "opacity-100 scale-100"
                )}
              />

              {/* Secondary Image */}
              {product.images[1] && (
                <Image
                  src={product.images[1]}
                  alt={`${product.name} — alternate view`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={cn(
                    "object-cover transition-all duration-700 ease-out",
                    imageIndex === 1 && !prefersReduced
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  )}
                />
              )}

              {/* ---- Badge ---- */}
              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant={BADGE_VARIANT_MAP[product.badge]}>
                    {product.badge === "hot"
                      ? "🔥 Hot"
                      : product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}
                  </Badge>
                </div>
              )}

              {/* Quick View Floating Button */}
              <button
                onClick={handleQuickView}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-4 py-2 rounded-full bg-slate-900/80 text-white text-xs font-semibold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 hover:bg-amber-600 shadow-xl"
                aria-label={`Quick view ${product.name}`}
              >
                <Eye size={14} /> Quick View
              </button>

              {/* ---- Wishlist Heart ---- */}
              <div className="absolute top-3 right-3 z-10">
                <motion.button
                  onClick={handleWishlist}
                  variants={heartVariants}
                  animate={isWishlisted ? "liked" : "unliked"}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/90 shadow-md backdrop-blur-md hover:bg-white hover:scale-110 transition-all"
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    size={16}
                    className={cn(
                      "transition-colors duration-200",
                      isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-700"
                    )}
                  />
                </motion.button>
              </div>

              {/* ---- Add to Cart Hover Button ---- */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-slate-900/70 to-transparent pt-8">
                <button
                  onClick={handleAddToCart}
                  disabled={adding || !product.inStock}
                  className="w-full flex items-center justify-center gap-2 h-10 rounded-[--radius-lg] bg-[#090D16] text-white text-sm font-semibold hover:bg-amber-600 active:scale-[0.98] transition-all shadow-lg"
                >
                  {adding ? (
                    <span>Adding…</span>
                  ) : (
                    <>
                      <ShoppingBag size={15} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ---- Info Block ---- */}
            <div className="p-4 space-y-2 flex flex-col flex-1">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-amber-600 uppercase tracking-wider">
                  {product.category}
                </span>
                {product.inStock && (
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    In Stock
                  </span>
                )}
              </div>

              <h3 className="text-sm font-semibold leading-snug text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
                {product.name}
              </h3>

              <div className="mt-auto pt-1">
                <Rating value={product.rating} count={product.reviewCount} size="sm" />
              </div>

              <div className="pt-1">
                <Price
                  price={product.price}
                  compareAtPrice={product.compareAtPrice}
                  size="md"
                />
              </div>
            </div>
          </Link>
        </article>
      </TiltCard>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
}

export default ProductCard;
