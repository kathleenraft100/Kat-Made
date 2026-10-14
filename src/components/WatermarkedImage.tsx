import React, { useState } from 'react';
import { ShieldAlert, Sparkles, Lock } from 'lucide-react';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  watermarkDensity?: 'subtle' | 'medium' | 'prominent';
  badgePosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'none';
  specimenNumber?: string;
  onClick?: () => void;
  priority?: boolean;
}

export const WatermarkedImage: React.FC<WatermarkedImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  style,
  imgStyle,
  watermarkDensity = 'subtle',
  badgePosition = 'bottom-right',
  specimenNumber,
  onClick,
}) => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningTimeout, setWarningTimeout] = useState<any>(null);

  const handleBlockedAction = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (warningTimeout) {
      clearTimeout(warningTimeout);
    }
    setShowWarning(true);
    const t = setTimeout(() => setShowWarning(false), 3200);
    setWarningTimeout(t);
  };

  // Determine opacity & blend based on density
  const opacityClass =
    watermarkDensity === 'prominent'
      ? 'opacity-40'
      : watermarkDensity === 'medium'
      ? 'opacity-28'
      : 'opacity-20';

  return (
    <div
      className={`relative overflow-hidden select-none group/protect ${className}`}
      style={style}
      onContextMenu={handleBlockedAction}
      onDragStart={handleBlockedAction}
      onClick={onClick}
    >
      {/* 1. Underlying Image Element (Non-draggable, protected) */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover pointer-events-none select-none transition-transform duration-700 ${imgClassName}`}
        style={{
          ...imgStyle,
          userSelect: 'none',
        }}
      />

      {/* 2. Transparent Security Barrier (Shields direct image right-clicks) */}
      <div
        className="absolute inset-0 z-10 cursor-pointer"
        onContextMenu={handleBlockedAction}
      />

      {/* 3. Subtle Repeating Diagonal Watermark Grid */}
      <div
        className={`absolute inset-0 pointer-events-none z-15 ${opacityClass} mix-blend-overlay flex flex-col justify-around overflow-hidden`}
        aria-hidden="true"
      >
        <div className="w-[160%] -ml-[30%] -rotate-12 flex flex-col gap-8 tracking-widest text-[10px] sm:text-xs font-mono font-bold text-white uppercase select-none">
          <div className="whitespace-nowrap flex gap-8 animate-none">
            <span>KAT-MADE © PROPRIETARY ARTWORK</span>
            <span>•</span>
            <span>DO NOT REPLICATE</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
            <span>•</span>
            <span>KAT-MADE STUDIO</span>
            <span>•</span>
            <span>PROTECTED SPECIMEN</span>
          </div>
          <div className="whitespace-nowrap flex gap-8 ml-12">
            <span>PROPRIETARY CHROMASCAPE</span>
            <span>•</span>
            <span>KAT-MADE © 2026</span>
            <span>•</span>
            <span>COMMERCIAL LICENSE REQUIRED</span>
            <span>•</span>
            <span>DO NOT COPY</span>
          </div>
          <div className="whitespace-nowrap flex gap-8 -ml-6">
            <span>KAT-MADE © PROPRIETARY ARTWORK</span>
            <span>•</span>
            <span>DO NOT REPLICATE</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
            <span>•</span>
            <span>KAT-MADE STUDIO</span>
          </div>
          <div className="whitespace-nowrap flex gap-8 ml-8">
            <span>PROTECTED PATTERN ASSET</span>
            <span>•</span>
            <span>KAT-MADE © 2026</span>
            <span>•</span>
            <span>ARCHIVAL WATERMARKED</span>
            <span>•</span>
            <span>DO NOT DISTRIBUTE</span>
          </div>
        </div>
      </div>

      {/* 4. Sleek Corner Security Seal */}
      {badgePosition !== 'none' && (
        <div
          className={`absolute z-15 pointer-events-none ${
            badgePosition === 'bottom-right'
              ? 'bottom-2.5 right-2.5'
              : badgePosition === 'bottom-left'
              ? 'bottom-2.5 left-2.5'
              : 'top-2.5 right-2.5'
          }`}
        >
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#050505]/75 backdrop-blur-md border border-white/20 text-[9px] font-mono text-[#d8ff43] tracking-widest uppercase shadow-md select-none">
            <Lock className="w-2.5 h-2.5 text-[#ff67bd]" />
            <span>KAT-MADE ARCHIVE {specimenNumber ? `· #${specimenNumber}` : ''}</span>
          </div>
        </div>
      )}

      {/* 5. Elegant Copyright Protection Notification Toast on Right-Click Attempt */}
      {showWarning && (
        <div className="absolute inset-x-2 bottom-3 z-30 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
          <div className="mx-auto max-w-sm bg-[#070707]/95 border-2 border-[#ff67bd] text-white p-3 shadow-[0_0_25px_rgba(255,103,189,0.5)] backdrop-blur-lg flex items-center gap-3">
            <div className="p-2 bg-[#ff67bd]/20 border border-[#ff67bd]/40 rounded text-[#ff67bd] shrink-0">
              <ShieldAlert className="w-4 h-4 animate-bounce" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[11px] font-sans-grotesk font-bold uppercase tracking-wider text-[#d8ff43] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#ff67bd]" />
                Artwork Protected
              </p>
              <p className="text-[10px] text-zinc-300 font-sans leading-tight mt-0.5">
                Kat-Made images are proprietary and watermarked. Direct saving is restricted. Contact studio for unwatermarked licensing.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const WatermarkShieldOverlay: React.FC<{
  density?: 'subtle' | 'medium' | 'prominent';
  specimenNumber?: string;
}> = ({ density = 'subtle', specimenNumber }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [warningTimeout, setWarningTimeout] = useState<any>(null);

  const handleBlockedAction = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (warningTimeout) {
      clearTimeout(warningTimeout);
    }
    setShowWarning(true);
    const t = setTimeout(() => setShowWarning(false), 3200);
    setWarningTimeout(t);
  };

  const opacityClass =
    density === 'prominent'
      ? 'opacity-40'
      : density === 'medium'
      ? 'opacity-28'
      : 'opacity-20';

  return (
    <>
      {/* Invisible interceptor */}
      <div
        className="absolute inset-0 z-20"
        onContextMenu={handleBlockedAction}
        onDragStart={handleBlockedAction}
      />

      {/* Repeating Diagonal Watermark Grid */}
      <div
        className={`absolute inset-0 pointer-events-none z-15 ${opacityClass} mix-blend-overlay flex flex-col justify-around overflow-hidden`}
        aria-hidden="true"
      >
        <div className="w-[160%] -ml-[30%] -rotate-12 flex flex-col gap-8 tracking-widest text-[10px] sm:text-xs font-mono font-bold text-white uppercase select-none">
          <div className="whitespace-nowrap flex gap-8">
            <span>KAT-MADE © PROPRIETARY ARTWORK</span>
            <span>•</span>
            <span>DO NOT REPLICATE</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
            <span>•</span>
            <span>KAT-MADE STUDIO</span>
          </div>
          <div className="whitespace-nowrap flex gap-8 ml-12">
            <span>PROPRIETARY CHROMASCAPE</span>
            <span>•</span>
            <span>KAT-MADE © 2026</span>
            <span>•</span>
            <span>COMMERCIAL LICENSE REQUIRED</span>
          </div>
          <div className="whitespace-nowrap flex gap-8 -ml-6">
            <span>KAT-MADE © PROPRIETARY ARTWORK</span>
            <span>•</span>
            <span>DO NOT REPLICATE</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>

      {/* Security Seal */}
      <div className="absolute bottom-2.5 right-2.5 z-15 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#050505]/75 backdrop-blur-md border border-white/20 text-[9px] font-mono text-[#d8ff43] tracking-widest uppercase shadow-md select-none">
          <Lock className="w-2.5 h-2.5 text-[#ff67bd]" />
          <span>KAT-MADE ARCHIVE {specimenNumber ? `· #${specimenNumber}` : ''}</span>
        </div>
      </div>

      {/* Warning Toast */}
      {showWarning && (
        <div className="absolute inset-x-2 bottom-3 z-30 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
          <div className="mx-auto max-w-sm bg-[#070707]/95 border-2 border-[#ff67bd] text-white p-3 shadow-[0_0_25px_rgba(255,103,189,0.5)] backdrop-blur-lg flex items-center gap-3">
            <div className="p-2 bg-[#ff67bd]/20 border border-[#ff67bd]/40 rounded text-[#ff67bd] shrink-0">
              <ShieldAlert className="w-4 h-4 animate-bounce" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-[11px] font-sans-grotesk font-bold uppercase tracking-wider text-[#d8ff43] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#ff67bd]" />
                Artwork Protected
              </p>
              <p className="text-[10px] text-zinc-300 font-sans leading-tight mt-0.5">
                Kat-Made images are proprietary and watermarked. Direct saving is restricted. Contact studio for unwatermarked licensing.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
