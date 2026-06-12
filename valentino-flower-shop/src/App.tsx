import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Philosophy from "./components/Philosophy";
import GallerySection from "./components/GallerySection";
import MasterpieceStudio from "./components/MasterpieceStudio";
import ExhibitionsList from "./components/ExhibitionsList";
import Footer from "./components/Footer";
import { DigitalFlower, CartItem } from "./types";
import { X, Trash2, ExternalLink, Ticket, CheckCircle2, ShoppingBag } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("galeri");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  const [checkoutStep, setCheckoutStep] = useState<"idle" | "processing" | "success">("idle");
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);
  const [purchaseCode, setPurchaseCode] = useState<string>("");

  // Track scrolling to light-up active nav links
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["galeri", "mastermaster", "felsefemiz", "sergiler"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Syncing cart into local storage
  useEffect(() => {
    const stored = localStorage.getItem("valentino_cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("valentino_cart", JSON.stringify(newCart));
  };

  const addToCart = (flower: DigitalFlower) => {
    const freshCart = [...cart];
    const existing = freshCart.find((item) => item.flower.id === flower.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      freshCart.push({ flower, quantity: 1, customDedication: "" });
    }

    saveCart(freshCart);
    setIsCartOpen(true); // Cozy slide drawer on add
  };

  const removeFromCart = (flowerId: string) => {
    const freshCart = cart.filter((item) => item.flower.id !== flowerId);
    saveCart(freshCart);
  };

  const updateQuantity = (flowerId: string, diff: number) => {
    const freshCart = cart.map((item) => {
      if (item.flower.id === flowerId) {
        const nextQ = Math.max(1, item.quantity + diff);
        return { ...item, quantity: nextQ };
      }
      return item;
    });
    saveCart(freshCart);
  };

  const updateDedication = (flowerId: string, text: string) => {
    const freshCart = cart.map((item) => {
      if (item.flower.id === flowerId) {
        return { ...item, customDedication: text };
      }
      return item;
    });
    saveCart(freshCart);
  };

  // Safe numerical parser for prices (e.g., "1,450 €" -> 1450)
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const priceStr = item.flower.price.replace(/[^\d]/g, "");
      const priceVal = parseInt(priceStr, 10) || 1200;
      return acc + priceVal * item.quantity;
    }, 0);
  };

  const getCurrencySymbol = () => {
    const hasTL = cart.some((item) => item.flower.price.includes("₺"));
    return hasTL ? "₺" : "€";
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setCheckoutStep("processing");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setPurchasedItems([...cart]);
    setPurchaseCode(`VAL-${Math.floor(100000 + Math.random() * 900000)}`);
    setCheckoutStep("success");
    saveCart([]); // Clear cart
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-canvas min-h-screen text-neutral-dark flex flex-col justify-between selection:bg-primary/20">
      
      {/* 1. Header Navigation */}
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartCount}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 2. Primary Sections stack */}
      <main className="flex-grow flex flex-col">
        <Hero
          onExploreClick={() => scrollSection("galeri")}
          onCustomClick={() => scrollSection("mastermaster")}
        />
        
        <Philosophy />
        
        <GallerySection onAddToCart={addToCart} />
        
        <MasterpieceStudio onAddCustomToCart={addToCart} />
        
        <ExhibitionsList />
      </main>

      {/* 3. Global Footer */}
      <Footer />      {/* 4. Glassmorphic Butik Basket Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" id="app-cart-overlay">
          {/* Background overlay back-toggle */}
          <div 
            className="absolute inset-0 bg-neutral-dark/40 backdrop-blur-sm"
            onClick={() => {
              setIsCartOpen(false);
              if (checkoutStep === "success") setCheckoutStep("idle");
            }}
          />

          {/* Drawer Body container */}
          <div 
            className="relative bg-canvas w-full max-w-[460px] h-full flex flex-col justify-between p-6 md:p-8 z-10 border-l border-ink"
            style={{ animation: "slideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
            id="cart-drawer-body"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-ink pb-4">
              <div className="flex items-center space-x-2.5 text-neutral-dark">
                <ShoppingBag className="w-4 h-4 text-[#c5a880]" />
                <h4 className="font-serif text-[20px] font-bold">Butik Siparişlerin</h4>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  if (checkoutStep === "success") setCheckoutStep("idle");
                }}
                className="w-8 h-8 rounded-none border border-ink flex items-center justify-center text-neutral-dark hover:bg-neutral-dark hover:text-canvas transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Middle Scrollable Section */}
            <div className="flex-grow overflow-y-auto py-6" id="cart-drawer-scroller">
              {checkoutStep === "processing" ? (
                /* Secure Loading bar block */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-6 h-6 rounded-none border border-primary border-t-transparent animate-spin" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#c5a880] animate-pulse">
                    Mülkiyet Belgeleri Mühürleniyor...
                  </p>
                </div>
              ) : checkoutStep === "success" ? (
                /* Receipt / Ownership Cert Success page */
                <div className="h-full flex flex-col justify-center text-left space-y-6" id="checkout-success-sheet">
                  <div className="flex items-center space-x-2 text-tertiary">
                    <CheckCircle2 className="w-6 h-6 text-[#526442]" />
                    <h5 className="font-serif text-[22px] font-bold">Rezervasyon Tamamlandı!</h5>
                  </div>
                  
                  <p className="font-sans text-[13px] text-neutral-dark/70 leading-relaxed font-light">
                    Tebrikler. Dijital botanik başyapıtlarınızın mülkiyet atamaları güvenle gerçekleştirildi. Sipariş koku kanalları ve sertifika kodları e-posta adresinize (<span className="text-neutral-dark font-semibold">Miraliyagizpali@gmail.com</span>) iletilmiştir.
                  </p>

                  {/* Certified ownership specs block */}
                  <div className="bg-canvas p-6 rounded-none border border-ink font-sans space-y-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-dark/50">Mülkiyet Kodu:</span>
                      <span className="font-mono font-bold text-neutral-dark">{purchaseCode}</span>
                    </div>

                    <div className="border-t border-ink pt-3">
                      <span className="font-bold text-neutral-dark uppercase block mb-2 tracking-wider text-[9px]">Alınan Şaheserler</span>
                      {purchasedItems.map((item) => (
                        <div key={item.flower.id} className="flex justify-between items-center py-1">
                          <span className="font-serif italic text-sm">{item.flower.name}</span>
                          <span className="font-mono text-neutral-dark/70">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCheckoutStep("idle");
                      setIsCartOpen(false);
                    }}
                    className="w-full bg-neutral-dark hover:bg-neutral-dark/95 text-canvas text-[10px] font-bold uppercase tracking-widest py-4 rounded-none transition-colors"
                  >
                    Atölyeye Geri Dön
                  </button>
                </div>
              ) : cart.length === 0 ? (
                /* Empty Cart status */
                <div className="h-full flex flex-col justify-center items-center text-center text-neutral-dark/40 py-12">
                  <ShoppingBag className="w-8 h-8 mb-4 opacity-45 text-[#c5a880]" />
                  <p className="font-serif text-lg italic mb-2">Butiğiniz henüz boş.</p>
                  <p className="font-sans text-xs max-w-[260px] leading-relaxed font-light">
                    İmza Türlerimizden birini sepete ekleyin ya da stüdyoda kendi algoritmanızı yazın.
                  </p>
                </div>
              ) : (
                /* List of active reserved flowers in cart */
                <div className="space-y-6" id="cart-items-track">
                  {cart.map((item) => (
                    <div key={item.flower.id} className="flex flex-col border-b border-ink pb-5" id={`cart-row-${item.flower.id}`}>
                      
                      {/* Product Name & basic specs */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex gap-3.5 items-center text-left">
                          {item.flower.image && (
                            <img 
                              src={item.flower.image} 
                              alt={item.flower.name} 
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 object-cover border border-ink bg-neutral-dark/[0.02] flex-shrink-0"
                            />
                          )}
                          <div className="text-left">
                            <h5 className="font-serif text-[16px] font-bold text-neutral-dark mb-0.5">
                              {item.flower.name}
                            </h5>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a880] block">
                              {item.flower.classTag} • Kapasite: {item.flower.petalCount} Taç
                            </span>
                          </div>
                        </div>
                        
                        {/* Remove item button */}
                        <button
                          onClick={() => removeFromCart(item.flower.id)}
                          className="text-neutral-dark/35 hover:text-secondary p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity sliders and price indicator */}
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-ink rounded-none p-1 bg-canvas">
                          <button
                            onClick={() => updateQuantity(item.flower.id, -1)}
                            className="w-6 h-6 rounded-none hover:bg-neutral-dark/5 flex items-center justify-center font-bold text-xs"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs px-3 font-semibold text-neutral-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.flower.id, 1)}
                            className="w-6 h-6 rounded-none hover:bg-neutral-dark/5 flex items-center justify-center font-bold text-xs"
                          >
                            +
                          </button>
                        </div>
                        
                        <span className="font-mono text-sm font-bold text-primary">
                          {item.flower.price}
                        </span>
                      </div>

                      {/* Gift / Dedication input customizer */}
                      <div className="mt-3">
                        <input
                          type="text"
                          value={item.customDedication || ""}
                          onChange={(e) => updateDedication(item.flower.id, e.target.value)}
                          placeholder="Özel hediye notu ekle (ör: 'Miralp`e sevgilerle...')"
                          className="w-full bg-neutral-dark/[0.01] hover:bg-neutral-dark/[0.03] text-[11px] p-2.5 border border-ink rounded-none text-neutral-dark outline-none transition-all placeholder:text-neutral-dark/35"
                        />
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary of Cart */}
            {checkoutStep === "idle" && cart.length > 0 && (
              <div className="border-t border-ink pt-6" id="cart-drawer-footer">
                <div className="flex justify-between items-center text-sm mb-6">
                  <span className="font-sans font-semibold text-neutral-dark/75">Toplam Rezervasyon Bedeli</span>
                  <span className="font-mono text-[18px] font-bold text-neutral-dark">
                    {calculateTotal().toLocaleString("tr-TR")} {getCurrencySymbol()}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-neutral-dark hover:bg-neutral-dark/95 text-canvas text-[10px] font-bold uppercase tracking-[0.2em] py-4 rounded-none transition-all flex items-center justify-center space-x-2"
                  id="checkout-trigger-btn"
                >
                  <span>Mülkiyet Belgelerini İmzala</span>
                </button>
                
                <p className="text-[10px] text-neutral-dark/40 text-center mt-3 leading-relaxed font-sans font-light">
                  *Eserler dijital lisansa tabidir. Rezervasyon sonrasında high-definition WebGL ve 4K render koku dosyaları transfer edilecektir.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
