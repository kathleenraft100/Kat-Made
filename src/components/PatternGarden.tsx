import { useState, useMemo } from "react";
import { Eye, Sliders, Sparkles, Search, Layers, ShieldCheck } from "lucide-react";
import { PatternSpecimen, SpecimenCategory } from "../types";
import { WatermarkedImage } from "./WatermarkedImage";

interface PatternGardenProps {
  specimens: PatternSpecimen[];
  onSelectSpecimen: (specimen: PatternSpecimen) => void;
  onOpenSandboxWithSpecimen: (specimen: PatternSpecimen) => void;
}

export default function PatternGarden({
  specimens,
  onSelectSpecimen,
  onOpenSandboxWithSpecimen,
}: PatternGardenProps) {
  const [selectedCategory, setSelectedCategory] = useState<SpecimenCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: { key: SpecimenCategory; label: string }[] = [
    { key: "all", label: "All 10 Patterns" },
    { key: "hero", label: "Hero Statement (A/B)" },
    { key: "secondary", label: "Secondary Tunnels (A/B/C)" },
    { key: "blender", label: "Blenders & Waves (A/B/C)" },
    { key: "wild-micro", label: "Wild Card & Micro" },
  ];

  const filteredSpecimens = useMemo(() => {
    return specimens.filter((specimen) => {
      const matchesCategory =
        selectedCategory === "all" || specimen.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        specimen.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        specimen.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [specimens, selectedCategory, searchQuery]);

  return (
    <section id="specimens" className="py-24 border-b border-[#f5f4ef]/20 bg-[#111217]/85 backdrop-blur-[2px]">
      <div className="max-w-[1440px] mx-auto px-[4vw]">
        
        {/* Section Heading & Category Filter Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#f5f4ef]/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans-grotesk tracking-widest uppercase text-[#d8ff43]">
              <span className="w-6 h-px bg-[#d8ff43]" />
              <span>COLLECTION ARCHIVE</span>
              <span className="text-[#adb2bd]">/</span>
              <span className="text-[#ff67bd]">{specimens.length} ACTIVE SPECIMENS</span>
            </div>
            <h2 className="mt-4 text-4xl sm:text-6xl font-serif-display font-bold uppercase tracking-tight text-[#f5f4ef]">
              THE HYPNO <span className="text-[#ff67bd] italic font-normal">GARDEN</span>
            </h2>
            <p className="mt-3 text-sm text-[#adb2bd] font-sans-grotesk max-w-lg">
              Botanical vectors engineered for large-format architectural surfaces, luxury wallcoverings, and limited fine art prints.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#111217] border border-[#f5f4ef]/20 text-[10px] font-mono text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#30E6FF]" />
              <span>KAT-MADE PROTECTED ASSETS · WATERMARK EMBEDDED · RIGHT-CLICK SAVING DISABLED</span>
            </div>
          </div>

          {/* Interactive Search + Category Buttons */}
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#adb2bd] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by botanical name or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-72 pl-9 pr-3 py-2 bg-[#050505] border border-[#f5f4ef]/20 text-xs font-sans-grotesk text-[#f5f4ef] placeholder-[#adb2bd]/50 focus:border-[#d8ff43] focus:outline-none"
              />
            </div>

            {/* Segmented filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#050505] border border-[#f5f4ef]/15 rounded-sm">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3 py-1.5 text-[11px] font-sans-grotesk tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "bg-[#d8ff43] text-[#070707] font-bold"
                        : "text-[#adb2bd] hover:text-[#f5f4ef]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Specimen Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpecimens.map((specimen) => (
            <article
              key={specimen.id}
              className="group flex flex-col bg-[#050505] border border-[#f5f4ef]/25 hover:border-[#d8ff43] transition-all duration-300 shadow-[6px_6px_0_#17191F] hover:shadow-[8px_8px_0_#d8ff43] hover:-translate-y-1"
            >
              {/* Media Visual with Shimmer & Number Stamp */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#070707] shimmer-scan">
                <WatermarkedImage
                  src={specimen.imageUrl}
                  alt={specimen.title}
                  specimenNumber={specimen.number}
                  watermarkDensity="subtle"
                  badgePosition="bottom-right"
                  imgClassName="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  className="absolute inset-0 w-full h-full"
                />

                {/* Number Badge */}
                <div className="absolute top-3 left-3 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs px-2.5 py-1 border border-[#070707] shadow-[2px_2px_0_#070707] z-20">
                  #{specimen.number}
                </div>

                {/* Substrate quick stamp */}
                <div className="absolute top-3 right-3 bg-[#111217]/90 text-[#f5f4ef] font-sans-grotesk text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#f5f4ef]/20 z-20">
                  {specimen.patternType}
                </div>

                {/* Hover overlay with action buttons */}
                <div className="absolute inset-0 bg-[#070707]/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4 z-30">
                  <button
                    onClick={() => onSelectSpecimen(specimen)}
                    className="w-full max-w-[200px] py-2.5 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0_#ff67bd]"
                  >
                    <Eye className="w-4 h-4" />
                    Inspect Details
                  </button>

                  <button
                    onClick={() => onOpenSandboxWithSpecimen(specimen)}
                    className="w-full max-w-[200px] py-2 bg-[#17191F] text-[#f5f4ef] hover:text-[#30E6FF] border border-[#f5f4ef]/20 font-sans-grotesk text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sliders className="w-4 h-4 text-[#30E6FF]" />
                    Test in Sandbox
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#adb2bd] uppercase tracking-wider">
                    <span className="text-[#d8ff43] font-bold">{specimen.collectionRole}</span>
                    <span>·</span>
                    <span>{specimen.resolutionMaster}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-2xl font-serif-display font-bold text-[#f5f4ef] group-hover:text-[#d8ff43] transition-colors">
                    {specimen.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs text-[#adb2bd] font-sans-grotesk line-clamp-2 leading-relaxed">
                    {specimen.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#f5f4ef]/10 flex items-center justify-between">
                  {/* Palette dots */}
                  <div className="flex items-center gap-1.5" title="Palette swatches">
                    {specimen.hexColors.map((color, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-[#f5f4ef]/30"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <span className="ml-1 text-[10px] text-[#adb2bd] font-mono">
                      {specimen.colorways.length} Colorways
                    </span>
                  </div>

                  {/* Trigger to modal */}
                  <button
                    onClick={() => onSelectSpecimen(specimen)}
                    className="text-xs font-sans-grotesk uppercase tracking-wider font-bold text-[#d8ff43] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#ff67bd]" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state when filtering */}
        {filteredSpecimens.length === 0 && (
          <div className="mt-12 p-12 border border-[#f5f4ef]/20 bg-[#050505] text-center">
            <Layers className="w-8 h-8 text-[#d8ff43] mx-auto mb-3 opacity-60" />
            <h3 className="text-xl font-serif-display text-[#f5f4ef]">No specimens match "{searchQuery}"</h3>
            <p className="text-xs text-[#adb2bd] mt-1 font-sans-grotesk">
              Try adjusting your search query or selecting "All Specimens".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-[#d8ff43] text-[#070707] text-xs font-sans-grotesk font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
