import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Edit3, Brain, ClipboardCheck, Network, BarChart3 } from "lucide-react";
import { useRef } from "react";

const features = [
  { icon: Search, title: "Gene Search & Browser", desc: "Search any gene across multiple genome assemblies and visualize its structure in an interactive browser.", size: "md:col-span-1 md:row-span-1" },
  { icon: Brain, title: "Evo2 AI Pathogenicity", desc: "Leverage the Evo2 genomic foundation model for real-time pathogenicity scoring powered by GPU inference.", size: "md:col-span-1 md:row-span-2", highlight: true },
  { icon: Edit3, title: "Mutation Simulation", desc: "Introduce single nucleotide variants at any position and instantly generate mutated sequences.", size: "md:col-span-1 md:row-span-1" },
  { icon: ClipboardCheck, title: "ClinVar Clinical Comparison", desc: "Compare mutations against ClinVar's curated database of clinically validated variant classifications.", size: "md:col-span-1 md:row-span-1" },
  { icon: Network, title: "Disease Association ML", desc: "Custom ML models identify probable disease associations based on mutation characteristics.", size: "md:col-span-1 md:row-span-1" },
  { icon: BarChart3, title: "Real-Time Dashboard", desc: "View unified results including pathogenicity scores, clinical data, and disease predictions in one place.", size: "md:col-span-2 md:row-span-1" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const CoreFeatures = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="features" ref={sectionRef} className="py-32 section-alt relative biotech-grid-bg">
      {/* Parallax decorative orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          top: "10%",
          right: "-5%",
          background: "radial-gradient(circle, hsl(160 84% 39% / 0.06), transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-20"
        >
          <span className="badge-pill mb-5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Features
          </span>
          <h2 className="text-section text-foreground mb-5">
            Everything you need,<br />
            <span className="gradient-text-emerald">in one platform</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: "var(--font-body-lg)" }}>
            A unified workspace for DNA mutation analysis — from gene search to AI prediction.
          </p>
        </motion.div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid md:grid-cols-3 gap-5 auto-rows-[minmax(220px,auto)]">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.65, ease }}
              className={`bento-card p-8 lg:p-10 flex flex-col justify-between group ${f.size}`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-400 ${
                  f.highlight
                    ? "bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20"
                    : "bg-primary/10 group-hover:bg-primary/20"
                }`}>
                  <f.icon className={`h-6 w-6 ${f.highlight ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3 tracking-tight">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "var(--font-body)" }}>{f.desc}</p>
              </div>
              <div className="mt-8 h-px w-full bg-gradient-to-r from-primary/25 via-transparent to-accent/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
