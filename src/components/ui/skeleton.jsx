import { cn } from "@/lib/utils";

// Removed prop type annotation
function Skeleton({ className, ...props }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };