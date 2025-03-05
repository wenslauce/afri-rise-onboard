
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "relative px-3 py-2 transition-colors hover:text-afririse-600",
        isActive
          ? "text-afririse-600 font-medium"
          : "text-foreground/80",
        className
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-afririse-500 rounded-full" />
      )}
    </Link>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // For demo, we'll simulate a login
  const handleLogin = () => {
    setUser({ name: "Demo User" });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-white/70 backdrop-blur-lg shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-afririse-600"
        >
          <span className="bg-afririse-500 text-white px-2 py-1 rounded-md">Afri</span>
          <span>Rise</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/application">Apply</NavLink>
          {user && <NavLink href="/dashboard">Dashboard</NavLink>}
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-afririse-50"
                >
                  <span>{user.name}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-2" align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" onClick={handleLogin}>
                Log in
              </Button>
              <Button onClick={handleLogin}>Sign up</Button>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 p-4 md:hidden animate-fadeIn">
          <nav className="flex flex-col space-y-4 p-4">
            <Link to="/" className="py-2 text-lg" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/application" className="py-2 text-lg" onClick={() => setMobileMenuOpen(false)}>
              Apply
            </Link>
            {user && (
              <Link to="/dashboard" className="py-2 text-lg" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            <Link to="#about" className="py-2 text-lg" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="#contact" className="py-2 text-lg" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
          </nav>
          <div className="mt-8 flex flex-col space-y-4">
            {user ? (
              <>
                <div className="py-2 px-4 bg-afririse-50 rounded-md">
                  <p className="font-medium">{user.name}</p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleLogin}>
                  Log in
                </Button>
                <Button onClick={handleLogin}>Sign up</Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
