"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonTap, buttonSpring } from "@/lib/motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "accent";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const base =
  "relative inline-flex items-center justify-center gap-2 font-medium transition-all rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none touch-manipulation cursor-pointer whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[--color-primary] text-[--color-primary-fg] hover:bg-[--color-primary-hover] active:bg-[--color-primary-hover] shadow-[--shadow-sm]",
  secondary:
    "bg-[--color-secondary] text-[--color-secondary-fg] hover:bg-[--color-secondary-hover] shadow-[--shadow-sm]",
  outline:
    "border border-[--color-border] text-[--color-fg] bg-transparent hover:bg-[--color-muted] hover:border-[--color-border-strong]",
  ghost:
    "text-[--color-fg] bg-transparent hover:bg-[--color-muted]",
  destructive:
    "bg-[--color-destructive] text-[--color-destructive-fg] hover:opacity-90",
  accent:
    "bg-[--color-accent] text-[--color-accent-fg] hover:bg-[--color-accent-hover] shadow-[--shadow-sm]",
};

const sizes: Record<ButtonSize, string> = {
  sm:   "h-8  px-3 text-xs gap-1.5",
  md:   "h-10 px-4 text-sm gap-2",
  lg:   "h-12 px-6 text-base gap-2",
  icon: "h-10 w-10 p-0",
};

// ---------------------------------------------------------------------------
// Spinner
// ---------------------------------------------------------------------------
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={buttonTap}
        transition={buttonSpring}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Spinner />
            <span className="sr-only">Loading…</span>
          </>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
