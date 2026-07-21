import { Link, useLocation } from "react-router-dom";
import { Home, Briefcase, Award, Code, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/projects", label: "Projects", icon: Briefcase },
    { to: "/certificates", label: "Certificates", icon: Award },
    { to: "/languages", label: "Skills", icon: Code },
    { to: "/resume", label: "Resume", icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2 relative group">
            <span className="relative z-10">Fortune</span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center p-1.5 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "relative px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-colors duration-300",
                      isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <item.icon className="w-4 h-4 relative z-10" />
                    <span className="hidden sm:inline relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            
            <div className="ml-2 flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
