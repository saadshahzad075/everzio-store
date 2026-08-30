import { cn, formatPrice, calcDiscount } from "@/lib/utils";

interface PriceProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg" | "xl";
  currency?: string;
  showSavings?: boolean;
}

const textSizes = {
  sm: { price: "text-sm", original: "text-xs", badge: "text-xs" },
  md: { price: "text-base", original: "text-sm", badge: "text-xs" },
  lg: { price: "text-xl", original: "text-base", badge: "text-sm" },
  xl: { price: "text-2xl", original: "text-lg", badge: "text-sm" },
};

export function Price({
  price,
  compareAtPrice,
  size = "md",
  currency = "PKR",
  showSavings = false,
  className,
  ...props
}: PriceProps) {
  const discount = calcDiscount(price, compareAtPrice ?? 0);
  const hasDiscount = discount > 0;
  const savings = hasDiscount ? (compareAtPrice! - price) : 0;
  const sizes = textSizes[size];

  return (
    <div className={cn("flex flex-wrap items-baseline gap-1.5", className)} {...props}>
      {/* Current price */}
      <span
        className={cn(
          "price-display font-bold text-[--color-fg]",
          sizes.price,
          hasDiscount && "text-[--color-destructive]"
        )}
      >
        {formatPrice(price, currency)}
      </span>

      {/* Compare-at (original) price */}
      {hasDiscount && compareAtPrice && (
        <span
          className={cn(
            "price-display text-[--color-muted-fg] line-through",
            sizes.original
          )}
          aria-label={`Original price: ${formatPrice(compareAtPrice, currency)}`}
        >
          {formatPrice(compareAtPrice, currency)}
        </span>
      )}

      {/* Discount percentage */}
      {hasDiscount && (
        <span
          className={cn(
            "inline-flex items-center px-1.5 py-0.5 rounded bg-[--color-destructive-light] text-[--color-destructive] font-semibold",
            sizes.badge
          )}
          aria-label={`${discount}% off`}
        >
          -{discount}%
        </span>
      )}

      {/* Savings */}
      {showSavings && savings > 0 && (
        <span className="text-xs text-[--color-success] font-medium">
          Save {formatPrice(savings, currency)}
        </span>
      )}
    </div>
  );
}

export default Price;
