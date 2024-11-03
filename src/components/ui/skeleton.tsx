import { cn } from "src/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-muted-foreground", className)}
      {...props}
    />
  );
}

export { Skeleton };
