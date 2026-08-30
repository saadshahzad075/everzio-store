// ============================================================
// EVERZIO — DEMO DATA
// All data here is for demonstration/development purposes only.
// No real products, reviews, or customer data.
// ============================================================

export const EVERZIO_WHATSAPP = "923000000000";
export const EVERZIO_INSTAGRAM = "https://www.instagram.com/everzio_store/";

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
    productCount: 54,
  },
  {
    id: "cat-kitchen",
    name: "Kitchen Essentials",
    slug: "kitchen-essentials",
    description: "Smart tools and accessories that elevate everyday cooking.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    productCount: 36,
  },
  {
    id: "cat-gadgets",
    name: "Smart Gadgets",
    slug: "smart-gadgets",
    description: "Innovative tech items that simplify your daily routine.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    productCount: 42,
  },
  {
    id: "cat-wellness",
    name: "Wellness & Care",
    slug: "wellness-care",
    description: "Self-care and relaxation items for mind and body.",
    image: "https://images.unsplash.com/photo-1608181831718-c9f75a7d5e4b?w=800&q=80",
    productCount: 28,
  },
  {
    id: "cat-lighting",
    name: "Modern Lighting",
    slug: "modern-lighting",
    description: "Warm, aesthetic lamps and ambient light solutions.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    productCount: 31,
  },
];

// ---------------------------------------------------------------------------
// Expanded Products List
// ---------------------------------------------------------------------------
export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Scented Soy Wax Candle Set",
    slug: "scented-soy-wax-candle-set",
    category: "Home & Living",
    categorySlug: "home-living",
    description:
      "Hand-poured 100% natural soy wax candles infused with premium French lavender and wild vanilla essential oils. Designed to burn cleanly for up to 45 hours each, releasing a calming, subtle aroma throughout your home.",
    shortDescription: "Hand-poured soy wax candles with natural essential oils. 45hr burn time.",
    price: 3499,
    compareAtPrice: 4200,
    images: [
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b5c2?w=800&q=80",
      "https://images.unsplash.com/photo-1608181831718-c9f75a7d5e4b?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 128,
    badge: "hot",
    isBestseller: true,
    isTrending: true,
    variants: [
      { id: "v1", name: "Lavender & Vanilla", value: "lavender", available: true },
      { id: "v2", name: "Amber & Oakmoss", value: "amber", available: true },
      { id: "v3", name: "Eucalyptus & Mint", value: "eucalyptus", available: true },
    ],
    tags: ["candle", "home-decor", "aromatherapy", "gift"],
    inStock: true,
    whatsappPhone: EVERZIO_WHATSAPP,
  },
  {
    id: "prod-2",
    name: "Minimalist Ceramic Coffee Dripper",
    slug: "minimalist-ceramic-coffee-dripper",
    category: "Kitchen Essentials",
    categorySlug: "kitchen-essentials",
    description:
      "Crafted from high-fired matte ceramic, this pour-over dripper delivers uniform thermal extraction for a rich, aromatic morning brew. Ergonomically angled ribs optimize water flow rate.",
    shortDescription: "Precision ceramic pour-over dripper for artisan coffee lovers.",
    price: 2899,
    compareAtPrice: 3500,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 94,
    badge: "featured",
    isBestseller: true,
    isTrending: false,
    variants: [
      { id: "v4", name: "Matte Black", value: "black", available: true },
      { id: "v5", name: "Sandstone White", value: "white", available: true },
    ],
    tags: ["coffee", "kitchen", "ceramic", "pour-over"],
    inStock: true,
    whatsappPhone: EVERZIO_WHATSAPP,
  },
  {
    id: "prod-3",
    name: "Wireless Active Noise-Cancelling Earbuds",
    slug: "wireless-active-noise-cancelling-earbuds",
    category: "Smart Gadgets",
    categorySlug: "smart-gadgets",
    description:
      "Immerse yourself in crystal-clear audio with custom 11mm dynamic drivers and hybrid ANC up to -35dB. Features ultra-low latency game mode, IPX5 water resistance, and 30 hours of total playback with wireless charging case.",
    shortDescription: "Premium wireless ANC earbuds with 30-hour battery and deep bass.",
    price: 8999,
    compareAtPrice: 11999,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 215,
    badge: "sale",
    isBestseller: true,
    isTrending: true,
    variants: [
      { id: "v6", name: "Obsidian Black", value: "black", available: true },
      { id: "v7", name: "Moonlight Silver", value: "silver", available: true },
    ],
    tags: ["audio", "earbuds", "wireless", "gadgets"],
    inStock: true,
    whatsappPhone: EVERZIO_WHATSAPP,
  },
  {
    id: "prod-4",
    name: "Smart LED Sunset Projection Lamp",
    slug: "smart-led-sunset-projection-lamp",
    category: "Modern Lighting",
    categorySlug: "modern-lighting",
    description:
      "Transform any corner into a golden hour sanctuary. Features a 180-degree rotating HD crystal lens with 16 vibrant RGB halo light modes controllable via app or remote control.",
    shortDescription: "360° rotating halo projector lamp with 16 ambient lighting colors.",
    price: 3999,
    compareAtPrice: 5499,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 310,
    badge: "hot",
    isBestseller: true,
    isTrending: true,
    isNew: true,
    tags: ["lighting", "lamp", "sunset-lamp", "aesthetic"],
    inStock: true,
    whatsappPhone: EVERZIO_WHATSAPP,
  },
  {
    id: "prod-5",
    name: "Aesthetic Acacia Wood Cutting Board",
    slug: "aesthetic-acacia-wood-cutting-board",
    category: "Kitchen Essentials",
    categorySlug: "kitchen-essentials",
    description:
      "Sustainably harvested solid acacia wood with end-grain construction for maximum blade retention. Double-sided design with deep juice groove, ideal for prep work and charcuterie presentation.",
    shortDescription: "Premium end-grain acacia wood board with deep juice groove.",
    price: 4499,
    compareAtPrice: 5200,
    images: [
      "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 67,
    badge: "new",
    isNew: true,
    tags: ["kitchen", "wood", "cutting-board", "serving"],
    inStock: true,
    whatsappPhone: EVERZIO_WHATSAPP,
  },
  {
    id: "prod-6",
    name: "Ergonomic Memory Foam Pillow",
    slug: "ergonomic-memory-foam-pillow",
    category: "Wellness & Care",
    categorySlug: "wellness-care",
    description:
      "Contoured cervical memory foam engineered to align the spine, reduce neck strain, and facilitate deep restorative sleep. Features a breathable, hypoallergenic bamboo cover that keeps cool all night.",
    shortDescription: "Orthopedic cervical support pillow with breathable bamboo cover.",
    price: 4999,
    compareAtPrice: 6500,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 184,
    badge: "hot",
    isBestseller: true,
    tags: ["pillow", "wellness", "sleep", "ergonomic"],
    inStock: true,
    whatsappPhone: EVERZIO_WHATSAPP,
  },
  {
    id: "prod-7",
    name: "Electric Gooseneck Smart Water Kettle",
    slug: "electric-gooseneck-smart-water-kettle",
    category: "Kitchen Essentials",
    categorySlug: "kitchen-essentials",
    description:
      "Precise 1°F temperature control with real-time LCD display. The counterbalanced handle and precision pour spout give you complete pour velocity control for pour-over coffee and delicate teas.",
    shortDescription: "1000W stainless steel kettle with precision variable temp hold.",
    price: 9499,
    compareAtPrice: 12500,
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 78,
    badge: "featured",
    isTrending: true,
    tags: ["kettle", "kitchen", "coffee", "smart-home"],
    inStock: true,
    whatsappPhone: EVERZIO_WHATSAPP,
  },
  {
    id: "prod-8",
    name: "Ultrasonic Essential Oil Aroma Diffuser",
    slug: "ultrasonic-essential-oil-aroma-diffuser",
    category: "Home & Living",
    categorySlug: "home-living",
    description:
      "Quiet 500ml ultrasonic mist humidifier featuring real wood grain finish, 7 soft LED mood colors, and auto shut-off function when water runs low.",
    shortDescription: "500ml wood grain aroma diffuser with 7 mood lights & timer.",
    price: 3799,
    compareAtPrice: 4800,
    images: [
      "https://images.unsplash.com/photo-1609592806596-b40b8d9eefd2?w=800&q=80",
      "https://images.unsplash.com/photo-1602874801007-bd458bb1b5c2?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 142,
    badge: "sale",
    isTrending: true,
    tags: ["diffuser", "home-decor", "aroma", "wellness"],
    inStock: true,
    whatsappPhone: EVERZIO_WHATSAPP,
  },
];

// Helper functions
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug
  ).slice(0, limit);
}

// ---------------------------------------------------------------------------
// Customer Reviews
// ---------------------------------------------------------------------------
export const CUSTOMER_REVIEWS = [
  {
    id: "rev-1",
    author: "Zainab R.",
    city: "Lahore",
    rating: 5,
    date: "2 days ago",
    comment:
      "Ordered the Scented Soy Candle set and it exceeded my expectations! Beautiful packaging and the fragrance fills the whole room. Fast COD delivery to Lahore.",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Hamza K.",
    city: "Karachi",
    rating: 5,
    date: "1 week ago",
    comment:
      "The Wireless ANC Earbuds are insanely good for the price. Clear bass and active noise cancellation works flawlessly during my daily commute.",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Ayesha M.",
    city: "Islamabad",
    rating: 5,
    date: "3 days ago",
    comment:
      "Ordered via WhatsApp and received my order within 48 hours in Islamabad. The ceramic coffee dripper quality is outstanding!",
    verified: true,
  },
];
