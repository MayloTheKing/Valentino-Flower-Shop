import React from "react";

interface ProceduralFlowerProps {
  species: "rose" | "tulip" | "hybrid" | "orchid";
  petalCount: number;
  symmetry: number; // 0.5 to 1.0
  glowness: number; // 0.1 to 1.0
  hue: string; // Hex color
  className?: string;
  isSpinning?: boolean;
}

export default function ProceduralFlower({
  species,
  petalCount,
  symmetry,
  glowness,
  hue,
  className = "",
  isSpinning = false,
}: ProceduralFlowerProps) {
  // Generate beautiful variations based on values
  const sanitizedPetalCount = Math.max(3, Math.min(32, petalCount));
  const glowOpacity = Math.max(0.1, Math.min(1.0, glowness));
  const baseColor = hue || "#685682";

  // Derive a secondary gold/bronze color to highlight the mathematical grid
  const mathColor = "#c5a880";

  // Helper to generate coordinates of a petal control path
  const getPetalPath = (idx: number) => {
    // Angular perturbation based on symmetry (lower symmetry = more organic randomness)
    const angleOffset = (1 - symmetry) * 12 * Math.sin(idx * 7.5);
    const angle = (360 / sanitizedPetalCount) * idx + angleOffset;

    let d = "";
    if (species === "rose") {
      // Rounded overlapping rose petal path from origin
      d = "M 200 200 C 130 110, 270 110, 200 200 M 200 200 C 110 130, 110 270, 200 200";
    } else if (species === "tulip") {
      // Sleek, tall, vertical pointing single petals
      d = "M 200 200 C 170 110, 200 80, 200 200 M 200 200 C 230 110, 200 80, 200 200";
    } else if (species === "orchid") {
      // Spread wide butterfly-like wings plus lower cup
      if (idx % 3 === 0) {
        // Large side wings
        d = "M 200 200 C 80 130, 80 270, 200 200";
      } else if (idx % 3 === 1) {
        // Upper narrow crown
        d = "M 200 200 C 160 50, 240 50, 200 200";
      } else {
        // Highly textured elaborate central cup
        d = "M 200 200 C 140 260, 260 260, 200 200";
      }
    } else {
      // "hybrid" - geometric algorithmic petals with points
      d = "M 200 200 C 150 70, 250 70, 200 200";
    }

    return { d, angle };
  };

  const petals = Array.from({ length: sanitizedPetalCount });

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background delicate radar/grid pattern representing the "algorithmic engine" */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[420px] max-h-[420px]"
        style={{ filter: `drop-shadow(0 0 15px rgba(28,27,27,0.02))` }}
      >
        <defs>
          {/* Main glowing radial gradient based on user selection */}
          <radialGradient id={`glowGrad-${baseColor}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={baseColor} stopOpacity={glowOpacity * 0.95} />
            <stop offset="60%" stopColor={baseColor} stopOpacity={glowOpacity * 0.4} />
            <stop offset="100%" stopColor={baseColor} stopOpacity="0" />
          </radialGradient>

          {/* Mathematical grid patterns */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(28,27,27,0.03)" strokeWidth="0.5" />
          </pattern>

          {/* Golden radial gradient for core */}
          <radialGradient id="centerCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="25%" stopColor={mathColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={baseColor} stopOpacity="0" />
          </radialGradient>

          {/* Clean blur filter for interactive blooming glow */}
          <filter id="bloomGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={12 * glowness} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Underlying graph paper coordinate grid */}
        <rect width="100%" height="100%" fill="url(#grid)" rx="24" />

        {/* 2. Elegant concentric math orbits outlining symmetry circles */}
        <g opacity="0.32">
          <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(28,27,27,0.06)" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(28,27,27,0.08)" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(28,27,27,0.05)" strokeWidth="1" strokeDasharray="4,2" />
          <circle cx="200" cy="200" r="60" fill="none" stroke="rgba(28,27,27,0.1)" strokeWidth="1" />
          
          {/* Degree ticks around border to look highly architectural and luxury */}
          <line x1="200" y1="10" x2="200" y2="25" stroke={mathColor} strokeWidth="1" opacity="0.7" />
          <line x1="200" y1="375" x2="200" y2="390" stroke={mathColor} strokeWidth="1" opacity="0.7" />
          <line x1="10" y1="200" x2="25" y2="200" stroke={mathColor} strokeWidth="1" opacity="0.7" />
          <line x1="375" y1="200" x2="390" y2="200" stroke={mathColor} strokeWidth="1" opacity="0.7" />

          {/* Cross lines representing absolute quadrant alignment */}
          <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(28,27,27,0.04)" strokeWidth="1" />
          <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(28,27,27,0.04)" strokeWidth="1" />
        </g>

        {/* 3. Volumetric color glow base layer */}
        <circle cx="200" cy="200" r="160" fill={`url(#glowGrad-${baseColor})`} filter="url(#bloomGlow)" />

        {/* 4. Overlapping Petals Loop */}
        <g 
          className={isSpinning ? "origin-center animate-[spin_40s_linear_infinite]" : "origin-center"}
          style={{ transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {petals.map((_, i) => {
            const { d, angle } = getPetalPath(i);
            
            // Render layered translucent petals to create gorgeous dimensional glassmorphism depth
            return (
              <g key={i} transform={`rotate(${angle} 200 200)`}>
                {/* Back shadow/glow outline */}
                <path
                  d={d}
                  fill="none"
                  stroke={baseColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity={0.1 * glowOpacity}
                  filter="url(#bloomGlow)"
                />
                
                {/* Secondary petal contour shifted slightly for depth */}
                <path
                  d={d}
                  fill={baseColor}
                  fillOpacity={0.12 - (i % 3 === 0 ? 0.04 : 0)}
                  stroke={baseColor}
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  opacity={0.8}
                />

                {/* Micro golden delicate rib lines running up each petal */}
                <line
                  x1="200"
                  y1="200"
                  x2="200"
                  y2={110}
                  stroke={mathColor}
                  strokeWidth="0.5"
                  opacity={0.3 * symmetry}
                  strokeDasharray="2,3"
                />
              </g>
            );
          })}
        </g>

        {/* 5. Center mathematical orbit & stamen structure */}
        <g className="origin-center animate-[spin_60s_linear_infinite]">
          {/* Delicate central ring */}
          <circle cx="200" cy="200" r="24" fill="none" stroke={mathColor} strokeWidth="1.25" opacity="0.6" strokeDasharray="3,3" />

          {/* Radiant gold stamen lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const rot = i * 45;
            return (
              <line
                key={i}
                x1="200"
                y1="184"
                x2="200"
                y2="174"
                stroke={mathColor}
                strokeWidth="1.5"
                transform={`rotate(${rot} 200 200)`}
                strokeLinecap="round"
                opacity="0.95"
              />
            );
          })}
        </g>

        {/* 6. Ultimate white/gold sparkling central core point */}
        <circle cx="200" cy="200" r="10" fill="url(#centerCore)" />
        <circle cx="200" cy="200" r="3" fill="#ffffff" />

        {/* 7. Super subtle tech details grid annotations (Luxury Aesthetic) */}
        <text x="212" y="55" fontSize="8" fontFamily="monospace" fill={mathColor} opacity="0.8" letterSpacing="1">
          {`SYM: ${(symmetry * 100).toFixed(0)}%`}
        </text>
        <text x="50" y="354" fontSize="8" fontFamily="monospace" fill="rgba(28,27,27,0.4)" letterSpacing="1">
          {`BOT_VAL_RE_v4.2`}
        </text>
        <text x="312" y="354" fontSize="8" fontFamily="monospace" fill={baseColor} opacity="0.6" letterSpacing="1">
          {`PETALS: ${sanitizedPetalCount}`}
        </text>
      </svg>
    </div>
  );
}
