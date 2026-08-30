"use client";

import { motion } from "framer-motion";
import type { Product } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/motion";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
  cols?: 2 | 3 | 4;
  className?: string;
  priorityCount?: number;
}

const colClasses: Record<number, string> = {
  2: "grid-cols-2 sm:grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function ProductGrid({
  products,
  loading = false,
  skeletonCount = 8,
  cols = 4,
  className,
  priorityCount = 4,
}: ProductGridProps) {
  if (loading) {
    return (
      <div
        className={cn("grid gap-4 sm:gap-6", colClasses[cols], className)}
        aria-label="Loading products…"
        role="status"
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
        <p className="text-lg font-semibold text-[--color-fg]">No products found</p>
        <p className="text-sm text-[--color-muted-fg]">
          Try adjusting your filters or browsing a different category.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className={cn("grid gap-4 sm:gap-6", colClasses[cols], className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      role="list"
      aria-label="Products"
    >
      {products.map((product, i) => (
        <motion.div key={product.id} variants={staggerItem} role="listitem">
          <ProductCard
            product={product}
            priority={i < priorityCount}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ProductGrid;
