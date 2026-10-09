type Props = { alt: string };

const SPOTS: [number, number, number, string][] = [
  [62, 120, 34, "0s"],
  [128, 168, 44, "0.6s"],
  [92, 238, 30, "1.1s"],
  [150, 290, 38, "0.3s"],
  [70, 330, 26, "1.6s"]
];

/** Floating phone mock-up with a "beating" EcoAlerta heat map (SVG + CSS). */
export function PhoneHeatmap({ alt }: Props) {
  return (
    <div className="relative mx-auto w-[220px] animate-float sm:w-[250px]">
      <svg role="img" aria-label={alt} viewBox="0 0 220 440" className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]">
        <defs>
          <radialGradient id="heat">
            <stop offset="0%" stopColor="#d4a933" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#e3732c" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#039833" stopOpacity="0" />
          </radialGradient>
          <clipPath id="screen">
            <rect x="12" y="14" width="196" height="412" rx="24" />
          </clipPath>
        </defs>
        <rect x="2" y="2" width="216" height="436" rx="34" fill="#0d1b1f" stroke="#2a3f3f" strokeWidth="2" />
        <g clipPath="url(#screen)">
          <rect x="12" y="14" width="196" height="412" fill="#e9efe6" />
          {/* river + streets */}
          <path d="M-10 90 C60 130 40 220 120 250 C190 276 170 360 240 420" stroke="#9fd0d6" strokeWidth="26" fill="none" />
          <g stroke="#ffffff" strokeWidth="5">
            <path d="M12 180 H208" />
            <path d="M12 300 H208" />
            <path d="M80 14 V426" />
            <path d="M160 14 V426" />
          </g>
          {SPOTS.map(([cx, cy, r, delay]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r={r} fill="url(#heat)" />
              <circle
                cx={cx}
                cy={cy}
                r={r * 0.5}
                fill="none"
                stroke="#d4a933"
                strokeWidth="2"
                className="animate-pulse-ring"
                style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "view-box", animationDelay: delay }}
              />
            </g>
          ))}
          <rect x="12" y="14" width="196" height="52" fill="#00343a" />
          <circle cx="36" cy="40" r="10" fill="#039833" />
          <rect x="54" y="33" width="90" height="8" rx="4" fill="#f4f1e8" />
          <rect x="54" y="45" width="60" height="6" rx="3" fill="#6aaa5a" />
          <rect x="30" y="378" width="160" height="34" rx="17" fill="#d4a933" />
          <rect x="70" y="392" width="80" height="6" rx="3" fill="#061a14" />
        </g>
      </svg>
    </div>
  );
}
