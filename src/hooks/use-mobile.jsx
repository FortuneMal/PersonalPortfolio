import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Removed the type annotation: <boolean | undefined>
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
    // Media Query List uses a max-width based on the breakpoint minus one pixel
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Listen for changes to the media query
    mql.addEventListener("change", onChange);
    
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Cleanup function
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Returns true once the mobile status has been determined (is not undefined)
  // The double-bang converts the value (boolean or undefined) into a pure boolean.
  return !!isMobile;
}