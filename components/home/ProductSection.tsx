import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/utils";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  badge?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
  cols?: 2 | 3 | 4;
  className?: string;
  bgAlt?: boolean;
}

export function ProductSection({
  title,
  subtitle,
  badge,
  products,
  viewAllHref,
  viewAllLabel = "View all",
  cols = 4,
  className,
  bgAlt = false,
}: ProductSectionProps) {
  return (
    <section
      className={cn("section-y", bgAlt && "bg-[--color-surface-elevated]", className)}
      aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="everzio-container">
        {/* Header */}
        <FadeIn className="mb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              {badge && (
                <p className="text-xs font-semibold text-[--color-accent] uppercase tracking-widest mb-2">
                  {badge}
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
          products={products.slice(0, cols === 4 ? 8 : cols === 3 ? 6 : 4)}
          cols={cols}
          priorityCount={cols}
        />

        {/* Mobile "view all" */}
        {viewAllHref && (
          <div className="sm:hidden text-center mt-6">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[--color-accent] hover:text-[--color-accent-hover] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-sm"
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
