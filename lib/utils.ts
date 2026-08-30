import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ---------------------------------------------------------------------------
// Tailwind class merge utility
// ---------------------------------------------------------------------------
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---------------------------------------------------------------------------
// Currency formatting — PKR first
// ---------------------------------------------------------------------------
export function formatPrice(
  amount: number,
  currency: string = "PKR",
): string {
  if (currency === "PKR") {
    return `PKR ${amount.toLocaleString("en-PK")}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ---------------------------------------------------------------------------
// Discount calculation
// ---------------------------------------------------------------------------
export function calcDiscount(price: number, compareAt: number): number {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

// ---------------------------------------------------------------------------
// String utilities
// ---------------------------------------------------------------------------
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Pluralize
// ---------------------------------------------------------------------------
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? singular + "s");
}

// ---------------------------------------------------------------------------
// WhatsApp URL builder
// ---------------------------------------------------------------------------
export function buildWhatsAppUrl(phone: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function buildProductWhatsAppMessage(
  productName: string,
  variant?: string,
  qty?: number,
  url?: string
): string {
  const lines = [
    `Hi! I'm interested in ordering:`,
    `*${productName}*${variant ? ` — ${variant}` : ""}`,
    qty ? `Qty: ${qty}` : "",
    url ? `\nProduct link: ${url}` : "",
    `\nPlease confirm availability and delivery details. Thank you!`,
  ];
  return lines.filter(Boolean).join("\n");
}
