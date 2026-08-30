// Shared Framer Motion animation variants for EVERZIO
// All variants respect prefers-reduced-motion via the custom prop pattern.

import type { Variants } from "framer-motion";

const EASE_BEZIER = [0.4, 0, 0.2, 1] as const;

// ---------------------------------------------------------------------------
// Entrance variants
// ---------------------------------------------------------------------------
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: EASE_BEZIER },
  },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_BEZIER },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_BEZIER },
  },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

// ---------------------------------------------------------------------------
// Stagger container + item
// ---------------------------------------------------------------------------
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_BEZIER },
  },
};

// ---------------------------------------------------------------------------
// Slide variants
// ---------------------------------------------------------------------------
export const slideInRight: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 35 },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.25, ease: EASE_BEZIER },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 35 },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.25, ease: EASE_BEZIER },
  },
};

export const slideUp: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 35 },
  },
  exit: {
    y: "100%",
    transition: { duration: 0.25, ease: EASE_BEZIER },
  },
};

// ---------------------------------------------------------------------------
// Overlay backdrop
// ---------------------------------------------------------------------------
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// ---------------------------------------------------------------------------
// Micro-interaction: button press
// ---------------------------------------------------------------------------
export const buttonTap = { scale: 0.97 };
export const buttonSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
};

// ---------------------------------------------------------------------------
// Heart wishlist toggle
// ---------------------------------------------------------------------------
export const heartVariants: Variants = {
  unliked: { scale: 1 },
  liked: {
    scale: [1, 1.3, 1],
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Cart badge bounce
// ---------------------------------------------------------------------------
export const cartBadge: Variants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 20 },
  },
  bump: {
    scale: [1, 1.4, 1],
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// ---------------------------------------------------------------------------
// Scroll reveal (used with viewport)
// ---------------------------------------------------------------------------
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_BEZIER },
  },
};

// ---------------------------------------------------------------------------
// Reduced motion utility — replace y/scale with opacity-only
// ---------------------------------------------------------------------------
export function reducedVariants<T extends Variants>(variants: T): T {
  const reduced: Variants = {};
  for (const [key, value] of Object.entries(variants)) {
    if (typeof value === "object" && value !== null) {
      const { y: _y, x: _x, scale: _sc, rotate: _r, ...rest } = value as Record<string, unknown>;
      reduced[key] = rest as Variants[string];
    } else {
      reduced[key] = value;
    }
  }
  return reduced as T;
}
