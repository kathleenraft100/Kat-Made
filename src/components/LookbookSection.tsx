import { useState } from "react";
import { LOOKBOOK_ROOMS } from "../data/lookbook";
import { MapPin, ArrowRight, Sparkles, Building2, Check } from "lucide-react";
import { WatermarkedImage } from "./WatermarkedImage";

interface LookbookSectionProps {
  onOpenInquiry: (initialSubject?: string) => void;
}

export default function LookbookSection({ onOpenInquiry }: LookbookSectionProps) {
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);
  const [copiedCatalog, setCopiedCatalog] = useState(false);

  const activeRoom = LOOKBOOK_ROOMS[selectedRoomIdx] || LOOKBOOK_ROOMS[0];

  const handleDownloadSpec = () => {
    setCopiedCatalog(true);
    setTimeout(() => setCopiedCatalog(false), 2500);
  };

  return (
    <section id="lookbook" className="py-24 border-b border-[#f5f4ef]/20 bg-[#F3F0E8] text-[#070707]">
      <div className="max-w-[1440px] mx-auto px-[4vw]">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#070707]/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans-grotesk tracking-widest uppercase text-[#070707] font-bold">
              <span className="w-6 h-px bg-[#070707]" />
              <span>SPATIAL LOOKBOOK</span>
              <span className="opacity-40">/</span>
              <span>RESIDENTIAL & COMMERCIAL INSTALLATIONS</span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-6xl font-serif-display font-bold uppercase tracking-tight text-[#070707]">
              INHABITING THE <span className="text-[#ff67bd] italic font-normal">CHROMASCAPE</span>
            </h2>
            <p className="mt-3 text-sm text-[#070707]/75 font-sans-grotesk max-w-xl">
              See how Kat-Made liquid-chrome botanicals transform contemporary architectural spaces, from soaring penthouses to sound salons.
            </p>
          </div>

          {/* Room Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {LOOKBOOK_ROOMS.map((room, idx) => {
              const isSelected = selectedRoomIdx === idx;
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoomIdx(idx)}
                  className={`px-4 py-2.5 text-xs font-sans-grotesk uppercase font-bold tracking-wider border-2 border-[#070707] cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#070707] text-[#d8ff43] shadow-[4px_4px_0_#ff67bd] -translate-y-0.5"
                      : "bg-transparent text-[#070707] hover:bg-[#070707]/10"
                  }`}
                >
                  {room.title.split(" ")[0]} ({room.location.split(",")[0]})
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Display: 2-Column Split */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column (7 cols): Large Architectural Photo Window */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative aspect-[16/10] bg-[#070707] border-2 border-[#070707] shadow-[12px_12px_0_#070707] overflow-hidden group">
              <WatermarkedImage
                src={activeRoom.imageUrl}
                alt={activeRoom.title}
                watermarkDensity="subtle"
                badgePosition="bottom-right"
                className="w-full h-full"
                imgClassName="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {/* Top location badge */}
              <div className="absolute top-4 left-4 bg-[#070707] text-[#d8ff43] px-3 py-1 font-sans-grotesk text-xs uppercase tracking-wider font-bold border border-[#d8ff43]/40 flex items-center gap-1.5 shadow-[2px_2px_0_#ff67bd]">
                <MapPin className="w-3.5 h-3.5 text-[#ff67bd]" />
                <span>{activeRoom.location}</span>
              </div>

              {/* Bottom spec caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#070707]/90 backdrop-blur-xs text-[#f5f4ef] p-3 border border-[#f5f4ef]/20 flex flex-wrap items-center justify-between gap-3 text-xs font-sans-grotesk">
                <div className="flex items-center gap-2">
                  <span className="text-[#ff67bd] font-bold">PATTERN USED:</span>
                  <span className="font-serif-display font-bold text-sm tracking-wide text-[#d8ff43]">{activeRoom.patternName}</span>
                </div>
                <div className="text-[10px] text-[#adb2bd] uppercase tracking-wider">
                  {activeRoom.spaceType}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Case Study Metadata & Architecture Details */}
          <div className="lg:col-span-5 p-8 bg-[#070707] text-[#f5f4ef] border-2 border-[#070707] shadow-[10px_10px_0_#d8ff43] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-sans-grotesk text-[#d8ff43] uppercase tracking-widest font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>INSTALLATION CASE STUDY</span>
              </div>

              <h3 className="mt-3 text-3xl sm:text-4xl font-serif-display font-bold text-[#f5f4ef]">
                {activeRoom.title}
              </h3>
              <p className="mt-1 text-xs text-[#adb2bd] font-mono">
                {activeRoom.subtitle}
              </p>

              <p className="mt-6 text-sm text-[#adb2bd] font-sans-grotesk leading-relaxed">
                {activeRoom.description}
              </p>

              {/* Substrate & Architecture breakdown */}
              <div className="mt-6 space-y-3 pt-6 border-t border-[#f5f4ef]/15 text-xs font-sans-grotesk">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#d8ff43] font-bold block mb-1">
                    SUBSTRATE APPLIED
                  </span>
                  <span className="text-[#f5f4ef]">{activeRoom.substrate}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#ff67bd] font-bold block mb-1">
                    ARCHITECTURAL INTEGRATION
                  </span>
                  <span className="text-[#adb2bd]">{activeRoom.architectureNotes}</span>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 pt-6 border-t border-[#f5f4ef]/15 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onOpenInquiry(`Inquiry regarding ${activeRoom.title} scale and installation`)}
                className="w-full sm:w-auto flex-1 py-3 px-4 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[3px_3px_0_#ff67bd] hover:shadow-[5px_5px_0_#ff67bd] cursor-pointer"
              >
                <span>Inquire for Similar Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownloadSpec}
                className="w-full sm:w-auto py-3 px-4 bg-transparent text-[#f5f4ef] hover:text-[#d8ff43] border border-[#f5f4ef]/20 font-sans-grotesk text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedCatalog ? <Check className="w-4 h-4 text-[#d8ff43]" /> : <Sparkles className="w-3.5 h-3.5 text-[#30E6FF]" />}
                <span>{copiedCatalog ? "Spec Copied!" : "Copy Spec"}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
