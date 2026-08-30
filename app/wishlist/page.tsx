"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { PRODUCTS } from "@/lib/data";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";

export default function WishlistPage() {
  const { items } = useWishlist();
  const wishlistedProducts = PRODUCTS.filter((p) => items.includes(p.id));

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        <div className="everzio-container py-8 md:py-12">
          <FadeIn>
            <div className="mb-8">
              <h1
                className="font-display text-3xl md:text-4xl font-semibold text-[--color-fg]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your Wishlist
                {wishlistedProducts.length > 0 && (
                  <span className="ml-2.5 text-lg font-normal text-[--color-muted-fg]">
                    ({wishlistedProducts.length} item{wishlistedProducts.length !== 1 ? "s" : ""})
                  </span>
                )}
              </h1>
              <p className="text-sm text-[--color-muted-fg] mt-1">
                Save your favorite items for later
              </p>
            </div>
          </FadeIn>

          {wishlistedProducts.length === 0 ? (
            <FadeIn className="flex flex-col items-center justify-center py-24 text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-[--color-muted] flex items-center justify-center text-[--color-muted-fg]">
                <Heart size={32} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xl font-semibold">Your wishlist is empty</p>
                <p className="text-[--color-muted-fg] mt-1">
                  Click the heart icon on any product to save it here.
                </p>
              </div>
              <Link href="/shop">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={16} />}>
                  Explore Products
                </Button>
              </Link>
            </FadeIn>
          ) : (
            <ProductGrid products={wishlistedProducts} cols={4} priorityCount={4} />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
