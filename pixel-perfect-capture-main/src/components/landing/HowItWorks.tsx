import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Dna, Cpu, BarChart3 } from "lucide-react";
import { useRef } from "react";

const steps = [
  { icon: Search, num: "01", title: "Select Gene & Assembly", desc: "Choose your target gene and genome assembly version from our curated database." },
  { icon: Dna, num: "02", title: "Simulate Mutation", desc: "Input a single nucleotide variant or choose from known mutations to analyze." },
  { icon: Cpu, num: "03", title: "AI Analyzes in Real Time", desc: "Evo2 model runs inference on GPU cloud. ClinVar and ML models run in parallel." },
  { icon: BarChart3, num: "04", title: "View Unified Results", desc: "Receive pathogenicity score, clinical classification, and disease associations." },
];

const ease = [0.22, 1, 0.36, 1] as const;

const HowItWorks = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="how-it-works" ref={ref} className="py-32 relative z-10">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          right: "-10%",
          top: "5%",
          background: "radial-gradient(circle, hsl(160 84% 39% / 0.05), transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-20"
        >
          <span className="badge-pill mb-5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            How it works
          </span>
          <h2 className="text-section text-foreground mb-5">
            Four steps from <span className="gradient-text-emerald">gene to insight</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.65, ease }}
              className="bento-card p-8 text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all duration-400">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <span className="text-xs font-bold text-primary/60 uppercase tracking-[0.2em] mb-2 block">Step {step.num}</span>
              <h3 className="font-display font-bold text-foreground mb-3 text-lg tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
