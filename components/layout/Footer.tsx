import Link from "next/link";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { CATEGORIES, EVERZIO_INSTAGRAM, EVERZIO_WHATSAPP } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const footerLinks = {
  shop: [
    { label: "New Arrivals", href: "/shop?filter=new" },
    { label: "Best Sellers", href: "/shop?filter=bestsellers" },
    { label: "Deals & Offers", href: "/shop?filter=sale" },
    { label: "All Products", href: "/shop" },
  ],
  help: [
    { label: "Track Order", href: "/track" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns Policy", href: "/returns" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappHref = buildWhatsAppUrl(
    EVERZIO_WHATSAPP,
    "Hi! I have a question about my order."
  );

  return (
    <footer className="bg-[--color-primary] text-[--color-primary-fg]" role="contentinfo">
      {/* Main footer */}
      <div className="everzio-container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm">
              <span
                className="font-display text-2xl font-bold tracking-[0.12em] uppercase text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                EVERZIO
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Premium home, kitchen, and lifestyle products — curated for modern living.
              Smart choices, delivered simply.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {["COD Available", "Free Delivery", "Easy Returns", "Genuine Products"].map((badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-[--radius-pill] border border-white/20 text-xs text-white/80"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={EVERZIO_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-[--radius-md] bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Everzio on Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-[--radius-md] bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Chat with Everzio on WhatsApp"
              >
                <MessageCircle size={16} aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@everzio.com"
                className="flex items-center justify-center w-9 h-9 rounded-[--radius-md] bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Email Everzio"
              >
                <Mail size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2.5" role="list">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="text-sm text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded-sm"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">Help</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-3 py-2 bg-[#25D366] text-white rounded-[--radius-md] text-sm font-medium hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <MessageCircle size={14} aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="everzio-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <MapPin size={12} aria-hidden="true" />
            <span>Pakistan</span>
          </div>
          <p className="text-xs text-white/40 text-center">
            © {currentYear} EVERZIO. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
