import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;     // 0-5
  count?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

const starSizes = { sm: 12, md: 14, lg: 16 };

export function Rating({
  value,
  count,
  size = "md",
  showCount = true,
  className,
  ...props
}: RatingProps) {
  const starSize = starSizes[size];
  const filled = Math.floor(value);
  const partial = value - filled;
  const empty = 5 - Math.ceil(value);

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role="img"
      aria-label={`Rating: ${value.toFixed(1)} out of 5${count ? `, ${count} reviews` : ""}`}
      {...props}
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {/* Filled stars */}
        {Array.from({ length: filled }).map((_, i) => (
          <Star
            key={`filled-${i}`}
            size={starSize}
            className="fill-[--color-accent-alt] text-[--color-accent-alt]"
          />
        ))}

        {/* Partial star */}
        {partial > 0 && (
          <span className="relative inline-block" style={{ width: starSize, height: starSize }}>
            {/* Empty star base */}
            <Star
              size={starSize}
              className="text-[--color-muted-border] fill-[--color-muted-border]"
            />
            {/* Filled overlay */}
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${partial * 100}%` }}
            >
              <Star
                size={starSize}
                className="fill-[--color-accent-alt] text-[--color-accent-alt]"
              />
            </span>
          </span>
        )}

        {/* Empty stars */}
        {Array.from({ length: empty }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={starSize}
            className="text-[--color-muted-border] fill-[--color-muted-border]"
          />
        ))}
      </div>

      {showCount && count !== undefined && (
        <span className="text-[--color-muted-fg] text-xs font-medium tabular-nums">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}

export default Rating;
