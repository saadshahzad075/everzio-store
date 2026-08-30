// ============================================================
// EVERZIO — DEMO DATA
// All data here is for demonstration/development purposes only.
// No real products, reviews, or customer data.
// ============================================================

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
};

export type ProductVariant = {
  id: string;
  name: string;
  value: string;
  available: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  badge?: "new" | "hot" | "sale" | "featured";
  isBestseller?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  variants?: ProductVariant[];
  tags: string[];
  inStock: boolean;
  whatsappPhone: string;
};

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const CATEGORIES: ProductCategory[] = [
  {
    id: "cat-home",
    name: "Home & Living",
    slug: "home-living",
    description: "Transform your space with beautiful, functional home essentials.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    productCount: 48,
  },
  {
    id: "cat-kitchen",
    name: "Kitchen Essentials",
    slug: "kitchen-essentials",
    description: "Cook smarter with innovative kitchen tools and gadgets.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    productCount: 36,
  },
  {
    id: "cat-electronics",
    name: "Electronics & Gadgets",
    slug: "electronics-gadgets",
    description: "Stay connected with the latest tech accessories.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
    productCount: 52,
  },
  {
    id: "cat-personal-care",
    name: "Personal Care",
    slug: "personal-care",
    description: "Premium personal care for your daily wellness routine.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    productCount: 29,
  },
  {
    id: "cat-lifestyle",
    name: "Lifestyle & Accessories",
    slug: "lifestyle-accessories",
    description: "Elevate your everyday with curated lifestyle accessories.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    productCount: 41,
  },
];

// ---------------------------------------------------------------------------
// Products — DEMO DATA
// ---------------------------------------------------------------------------
export const PRODUCTS: Product[] = [
  // ---- Home & Living ----
  {
    id: "prod-001",
    name: "Marble & Acacia Serving Board",
    slug: "marble-acacia-serving-board",
    category: "Home & Living",
    categorySlug: "home-living",
    shortDescription: "Elegant marble and acacia wood serving board for entertaining.",
    description:
      "A beautifully crafted serving board combining cold, polished marble with warm acacia wood. Perfect for charcuterie, cheese, or as a statement kitchen accent. Food-safe and easy to clean.",
    price: 2499,
    compareAtPrice: 3200,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 128,
    badge: "sale",
    isBestseller: true,
    inStock: true,
    tags: ["home", "kitchen", "decor", "marble"],
    whatsappPhone: "923000000000",
  },
  {
    id: "prod-002",
    name: "Scented Soy Wax Candle Set",
    slug: "scented-soy-wax-candle-set",
    category: "Home & Living",
    categorySlug: "home-living",
    shortDescription: "Set of 3 hand-poured soy wax candles in calming fragrances.",
    description:
      "Hand-poured 100% soy wax candles in three calming scents: Oud & Amber, Rose Jasmine, and Sea Salt Cedar. Each candle burns for up to 45 hours. Comes in a premium gift box.",
    price: 1899,
    compareAtPrice: 2400,
    images: [
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b5c2?w=800&q=80",
      "https://images.unsplash.com/photo-1608181831718-c9f75a7d5e4b?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 214,
    badge: "hot",
    isTrending: true,
    isBestseller: true,
    inStock: true,
    tags: ["home", "candles", "gift", "fragrance"],
    whatsappPhone: "923000000000",
  },
  {
    id: "prod-003",
    name: "Geometric Throw Cushion",
    slug: "geometric-throw-cushion",
    category: "Home & Living",
    categorySlug: "home-living",
    shortDescription: "Modern geometric print throw cushion with premium fill.",
    description:
      "A beautifully designed throw cushion with a modern geometric print. Premium microfiber cover, washable, with high-loft polyester fill. Available in Ivory, Sage, and Terracotta.",
    price: 1199,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 89,
    badge: "new",
    isNew: true,
    inStock: true,
    variants: [
      { id: "v1", name: "Color", value: "Ivory", available: true },
      { id: "v2", name: "Color", value: "Sage", available: true },
      { id: "v3", name: "Color", value: "Terracotta", available: false },
    ],
    tags: ["home", "cushion", "decor", "living room"],
    whatsappPhone: "923000000000",
  },
  // ---- Kitchen ----
  {
    id: "prod-004",
    name: "Vacuum-Insulated Food Flask",
    slug: "vacuum-insulated-food-flask",
    category: "Kitchen Essentials",
    categorySlug: "kitchen-essentials",
    shortDescription: "Keep food hot for 6 hours or cold for 12 hours.",
    description:
      "Premium 500ml vacuum-insulated stainless steel food flask. Keeps meals hot for 6 hours and cold for 12 hours. Wide mouth for easy filling and cleaning. Leak-proof lid. BPA-free.",
    price: 2299,
    compareAtPrice: 2800,
    images: [
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 345,
    badge: "hot",
    isBestseller: true,
    isTrending: true,
    inStock: true,
    variants: [
      { id: "v1", name: "Color", value: "Matte Black", available: true },
      { id: "v2", name: "Color", value: "Steel Silver", available: true },
      { id: "v3", name: "Color", value: "Forest Green", available: true },
    ],
    tags: ["kitchen", "flask", "travel", "lunch"],
    whatsappPhone: "923000000000",
  },
  {
    id: "prod-005",
    name: "Ceramic Pour-Over Coffee Set",
    slug: "ceramic-pour-over-coffee-set",
    category: "Kitchen Essentials",
    categorySlug: "kitchen-essentials",
    shortDescription: "Hand-crafted ceramic pour-over dripper with carafe.",
    description:
      "An artisanal ceramic pour-over coffee set including a dripper, carafe, and 50 paper filters. The ribbed interior creates optimal water flow for a rich, balanced brew. Dishwasher safe.",
    price: 3499,
    compareAtPrice: 4200,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 167,
    badge: "featured",
    isTrending: true,
    inStock: true,
    tags: ["kitchen", "coffee", "ceramic", "gift"],
    whatsappPhone: "923000000000",
  },
  {
    id: "prod-006",
    name: "Bamboo Cutting Board Set (3pc)",
    slug: "bamboo-cutting-board-set",
    category: "Kitchen Essentials",
    categorySlug: "kitchen-essentials",
    shortDescription: "3-piece bamboo cutting boards in graduated sizes.",
    description:
      "A set of 3 sustainably sourced bamboo cutting boards in small, medium, and large. Naturally antibacterial. Juice groove on larger boards. Lightweight yet durable.",
    price: 1699,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 203,
    badge: "new",
    isNew: true,
    inStock: true,
    tags: ["kitchen", "bamboo", "eco", "cooking"],
    whatsappPhone: "923000000000",
  },
  // ---- Electronics ----
  {
    id: "prod-007",
    name: "Wireless Charging Pad (15W)",
    slug: "wireless-charging-pad-15w",
    category: "Electronics & Gadgets",
    categorySlug: "electronics-gadgets",
    shortDescription: "Ultra-slim 15W fast wireless charger for all Qi devices.",
    description:
      "Charge your phone at up to 15W without cables. Compatible with all Qi-enabled devices including iPhone and Android. Ultra-slim profile, built-in foreign object detection, LED indicator.",
    price: 1499,
    compareAtPrice: 2000,
    images: [
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=800&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 412,
    badge: "sale",
    isBestseller: true,
    inStock: true,
    variants: [
      { id: "v1", name: "Color", value: "Black", available: true },
      { id: "v2", name: "Color", value: "White", available: true },
    ],
    tags: ["electronics", "charger", "wireless", "phone"],
    whatsappPhone: "923000000000",
  },
  {
    id: "prod-008",
    name: "Noise Cancelling Earbuds",
    slug: "noise-cancelling-earbuds",
    category: "Electronics & Gadgets",
    categorySlug: "electronics-gadgets",
    shortDescription: "Active noise cancellation with 30-hour total battery life.",
    description:
      "Premium true wireless earbuds with active noise cancellation. Crystal-clear audio, 8-hour bud battery + 22-hour case. IPX5 water resistant. Touch controls. Low-latency gaming mode.",
    price: 4999,
    compareAtPrice: 6500,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 589,
    badge: "hot",
    isBestseller: true,
    isTrending: true,
    inStock: true,
    variants: [
      { id: "v1", name: "Color", value: "Midnight Black", available: true },
      { id: "v2", name: "Color", value: "Pearl White", available: true },
      { id: "v3", name: "Color", value: "Navy Blue", available: false },
    ],
    tags: ["electronics", "audio", "earbuds", "ANC"],
    whatsappPhone: "923000000000",
  },
  {
    id: "prod-009",
    name: "Portable Power Bank 20,000mAh",
    slug: "portable-power-bank-20000",
    category: "Electronics & Gadgets",
    categorySlug: "electronics-gadgets",
    shortDescription: "Fast-charge 20,000mAh power bank with USB-C PD.",
    description:
      "Never run out of power. 20,000mAh capacity with 22.5W USB-C PD fast charging. Charge up to 4 devices simultaneously. LCD battery indicator. Compact, airline-approved.",
    price: 3299,
    images: [
      "https://images.unsplash.com/photo-1609592806596-b40b8d9eefd2?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 231,
    badge: "new",
    isNew: true,
    inStock: true,
    tags: ["electronics", "power bank", "charging", "travel"],
    whatsappPhone: "923000000000",
  },
  // ---- Personal Care ----
  {
    id: "prod-010",
    name: "Jade Face Roller & Gua Sha Set",
    slug: "jade-face-roller-gua-sha",
    category: "Personal Care",
    categorySlug: "personal-care",
    shortDescription: "Natural jade roller and gua sha stone for face massage.",
    description:
      "Genuine natural jade face roller with dual-ended design plus a gua sha stone. Reduce puffiness, improve circulation, and enhance skin care product absorption. Comes in a satin gift pouch.",
    price: 1299,
    compareAtPrice: 1800,
    images: [
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 376,
    badge: "sale",
    isBestseller: true,
    inStock: true,
    tags: ["skincare", "wellness", "jade", "gift"],
    whatsappPhone: "923000000000",
  },
  {
    id: "prod-011",
    name: "Electric Face Cleanser Brush",
    slug: "electric-face-cleanser-brush",
    category: "Personal Care",
    categorySlug: "personal-care",
    shortDescription: "Sonic vibration facial cleansing brush for deep pore cleansing.",
    description:
      "12,000 micro-vibrations per minute for a deep, gentle cleanse. Removes 99.5% more dirt vs hands alone. Waterproof, USB rechargeable. 3 speed modes. Replaceable brush head.",
    price: 2799,
    compareAtPrice: 3500,
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 145,
    badge: "hot",
    isTrending: true,
    inStock: true,
    tags: ["skincare", "beauty", "face brush", "cleanse"],
    whatsappPhone: "923000000000",
  },
  // ---- Lifestyle ----
  {
    id: "prod-012",
    name: "Minimalist Leather Wallet",
    slug: "minimalist-leather-wallet",
    category: "Lifestyle & Accessories",
    categorySlug: "lifestyle-accessories",
    shortDescription: "Slim genuine leather RFID-blocking bifold wallet.",
    description:
      "Handcrafted full-grain leather bifold wallet. RFID-blocking technology protects your cards. Holds up to 8 cards + cash. Slim profile. Available in 4 colors. The perfect everyday carry.",
    price: 2199,
    compareAtPrice: 2800,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 498,
    badge: "featured",
    isBestseller: true,
    isTrending: true,
    inStock: true,
    variants: [
      { id: "v1", name: "Color", value: "Tan Brown", available: true },
      { id: "v2", name: "Color", value: "Midnight Black", available: true },
      { id: "v3", name: "Color", value: "Cognac", available: true },
      { id: "v4", name: "Color", value: "Dark Green", available: false },
    ],
    tags: ["accessories", "leather", "wallet", "gift"],
    whatsappPhone: "923000000000",
  },
  {
    id: "prod-013",
    name: "Canvas Tote Bag",
    slug: "canvas-tote-bag",
    category: "Lifestyle & Accessories",
    categorySlug: "lifestyle-accessories",
    shortDescription: "Heavy-duty canvas tote with interior zip pocket.",
    description:
      "12oz heavy-duty natural canvas tote with reinforced handles and an interior zip pocket. Fits a 15\" laptop. Washable. Available in Natural, Black, and Olive.",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    ],
    rating: 4.4,
    reviewCount: 312,
    badge: "new",
    isNew: true,
    inStock: true,
    variants: [
      { id: "v1", name: "Color", value: "Natural", available: true },
      { id: "v2", name: "Color", value: "Black", available: true },
      { id: "v3", name: "Color", value: "Olive", available: true },
    ],
    tags: ["accessories", "bag", "eco", "canvas"],
    whatsappPhone: "923000000000",
  },
  {
    id: "prod-014",
    name: "Stainless Steel Water Bottle (1L)",
    slug: "stainless-steel-water-bottle-1l",
    category: "Lifestyle & Accessories",
    categorySlug: "lifestyle-accessories",
    shortDescription: "Double-wall insulated 1L bottle, cold 24h / hot 12h.",
    description:
      "1 litre double-wall vacuum-insulated stainless steel bottle. Keeps drinks cold for 24 hours, hot for 12 hours. Leak-proof flip lid. Wide mouth. BPA-free. Loop handle for carrying.",
    price: 1799,
    compareAtPrice: 2200,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 671,
    badge: "hot",
    isBestseller: true,
    isTrending: true,
    inStock: true,
    variants: [
      { id: "v1", name: "Color", value: "Matte Black", available: true },
      { id: "v2", name: "Color", value: "Midnight Blue", available: true },
      { id: "v3", name: "Color", value: "Desert Sand", available: true },
    ],
    tags: ["accessories", "bottle", "hydration", "eco"],
    whatsappPhone: "923000000000",
  },
  {
    id: "prod-015",
    name: "Aromatherapy Diffuser",
    slug: "aromatherapy-diffuser",
    category: "Home & Living",
    categorySlug: "home-living",
    shortDescription: "Ultrasonic essential oil diffuser with 7-color LED light.",
    description:
      "300ml ultrasonic cool-mist aromatherapy diffuser. Runs up to 8 hours. 7 ambient LED color options. Auto shut-off when water runs out. Whisper-quiet. Perfect for bedroom or office.",
    price: 2099,
    compareAtPrice: 2600,
    images: [
      "https://images.unsplash.com/photo-1608181831718-c9f75a7d5e4b?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 189,
    badge: "sale",
    isTrending: true,
    inStock: true,
    tags: ["home", "aromatherapy", "wellness", "gift"],
    whatsappPhone: "923000000000",
  },
];

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------
export const COLLECTIONS = {
  trending: PRODUCTS.filter((p) => p.isTrending).slice(0, 8),
  bestsellers: PRODUCTS.filter((p) => p.isBestseller).slice(0, 8),
  newArrivals: PRODUCTS.filter((p) => p.isNew).slice(0, 8),
  featured: PRODUCTS.filter((p) => p.badge === "featured"),
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, limit);
}

// ---------------------------------------------------------------------------
// WhatsApp config
// ---------------------------------------------------------------------------
export const EVERZIO_WHATSAPP = "923000000000"; // REPLACE with real number
export const EVERZIO_INSTAGRAM = "https://www.instagram.com/everzio_store/";
