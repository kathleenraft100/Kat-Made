import { useEffect, useRef, useState } from "react";
import { Sparkles, Play, Pause, Palette } from "lucide-react";

interface HypnoWaveBackgroundProps {
  opacity?: number;
}

export default function HypnoWaveBackground({ opacity = 0.45 }: HypnoWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [colorMode, setColorMode] = useState<"kat-palette" | "rainbow">("kat-palette");
  const [intensity, setIntensity] = useState<"subtle" | "vivid">("vivid");
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Kat-Made Brand Palette Color stops
    const katColors = [
      { r: 216, g: 255, b: 67 },   // Lime #d8ff43
      { r: 48,  g: 230, b: 255 },  // Cyan #30E6FF
      { r: 255, g: 103, b: 189 },  // Hot Pink #ff67bd
      { r: 154, g: 92,  b: 255 },  // Violet #9A5CFF
      { r: 255, g: 173, b: 88 },   // Gold/Orange #ffad58
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Color interpolator
    const getColor = (t: number, phase: number) => {
      if (colorMode === "rainbow") {
        const hue = ((t * 40 + phase * 360) % 360);
        return `hsla(${hue}, 95%, 65%, `;
      }

      const totalColors = katColors.length;
      const normalizedPhase = ((t * 0.35 + phase) % 1 + 1) % 1;
      const index = Math.floor(normalizedPhase * totalColors);
      const nextIndex = (index + 1) % totalColors;
      const factor = (normalizedPhase * totalColors) - index;

      const c1 = katColors[index];
      const c2 = katColors[nextIndex];

      const r = Math.round(c1.r + (c2.r - c1.r) * factor);
      const g = Math.round(c1.g + (c2.g - c1.g) * factor);
      const b = Math.round(c1.b + (c2.b - c1.b) * factor);

      return `rgba(${r}, ${g}, ${b}, `;
    };

    const render = () => {
      if (isPlaying) {
        time += 0.024;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const spacing = window.innerWidth < 768 ? 32 : 40;
      const cols = Math.ceil(window.innerWidth / spacing) + 1;
      const rows = Math.ceil(window.innerHeight / spacing) + 1;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Global breathing scale factor (simulates inhale / exhale breathing motion)
      const breathingWave = Math.sin(time * 0.8) * 0.5 + 0.5; // 0 to 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          // Distance from screen center for radial wave propagation
          const dx = x - centerX;
          const dy = y - centerY;
          const distFromCenter = Math.sqrt(dx * dx + dy * dy);

          // Diagonal traveling wave + radial breathing wave
          const wave1 = Math.sin(distFromCenter * 0.012 - time * 1.4);
          const wave2 = Math.cos((x * 0.01 + y * 0.01) - time * 0.9);
          const compoundWave = (wave1 + wave2) * 0.5; // -1 to 1

          // Mouse proximity wave distortion
          let mouseInfluence = 0;
          if (mouseRef.current.active) {
            const mdx = x - mouseRef.current.x;
            const mdy = y - mouseRef.current.y;
            const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mouseDist < 280) {
              mouseInfluence = Math.cos((mouseDist / 280) * (Math.PI / 2)) * 1.4;
            }
          }

          // Compute pulsating dot radius (breathing from tiny point to glowing orb)
          const baseRadius = intensity === "vivid" ? 1.6 : 1.2;
          const maxRadiusDelta = intensity === "vivid" ? 4.2 : 2.6;
          const normalizedHeight = (compoundWave + 1) * 0.5; // 0 to 1
          
          // Size formula integrating global breath + traveling wave + mouse
          const currentRadius = Math.max(
            0.6,
            baseRadius + (normalizedHeight * 0.7 + breathingWave * 0.3 + mouseInfluence * 0.5) * maxRadiusDelta
          );

          // Alpha fade and color phase based on coordinate
          const colorPhase = (distFromCenter * 0.0015 + (x + y) * 0.0008) % 1;
          const colorPrefix = getColor(time, colorPhase);
          const dotAlpha = (0.2 + normalizedHeight * 0.55 + mouseInfluence * 0.3) * opacity;

          // Draw the breathing dot
          ctx.beginPath();
          ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = `${colorPrefix}${dotAlpha})`;
          ctx.fill();

          // Draw an ethereal specular core on peak breathing dots
          if (currentRadius > 3.4 && intensity === "vivid") {
            ctx.beginPath();
            ctx.arc(x, y, currentRadius * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, dotAlpha * 1.8)})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isPlaying, colorMode, intensity, opacity]);

  return (
    <>
      {/* Background canvas container fixed behind entire site */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Floating Ambient HUD / Controller Widget */}
      <aside aria-label="Breathing wave controls" className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-1.5 p-1.5 bg-[#070707]/90 backdrop-blur-md border border-[#d8ff43]/30 text-[#f5f4ef] text-[10px] font-mono shadow-[4px_4px_0_#070707]">
        <div className="flex items-center gap-1.5 px-2 py-0.5 text-[#d8ff43]">
          <span className={`w-2 h-2 rounded-full bg-[#d8ff43] ${isPlaying ? "animate-ping" : "opacity-40"}`} />
          <span className="font-bold">BREATHING MATRIX</span>
        </div>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-1 hover:bg-[#111217] text-[#adb2bd] hover:text-[#f5f4ef] cursor-pointer"
          title={isPlaying ? "Pause Wave" : "Resume Wave"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#d8ff43]" />}
        </button>

        {/* Color Palette Toggle: Kat-Made Neons vs Rainbow */}
        <button
          onClick={() => setColorMode(colorMode === "kat-palette" ? "rainbow" : "kat-palette")}
          className="px-2 py-1 bg-[#111217] hover:bg-[#20222a] text-[#adb2bd] hover:text-[#30E6FF] border border-[#f5f4ef]/10 flex items-center gap-1 cursor-pointer"
          title="Toggle color scheme: Kat-Made Palette or Prismatic Rainbow"
        >
          <Palette className="w-3 h-3 text-[#ff67bd]" />
          <span>{colorMode === "kat-palette" ? "KAT NEONS" : "RAINBOW"}</span>
        </button>

        {/* Intensity Toggle: Vivid vs Subtle */}
        <button
          onClick={() => setIntensity(intensity === "vivid" ? "subtle" : "vivid")}
          className="px-2 py-1 bg-[#111217] hover:bg-[#20222a] text-[#adb2bd] hover:text-[#d8ff43] border border-[#f5f4ef]/10 cursor-pointer"
          title="Toggle wave amplitude intensity"
        >
          <span>{intensity === "vivid" ? "VIVID" : "SUBTLE"}</span>
        </button>
      </aside>
    </>
  );
}
