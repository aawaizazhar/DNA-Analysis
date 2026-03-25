import { motion } from "framer-motion";
import { Cpu, Database, Code, Zap } from "lucide-react";

const badges = [
  { icon: Cpu, text: "Evo2 Genomic Model" },
  { icon: Database, text: "ClinVar Clinical Data" },
  { icon: Code, text: "React + FastAPI" },
  { icon: Zap, text: "Modal GPU Inference" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const TrustBar = () => (
  <section className="py-12 relative z-10 border-t border-b border-border/50">
    <div className="container mx-auto px-4">
      <motion.p
        className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        Powered by industry-leading technology
      </motion.p>
      <div className="flex flex-wrap justify-center gap-3">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease }}
            className="badge-pill"
          >
            <badge.icon className="h-4 w-4 text-primary" />
            {badge.text}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
