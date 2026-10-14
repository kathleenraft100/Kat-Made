import { useState, useRef } from "react";
import { X, Upload, Check, Lock, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { PatternSpecimen } from "../types";
import { savePatternLocally, syncPatternToServer } from "../utils/patternStorage";
import { WatermarkedImage } from "./WatermarkedImage";

interface PatternManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  specimens: PatternSpecimen[];
  onUpdateSpecimenImage: (specimenId: string, newImageUrl: string) => void;
}

export default function PatternManagerModal({
  isOpen,
  onClose,
  specimens,
  onUpdateSpecimenImage,
}: PatternManagerModalProps) {
  const [lockedStatus, setLockedStatus] = useState<Record<string, boolean>>({});
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const [allFinalized, setAllFinalized] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSlotClick = (specimenId: string) => {
    setActiveUploadId(specimenId);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadId) {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        
        // 1. Update React state immediately
        onUpdateSpecimenImage(activeUploadId, dataUrl);

        // 2. Save to browser IndexedDB
        await savePatternLocally(activeUploadId, dataUrl, file.name);

        // 3. Sync to disk via backend endpoint
        await syncPatternToServer(activeUploadId, dataUrl);

        // Mark as locked
        setLockedStatus((prev) => ({ ...prev, [activeUploadId]: true }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalizeAll = () => {
    const updatedStatus: Record<string, boolean> = {};
    specimens.forEach((sp) => {
      updatedStatus[sp.id] = true;
    });
    setLockedStatus(updatedStatus);
    setAllFinalized(true);
    setTimeout(() => setAllFinalized(false), 3500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hypno Chrome Garden Pattern Manager"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#050505]/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#070707] border-2 border-[#d8ff43] shadow-[18px_18px_0_#ff67bd] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hidden global file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Modal Top Bar */}
        <div className="h-12 px-5 bg-[#d8ff43] text-[#070707] flex items-center justify-between font-sans-grotesk font-bold text-xs uppercase tracking-wider border-b border-[#070707] shrink-0">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#070707]" />
            <span>HYPNO CHROME GARDEN // PATTERN LOCKER & ASSET REGISTER</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-[#070707] text-[#d8ff43] px-2 py-0.5 font-mono">
              10/10 SLOTS REGISTERED
            </span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-1 hover:bg-[#070707] hover:text-[#d8ff43] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Header Explainer */}
        <div className="p-5 bg-[#111217] border-b border-[#f5f4ef]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-serif-display font-bold text-[#f5f4ef]">
              Lock In Your 10 Official Patterns
            </h3>
            <p className="mt-1 text-xs text-[#adb2bd] font-sans-grotesk max-w-xl">
              All 10 slots are named and indexed according to your official 2026-10-05 register. Files uploaded here are automatically saved to permanent browser storage and synced to the project.
            </p>
          </div>

          <button
            onClick={handleFinalizeAll}
            className="px-5 py-2.5 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0_#ff67bd] hover:shadow-[5px_5px_0_#ff67bd] cursor-pointer flex items-center gap-2 shrink-0"
          >
            {allFinalized ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>{allFinalized ? "All 10 Locked & Finalized!" : "Lock & Finalize All 10"}</span>
          </button>
        </div>

        {/* List of all 10 patterns with upload & lock buttons */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {specimens.map((sp) => {
              const isLocked = lockedStatus[sp.id] || allFinalized;

              return (
                <div
                  key={sp.id}
                  className="p-3.5 bg-[#0e1014] border border-[#f5f4ef]/15 hover:border-[#d8ff43] transition-all flex items-center justify-between gap-3 group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#000] border border-[#f5f4ef]/20 shrink-0 overflow-hidden">
                    <WatermarkedImage
                      src={sp.imageUrl}
                      alt={sp.title}
                      watermarkDensity="subtle"
                      badgePosition="none"
                      className="absolute inset-0 w-full h-full"
                      imgClassName="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 left-1 bg-[#d8ff43] text-[#070707] font-mono text-[9px] font-bold px-1 py-0.2 z-20">
                      #{sp.number}
                    </span>
                  </div>

                  {/* Pattern Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono text-[#d8ff43] uppercase tracking-wider truncate">
                      {sp.collectionRole}
                    </div>
                    <div className="text-sm sm:text-base font-serif-display font-bold text-[#f5f4ef] truncate">
                      {sp.title}
                    </div>
                    <div className="text-[10px] text-[#adb2bd] font-sans-grotesk truncate mt-0.5">
                      {sp.dimensions} · 300 DPI
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 text-[9px] font-mono text-[#30E6FF]">
                      <ShieldCheck className="w-3 h-3 text-[#d8ff43]" />
                      <span>{isLocked ? "SAVED & LOCKED ✓" : "READY TO LOCK"}</span>
                    </div>
                  </div>

                  {/* Upload / Lock Action */}
                  <div className="shrink-0 flex flex-col gap-1.5">
                    <button
                      onClick={() => handleSlotClick(sp.id)}
                      className="px-3 py-1.5 bg-[#17191F] hover:bg-[#d8ff43] text-[#f5f4ef] hover:text-[#070707] border border-[#f5f4ef]/20 text-[10px] font-mono uppercase font-bold flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload File</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#111217] border-t border-[#f5f4ef]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans-grotesk text-[#adb2bd]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d8ff43]" />
            <span>
              All uploads are locked to high-performance local storage (IndexedDB) and can be tiled seamlessly in the Sandbox.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#d8ff43] text-[#070707] font-sans-grotesk font-bold text-xs uppercase cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
