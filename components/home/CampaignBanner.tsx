import Link from "next/link";
import { ArrowRight, Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export function CampaignBanner() {
  return (
    <section className="section-y" aria-label="Current campaign">
      <div className="everzio-container">
        <FadeIn>
          <div
            className="relative overflow-hidden rounded-[--radius-2xl] min-h-[360px] md:min-h-[440px] flex items-center shadow-2xl border border-amber-500/20"
            style={{
              background: `
                linear-gradient(135deg, #090D16 0%, #1E1B4B 50%, #090D16 100%)
              `,
            }}
          >
            {/* Ambient Lighting Gradients */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background: `
                  radial-gradient(ellipse 65% 75% at 85% 50%, rgba(245,158,11,0.25) 0%, transparent 70%),
                  radial-gradient(ellipse 45% 65% at 15% 30%, rgba(217,119,6,0.18) 0%, transparent 60%)
                `,
              }}
            />

            {/* Geometric Accent Rings */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden" aria-hidden="true">
              <div className="absolute right-[-100px] top-[-100px] w-[450px] h-[450px] rounded-full border border-white/10" />
              <div className="absolute right-[-40px] top-[-40px] w-80 h-80 rounded-full border border-amber-500/20" />
              <div className="absolute right-16 top-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-amber-400/30 blur-sm" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-14 max-w-xl">
              {/* Campaign badge */}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[--radius-pill] bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-5 backdrop-blur-md">
                <Flame size={14} className="text-amber-400" aria-hidden="true" />
                Limited Time Flash Sale
              </span>

              <h2
                className="font-display text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.04] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Up to{" "}
                <span className="gold-gradient-text italic font-serif">
                  40% OFF
                </span>
                <br />
                Selected Products
              </h2>

              <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed font-normal">
                Elevate your home with handpicked essentials on sale this week. Free delivery nationwide included.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/shop?filter=sale">
                  <Button
                    variant="accent"
                    size="lg"
                    className="btn-gold-glow text-base font-semibold px-8 h-13"
                    rightIcon={<ArrowRight size={18} />}
                  >
                    Shop the Sale
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 h-13 px-7 text-base"
                  >
                    Browse Catalog
                  </Button>
                </Link>
              </div>
            </div>

            {/* Big 40% OFF Visual Badge (desktop) */}
            <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-center justify-center pointer-events-none select-none" aria-hidden="true">
              <div className="w-52 h-52 rounded-full border-2 border-amber-500/30 bg-amber-500/10 backdrop-blur-md flex flex-col items-center justify-center shadow-gold">
                <span className="text-6xl font-display font-bold gold-gradient-text" style={{ fontFamily: "var(--font-display)" }}>
                  40%
                </span>
                <span className="text-sm font-semibold tracking-widest text-amber-200 uppercase mt-1">
                  OFF SALE
                </span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default CampaignBanner;
