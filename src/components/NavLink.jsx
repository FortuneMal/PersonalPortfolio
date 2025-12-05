import { NavLink as RouterNavLink } from "react-router-dom"; // Removed NavLinkProps
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const NavLink = forwardRef(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        // The className prop now uses the standard JS props passed to the component
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
