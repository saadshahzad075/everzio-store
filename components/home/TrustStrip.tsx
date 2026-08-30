import { Truck, Shield, RotateCcw, MessageCircle, CreditCard, Clock } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Truck, label: "Free Delivery", sub: "Orders above PKR 2,000" },
  { icon: CreditCard, label: "Cash on Delivery", sub: "Available nationwide" },
  { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
  { icon: Shield, label: "Genuine Products", sub: "100% authentic goods" },
  { icon: MessageCircle, label: "WhatsApp Support", sub: "7 days a week" },
  { icon: Clock, label: "Fast Dispatch", sub: "Ships within 24 hours" },
  // Duplicate for seamless marquee
  { icon: Truck, label: "Free Delivery", sub: "Orders above PKR 2,000" },
  { icon: CreditCard, label: "Cash on Delivery", sub: "Available nationwide" },
  { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
  { icon: Shield, label: "Genuine Products", sub: "100% authentic goods" },
  { icon: MessageCircle, label: "WhatsApp Support", sub: "7 days a week" },
  { icon: Clock, label: "Fast Dispatch", sub: "Ships within 24 hours" },
];

export function TrustStrip() {
  return (
    <section
      className="py-5 border-y border-[--color-border] bg-[--color-surface-elevated] overflow-hidden"
      aria-label="Trust and service highlights"
    >
      {/* Marquee container */}
      <div className="relative" aria-hidden="true">
        <div className="animate-marquee flex items-center gap-0">
          {TRUST_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-8 flex-shrink-0 border-r border-[--color-border] last:border-r-0"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[--color-accent-light] flex-shrink-0">
                  <Icon size={16} className="text-[--color-accent]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[--color-fg] whitespace-nowrap">
                    {item.label}
                  </p>
                  <p className="text-xs text-[--color-muted-fg] whitespace-nowrap">
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible static version (sr only) */}
      <ul className="sr-only">
        {TRUST_ITEMS.slice(0, 6).map((item, i) => (
          <li key={i}>{item.label}: {item.sub}</li>
        ))}
      </ul>
    </section>
  );
}

export default TrustStrip;
