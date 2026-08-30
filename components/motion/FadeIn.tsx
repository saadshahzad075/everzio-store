"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn, fadeUp, fadeScale, reducedVariants } from "@/lib/motion";
import type { Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// FadeIn
// ---------------------------------------------------------------------------
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "none" | "scale";
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration,
  direction = "up",
  once = true,
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  const variantMap: Record<string, Variants> = {
    up:    fadeUp,
    none:  fadeIn,
    scale: fadeScale,
  };

  let variants = variantMap[direction];
  if (prefersReduced) {
    variants = reducedVariants(variants);
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...(variants.visible as object),
          transition: {
            ...((variants.visible as { transition?: object })?.transition ?? {}),
            delay,
            ...(duration ? { duration } : {}),
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// StaggerContainer — animates children with stagger
// ---------------------------------------------------------------------------
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.07,
  delayChildren = 0.05,
  once = true,
  as = "div",
}: StaggerContainerProps) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </Tag>
  );
}

// ---------------------------------------------------------------------------
// StaggerItem — child of StaggerContainer
// ---------------------------------------------------------------------------
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const prefersReduced = useReducedMotion();
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Tag
      className={className}
      variants={
        prefersReduced
          ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
          : { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } } }
      }
    >
      {children}
    </Tag>
  );
}
