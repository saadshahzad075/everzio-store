import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { CampaignBanner } from "@/components/home/CampaignBanner";
import { SocialProof } from "@/components/home/SocialProof";
import { Newsletter } from "@/components/home/Newsletter";
import { COLLECTIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "EVERZIO — Premium Lifestyle Products",
  description:
    "Discover premium home, kitchen, electronics, and lifestyle products at EVERZIO. Smart choices, delivered simply. Free delivery & COD across Pakistan.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* Sticky top elements */}
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        {/* 1. Cinematic hero */}
        <Hero />

        {/* 2. Trust strip */}
        <TrustStrip />

        {/* 3. Trending products */}
        <ProductSection
          title="Trending Now"
          badge="What's Hot"
          subtitle="The products everyone's talking about this week."
          products={COLLECTIONS.trending}
          viewAllHref="/shop?filter=trending"
          viewAllLabel="See all trending"
          cols={4}
        />

        {/* 4. Category grid */}
        <CategoryGrid />

        {/* 5. Campaign banner */}
        <CampaignBanner />

        {/* 6. Best sellers */}
        <ProductSection
          title="Best Sellers"
          badge="Top Rated"
          subtitle="Our most loved products, tried and trusted by thousands."
          products={COLLECTIONS.bestsellers}
          viewAllHref="/shop?filter=bestsellers"
          viewAllLabel="Shop best sellers"
          cols={4}
          bgAlt
        />

        {/* 7. New arrivals */}
        <ProductSection
          title="New Arrivals"
          badge="Just In"
          subtitle="Fresh products added this week."
          products={COLLECTIONS.newArrivals}
          viewAllHref="/shop?filter=new"
          viewAllLabel="See new arrivals"
          cols={4}
        />

        {/* 8. Social proof / reviews */}
        <SocialProof />

        {/* 9. Newsletter + WhatsApp */}
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
