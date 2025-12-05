import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
// Removed type import: type VariantProps

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

// Removed generic type annotation
const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
});

// Removed forwardRef type annotations and prop interface syntax
const ToggleGroup = React.forwardRef(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} className={cn("flex items-center justify-center gap-1", className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

// Removed forwardRef type annotations and prop interface syntax
const ToggleGroupItem = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  // Removed generic type annotation
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };