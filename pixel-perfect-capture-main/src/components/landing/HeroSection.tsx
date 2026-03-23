import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const helixY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-gradient biotech-grid-bg">
      {/* Parallax gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            y: orbY,
            top: "0%",
            right: "10%",
            background: "radial-gradient(circle, hsl(160 84% 39% / 0.14), transparent 70%)",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 60]),
            bottom: "5%",
            left: "3%",
            background: "radial-gradient(circle, hsl(173 80% 40% / 0.08), transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text column */}
          <div>
            <motion.div
              className="badge-pill mb-6 w-fit"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AI-Powered Genomic Analysis Platform
            </motion.div>

            <motion.h1
              className="text-hero gradient-text-hero mb-6"
              initial={{ opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.1 }}
            >
              Decode the language of{" "}
              <span className="gradient-text-emerald">your DNA</span>
            </motion.h1>

            <motion.p
              className="text-body-lg text-muted-foreground readable mb-10 max-w-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.25 }}
            >
              AI-powered mutation analysis for researchers, students, and educators — no bioinformatics expertise required. Get real-time pathogenicity predictions{" "}
              <em className="text-foreground/80 font-medium">in seconds</em>.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-14"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.4 }}
            >
              <Button variant="hero" size="lg" onClick={() => scrollTo("sign-up")} className="btn-shimmer">
                Start for Free <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="heroOutline" size="lg" onClick={() => scrollTo("how-it-works")}>
                <Play className="mr-1 h-4 w-4" /> See How It Works
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease, delay: 0.6 }}
            >
              {["ClinVar Validated", "Free for Academic Use", "GPU Powered"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* DNA Visualization — parallax layer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
            className="hidden lg:flex justify-center relative"
            style={{ y: helixY }}
          >
            {/* Pulsing orb */}
            <motion.div
              className="absolute w-80 h-80 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(160 84% 39% / 0.18), hsl(173 80% 40% / 0.05), transparent)",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* DNA Helix SVG */}
            <svg viewBox="0 0 300 400" className="w-72 h-auto helix-float relative z-10">
              {[...Array(12)].map((_, i) => {
                const y = i * 35 + 10;
                const phase = i * 0.7;
                const x1 = 150 + Math.sin(phase) * 85;
                const x2 = 150 - Math.sin(phase) * 85;
                const opacity1 = 0.5 + Math.sin(phase) * 0.5;
                const opacity2 = 0.5 - Math.sin(phase) * 0.5;
                return (
                  <g key={i}>
                    <circle cx={x1} cy={y} r={6} fill="hsl(160, 84%, 39%)" opacity={opacity1 * 0.9} />
                    <circle cx={x2} cy={y} r={6} fill="hsl(173, 80%, 40%)" opacity={opacity2 * 0.8 + 0.2} />
                    <line x1={x1} y1={y} x2={x2} y2={y} stroke="hsl(160, 84%, 39%)" strokeWidth="1" opacity={0.12} />
                    {i < 11 && (
                      <>
                        <line x1={x1} y1={y} x2={150 + Math.sin((i + 1) * 0.7) * 85} y2={(i + 1) * 35 + 10} stroke="hsl(160, 84%, 39%)" strokeWidth="1.5" opacity={0.15} />
                        <line x1={x2} y1={y} x2={150 - Math.sin((i + 1) * 0.7) * 85} y2={(i + 1) * 35 + 10} stroke="hsl(173, 80%, 40%)" strokeWidth="1.5" opacity={0.12} />
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Floating badges */}
            <motion.div
              className="absolute top-8 right-0 badge-pill text-xs"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Evo2 Model Active
            </motion.div>
            <motion.div
              className="absolute bottom-12 left-0 badge-pill text-xs"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              ClinVar Synced
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
