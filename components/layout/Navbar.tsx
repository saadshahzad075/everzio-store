"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShoppingBag, Search, Heart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/data";

// ---------------------------------------------------------------------------
// Desktop nav links
// ---------------------------------------------------------------------------
const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?filter=new" },
  { label: "Best Sellers", href: "/shop?filter=bestsellers" },
  { label: "Deals", href: "/shop?filter=sale" },
];

// ---------------------------------------------------------------------------
// Cart badge
// ---------------------------------------------------------------------------
function CartBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <motion.span
      key={count}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-[--color-accent] text-[--color-accent-fg] text-[10px] font-bold flex items-center justify-center tabular-nums leading-none"
      aria-hidden="true"
    >
      {count > 99 ? "99+" : count}
    </motion.span>
  );
}

// ---------------------------------------------------------------------------
// Category megamenu
// ---------------------------------------------------------------------------
function CategoryMenu() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6 min-w-[560px]">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          href={`/shop?category=${cat.slug}`}
          className="group flex items-center gap-3 p-2 rounded-[--radius-md] hover:bg-[--color-muted] transition-colors duration-150"
        >
          <span className="flex flex-col">
            <span className="font-semibold text-sm text-[--color-fg] group-hover:text-[--color-accent] transition-colors">
              {cat.name}
            </span>
            <span className="text-xs text-[--color-muted-fg]">
              {cat.productCount} products
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Navbar
// ---------------------------------------------------------------------------
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const shopMenuRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { totalItems, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close shop menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shopMenuRef.current && !shopMenuRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[--z-sticky] transition-all",
          "duration-300 ease-in-out",
          scrolled
            ? "glass-surface shadow-[--shadow-md] border-b border-[--color-border]"
            : "bg-transparent"
        )}
        style={{ top: "var(--announcement-height)" }}
      >
        <nav
          className="everzio-container flex items-center justify-between h-[--navbar-height]"
          aria-label="Main navigation"
        >
          {/* ---- Logo ---- */}
          <Link
            href="/"
            className="flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-sm"
            aria-label="EVERZIO — Home"
          >
            <span
              className="font-display text-2xl font-bold tracking-[0.12em] uppercase text-[--color-fg]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              EVERZIO
            </span>
          </Link>

          {/* ---- Desktop Nav ---- */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Categories dropdown */}
            <div ref={shopMenuRef} className="relative">
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-2 rounded-[--radius-md] text-sm font-medium",
                  "text-[--color-fg] hover:bg-[--color-primary-muted] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
                )}
                onClick={() => setShopOpen((p) => !p)}
                aria-expanded={shopOpen}
                aria-haspopup="true"
              >
                Categories
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    shopOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute top-full left-0 mt-2 bg-[--color-surface] rounded-[--radius-xl] shadow-[--shadow-xl] border border-[--color-border] z-[--z-dropdown]"
                  >
                    <CategoryMenu />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-[--radius-md] text-sm font-medium",
                  "text-[--color-fg] hover:bg-[--color-primary-muted] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ---- Action Icons ---- */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-[--radius-md] text-[--color-fg] hover:bg-[--color-primary-muted] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation"
              aria-label="Search products"
            >
              <Search size={18} aria-hidden="true" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center w-10 h-10 rounded-[--radius-md] text-[--color-fg] hover:bg-[--color-primary-muted] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation"
              aria-label={`Wishlist, ${wishlistCount} item${wishlistCount !== 1 ? "s" : ""}`}
            >
              <Heart size={18} aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[--color-primary] text-[--color-primary-fg] text-[10px] font-bold flex items-center justify-center leading-none" aria-hidden="true">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-[--radius-md] text-[--color-fg] hover:bg-[--color-primary-muted] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation"
              aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
            >
              <ShoppingBag size={18} aria-hidden="true" />
              <CartBadge count={totalItems} />
            </button>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-[--radius-md] text-[--color-fg] hover:bg-[--color-primary-muted] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Offset for fixed header */}
      <div
        style={{ height: "calc(var(--navbar-height) + var(--announcement-height))" }}
        aria-hidden="true"
      />

      {/* ---- Mobile Menu ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[--z-overlay] bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[--z-drawer] w-80 bg-[--color-surface] shadow-[--shadow-xl] flex flex-col"
              initial={prefersReduced ? { opacity: 0 } : { x: "100%" }}
              animate={{ x: 0, opacity: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[--color-border]">
                <span className="font-display text-xl font-bold tracking-widest">EVERZIO</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-[--radius-md] hover:bg-[--color-muted] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
                  aria-label="Close navigation menu"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center px-3 py-3 rounded-[--radius-md] text-base font-medium text-[--color-fg] hover:bg-[--color-muted] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-2 pb-1">
                  <p className="px-3 text-xs font-semibold text-[--color-muted-fg] uppercase tracking-wider mb-1">
                    Categories
                  </p>
                </div>

                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    className="flex items-center justify-between px-3 py-2.5 rounded-[--radius-md] text-sm text-[--color-fg] hover:bg-[--color-muted] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-[--color-muted-fg]">
                      {cat.productCount}
                    </span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---- Search Overlay ---- */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[--z-overlay] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="fixed top-0 left-0 right-0 z-[--z-modal] p-4"
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="everzio-container">
                <div className="bg-[--color-surface] rounded-[--radius-xl] shadow-[--shadow-xl] border border-[--color-border] p-4">
                  <div className="flex items-center gap-3">
                    <Search size={20} className="text-[--color-muted-fg] flex-shrink-0" aria-hidden="true" />
                    <input
                      autoFocus
                      type="search"
                      placeholder="Search products, categories…"
                      className="flex-1 bg-transparent text-base text-[--color-fg] placeholder:text-[--color-muted-fg] focus:outline-none"
                      aria-label="Search products"
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-center w-8 h-8 rounded-[--radius-md] hover:bg-[--color-muted] transition-colors"
                      aria-label="Close search"
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
