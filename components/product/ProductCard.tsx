"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
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

export function ProductCard({ product, priority = false, showQuickView = true }: ProductCardProps) {
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
    <article className="group relative" aria-label={product.name}>
      <Link href={`/shop/${product.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-[--radius-xl]">
        {/* ---- Image container ---- */}
        <div
          className="relative overflow-hidden rounded-[--radius-xl] bg-[--color-muted] aspect-[3/4]"
          onMouseEnter={() => product.images[1] && setImageIndex(1)}
          onMouseLeave={() => setImageIndex(0)}
        >
          {/* Primary image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "object-cover transition-all duration-500",
              imageIndex === 1 && !prefersReduced ? "opacity-0 scale-105" : "opacity-100 scale-100"
            )}
          />

          {/* Secondary image (hover crossfade) */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} — alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                "object-cover transition-all duration-500",
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

          {/* ---- Wishlist button ---- */}
          <div className="absolute top-3 right-3 z-10">
            <motion.button
              onClick={handleWishlist}
              variants={heartVariants}
              animate={isWishlisted ? "liked" : "unliked"}
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-full transition-all",
                "bg-[--color-surface]/90 shadow-[--shadow-sm] backdrop-blur-sm",
                "hover:bg-[--color-surface] hover:shadow-[--shadow-md]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]",
                "touch-manipulation",
                "opacity-0 group-hover:opacity-100 focus:opacity-100"
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
                    ? "fill-[--color-destructive] text-[--color-destructive]"
                    : "text-[--color-fg]"
                )}
              />
            </motion.button>
          </div>

          {/* ---- Quick add overlay ---- */}
          <AnimatePresence>
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-3"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileHover={{ opacity: 1, y: 0 }}
              animate={
                prefersReduced
                  ? {}
                  : { opacity: 0, y: 12 }
              }
            >
              {/* Invisible hover area trick — handled via group hover in CSS */}
            </motion.div>
          </AnimatePresence>

          {/* Add to cart — slides up on hover */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0",
              "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              prefersReduced && "translate-y-0 transition-none"
            )}
          >
            <button
              onClick={handleAddToCart}
              disabled={adding || !product.inStock}
              className={cn(
                "w-full flex items-center justify-center gap-2 h-10 rounded-[--radius-lg]",
                "bg-[--color-primary] text-[--color-primary-fg] text-sm font-semibold",
                "hover:bg-[--color-primary-hover] active:scale-[0.98] transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "touch-manipulation shadow-[--shadow-md]"
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

        {/* ---- Product info ---- */}
        <div className="pt-3 px-0.5 space-y-1.5">
          {/* Category */}
          <p className="text-xs text-[--color-muted-fg] uppercase tracking-wide font-medium">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="text-sm font-semibold leading-snug text-[--color-fg] line-clamp-2 group-hover:text-[--color-accent] transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <Rating value={product.rating} count={product.reviewCount} size="sm" />

          {/* Price */}
          <Price
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            size="md"
          />
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
