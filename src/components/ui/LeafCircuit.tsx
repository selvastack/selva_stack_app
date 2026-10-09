type Props = { className?: string };

const HALF: [number, number][] = [
  [200, 20], [150, 92], [114, 102], [98, 168], [42, 170], [46, 250], [12, 252],
  [38, 330], [16, 362], [82, 408], [150, 406], [200, 446]
];
// Jagged leaf outline: left half + its mirror image.
const LEAF =
  "M" +
  [...HALF, ...HALF.slice(0, -1).reverse().map(([x, y]) => [400 - x, y] as [number, number])]
    .map(([x, y]) => `${x} ${y}`)
    .join(" L") +
  " Z";

const CIRCUITS = [
  "M150 210 L112 168",
  "M150 250 L102 205",
  "M250 196 L292 166",
  "M250 236 L300 204",
  "M122 172 C140 195 132 215 150 240",
  "M282 172 C262 190 270 210 250 228"
];
const NODES: [number, number][] = [
  [117, 174],
  [106, 210],
  [287, 171],
  [295, 209]
];

/**
 * Stylised leaf of the Selva Stack logo. On load the circuits and the river
 * "light up" in sequence (pure CSS, disabled by prefers-reduced-motion).
 */
export function LeafCircuit({ className = "" }: Props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 460" fill="none" className={`circuit ${className}`}>
      <defs>
        <filter id="leaf-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="#039833" strokeLinecap="round" strokeLinejoin="round" filter="url(#leaf-glow)">
        <path pathLength={1} strokeWidth={6} style={{ animationDuration: "2.4s" }} d={LEAF} />
        <path pathLength={1} strokeWidth={3} style={{ animationDelay: "0.6s" }} d="M200 60 L200 90" />
        <path pathLength={1} strokeWidth={3} style={{ animationDelay: "0.8s" }} d="M178 108 C192 96 208 96 222 108" />
        <path pathLength={1} strokeWidth={3} style={{ animationDelay: "0.9s" }} d="M186 120 C195 112 205 112 214 120" />
        <path
          pathLength={1}
          strokeWidth={5}
          style={{ animationDelay: "1s", animationDuration: "2.6s" }}
          d="M200 150 C200 200 160 205 158 230 C156 262 238 255 238 290 C238 330 160 318 160 350 C160 380 228 376 226 410 C224 430 200 430 200 450"
        />
        {CIRCUITS.map((d, i) => (
          <path key={d} pathLength={1} strokeWidth={3} style={{ animationDelay: `${1.3 + i * 0.15}s` }} d={d} />
        ))}
      </g>
      <g fill="#6aaa5a">
        {NODES.map(([cx, cy], i) => (
          <circle key={cx} cx={cx} cy={cy} r={7} style={{ animationDelay: `${2 + i * 0.15}s` }} />
        ))}
      </g>
    </svg>
  );
}
