import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductSection } from "@/components/home/ProductSection";
import { FlashDealTimer } from "@/components/home/FlashDealTimer";
import { HotspotBanner } from "@/components/home/HotspotBanner";
import { CampaignBanner } from "@/components/home/CampaignBanner";
import { SocialProof } from "@/components/home/SocialProof";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { Newsletter } from "@/components/home/Newsletter";
import { PromoModal } from "@/components/ui/PromoModal";
import { WhatsAppFloating } from "@/components/ui/WhatsAppFloating";

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        {/* Cinematic Hero */}
        <Hero />

        {/* Marquee Trust Highlights */}
        <TrustStrip />

        {/* Flash Sale Countdown Timer Banner */}
        <FlashDealTimer />

        {/* Category Grid */}
        <CategoryGrid />

        {/* Trending Now */}
        <ProductSection
          id="trending-now"
          title="Trending Now"
          subtitle="The products everyone's talking about this week."
          badgeText="What's Hot"
          filter="trending"
          viewAllHref="/shop?filter=trending"
        />

        {/* Interactive Hotspot Lookbook Showcase */}
        <HotspotBanner />

        {/* Campaign Banner */}
        <CampaignBanner />

        {/* Best Sellers */}
        <ProductSection
          id="best-sellers"
          title="Most Loved & Best Sellers"
          subtitle="Customer favorites backed by 5-star verified reviews."
          badgeText="Top Rated"
          filter="bestsellers"
          viewAllHref="/shop?filter=bestsellers"
        />

        {/* Social Proof Reviews */}
        <SocialProof />

        {/* New Arrivals */}
        <ProductSection
          id="new-arrivals"
          title="Fresh New Arrivals"
          subtitle="Just landed items designed to elevate your everyday."
          badgeText="Just In"
          filter="new"
          viewAllHref="/shop?filter=new"
        />

        {/* Instagram Lookbook Showcase */}
        <InstagramGrid />

        {/* Newsletter CTA */}
        <Newsletter />
      </main>

      {/* Welcome Discount Modal */}
      <PromoModal />

      {/* Persistent Floating WhatsApp Order Button */}
      <WhatsAppFloating />
    </>
  );
}
