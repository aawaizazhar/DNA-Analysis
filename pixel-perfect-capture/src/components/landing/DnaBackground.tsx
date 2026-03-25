import { motion } from "framer-motion";

/** Faint biotech SVG grid + floating DNA strands used as a page background layer */
const DnaBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Technical grid */}
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="bioGrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="hsl(160 84% 39% / 0.04)" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1" fill="hsl(160 84% 39% / 0.06)" />
        </pattern>
        <pattern id="bioGridSmall" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="0.5" fill="hsl(173 80% 40% / 0.04)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bioGrid)" />
      <rect width="100%" height="100%" fill="url(#bioGridSmall)" />
    </svg>

    {/* Floating DNA helix – left side */}
    <motion.svg
      className="absolute -left-20 top-[15%] w-48 h-[600px] opacity-[0.04]"
      viewBox="0 0 100 400"
      animate={{ y: [0, -30, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    >
      {[...Array(16)].map((_, i) => {
        const y = i * 25;
        const x1 = 50 + Math.sin(i * 0.6) * 35;
        const x2 = 50 - Math.sin(i * 0.6) * 35;
        return (
          <g key={i}>
            <circle cx={x1} cy={y} r={3} fill="hsl(160, 84%, 39%)" />
            <circle cx={x2} cy={y} r={3} fill="hsl(173, 80%, 40%)" />
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="hsl(160, 84%, 39%)" strokeWidth="0.5" opacity="0.5" />
          </g>
        );
      })}
    </motion.svg>

    {/* Floating DNA helix – right side */}
    <motion.svg
      className="absolute -right-10 top-[40%] w-40 h-[500px] opacity-[0.03]"
      viewBox="0 0 100 400"
      animate={{ y: [0, 25, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    >
      {[...Array(14)].map((_, i) => {
        const y = i * 28;
        const x1 = 50 + Math.cos(i * 0.7) * 30;
        const x2 = 50 - Math.cos(i * 0.7) * 30;
        return (
          <g key={i}>
            <circle cx={x1} cy={y} r={2.5} fill="hsl(173, 80%, 40%)" />
            <circle cx={x2} cy={y} r={2.5} fill="hsl(160, 84%, 39%)" />
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="hsl(173, 80%, 40%)" strokeWidth="0.5" opacity="0.4" />
          </g>
        );
      })}
    </motion.svg>

    {/* Gradient orbs */}
    <div
      className="absolute w-[600px] h-[600px] rounded-full glow-pulse"
      style={{
        top: "-10%",
        left: "20%",
        background: "radial-gradient(circle, hsl(160 84% 39% / 0.06), transparent 70%)",
      }}
    />
    <div
      className="absolute w-[400px] h-[400px] rounded-full glow-pulse"
      style={{
        bottom: "10%",
        right: "5%",
        background: "radial-gradient(circle, hsl(173 80% 40% / 0.04), transparent 70%)",
        animationDelay: "2s",
      }}
    />
  </div>
);

export default DnaBackground;
