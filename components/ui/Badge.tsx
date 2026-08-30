import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "sale" | "new" | "hot" | "featured" | "outline" | "success" | "muted";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:  "bg-[--color-primary] text-[--color-primary-fg]",
  sale:     "bg-[--color-accent] text-[--color-accent-fg]",
  new:      "bg-[--color-primary] text-[--color-primary-fg]",
  hot:      "bg-[--color-destructive] text-[--color-destructive-fg]",
  featured: "bg-[--color-accent-alt] text-[--color-accent-fg]",
  outline:  "border border-[--color-border] text-[--color-fg] bg-transparent",
  success:  "bg-[--color-success-light] text-[--color-success]",
  muted:    "bg-[--color-muted] text-[--color-muted-fg]",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-[--radius-sm] text-xs font-semibold tracking-wide uppercase leading-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
