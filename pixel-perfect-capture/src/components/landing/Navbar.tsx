import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Dna } from "lucide-react";

const navLinks = [
  { label: "Features", id: "features" },
  { label: "How It Works", id: "how-it-works" },
  { label: "About", id: "about" },
  { label: "Contact", id: "sign-up" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Determine active section
      for (const link of [...navLinks].reverse()) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(link.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled ? "shadow-2xl shadow-black/15" : ""
      }`}
      style={{
        background: scrolled
          ? "hsla(222, 47%, 5%, 0.92)"
          : "hsla(222, 47%, 5%, 0.5)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled
          ? "1px solid hsla(222, 20%, 20%, 0.4)"
          : "1px solid hsla(222, 20%, 20%, 0.15)",
      }}
    >
      <div className="container mx-auto flex items-center justify-between h-[72px] px-4">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
            <Dna className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground tracking-tight">
            DNA<span className="text-primary">Analyzer</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className={`relative text-[0.875rem] font-medium transition-colors duration-300 group tracking-wide ${
                activeSection === link.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-[2px] bg-primary rounded-full transition-all duration-300 ${
                  activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollTo("sign-up")}
            className="text-muted-foreground hover:text-foreground font-medium tracking-wide"
          >
            Log In
          </Button>
          <Button variant="hero" size="sm" onClick={() => scrollTo("sign-up")} className="btn-shimmer px-6">
            Get Started
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden p-6 space-y-1"
          style={{
            background: "hsla(222, 47%, 5%, 0.98)",
            borderTop: "1px solid hsl(var(--border))",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className={`block w-full text-left py-3 font-medium text-sm transition-colors ${
                activeSection === link.id
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col gap-2 pt-4">
            <Button variant="heroOutline" onClick={() => scrollTo("sign-up")}>Log In</Button>
            <Button variant="hero" onClick={() => scrollTo("sign-up")}>Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
