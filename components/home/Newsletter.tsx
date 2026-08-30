"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { EVERZIO_WHATSAPP } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const whatsappHref = buildWhatsAppUrl(
    EVERZIO_WHATSAPP,
    "Hi! I'd like to get updates about new products and deals from Everzio."
  );

  return (
    <section
      className="section-y bg-[--color-primary]"
      aria-labelledby="newsletter-heading"
    >
      <div className="everzio-container">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold text-[--color-accent-alt] uppercase tracking-widest mb-3">
              Stay in the loop
            </p>
            <h2
              id="newsletter-heading"
              className="font-display text-3xl md:text-4xl font-semibold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Get Exclusive Deals First
            </h2>
            <p className="text-white/60 text-base mb-8">
              Subscribe to get early access to new arrivals, exclusive deals, and
              weekly picks — delivered to your inbox.
            </p>

            {/* Email form */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-4"
                >
                  <CheckCircle2 size={40} className="text-[--color-success]" aria-hidden="true" />
                  <p className="text-white font-semibold text-lg">You're in!</p>
                  <p className="text-white/60 text-sm">
                    We'll send you the best deals and new arrivals.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex gap-2 max-w-md mx-auto"
                  aria-label="Newsletter subscription form"
                >
                  <div className="flex-1 relative">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                      aria-hidden="true"
                    />
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full h-11 pl-10 pr-4 bg-white/10 border border-white/20 rounded-[--radius-md] text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-accent] focus:border-transparent transition-all"
                      aria-required="true"
                      autoComplete="email"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="accent"
                    size="md"
                    loading={loading}
                    rightIcon={!loading ? <ArrowRight size={14} /> : undefined}
                  >
                    Subscribe
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* WhatsApp alternative */}
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-white/10" aria-hidden="true" />
              <span className="text-white/30 text-xs">or</span>
              <div className="h-px flex-1 bg-white/10" aria-hidden="true" />
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-[#25D366] text-white rounded-[--radius-md] text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Get updates on WhatsApp
            </a>

            <p className="text-white/30 text-xs mt-4">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Newsletter;
