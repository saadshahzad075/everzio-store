"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { totalItems, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[--z-sticky] transition-all duration-300 ease-in-out",
          scrolled
            ? "glass-panel shadow-md border-b border-slate-200/80"
            : "bg-white/80 backdrop-blur-md border-b border-slate-100"
        )}
        style={{ top: "var(--announcement-height)" }}
      >
        <nav
          className="everzio-container flex items-center justify-between h-[--navbar-height]"
          aria-label="Main navigation"
        >
          {/* ---- Brand logo ---- */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] rounded-sm group"
            aria-label="EVERZIO — Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#090D16] text-amber-400 flex items-center justify-center font-bold font-display text-lg group-hover:scale-105 transition-transform shadow-sm">
              E
            </div>
            <span
              className="font-display text-2xl font-bold tracking-[0.14em] uppercase text-slate-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              EVERZIO
            </span>
          </Link>

          {/* ---- Desktop Nav Links ---- */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Categories dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-[--radius-md] text-sm font-semibold text-slate-800 hover:text-amber-600 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
              >
                Categories
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    categoriesOpen && "rotate-180 text-amber-600"
                  )}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-64 p-3 bg-white rounded-[--radius-xl] shadow-xl border border-slate-200/90 z-[--z-dropdown]"
                  >
                    <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider px-3 py-1 mb-1 flex items-center gap-1">
                      <Sparkles size={12} />
                      Curated Collections
                    </div>
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        className="flex items-center justify-between px-3 py-2 rounded-[--radius-md] text-sm font-medium text-slate-700 hover:text-amber-600 hover:bg-amber-50/60 transition-colors"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        {cat.name}
                        <span className="text-xs text-slate-400 font-normal">
                          {cat.productCount}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/shop"
              className="px-3.5 py-2 rounded-[--radius-md] text-sm font-semibold text-slate-800 hover:text-amber-600 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
            >
              Shop
            </Link>
            <Link
              href="/shop?filter=new"
              className="px-3.5 py-2 rounded-[--radius-md] text-sm font-semibold text-slate-800 hover:text-amber-600 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
            >
              New Arrivals
            </Link>
            <Link
              href="/shop?filter=bestsellers"
              className="px-3.5 py-2 rounded-[--radius-md] text-sm font-semibold text-slate-800 hover:text-amber-600 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
            >
              Best Sellers
            </Link>
            <Link
              href="/shop?filter=sale"
              className="px-3.5 py-2 rounded-[--radius-md] text-sm font-semibold text-amber-600 hover:text-amber-700 hover:bg-amber-50/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]"
            >
              Deals 🔥
            </Link>
          </div>

          {/* ---- Actions ---- */}
          <div className="flex items-center gap-1.5">
            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-[--radius-md] text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation"
              aria-label="Search products"
            >
              <Search size={19} aria-hidden="true" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center w-10 h-10 rounded-[--radius-md] text-slate-700 hover:bg-slate-100 hover:text-rose-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation"
              aria-label={`Wishlist, ${wishlistCount} items`}
            >
              <Heart size={19} aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart trigger */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-[--radius-md] text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation"
              aria-label={`Shopping cart, ${totalItems} items`}
            >
              <ShoppingBag size={19} aria-hidden="true" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-bold shadow-md"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-[--radius-md] text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] touch-manipulation"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Spacer */}
      <div
        style={{
          height: "calc(var(--navbar-height) + var(--announcement-height))",
        }}
        aria-hidden="true"
      />

      {/* ---- Search Overlay ---- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[--z-modal] bg-slate-900/60 backdrop-blur-md flex items-start justify-center pt-24 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-white rounded-[--radius-2xl] shadow-2xl p-4 border border-slate-200"
            >
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <Search size={20} className="text-amber-500 flex-shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search products, categories, keywords…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-base bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="pt-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Candle", "Earbuds", "Lamp", "Air Fryer", "Serving Board"].map((term) => (
                    <Link
                      key={term}
                      href={`/shop?search=${encodeURIComponent(term)}`}
                      onClick={() => setSearchOpen(false)}
                      className="px-3 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-xs font-medium rounded-full text-slate-700 transition-colors"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Mobile Navigation Drawer ---- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[--z-drawer] bg-white flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#090D16] text-amber-400 flex items-center justify-center font-bold font-display text-lg">
                  E
                </div>
                <span className="font-display text-xl font-bold uppercase tracking-wider text-slate-900">
                  EVERZIO
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="py-6 space-y-4 flex-1">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-semibold text-slate-900 hover:text-amber-600"
              >
                All Products
              </Link>
              <Link
                href="/shop?filter=new"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-semibold text-slate-900 hover:text-amber-600"
              >
                New Arrivals
              </Link>
              <Link
                href="/shop?filter=bestsellers"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-semibold text-slate-900 hover:text-amber-600"
              >
                Best Sellers
              </Link>
              <Link
                href="/shop?filter=sale"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-semibold text-amber-600"
              >
                Deals & Offers 🔥
              </Link>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2.5 bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
