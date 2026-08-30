import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

export function CategoryGrid() {
  return (
    <section className="section-y" aria-labelledby="categories-heading">
      <div className="everzio-container">
        {/* Header */}
        <FadeIn className="mb-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" />
                Browse Collections
              </p>
              <h2
                id="categories-heading"
                className="font-display text-3xl md:text-5xl font-semibold text-slate-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Shop by Category
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-sm"
            >
              All categories
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>

        {/* Category Cards Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <StaggerItem key={category.id}>
              <Link
                href={`/shop?category=${category.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-[--radius-xl]"
                aria-label={`${category.name} — ${category.productCount} products`}
              >
                <div className="relative overflow-hidden rounded-[--radius-xl] aspect-[3/4] bg-slate-900 shadow-md group-hover:shadow-xl transition-all duration-500 border border-slate-200 group-hover:border-amber-500/50">
                  {/* Category Image */}
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    aria-hidden="true"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(9,13,22,0.92) 0%, rgba(9,13,22,0.3) 55%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Category Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore
                    </p>
                    <p className="text-white font-semibold text-base sm:text-lg leading-tight line-clamp-2">
                      {category.name}
                    </p>
                    <p className="text-slate-300 text-xs mt-1 font-medium">
                      {category.productCount} products
                    </p>
                  </div>

                  {/* Hover Floating Arrow */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 flex items-center justify-center text-white" aria-hidden="true">
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 -rotate-45 group-hover:rotate-0"
                    />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile View All */}
        <div className="sm:hidden text-center mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-sm"
          >
            Browse all categories
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
