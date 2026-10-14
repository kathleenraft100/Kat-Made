import { ExternalLink, ShieldCheck, Sparkles, Scissors, Layers, ArrowUpRight } from "lucide-react";

interface ShopIntegrationProps {
  onOpenSampleInquiry: () => void;
}

export default function ShopIntegration({ onSampleInquiry }: { onSampleInquiry: () => void }) {
  return (
    <section id="shops" className="py-24 border-b border-[#070707] bg-[#d8ff43] text-[#070707]">
      <div className="max-w-[1440px] mx-auto px-[4vw]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#070707]/25">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans-grotesk tracking-widest uppercase text-[#070707] font-bold">
              <span className="w-6 h-px bg-[#070707]" />
              <span>OFFICIAL PRODUCTION PARTNERS</span>
              <span className="opacity-40">/</span>
              <span>CERTIFIED SUBSTRATES</span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-6xl font-serif-display font-bold uppercase tracking-tight text-[#070707]">
              WHERE TO <span className="text-[#ff67bd] italic font-normal">BUY</span> PRINTS & SILKS
            </h2>
          </div>

          <div className="text-right">
            <button
              onClick={onSampleInquiry}
              className="px-5 py-3 bg-[#070707] text-[#d8ff43] font-sans-grotesk font-bold text-xs uppercase tracking-wider shadow-[4px_4px_0_#ff67bd] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#ff67bd] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Scissors className="w-4 h-4 text-[#ff67bd]" />
              <span>Order Designer Swatch Kit</span>
            </button>
          </div>
        </div>

        {/* 2-Column Partner Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Partner 1: Displate Metal Posters */}
          <div className="p-8 lg:p-10 bg-[#F3F0E8] border-2 border-[#070707] shadow-[10px_10px_0_#070707] flex flex-col justify-between transition-transform hover:-translate-y-1 duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#070707]/15">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full border-2 border-[#070707] flex items-center justify-center font-bold text-xs bg-[#d8ff43]">
                    D
                  </span>
                  <span className="text-xs font-sans-grotesk font-bold uppercase tracking-widest text-[#070707]">
                    DISPLATE // METAL POSTERS
                  </span>
                </div>
                <span className="text-[10px] font-sans-grotesk font-bold uppercase bg-[#070707] text-[#d8ff43] px-2.5 py-1">
                  MAGNET MOUNTED
                </span>
              </div>

              <div className="mt-6">
                <span className="text-[11px] font-sans-grotesk font-bold text-[#ff67bd] uppercase tracking-wider">
                  AIRCRAFT-GRADE STEEL SUBSTRATE
                </span>
                <h3 className="mt-1 text-3xl sm:text-4xl font-serif-display font-bold text-[#070707]">
                  The Chrome Metal Series
                </h3>
                <p className="mt-3 text-sm text-[#070707]/80 font-sans-grotesk leading-relaxed">
                  Engineered with museum UV-pigment inks directly bonded onto durable steel sheets. Specimen specular highlights catch real room lighting for an authentic liquid-metal sheen.
                </p>
              </div>

              {/* Spec bullets */}
              <div className="mt-6 space-y-2 text-xs font-sans-grotesk text-[#070707]/90 border-t border-[#070707]/15 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#070707] shrink-0" />
                  <span><strong>Zero Wall Drilling:</strong> Proprietary magnetic mount system installed in 20 seconds.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ff67bd] shrink-0" />
                  <span><strong>Finishes:</strong> Matte Velvet, High-Gloss Liquid, and 3D Texturized Holographic.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#070707] shrink-0" />
                  <span><strong>Sizes:</strong> Medium (45×32cm), Large (67.5×48cm), Multi-Plate XL Wall Art.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#070707]/20 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-sans-grotesk uppercase tracking-wider block text-[#070707]/60">
                  Worldwide Shipping
                </span>
                <span className="text-xl font-bold font-serif-display text-[#070707]">
                  From $49 / £39
                </span>
              </div>

              <a
                href="https://displate.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#070707] text-[#d8ff43] hover:bg-[#ff67bd] hover:text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider border-2 border-[#070707] transition-colors flex items-center gap-2 shadow-[4px_4px_0_#070707]"
              >
                <span>Visit Kat-Made on Displate</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Partner 2: Contrado London Silks & Fabrics */}
          <div className="p-8 lg:p-10 bg-[#ff67bd] border-2 border-[#070707] shadow-[10px_10px_0_#070707] flex flex-col justify-between transition-transform hover:-translate-y-1 duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#070707]/15">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full border-2 border-[#070707] flex items-center justify-center font-bold text-xs bg-[#F3F0E8] text-[#070707]">
                    C
                  </span>
                  <span className="text-xs font-sans-grotesk font-bold uppercase tracking-widest text-[#070707]">
                    CONTRADO // BESPOKE TEXTILES
                  </span>
                </div>
                <span className="text-[10px] font-sans-grotesk font-bold uppercase bg-[#070707] text-[#ff67bd] px-2.5 py-1">
                  HANDMADE IN LONDON
                </span>
              </div>

              <div className="mt-6">
                <span className="text-[11px] font-sans-grotesk font-bold text-[#070707] uppercase tracking-wider">
                  100% PURE MULBERRY SILK & VELVET
                </span>
                <h3 className="mt-1 text-3xl sm:text-4xl font-serif-display font-bold text-[#070707]">
                  Wearable Art & Drapery
                </h3>
                <p className="mt-3 text-sm text-[#070707]/90 font-sans-grotesk leading-relaxed">
                  Printed and hand-finished in Contrado’s bespoke London studio. Wear Kathleen Raft’s psychedelic chrome botanicals as silk scarves, kimono robes, or order continuous meterage for couture and upholstery.
                </p>
              </div>

              {/* Spec bullets */}
              <div className="mt-6 space-y-2 text-xs font-sans-grotesk text-[#070707] border-t border-[#070707]/15 pt-4">
                <div className="flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-[#070707] shrink-0" />
                  <span><strong>Artisan Hand Hemming:</strong> Baby hem or hand-rolled edges by London seamstresses.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#070707] shrink-0" />
                  <span><strong>Luxury Substrates:</strong> 100% Silk Twill (35 Momme), Silk Satin, Plush Velvet, Cotton Drill.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#070707] shrink-0" />
                  <span><strong>Custom Cut:</strong> Available by the meter for fashion houses and interior decorators.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#070707]/20 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-sans-grotesk uppercase tracking-wider block text-[#070707]/70">
                  Ethically Made in UK
                </span>
                <span className="text-xl font-bold font-serif-display text-[#070707]">
                  From £45 / $58
                </span>
              </div>

              <a
                href="https://www.contrado.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#070707] text-[#ff67bd] hover:bg-[#d8ff43] hover:text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider border-2 border-[#070707] transition-colors flex items-center gap-2 shadow-[4px_4px_0_#070707]"
              >
                <span>Shop Kat-Made on Contrado</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
