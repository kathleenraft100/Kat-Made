interface KatMadeLogoProps {
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function KatMadeLogo({ size = 32, className = "", animate = false }: KatMadeLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${animate ? "hover:scale-105" : ""} ${className}`}
      aria-label="KAT-MADE Logo"
    >
      {/* Outer reticle crosshairs (lime #d8ff43) */}
      <line x1="50" y1="4" x2="50" y2="18" stroke="#d8ff43" strokeWidth="2.8" strokeLinecap="square" />
      <line x1="50" y1="82" x2="50" y2="96" stroke="#d8ff43" strokeWidth="2.8" strokeLinecap="square" />
      <line x1="4" y1="50" x2="18" y2="50" stroke="#d8ff43" strokeWidth="2.8" strokeLinecap="square" />
      <line x1="82" y1="50" x2="96" y2="50" stroke="#d8ff43" strokeWidth="2.8" strokeLinecap="square" />

      {/* Outer circle (lime #d8ff43) */}
      <circle cx="50" cy="50" r="32" stroke="#d8ff43" strokeWidth="2.8" />

      {/* Diamond shape (electric cyan #30E6FF) */}
      <polygon points="50,18 69,50 50,82 31,50" stroke="#30E6FF" strokeWidth="2.8" fill="none" />

      {/* Eye almond contour (hot pink #ff67bd) */}
      <path
        d="M 19 50 C 28 32, 72 32, 81 50 C 72 68, 28 68, 19 50 Z"
        stroke="#ff67bd"
        strokeWidth="2.8"
        fill="none"
      />

      {/* Center pupil (paper white #F3F0E8) */}
      <circle cx="50" cy="50" r="4.8" fill="#F3F0E8" />
    </svg>
  );
}
