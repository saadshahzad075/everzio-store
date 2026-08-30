"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  MessageCircle,
  ChevronRight,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { cn, buildWhatsAppUrl, buildProductWhatsAppMessage } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";

const TRUST_BADGES = [
  { icon: Truck, label: "Free Delivery", sub: "On orders above PKR 2,000" },
  { icon: CreditCard, label: "Cash on Delivery", sub: "Nationwide" },
  { icon: RotateCcw, label: "7-Day Returns", sub: "Hassle-free returns" },
  { icon: Shield, label: "Genuine Product", sub: "100% authentic" },
];

function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[--color-border]">
      <button
        className="flex items-center justify-between w-full py-4 text-left text-sm font-medium text-[--color-fg] hover:text-[--color-accent] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-sm touch-manipulation"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          size={16}
          className={cn("transition-transform duration-200 flex-shrink-0", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-[--color-muted-fg] leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const isWishlisted = has(product.id);

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] ?? undefined
  );
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    addItem(product, selectedVariant, qty);
    await new Promise((r) => setTimeout(r, 800));
    setAdding(false);
  };

  const whatsappHref = buildWhatsAppUrl(
    product.whatsappPhone,
    buildProductWhatsAppMessage(
      product.name,
      selectedVariant ? `${selectedVariant.name}: ${selectedVariant.value}` : undefined,
      qty,
      `https://everzio.com/shop/${product.slug}`
    )
  );

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />

      <main id="main-content">
        <div className="everzio-container py-6 md:py-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-[--color-muted-fg]" role="list">
              <li><Link href="/" className="hover:text-[--color-fg] transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><Link href="/shop" className="hover:text-[--color-fg] transition-colors">Shop</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li>
                <Link
                  href={`/shop?category=${product.categorySlug}`}
                  className="hover:text-[--color-fg] transition-colors"
                >
                  {product.category}
                </Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li aria-current="page" className="text-[--color-fg] font-medium truncate max-w-[180px]">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* ---- Product layout ---- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

            {/* ---- Gallery ---- */}
            <div className="space-y-3">
              {/* Main image */}
              <div className="relative aspect-square rounded-[--radius-2xl] overflow-hidden bg-[--color-muted]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[activeImage]}
                      alt={`${product.name}${activeImage > 0 ? ` — view ${activeImage + 1}` : ""}`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant={product.badge as "new" | "sale" | "hot" | "featured"}>
                      {product.badge.charAt(0).toUpperCase() + product.badge.slice(1)}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        "relative w-16 h-16 rounded-[--radius-lg] overflow-hidden border-2 transition-all flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation",
                        activeImage === i
                          ? "border-[--color-primary]"
                          : "border-[--color-border] hover:border-[--color-border-strong]"
                      )}
                      aria-label={`View image ${i + 1}`}
                      aria-pressed={activeImage === i}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ---- Product info ---- */}
            <div className="space-y-5">
              {/* Category */}
              <Link
                href={`/shop?category=${product.categorySlug}`}
                className="text-xs font-semibold text-[--color-accent] uppercase tracking-widest hover:text-[--color-accent-hover] transition-colors"
              >
                {product.category}
              </Link>

              {/* Name */}
              <h1
                className="font-display text-3xl md:text-4xl font-semibold text-[--color-fg] leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <Rating value={product.rating} count={product.reviewCount} size="md" />
                <a
                  href="#reviews"
                  className="text-xs text-[--color-muted-fg] hover:text-[--color-accent] transition-colors underline"
                >
                  Read reviews
                </a>
              </div>

              {/* Price */}
              <Price
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                size="xl"
                showSavings
              />

              {/* Short description */}
              <p className="text-sm text-[--color-muted-fg] leading-relaxed">
                {product.shortDescription}
              </p>

              {/* ---- Variants ---- */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-[--color-fg] mb-2">
                    {product.variants[0].name}:{" "}
                    <span className="font-normal text-[--color-muted-fg]">
                      {selectedVariant?.value}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Select variant">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.available}
                        className={cn(
                          "px-3 py-1.5 rounded-[--radius-md] text-sm border transition-all",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]",
                          "touch-manipulation",
                          selectedVariant?.id === variant.id
                            ? "border-[--color-primary] bg-[--color-primary] text-[--color-primary-fg]"
                            : "border-[--color-border] text-[--color-fg] hover:border-[--color-border-strong]",
                          !variant.available && "opacity-40 cursor-not-allowed line-through"
                        )}
                        aria-pressed={selectedVariant?.id === variant.id}
                        aria-label={`${variant.name}: ${variant.value}${!variant.available ? " (out of stock)" : ""}`}
                      >
                        {variant.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ---- Quantity ---- */}
              <div>
                <p className="text-sm font-semibold text-[--color-fg] mb-2">Quantity</p>
                <div className="inline-flex items-center border border-[--color-border] rounded-[--radius-md] h-11">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex items-center justify-center w-11 h-11 hover:bg-[--color-muted] rounded-l-[--radius-md] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} aria-hidden="true" />
                  </button>
                  <span
                    className="w-12 text-center font-semibold tabular-nums"
                    aria-live="polite"
                    aria-label={`Quantity: ${qty}`}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex items-center justify-center w-11 h-11 hover:bg-[--color-muted] rounded-r-[--radius-md] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* ---- CTAs ---- */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  loading={adding}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  leftIcon={<ShoppingBag size={16} />}
                >
                  {!product.inStock ? "Out of Stock" : "Add to Cart"}
                </Button>

                <button
                  onClick={() => toggle(product.id)}
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-[--radius-lg] border transition-all flex-shrink-0",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation",
                    isWishlisted
                      ? "border-[--color-destructive] bg-[--color-destructive-light] text-[--color-destructive]"
                      : "border-[--color-border] text-[--color-fg] hover:border-[--color-border-strong]"
                  )}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={isWishlisted}
                >
                  <Heart
                    size={18}
                    aria-hidden="true"
                    className={cn(isWishlisted && "fill-current")}
                  />
                </button>
              </div>

              {/* WhatsApp order */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-11 rounded-[--radius-lg] bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Order via WhatsApp
              </a>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {TRUST_BADGES.map((badge, i) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-[--radius-md] bg-[--color-muted]"
                    >
                      <Icon size={16} className="text-[--color-accent] flex-shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-[--color-fg]">{badge.label}</p>
                        <p className="text-xs text-[--color-muted-fg]">{badge.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Accordions */}
              <div className="pt-2">
                <AccordionItem title="Product Description">
                  <p>{product.description}</p>
                </AccordionItem>
                <AccordionItem title="Shipping & Delivery">
                  <p>We ship to all major cities across Pakistan. Standard delivery takes 3–5 business days. Express delivery available for select cities. Orders placed before 3pm are dispatched the same day.</p>
                </AccordionItem>
                <AccordionItem title="Returns Policy">
                  <p>We offer a hassle-free 7-day return policy. If you are not satisfied with your product, contact us via WhatsApp or email and we'll arrange a return at no extra cost.</p>
                </AccordionItem>
              </div>
            </div>
          </div>

          {/* ---- Related products ---- */}
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[--color-border]">
              <h2
                className="font-display text-2xl md:text-3xl font-semibold text-[--color-fg] mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                You May Also Like
              </h2>
              <ProductGrid products={related} cols={4} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
