"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/data";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { heartVariants } from "@/lib/motion";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  showQuickView?: boolean;
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
  const prefersReduced = useReducedMotion();
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const isWishlisted = has(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (adding) return;
    setAdding(true);
    addItem(product);
    await new Promise((r) => setTimeout(r, 800));
    setAdding(false);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  return (
    <article className="group relative bg-[--color-surface] rounded-[--radius-xl] border border-[--color-border] hover:border-amber-500/40 shadow-[--shadow-card] hover:shadow-[--shadow-lg] transition-all duration-300 flex flex-col h-full overflow-hidden">
      <Link href={`/shop/${product.slug}`} className="block flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]">
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
              imageIndex === 1 && !prefersReduced ? "opacity-0 scale-105" : "opacity-100 scale-100"
            )}
          />

          {/* Secondary Image Crossfade */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} — alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                "object-cover transition-all duration-700 ease-out",
                imageIndex === 1 && !prefersReduced ? "opacity-100 scale-100" : "opacity-0 scale-105"
              )}
            />
          )}

          {/* ---- Badge ---- */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <motion.div
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Badge variant={BADGE_VARIANT_MAP[product.badge]}>
                  {product.badge === "hot" ? "🔥 Hot" : product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}
                </Badge>
              </motion.div>
            </div>
          )}

          {/* ---- Wishlist Heart Button ---- */}
          <div className="absolute top-3 right-3 z-10">
            <motion.button
              onClick={handleWishlist}
              variants={heartVariants}
              animate={isWishlisted ? "liked" : "unliked"}
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200",
                "bg-white/90 shadow-md backdrop-blur-md hover:bg-white hover:scale-110",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]",
                "touch-manipulation"
              )}
              aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              aria-pressed={isWishlisted}
            >
              <Heart
                size={16}
                aria-hidden="true"
                className={cn(
                  "transition-colors duration-200",
                  isWishlisted
                    ? "fill-rose-500 text-rose-500"
                    : "text-slate-700 group-hover:text-amber-600"
                )}
              />
            </motion.button>
          </div>

          {/* ---- Add to Cart Hover Slide Up ---- */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0",
              "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-gradient-to-t from-slate-900/60 to-transparent pt-8",
              prefersReduced && "translate-y-0 transition-none"
            )}
          >
            <button
              onClick={handleAddToCart}
              disabled={adding || !product.inStock}
              className={cn(
                "w-full flex items-center justify-center gap-2 h-10 rounded-[--radius-lg]",
                "bg-[#090D16] text-white text-sm font-semibold hover:bg-amber-600 active:scale-[0.98] transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
                "disabled:opacity-50 disabled:cursor-not-allowed shadow-lg",
                "touch-manipulation"
              )}
              aria-label={
                !product.inStock
                  ? "Out of stock"
                  : adding
                  ? "Adding to cart…"
                  : `Add ${product.name} to cart`
              }
            >
              {adding ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    aria-hidden="true"
                  />
                  <span>Adding…</span>
                </>
              ) : !product.inStock ? (
                "Out of Stock"
              ) : (
                <>
                  <ShoppingBag size={15} aria-hidden="true" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ---- Info Block ---- */}
        <div className="p-4 space-y-2 flex flex-col flex-1">
          {/* Category & Stock */}
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

          {/* Title */}
          <h3 className="text-sm font-semibold leading-snug text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-auto pt-1">
            <Rating value={product.rating} count={product.reviewCount} size="sm" />
          </div>

          {/* Price */}
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
  );
}

export default ProductCard;
