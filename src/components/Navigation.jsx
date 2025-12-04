import { NavLink } from "./NavLink";
import { Home, Briefcase, Award, Code, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Navigation = () => {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/projects", label: "Projects", icon: Briefcase },
    { to: "/certificates", label: "Certificates", icon: Award },
    { to: "/languages", label: "Skills", icon: Code },
    { to: "/resume", label: "Resume", icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-xl font-bold gradient-text">
            Fortune Malaza
          </NavLink>
          
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                activeClassName="text-primary"
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
