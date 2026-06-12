import React, { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, X, Sparkles, Check, ShoppingBag } from "lucide-react";
import { DigitalFlower } from "../types";

interface GallerySectionProps {
  onAddToCart: (flower: DigitalFlower) => void;
}

export default function GallerySection({ onAddToCart }: GallerySectionProps) {
  const [selectedFlower, setSelectedFlower] = useState<DigitalFlower | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const flowers: DigitalFlower[] = [
    {
      id: "midnight-rose",
      name: "Gece Yarısı Kadife Gülü",
      species: "rose",
      subtitle: "İmza Serisi · Gerçekçi Seviye",
      image: "/src/assets/images/velvet_rose_1781297291083.jpg",
      classTag: "Seri 01",
      price: "1,450 €",
      petalCount: 24,
      symmetry: 0.98,
      glowness: 0.4,
      hue: "#844e5f",
      scentProfile: "Hafif yağmurlu nemli ozon, derin kadife ve taze koparılmış kırmızı şakayık yaprağı aromaları.",
      lore: "Bu dijital şaheser, her bir taç yaprağındaki mikro su damlacıklarının ışık altındaki kırılmalarını simüle eder. Yapay gölgelendirme hassasiyetimiz ve derin kırmızı renk doygunluğumuz, her bir lüks pikselde eşsiz bir romantizm vaat eder.",
      careGuide: "Doğrudan parlak mavi ışıktan kaçının. Haftada bir kez sergileme monitörünün kontrastını %50 seviyesine ayarlayarak esere dinlenme payı tanıyınız."
    },
    {
      id: "silk-tulip",
      name: "Pudra İpek Lale",
      species: "tulip",
      subtitle: "İmza Serisi · Gerçekçi Seviye",
      image: "/src/assets/images/silk_tulip_1781297310383.jpg",
      classTag: "Seri 01",
      price: "1,200 €",
      petalCount: 9,
      symmetry: 0.95,
      glowness: 0.25,
      hue: "#ecdcff",
      scentProfile: "Temiz pudralı bebek sabunu, kurutulmuş lavanta tanecikleri ve keten elyafı esintisi.",
      lore: "Pudra İpek Lale, saf zarafetin ve matematiksel sadeliğin bir ürünüdür. Taç yaprak dokuları, en narin ipek kumaşın iplik örgülerinden esinlenerek procedurially inşa edilmiş olup, her detayında lüks hissi uyandırır.",
      careGuide: "Maksimum %40 ekran nem simülasyonu. Sıcak güneşli günlerde ambiyans ışıklandırmasını pastel tonlara sabitleyerek sergileyin."
    },
    {
      id: "underwater-purple",
      name: "Sualtı Moru",
      species: "hybrid",
      subtitle: "Seri 02 · Atmosferik",
      image: "/src/assets/images/underwater_purple_1781297326251.jpg",
      classTag: "Seri 02",
      price: "1,800 €",
      petalCount: 18,
      symmetry: 0.88,
      glowness: 0.9,
      hue: "#685682",
      scentProfile: "Ferah serin deniz tuzu, sualtı yosun dumanı ve metalik vanilya bileşimi.",
      lore: "Yapay zekanın fantastik rüya evreninden ilham alan bu eser, camgöbeği saydam merceklerden ve spiral sarmal altın liflerden oluşur. Ethereal bir derin deniz florası simülasyonu sunar, modern lobiler için idealdir.",
      careGuide: "Ortam ışığını kapatarak tamamen karanlık bir odada OLED ekranlarda gece modunda çalıştırılmalıdır."
    }
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handleOrder = (flower: DigitalFlower) => {
    onAddToCart(flower);
    setJustAddedId(flower.id);
    setTimeout(() => setJustAddedId(null), 2500);
  };

  return (
    <section id="galeri" className="py-24 px-6 md:px-16 bg-canvas overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header with Navigation arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16" id="gal-header-node">
          <div className="text-left">
            <h2 className="font-serif text-[32px] md:text-[44px] font-semibold tracking-tight text-neutral-dark mb-4">
              İmza Türler Galerisi
            </h2>
            <p className="font-sans text-[14px] sm:text-[15px] text-neutral-dark/60 max-w-[500px] leading-relaxed">
              Gül ve lale koleksiyonlarımız aracılığıyla yüksek moda fotoğrafçılığı ile dijital zanaatın birleşimini deneyimleyin.
            </p>
          </div>

          {/* Elegant Carousel Controls */}
          <div className="flex items-center space-x-3 mt-6 md:mt-0" id="gal-navigation-arrows">
            <button
              onClick={() => handleScroll("left")}
              className="w-11 h-11 rounded-full border border-neutral-dark/10 flex items-center justify-center text-neutral-dark hover:bg-neutral-dark hover:text-canvas transition-colors active:scale-95 cursor-pointer"
              id="arrow-left-btn"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-11 h-11 rounded-full border border-neutral-dark/10 flex items-center justify-center text-neutral-dark hover:bg-neutral-dark hover:text-canvas transition-colors active:scale-95 cursor-pointer"
              id="arrow-right-btn"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slidable Carousel container */}
        <div 
          ref={carouselRef}
          className="flex gap-8 overflow-x-auto pb-8 snap-x scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          id="gallery-carousel-track"
        >
          {flowers.map((flower) => (
            <div
              key={flower.id}
              className="min-w-[280px] sm:min-w-[340px] md:min-w-[370px] snap-start group cursor-pointer"
              onClick={() => setSelectedFlower(flower)}
              id={`card-${flower.id}`}
            >
              <div className="relative overflow-hidden rounded-none bg-neutral-dark/[0.01] border border-ink p-2 aspect-[3/4] mb-5">
                {/* Visual Image with scale transition */}
                <img
                  src={flower.image}
                  alt={flower.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid price indicator in strict badge */}
                <span className="absolute top-6 right-6 bg-canvas border border-ink px-3 py-1.5 rounded-none text-[11px] font-mono font-bold text-neutral-dark tracking-wider">
                  {flower.price}
                </span>

                {/* Overlaid quick action banner */}
                <div className="absolute inset-0 bg-neutral-dark/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-canvas text-neutral-dark text-[10px] font-bold uppercase tracking-widest px-6 py-3 border border-ink rounded-none shadow-sm">
                    Sertifikayı İncele
                  </span>
                </div>
              </div>

              {/* Flower Text Details */}
              <div className="text-left px-2">
                <h3 className="font-serif text-[19px] sm:text-[22px] font-bold text-neutral-dark mb-1 transition-colors">
                  {flower.name}
                </h3>
                <p className="font-sans text-[10px] uppercase tracking-widest text-[#c5a880] font-bold">
                  {flower.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Dynamic Pop-up Modal for Details */}
      {selectedFlower && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" id="gallery-detail-modal">
          {/* Backdrop Blur */}
          <div 
            className="absolute inset-0 bg-neutral-dark/60 backdrop-blur-sm" 
            onClick={() => setSelectedFlower(null)}
          />

          {/* Sheet Body Container */}
          <div 
            className="relative bg-canvas w-full max-w-[840px] rounded-none overflow-hidden shadow-2xl border border-ink grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto z-10"
            style={{ animation: "scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
            id="modal-body"
          >
            {/* Close Button overlay */}
            <button
              onClick={() => setSelectedFlower(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-none bg-canvas border border-ink flex items-center justify-center text-neutral-dark hover:bg-neutral-dark hover:text-canvas transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Huge Close-up */}
            <div className="md:col-span-6 relative aspect-square md:aspect-auto md:h-full bg-neutral-dark/5">
              <img
                src={selectedFlower.image}
                alt={selectedFlower.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 bg-neutral-dark text-canvas text-[9px] uppercase font-mono tracking-widest px-3 py-1 rounded-none">
                {selectedFlower.classTag}
              </div>
            </div>

            {/* Right Column: Premium Botanical Specifications */}
            <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between text-left h-full">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#c5a880] mb-2 font-bold block">
                  BOTANİK SERTİFİKASI
                </span>
                
                <h3 className="font-serif text-[28px] md:text-[34px] font-bold text-neutral-dark leading-tight mb-2">
                  {selectedFlower.name}
                </h3>
                
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-sm font-mono font-bold text-primary">{selectedFlower.price}</span>
                  <span className="text-neutral-dark/20">•</span>
                  <span className="text-xs font-sans text-neutral-dark/50">{selectedFlower.subtitle}</span>
                </div>

                {/* Scientific Parameters */}
                <div className="grid grid-cols-3 gap-0 border border-ink bg-neutral-dark/[0.01] divide-x divide-ink mb-6">
                  <div className="flex flex-col p-3">
                    <span className="font-mono text-[9px] text-neutral-dark/45 uppercase mb-1">Taç Yaprak</span>
                    <span className="font-sans font-bold text-xs text-neutral-dark">{selectedFlower.petalCount} Parlak</span>
                  </div>
                  <div className="flex flex-col p-3">
                    <span className="font-mono text-[9px] text-neutral-dark/45 uppercase mb-1">Simetri</span>
                    <span className="font-sans font-bold text-xs text-neutral-dark">%{(selectedFlower.symmetry * 100).toFixed(0)}</span>
                  </div>
                  <div className="flex flex-col p-3">
                    <span className="font-mono text-[9px] text-neutral-dark/45 uppercase mb-1">Işıma Pili</span>
                    <span className="font-sans font-bold text-xs text-neutral-dark">%{(selectedFlower.glowness * 100).toFixed(0)}</span>
                  </div>
                </div>

                {/* Poetic description */}
                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#844e5f] mb-1">Koku Profili</h4>
                    <p className="font-sans text-[13px] text-neutral-dark/75 leading-relaxed font-light">{selectedFlower.scentProfile}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] mb-1">Sanatsal Arkaplan</h4>
                    <p className="font-sans text-[13px] text-neutral-dark/70 leading-relaxed font-light">{selectedFlower.lore}</p>
                  </div>

                  <div>
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#526442] mb-1">Dijital Bakım</h4>
                    <p className="font-sans text-[12px] text-neutral-dark/60 leading-relaxed italic font-light">{selectedFlower.careGuide}</p>
                  </div>
                </div>
              </div>

              {/* Cta Buttons */}
              <div className="flex items-center space-x-3 pt-4 border-t border-ink">
                <button
                  onClick={() => handleOrder(selectedFlower)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all ${
                    justAddedId === selectedFlower.id
                      ? "bg-tertiary text-white"
                      : "bg-neutral-dark text-canvas hover:bg-neutral-dark/90"
                  }`}
                >
                  {justAddedId === selectedFlower.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Eklendi!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Butikte Rezerv Et</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
