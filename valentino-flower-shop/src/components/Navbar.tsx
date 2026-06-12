import React, { useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Navbar({
  onCartClick,
  cartCount,
  activeSection,
  setActiveSection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Galeri", id: "galeri" },
    { label: "Butik Market", id: "mastermaster" }, // custom builder link
    { label: "Zanaatkarlar", id: "felsefemiz" },
    { label: "Sergiler", id: "sergiler" },
  ];

  const handleNav = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-canvas/90 backdrop-blur-sm border-b border-ink px-6 md:px-10 h-24 flex items-center">
      <div className="max-w-[1280px] mx-auto w-full flex items-center justify-between">
        
        {/* Brand Logo - Playfair Serif with editorial N°12 marker */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer font-serif text-lg md:text-xl font-bold tracking-tighter text-neutral-dark hover:opacity-80 transition-opacity flex items-center gap-2"
          id="brand-logo"
        >
          <span className="serif italic font-normal text-primary/80">N°12</span>
          <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-neutral-dark">VALENTINO</span>
        </div>

        {/* Center Desktop Links */}
        <div className="hidden lg:flex items-center space-x-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`font-sans text-[10px] font-semibold tracking-widest uppercase transition-all relative py-2 ${
                activeSection === item.id 
                  ? "text-neutral-dark" 
                  : "text-neutral-dark/50 hover:text-neutral-dark"
              }`}
              id={`nav-${item.id}`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-dark w-full animate-fade-in" />
              )}
            </button>
          ))}
        </div>

        {/* Right Search Input & Butik Cart Button */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Elegant Search Bar */}
          <div className="relative">
            <span className="absolute left-3 top-2 text-neutral-dark/40">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              placeholder="Ara..."
              className="bg-neutral-dark/[0.04] hover:bg-neutral-dark/[0.08] focus:bg-canvas border border-transparent focus:border-ink text-neutral-dark font-sans text-[11px] rounded-full py-1.5 pl-8 pr-4 w-36 outline-none transition-all placeholder:text-neutral-dark/35"
              id="search-input"
            />
          </div>

          {/* Luxury Pill Butik/Cart Trigger */}
          <button
            onClick={onCartClick}
            className="flex items-center space-x-2 bg-neutral-dark hover:bg-neutral-dark/95 text-canvas text-[10px] font-bold uppercase tracking-widest pl-5 pr-5 py-2.5 rounded-full transition-all active:scale-95 duration-200"
            id="butik-btn"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Butik</span>
            {cartCount > 0 && (
              <span className="ml-1 bg-white text-neutral-dark text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-mono">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile menu toggle, mobile cart */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button
            onClick={onCartClick}
            className="relative p-2 text-neutral-dark/85 hover:text-neutral-dark"
            id="mobile-cart-btn"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-secondary text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-dark"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-canvas border-b border-neutral-dark/10 p-6 flex flex-col space-y-4 shadow-xl z-50">
          <div className="relative w-full mb-2">
            <span className="absolute left-3 top-2.5 text-neutral-dark/40">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Çiçek türü veya galeri ara..."
              className="bg-neutral-dark/5 text-neutral-dark w-full font-sans text-xs rounded-full py-2.5 pl-9 pr-4 outline-none placeholder:text-neutral-dark/35"
              id="mobile-search"
            />
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="text-left font-sans text-sm font-semibold text-neutral-dark/80 hover:text-neutral-dark py-2 border-b border-neutral-dark/5"
              id={`mobile-nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onCartClick();
            }}
            className="w-full flex items-center justify-center space-x-2 bg-neutral-dark text-canvas text-xs font-semibold uppercase tracking-widest py-3 rounded-full mt-2"
            id="mobile-butik-btn"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Butik Siparişlerim</span>
          </button>
        </div>
      )}
    </nav>
  );
}
