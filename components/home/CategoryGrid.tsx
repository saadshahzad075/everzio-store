import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

export function CategoryGrid() {
  return (
    <section className="section-y" aria-labelledby="categories-heading">
      <div className="everzio-container">
        {/* Header */}
        <FadeIn className="mb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[--color-accent] uppercase tracking-widest mb-2">
                Browse by Category
              </p>
              <h2
                id="categories-heading"
                className="font-display text-3xl md:text-4xl font-semibold text-[--color-fg]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Shop Every Need
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[--color-accent] hover:text-[--color-accent-hover] transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-sm"
            >
              All categories
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIES.map((category) => (
            <StaggerItem key={category.id}>
              <Link
                href={`/shop?category=${category.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-[--radius-xl]"
                aria-label={`${category.name} — ${category.productCount} products`}
              >
                <div className="relative overflow-hidden rounded-[--radius-xl] aspect-[3/4] bg-[--color-muted]">
                  {/* Category image */}
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    aria-hidden="true"
                  />

                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(12,10,9,0.85) 0%, rgba(12,10,9,0.2) 50%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <p className="text-white font-semibold text-sm leading-tight line-clamp-2">
                      {category.name}
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">
                      {category.productCount} products
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/0 group-hover:bg-white/15 transition-all duration-300 flex items-center justify-center" aria-hidden="true">
                    <ArrowRight
                      size={12}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-45"
                    />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile "all" link */}
        <div className="sm:hidden text-center mt-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[--color-accent] hover:text-[--color-accent-hover] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-sm"
          >
            Browse all categories
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
