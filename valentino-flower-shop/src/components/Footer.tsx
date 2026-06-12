import React from "react";
import { Globe, Share2, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-ink py-16 px-6 md:px-16" id="app-footer">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-neutral-dark/70 font-sans text-xs">
        
        {/* Left Links & Brand signature */}
        <div className="flex flex-col items-center md:items-start space-y-4" id="footer-left">
          <div className="font-serif text-[16px] font-bold tracking-tighter text-neutral-dark flex items-center gap-1.5">
            <span className="italic font-normal text-primary/80">N°12</span>
            <span className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold text-neutral-dark">VALENTINO FLOWER SHOP</span>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-neutral-dark/50 uppercase tracking-widest text-[9px] font-bold" id="footer-links">
            <a href="#galeri" className="hover:text-primary transition-colors">Gizlilik Politikası</a>
            <a href="#galeri" className="hover:text-primary transition-colors">Kullanım Şartları</a>
            <a href="#galeri" className="hover:text-primary transition-colors">Kargo</a>
            <a href="#felsefemiz" className="hover:text-primary transition-colors">Bakım Rehberi</a>
          </div>
        </div>

        {/* Right copyright & social vector indicators */}
        <div className="flex flex-col items-center md:items-end space-y-4" id="footer-right">
          <div className="text-[9px] font-mono tracking-widest text-neutral-dark/45 uppercase text-center md:text-right" id="footer-copyright">
            © 2024 VALENTINO FLOWER SHOP ARTISTRY. TÜM HAKLARI SAKLIDIR.
          </div>
          
          <div className="flex items-center space-x-4 text-neutral-dark/60" id="footer-socials">
            <a href="https://google.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-all hover:translate-y-[-1px]">
              <Globe className="w-3.5 h-3.5" />
            </a>
            <a href="https://google.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-all hover:translate-y-[-1px]">
              <Share2 className="w-3.5 h-3.5" />
            </a>
            <a href="mailto:Miraliyagizpali@gmail.com" className="hover:text-primary transition-all hover:translate-y-[-1px]">
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
