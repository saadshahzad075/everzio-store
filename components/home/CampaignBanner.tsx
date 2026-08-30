import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export function CampaignBanner() {
  return (
    <section className="section-y" aria-label="Current campaign">
      <div className="everzio-container">
        <FadeIn>
          <div
            className="relative overflow-hidden rounded-[--radius-2xl] min-h-[320px] md:min-h-[400px] flex items-center"
            style={{
              background: `
                linear-gradient(135deg, #1C1917 0%, #292524 40%, #1C1917 100%)
              `,
            }}
          >
            {/* Background accent */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background: `
                  radial-gradient(ellipse 70% 80% at 80% 50%, rgba(202,138,4,0.2) 0%, transparent 70%),
                  radial-gradient(ellipse 40% 60% at 15% 30%, rgba(161,98,7,0.12) 0%, transparent 60%)
                `,
              }}
            />

            {/* Geometric accent lines */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden" aria-hidden="true">
              <div
                className="absolute right-[-80px] top-[-80px] w-96 h-96 rounded-full border border-white/5"
              />
              <div
                className="absolute right-[-40px] top-[-40px] w-64 h-64 rounded-full border border-white/5"
              />
              <div
                className="absolute right-12 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[--color-accent]/20"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 max-w-lg">
              {/* Campaign badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[--radius-pill] bg-[--color-accent]/20 border border-[--color-accent]/30 text-[--color-accent-alt] text-xs font-semibold uppercase tracking-wider mb-4">
                <Tag size={10} aria-hidden="true" />
                Limited Time Deal
              </span>

              <h2
                className="font-display text-white text-3xl md:text-5xl font-bold leading-[1.05] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Up to{" "}
                <span style={{ color: "var(--color-accent-alt)" }}>40% Off</span>
                <br />
                Selected Items
              </h2>

              <p className="text-white/60 text-base mb-6 leading-relaxed">
                Discover handpicked deals across home, kitchen, and electronics.
                Free delivery included on all sale items.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/shop?filter=sale">
                  <Button
                    variant="accent"
                    size="lg"
                    rightIcon={<ArrowRight size={16} />}
                  >
                    Shop the Sale
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                  >
                    Browse All
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side decoration */}
            <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-white/20 pointer-events-none" aria-hidden="true">
              <div className="text-8xl font-display font-bold" style={{ fontFamily: "var(--font-display)" }}>
                40
              </div>
              <div className="text-2xl font-bold">% OFF</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default CampaignBanner;
