import { Star, Quote } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion/FadeIn";

// DEMO DATA — these are illustrative reviews, not real customer data
const DEMO_REVIEWS = [
  {
    id: 1,
    name: "Sarah K.",
    location: "Karachi",
    rating: 5,
    text: "The quality is incredible — feels exactly like the product photos. Delivery was fast and packaging was premium. Will definitely order again!",
    product: "Marble & Acacia Serving Board",
  },
  {
    id: 2,
    name: "Ahmed R.",
    location: "Lahore",
    rating: 5,
    text: "Super happy with my purchase. The noise cancelling earbuds are amazing, and the COD option made it so easy to order.",
    product: "Noise Cancelling Earbuds",
  },
  {
    id: 3,
    name: "Fatima M.",
    location: "Islamabad",
    rating: 5,
    text: "Everzio has become my go-to for home products. The candle set smells absolutely divine. Perfect for gifting too!",
    product: "Scented Soy Wax Candle Set",
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className="fill-[--color-accent-alt] text-[--color-accent-alt]"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function SocialProof() {
  const totalReviews = 4800;
  const avgRating = 4.8;

  return (
    <section className="section-y bg-[--color-surface-elevated]" aria-labelledby="reviews-heading">
      <div className="everzio-container">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <p className="text-xs font-semibold text-[--color-accent] uppercase tracking-widest mb-2">
            Customer Reviews
          </p>
          <h2
            id="reviews-heading"
            className="font-display text-3xl md:text-4xl font-semibold text-[--color-fg] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What Our Customers Say
          </h2>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-bold text-[--color-fg] tabular-nums">
              {avgRating}
            </span>
            <div className="flex flex-col items-start gap-1">
              <StarRow count={5} />
              <span className="text-xs text-[--color-muted-fg]">
                Based on {totalReviews.toLocaleString()}+ reviews
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Review cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DEMO_REVIEWS.map((review) => (
            <StaggerItem key={review.id}>
              <div className="relative bg-[--color-surface] rounded-[--radius-xl] p-6 shadow-[--shadow-card] border border-[--color-border] flex flex-col gap-4 h-full">
                {/* Quote icon */}
                <Quote
                  size={24}
                  className="text-[--color-accent]/30 flex-shrink-0"
                  aria-hidden="true"
                />

                {/* Review text */}
                <blockquote className="text-sm leading-relaxed text-[--color-fg] flex-1">
                  "{review.text}"
                </blockquote>

                {/* Rating */}
                <StarRow count={review.rating} />

                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-2 border-t border-[--color-border]">
                  <div
                    className="w-9 h-9 rounded-full bg-[--color-muted] flex items-center justify-center text-sm font-bold text-[--color-muted-fg] flex-shrink-0"
                    aria-hidden="true"
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[--color-fg]">{review.name}</p>
                    <p className="text-xs text-[--color-muted-fg]">{review.location}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-[--color-muted-fg] line-clamp-1">
                      {review.product}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export default SocialProof;
