import React from "react";

export default function Philosophy() {
  // Directly referencing our beautiful generated hyper-realistic orchid image
  const orchidImage = "/src/assets/images/featured_orchid_1781297268537.jpg";

  return (
    <section 
      id="felsefemiz" 
      className="py-20 md:py-28 px-6 md:px-16 bg-canvas border-b border-ink"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Generative Botanical Artwork with Luxury Cushion Frame */}
        <div className="lg:col-span-6 flex justify-center relative" id="phil-left-col">
          {/* Decorative ambient gold halo behind image */}
          <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-[80px]" />
          
          <div className="relative z-10 w-full max-w-[430px] p-2 border border-ink">
            <img
              src={orchidImage}
              alt="Artisan Digital Orchid Masterpiece"
              className="w-full h-auto aspect-[3/4] object-cover rounded-none border border-ink shadow-sm"
              referrerPolicy="no-referrer"
              id="phil-main-img"
            />
            
            {/* Tech tag floating on bottom corner with strict rectangle bounds */}
            <div className="absolute -bottom-4 -right-4 bg-canvas border border-ink px-5 py-3 rounded-none shadow-sm flex flex-col pointer-events-none">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a880] font-bold">Koleksiyon Sınıfı</span>
              <span className="font-serif text-[13px] font-bold text-neutral-dark italic">Zanaatkar Botanik</span>
            </div>
          </div>
        </div>

        {/* Right Side: Philosophy Content */}
        <div className="lg:col-span-6 text-left flex flex-col justify-center" id="phil-right-col">
          
          <span 
            className="font-mono text-xs uppercase tracking-[0.25em] text-[#c5a880] mb-3 font-semibold block"
            id="phil-sup"
          >
            FELSEFEMİZ
          </span>
          
          <h2 
            className="font-serif text-[34px] md:text-[44px] font-bold text-neutral-dark leading-tight tracking-tight mb-8"
            id="phil-heading"
          >
            Zanaatkar Dijital Botanik
          </h2>
          
          <p 
            className="font-sans text-[15px] sm:text-[16px] text-neutral-dark/70 leading-[1.75] mb-10"
            id="phil-body"
          >
            Valentino Flower Shop olarak, gül ve lalelerin titizlikle yeniden yaratılmasında uzmanlaşıyoruz. Sanatçılarımız her bir dijital taç yaprağını elle şekillendirerek, matematiksel simetrinin organik kaosla dengelenmesini sağlıyor. Doğanın kusursuz geometrisini gelişmiş algoritmalarla yeniden yorumluyoruz.
          </p>

          {/* Sub-features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-ink pt-6" id="phil-features">
            
            {/* Feature 1 */}
            <div className="flex flex-col">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#844e5f] mb-2.5">
                Tür Odaklı
              </h3>
              <p className="font-sans text-[13px] text-neutral-dark/65 leading-relaxed">
                Gül ve Lale'nin benzersiz iskelet yapıları üzerine derinlemesine çalışma.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#526442] mb-2.5">
                Hiper-Gerçekçi
              </h3>
              <p className="font-sans text-[13px] text-neutral-dark/65 leading-relaxed">
                Işığa duyarlı malzemelerle taç yapraklarının kadife dokusunu yakalıyoruz.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
