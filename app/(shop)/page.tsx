import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FadeIn } from "@/components/motion/FadeIn";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import Link from "next/link";
import { SlidersHorizontal, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse all premium products at EVERZIO — home, kitchen, electronics, lifestyle and more. Free delivery & COD across Pakistan.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; filter?: string; sort?: string }>;
}) {
  // Note: in Next.js 16+, searchParams is a Promise
  // Using synchronous access for demo; in production use async/await with proper suspense
  const allProducts = PRODUCTS;

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        <div className="everzio-container py-8">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-[--color-muted-fg]" role="list">
              <li>
                <Link href="/" className="hover:text-[--color-fg] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li aria-current="page" className="text-[--color-fg] font-medium">
                Shop
              </li>
            </ol>
          </nav>

          <div className="flex gap-8">
            {/* ---- Sidebar filters (desktop) ---- */}
            <aside
              className="hidden lg:block w-56 flex-shrink-0 space-y-6"
              aria-label="Product filters"
            >
              <div>
                <h2 className="font-semibold text-sm mb-3 text-[--color-fg]">Categories</h2>
                <ul className="space-y-1" role="list">
                  <li>
                    <Link
                      href="/shop"
                      className="flex items-center justify-between px-2 py-1.5 rounded-[--radius-md] text-sm hover:bg-[--color-muted] transition-colors text-[--color-fg] font-medium"
                    >
                      All Products
                      <span className="text-xs text-[--color-muted-fg] tabular-nums">
                        {PRODUCTS.length}
                      </span>
                    </Link>
                  </li>
                  {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/shop?category=${cat.slug}`}
                        className="flex items-center justify-between px-2 py-1.5 rounded-[--radius-md] text-sm hover:bg-[--color-muted] transition-colors text-[--color-muted-fg] hover:text-[--color-fg]"
                      >
                        {cat.name}
                        <span className="text-xs tabular-nums">{cat.productCount}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-semibold text-sm mb-3 text-[--color-fg]">Price Range</h2>
                <div className="space-y-1">
                  {[
                    { label: "Under PKR 1,000", href: "/shop?maxPrice=1000" },
                    { label: "PKR 1,000 – 3,000", href: "/shop?minPrice=1000&maxPrice=3000" },
                    { label: "PKR 3,000 – 5,000", href: "/shop?minPrice=3000&maxPrice=5000" },
                    { label: "Above PKR 5,000", href: "/shop?minPrice=5000" },
                  ].map((range) => (
                    <Link
                      key={range.href}
                      href={range.href}
                      className="block px-2 py-1.5 rounded-[--radius-md] text-sm text-[--color-muted-fg] hover:text-[--color-fg] hover:bg-[--color-muted] transition-colors"
                    >
                      {range.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-sm mb-3 text-[--color-fg]">Rating</h2>
                <div className="space-y-1">
                  {[5, 4, 3].map((stars) => (
                    <Link
                      key={stars}
                      href={`/shop?minRating=${stars}`}
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded-[--radius-md] text-sm text-[--color-muted-fg] hover:text-[--color-fg] hover:bg-[--color-muted] transition-colors"
                    >
                      <span className="text-[--color-accent-alt]">{"★".repeat(stars)}</span>
                      <span className="text-xs">{stars === 5 ? "Only" : "& up"}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* ---- Main content ---- */}
            <div className="flex-1 min-w-0">
              {/* Page header */}
              <FadeIn>
                <div className="flex items-center justify-between mb-6 gap-4">
                  <div>
                    <h1
                      className="font-display text-2xl md:text-3xl font-semibold text-[--color-fg]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      All Products
                    </h1>
                    <p className="text-sm text-[--color-muted-fg] mt-0.5">
                      {allProducts.length} products
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Sort */}
                    <select
                      className="h-9 px-3 text-sm border border-[--color-border] rounded-[--radius-md] bg-[--color-surface] text-[--color-fg] focus:outline-none focus:ring-2 focus:ring-[--color-ring] cursor-pointer"
                      aria-label="Sort products"
                      defaultValue="featured"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="rating">Top Rated</option>
                    </select>

                    {/* Mobile filter */}
                    <button
                      className="lg:hidden flex items-center gap-1.5 h-9 px-3 text-sm border border-[--color-border] rounded-[--radius-md] bg-[--color-surface] text-[--color-fg] hover:bg-[--color-muted] transition-colors touch-manipulation"
                      aria-label="Open filters"
                    >
                      <SlidersHorizontal size={14} aria-hidden="true" />
                      Filters
                    </button>
                  </div>
                </div>
              </FadeIn>

              {/* Product grid */}
              <ProductGrid
                products={allProducts}
                cols={3}
                priorityCount={6}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
