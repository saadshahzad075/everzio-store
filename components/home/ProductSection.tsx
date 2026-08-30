import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

interface ProductSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  badge?: string;
  products?: Product[];
  filter?: "trending" | "bestsellers" | "new" | "sale";
  viewAllHref?: string;
  viewAllLabel?: string;
  cols?: 2 | 3 | 4;
  className?: string;
  bgAlt?: boolean;
}

export function ProductSection({
  id,
  title,
  subtitle,
  badgeText,
  badge,
  products,
  filter,
  viewAllHref,
  viewAllLabel = "View all",
  cols = 4,
  className,
  bgAlt = false,
}: ProductSectionProps) {
  // Determine products list
  let displayProducts = products || PRODUCTS;
  if (filter === "trending") {
    displayProducts = PRODUCTS.filter((p) => p.isTrending);
  } else if (filter === "bestsellers") {
    displayProducts = PRODUCTS.filter((p) => p.isBestseller);
  } else if (filter === "new") {
    displayProducts = PRODUCTS.filter((p) => p.isNew || p.badge === "new");
  } else if (filter === "sale") {
    displayProducts = PRODUCTS.filter((p) => p.badge === "sale" || p.compareAtPrice);
  }

  const badgeDisplay = badgeText || badge;

  return (
    <section
      id={id}
      className={cn("section-y", bgAlt && "bg-[--color-surface-elevated]", className)}
      aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="everzio-container">
        {/* Header */}
        <FadeIn className="mb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              {badgeDisplay && (
                <p className="text-xs font-semibold text-[--color-accent] uppercase tracking-widest mb-2">
                  {badgeDisplay}
                </p>
              )}
              <h2
                id={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
                className="font-display text-3xl md:text-4xl font-semibold text-[--color-fg]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {title}
              </h2>
              {subtitle && (
                <p className="text-[--color-muted-fg] text-sm mt-1">{subtitle}</p>
              )}
            </div>

            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[--color-accent] hover:text-[--color-accent-hover] transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-sm"
              >
                {viewAllLabel}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            )}
          </div>
        </FadeIn>

        {/* Grid */}
        <ProductGrid
          products={displayProducts.slice(0, cols === 4 ? 8 : cols === 3 ? 6 : 4)}
          cols={cols}
          priorityCount={cols}
        />

        {/* Mobile "view all" */}
        {viewAllHref && (
          <div className="sm:hidden text-center mt-6">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[--color-accent] hover:text-[--color-accent-hover] transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-sm"
            >
              {viewAllLabel}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductSection;
