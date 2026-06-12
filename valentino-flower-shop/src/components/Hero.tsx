import React from "react";
import ProceduralFlower from "./ProceduralFlower";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onCustomClick: () => void;
}

export default function Hero({ onExploreClick, onCustomClick }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-16 py-12 md:py-20 overflow-hidden bg-canvas">
      
      {/* Background radial soft light gradient */}
      <div className="absolute top-[20%] right-[10%] w-[33vw] h-[33vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[25vw] h-[25vw] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch relative z-10 border-y border-ink">
        
        {/* Leftmost Vertical Issue Marker (Asymmetric Grid) */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center py-12 border-r border-ink">
          <div className="vertical-text">Issue 04 / Vol. 12 — Botonique</div>
        </div>

        {/* Center Editorial Text Column */}
        <div className="lg:col-span-6 flex flex-col justify-between py-12 lg:py-16 text-left lg:px-12 border-r border-ink" id="hero-left-col">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-dark/40 font-bold mb-4">
              Valentino Floral Archive
            </div>
            <h1 
              className="serif massive-title text-neutral-dark mb-10"
              id="hero-title"
            >
              GÜL & LALE
              <br />
              <span className="italic font-light">SANATI</span>
            </h1>
            
            <p 
              className="font-sans text-[15px] text-neutral-dark/70 leading-[1.8] max-w-[440px] font-light mb-12"
              id="hero-description"
            >
              Botanik ruhun algoritmik hassasiyetle buluştuğu nokta. Dijital gül ve lale dekorasyonunun bir sonraki evrimini keşfedin. Sanatçılarımız ve akıllı sistemlerimizle şekillenen lüks botanik.
            </p>
          </div>

          <div className="flex flex-wrap gap-4" id="hero-actions">
            <button
              onClick={onExploreClick}
              className="bg-neutral-dark hover:bg-neutral-dark/90 text-canvas text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4.5 rounded-none transition-all active:scale-95 duration-200"
              id="hero-explore-btn"
            >
              Başyapıtları İncele
            </button>
            
            <button
              onClick={onCustomClick}
              className="border border-ink bg-transparent hover:bg-neutral-dark hover:text-canvas text-neutral-dark text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4.5 rounded-none transition-all active:scale-95 duration-200"
              id="hero-studio-btn"
            >
              Butik Çiçek Marketi
            </button>
          </div>
        </div>

        {/* Right Volumetric Procedural Flower Panel Column */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center py-12 lg:py-16 lg:pl-12" id="hero-right-col">
          <div 
            className="relative w-full max-w-[390px] aspect-[4/5] bg-neutral-dark/[0.01] border border-ink p-8 flex flex-col items-center justify-between cursor-pointer group transition-all"
            onClick={onCustomClick}
            id="hero-flower-container"
          >
            {/* Top tiny label */}
            <div className="w-full flex justify-between text-[9px] font-mono tracking-widest text-[#c5a880] uppercase">
              <span>Boutique Engine v1.9</span>
              <span>[ACTIVE STATE]</span>
            </div>

            {/* Gorgeous parametric live flower spinning in the background */}
            <div className="w-full flex items-center justify-center my-6">
              <ProceduralFlower
                species="hybrid"
                petalCount={12}
                symmetry={0.92}
                glowness={0.85}
                hue="#844e5f" // elegant crimson red default to highlight rose aesthetic
                className="w-full h-full max-w-[240px] max-h-[240px] transition-transform duration-700 group-hover:scale-105"
                isSpinning={true}
              />
            </div>

            {/* Bottom editorial subtitle bar */}
            <div className="w-full bg-white/80 backdrop-blur-sm p-4 border border-ink text-left">
              <div className="text-[10px] uppercase font-bold mb-1 tracking-wider">The Live Observation</div>
              <div className="text-[11px] leading-snug text-neutral-dark/70 font-light">
                Doğanın kusursuz sarmal simetrisi piksellere can veriyor.
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Down indicators */}
      <div 
        onClick={onExploreClick}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center justify-center text-neutral-dark/35 hover:text-neutral-dark cursor-pointer transition-colors"
        id="hero-scroll-indicator"
      >
        <div className="w-6 h-6 rounded-full border border-ink flex items-center justify-center animate-bounce">
          <ArrowDown className="w-3 h-3" />
        </div>
      </div>

    </section>
  );
}
