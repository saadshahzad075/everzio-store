import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: "sm" | "md" | "lg" | "full";
}

const roundedMap = {
  sm:   "rounded-[--radius-sm]",
  md:   "rounded-[--radius-md]",
  lg:   "rounded-[--radius-lg]",
  full: "rounded-full",
};

export function Skeleton({
  width,
  height,
  rounded = "md",
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton-shimmer",
        roundedMap[rounded],
        className
      )}
      style={{
        width: width ?? "100%",
        height: height ?? "1rem",
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------
// ProductCard Skeleton
// ---------------------------------------------------------------------------
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-label="Loading product…" role="status">
      {/* Image */}
      <Skeleton height="260px" rounded="lg" />
      {/* Content */}
      <div className="flex flex-col gap-2 px-1">
        <Skeleton height="0.875rem" width="60%" />
        <Skeleton height="1.25rem" width="80%" />
        <Skeleton height="1rem" width="45%" />
      </div>
    </div>
  );
}

export default Skeleton;
