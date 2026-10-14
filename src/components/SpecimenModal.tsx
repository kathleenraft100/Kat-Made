import { useState, useEffect, useRef } from "react";
import { X, ExternalLink, Sliders, Check, ZoomIn, ZoomOut, Layers, Upload, Image as ImageIcon, Heart, Sparkles, LogIn, ShieldCheck } from "lucide-react";
import { PatternSpecimen } from "../types";
import { useAuth } from "../context/AuthContext";
import { addFavorite, removeFavorite, subscribeToFavorites, FavoriteItem } from "../services/dbService";
import { WatermarkedImage, WatermarkShieldOverlay } from "./WatermarkedImage";

interface SpecimenModalProps {
  specimen: PatternSpecimen | null;
  onClose: () => void;
  onOpenInquiryForSpecimen: (specimen: PatternSpecimen) => void;
  onOpenSandbox: (specimen: PatternSpecimen) => void;
  onUpdateSpecimenImage?: (specimenId: string, newImageUrl: string) => void;
}

export default function SpecimenModal({
  specimen,
  onClose,
  onOpenInquiryForSpecimen,
  onOpenSandbox,
  onUpdateSpecimenImage,
}: SpecimenModalProps) {
  const { user, signInWithGoogle } = useAuth();
  const [selectedColorwayIdx, setSelectedColorwayIdx] = useState(0);
  const [repeatMode, setRepeatMode] = useState<"1x" | "2x" | "4x">("1x");
  const [activeTab, setActiveTab] = useState<"overview" | "substrates" | "specs">("overview");
  const [copiedLink, setCopiedLink] = useState(false);
  const [customUploadActive, setCustomUploadActive] = useState(false);
  const [userFavorites, setUserFavorites] = useState<FavoriteItem[]>([]);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      setUserFavorites([]);
      return;
    }
    const unsub = subscribeToFavorites(user.uid, (favs) => setUserFavorites(favs));
    return () => unsub();
  }, [user]);

  const existingFavorite = specimen ? userFavorites.find((f) => f.patternId === specimen.id) : null;

  const handleToggleFavorite = async () => {
    if (!specimen) return;
    if (!user) {
      await signInWithGoogle();
      return;
    }

    setIsFavoriting(true);
    try {
      if (existingFavorite) {
        await removeFavorite(user.uid, existingFavorite.id);
      } else {
        await addFavorite(user.uid, specimen.id, specimen.title, `${specimen.subtitle} (${specimen.patternType})`);
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    } finally {
      setIsFavoriting(false);
    }
  };

  useEffect(() => {
    setSelectedColorwayIdx(0);
    setRepeatMode("1x");
  }, [specimen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && specimen && onUpdateSpecimenImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        onUpdateSpecimenImage(specimen.id, dataUrl);
        setCustomUploadActive(true);
        setTimeout(() => setCustomUploadActive(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle ESC key to close modal (A11y rule)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!specimen) return null;

  const activeColorway = specimen.colorways[selectedColorwayIdx] || specimen.colorways[0];

  const handleCopySpecs = () => {
    navigator.clipboard.writeText(`${specimen.title} — ${specimen.subtitle} (Kat-Made Hypno Chrome Garden)`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#050505]/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#070707] border-2 border-[#f5f4ef] shadow-[18px_18px_0_#d8ff43] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="h-11 px-4 bg-[#d8ff43] text-[#070707] flex items-center justify-between font-sans-grotesk font-bold text-xs uppercase tracking-wider border-b border-[#070707] shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#070707]" />
            <span>KAT-MADE ARCHIVE SPECIMEN #{specimen.number}</span>
            <span className="opacity-40">/</span>
            <span className="hidden sm:inline-block font-normal">{specimen.categoryLabel}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-[#070707] text-[#d8ff43] px-2 py-0.5">
              COLORWAY: {activeColorway.name}
            </span>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1 hover:bg-[#070707] hover:text-[#d8ff43] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Visual Viewer with Repeat Simulator */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              
              {/* Media Container with Dynamic Repeat, Watermark Shield & Colorway Filter */}
              <div 
                className="relative aspect-square sm:aspect-[4/3] w-full border border-[#f5f4ef]/30 bg-[#111217] overflow-hidden group shadow-inner"
                style={{ backgroundColor: activeColorway.bgHex }}
              >
                {repeatMode === "1x" ? (
                  <WatermarkedImage
                    src={specimen.imageUrl}
                    alt={specimen.title}
                    specimenNumber={specimen.number}
                    watermarkDensity="subtle"
                    badgePosition="bottom-right"
                    className="absolute inset-0 w-full h-full"
                    imgClassName="w-full h-full object-cover transition-all duration-300"
                    imgStyle={{ filter: activeColorway.filterCss }}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <div
                      className="w-full h-full select-none"
                      style={{
                        backgroundImage: `url(${specimen.imageUrl})`,
                        backgroundSize: repeatMode === "2x" ? "50% 50%" : "25% 25%",
                        backgroundRepeat: "repeat",
                        filter: activeColorway.filterCss,
                        userSelect: "none",
                      }}
                    />
                    <WatermarkShieldOverlay density="subtle" specimenNumber={specimen.number} />
                  </div>
                )}

                {/* Reticle guide markings */}
                <div className="absolute inset-4 border border-dashed border-[#f5f4ef]/20 pointer-events-none z-15" />
                <div className="absolute top-2 left-2 text-[9px] font-mono text-[#d8ff43] bg-[#070707]/85 px-1.5 py-0.5 border border-[#d8ff43]/30 z-20 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-[#30E6FF]" />
                  <span>TILES: {repeatMode.toUpperCase()} // WATERMARKED SPECIMEN</span>
                </div>
              </div>

              {/* Viewer Controls: Repeat grid toggle + Sandbox shortcut */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#111217] border border-[#f5f4ef]/15 text-xs font-sans-grotesk">
                <div className="flex items-center gap-2">
                  <span className="text-[#adb2bd] uppercase tracking-wider text-[10px]">Repeat Density:</span>
                  <div className="flex items-center gap-1 bg-[#070707] p-0.5 border border-[#f5f4ef]/10">
                    {(["1x", "2x", "4x"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setRepeatMode(mode)}
                        className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider cursor-pointer ${
                          repeatMode === mode
                            ? "bg-[#d8ff43] text-[#070707]"
                            : "text-[#adb2bd] hover:text-[#f5f4ef]"
                        }`}
                      >
                        {mode === "1x" ? "Single Motif" : `${mode} Repeat`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Custom Pattern button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 bg-[#17191F] hover:bg-[#d8ff43] text-[#f5f4ef] hover:text-[#070707] border border-[#f5f4ef]/20 transition-colors text-[10px] font-mono uppercase font-bold flex items-center gap-1.5 cursor-pointer"
                    title="Upload and test your actual pattern file from your device"
                  >
                    <Upload className="w-3 h-3" />
                    <span>{customUploadActive ? "Custom Pattern Loaded!" : "Swap With Your File"}</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenSandbox(specimen);
                    }}
                    className="text-[#30E6FF] hover:underline flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Sandbox →</span>
                  </button>
                </div>
              </div>

              {/* Colorway Switcher Bar */}
              <div className="p-4 bg-[#111217] border border-[#f5f4ef]/15">
                <div className="text-[10px] font-sans-grotesk text-[#adb2bd] uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Available Architectural Colorways</span>
                  <span className="text-[#d8ff43] font-bold">{specimen.colorways.length} Finishes</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {specimen.colorways.map((cw, idx) => (
                    <button
                      key={cw.name}
                      onClick={() => setSelectedColorwayIdx(idx)}
                      className={`p-2 text-left border cursor-pointer transition-all ${
                        selectedColorwayIdx === idx
                          ? "border-[#d8ff43] bg-[#070707] shadow-[2px_2px_0_#d8ff43]"
                          : "border-[#f5f4ef]/15 bg-[#17191F] hover:border-[#f5f4ef]/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-3 h-3 rounded-full border border-[#f5f4ef]/40 shrink-0"
                          style={{ backgroundColor: cw.bgHex }}
                        />
                        <span className="text-[11px] font-sans-grotesk font-bold text-[#f5f4ef] truncate">
                          {cw.name}
                        </span>
                      </div>
                      <div className="text-[9px] font-mono text-[#adb2bd]">
                        {selectedColorwayIdx === idx ? "ACTIVE PREVIEW" : "SELECT"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Specimen Information & Ordering */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              <div>
                {/* Clean unboxed category kicker */}
                <div className="flex items-center gap-2 text-xs font-sans-grotesk text-[#d8ff43] uppercase tracking-wider font-semibold">
                  <span>SPECIMEN #{specimen.number}</span>
                  <span className="text-[#adb2bd]">·</span>
                  <span>{specimen.patternType}</span>
                </div>

                <h3 className="mt-2 text-3xl sm:text-4xl font-serif-display font-bold text-[#f5f4ef]">
                  {specimen.title}
                </h3>
                <p className="text-xs text-[#adb2bd] font-mono mt-1">
                  {specimen.subtitle}
                </p>

                {/* Sub-tab switcher */}
                <div className="mt-6 flex items-center gap-2 border-b border-[#f5f4ef]/20 pb-2">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`text-xs font-sans-grotesk uppercase tracking-wider font-bold pb-1 cursor-pointer ${
                      activeTab === "overview"
                        ? "text-[#d8ff43] border-b-2 border-[#d8ff43]"
                        : "text-[#adb2bd] hover:text-[#f5f4ef]"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("substrates")}
                    className={`text-xs font-sans-grotesk uppercase tracking-wider font-bold pb-1 cursor-pointer ${
                      activeTab === "substrates"
                        ? "text-[#d8ff43] border-b-2 border-[#d8ff43]"
                        : "text-[#adb2bd] hover:text-[#f5f4ef]"
                    }`}
                  >
                    Substrates & Prints
                  </button>
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`text-xs font-sans-grotesk uppercase tracking-wider font-bold pb-1 cursor-pointer ${
                      activeTab === "specs"
                        ? "text-[#d8ff43] border-b-2 border-[#d8ff43]"
                        : "text-[#adb2bd] hover:text-[#f5f4ef]"
                    }`}
                  >
                    Technical Specs
                  </button>
                </div>

                {/* Tab 1: Overview */}
                {activeTab === "overview" && (
                  <div className="mt-5 space-y-4 text-xs font-sans-grotesk leading-relaxed text-[#adb2bd]">
                    <p>{specimen.description}</p>
                    <div className="p-3 bg-[#111217] border-l-2 border-[#ff67bd]">
                      <span className="text-[10px] text-[#ff67bd] uppercase tracking-widest font-bold block mb-1">
                        Curator's Note
                      </span>
                      Designed with mathematical botanical curves that eliminate repeating seam fatigue in large hospitality hallways and ceiling vaults.
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#f5f4ef] block mb-1.5 font-bold">
                        Botanical Tags
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {specimen.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] text-[#f5f4ef] bg-[#17191F] px-2 py-0.5 border border-[#f5f4ef]/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Substrates */}
                {activeTab === "substrates" && (
                  <div className="mt-5 space-y-3 font-sans-grotesk">
                    <div className="p-3 bg-[#111217] border border-[#f5f4ef]/15">
                      <div className="flex items-center justify-between text-xs font-bold text-[#f5f4ef]">
                        <span>DISPLATE METAL POSTERS</span>
                        <span className="text-[#d8ff43] text-[10px]">READY TO SHIP</span>
                      </div>
                      <p className="mt-1 text-xs text-[#adb2bd]">
                        Available in Medium (45×32cm), Large (67.5×48cm), and XL 4-panel sets. Magnet mounted with zero wall damage.
                      </p>
                      <a
                        href="https://displate.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#d8ff43] font-bold hover:underline"
                      >
                        <span>Shop on Displate</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="p-3 bg-[#111217] border border-[#f5f4ef]/15">
                      <div className="flex items-center justify-between text-xs font-bold text-[#f5f4ef]">
                        <span>CONTRADO FABRIC & SILKS</span>
                        <span className="text-[#ff67bd] text-[10px]">MADE IN LONDON</span>
                      </div>
                      <p className="mt-1 text-xs text-[#adb2bd]">
                        100% pure Mulberry silk twill, chiffon, and heavy upholstery velvet printed with eco-friendly reactive inks.
                      </p>
                      <a
                        href="https://www.contrado.co.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#ff67bd] font-bold hover:underline"
                      >
                        <span>Order Silks on Contrado</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Tab 3: Technical Specs */}
                {activeTab === "specs" && (
                  <div className="mt-5 space-y-2 text-xs font-sans-grotesk text-[#adb2bd]">
                    <div className="flex justify-between py-1.5 border-b border-[#f5f4ef]/10">
                      <span>Collection Role</span>
                      <span className="font-mono text-[#d8ff43]">{specimen.collectionRole}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#f5f4ef]/10">
                      <span>Master Resolution</span>
                      <span className="font-mono text-[#f5f4ef]">{specimen.resolutionMaster}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#f5f4ef]/10">
                      <span>Asset Record Date</span>
                      <span className="font-mono text-[#f5f4ef]">{specimen.generationDate}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#f5f4ef]/10">
                      <span>Target Repeat Modes</span>
                      <span className="font-mono text-[#f5f4ef]">{specimen.patternType}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#f5f4ef]/10">
                      <span>Marketplace Destinations</span>
                      <span className="font-mono text-[#30E6FF]">Spoonflower / Displate / Contrado</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#f5f4ef]/10">
                      <span>Commercial Licensable</span>
                      <span className="font-mono text-[#d8ff43]">Yes (Single or Multi-Unit)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-8 pt-5 border-t border-[#f5f4ef]/20 flex flex-col gap-3">
                {/* Cloud Vault Bookmark Button */}
                <button
                  onClick={handleToggleFavorite}
                  disabled={isFavoriting}
                  className={`w-full py-3 px-4 font-sans-grotesk font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    existingFavorite
                      ? "bg-pink-950/80 border-pink-500 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                      : "bg-[#17191F] hover:bg-[#20232c] border-[#f5f4ef]/25 text-[#f5f4ef] hover:border-pink-500/60"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${existingFavorite ? "fill-pink-500 text-pink-500" : "text-pink-400"}`} />
                  <span>
                    {existingFavorite
                      ? "Saved in Your Firestore Vault (Favorited)"
                      : user
                      ? "Bookmark Specimen to Cloud Vault"
                      : "Sign In to Save Specimen to Cloud Vault"}
                  </span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenInquiryForSpecimen(specimen);
                  }}
                  className="w-full py-3.5 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#d8ff43] shadow-[4px_4px_0_#ff67bd] hover:shadow-[6px_6px_0_#ff67bd] cursor-pointer"
                >
                  <span>Request Custom Scale / Trade Quote</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={specimen.displateUrl || "https://displate.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-[#17191F] hover:bg-[#252833] text-[#f5f4ef] text-center font-sans-grotesk text-xs uppercase tracking-wider border border-[#f5f4ef]/20 flex items-center justify-center gap-1.5"
                  >
                    <span>Displate Metal</span>
                    <ExternalLink className="w-3 h-3 text-[#d8ff43]" />
                  </a>

                  <a
                    href={specimen.contradoUrl || "https://www.contrado.co.uk"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-[#17191F] hover:bg-[#252833] text-[#f5f4ef] text-center font-sans-grotesk text-xs uppercase tracking-wider border border-[#f5f4ef]/20 flex items-center justify-center gap-1.5"
                  >
                    <span>Contrado Silk</span>
                    <ExternalLink className="w-3 h-3 text-[#ff67bd]" />
                  </a>
                </div>

                <button
                  onClick={handleCopySpecs}
                  className="text-center text-[11px] font-sans-grotesk text-[#adb2bd] hover:text-[#f5f4ef] transition-colors cursor-pointer py-1"
                >
                  {copiedLink ? <span className="text-[#d8ff43]">✓ Specimen details copied to clipboard</span> : "Copy Specimen Reference ID"}
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
