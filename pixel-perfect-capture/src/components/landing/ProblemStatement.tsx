import { motion, useScroll, useTransform } from "framer-motion";
import { Check, X } from "lucide-react";
import { useRef } from "react";

const platforms = [
  { name: "DNA Analyzer", web: true, ai: true, disease: true, noInstall: true, unified: true },
  { name: "PolyPhen-2", web: false, ai: true, disease: true, noInstall: false, unified: false },
  { name: "SIFT", web: false, ai: true, disease: true, noInstall: false, unified: false },
  { name: "ClinVar", web: false, ai: false, disease: true, noInstall: false, unified: false },
  { name: "Ensembl VEP", web: false, ai: false, disease: false, noInstall: false, unified: false },
];

const headers = ["Web UI", "AI Pred.", "Disease", "No Install", "Unified"];

const Cell = ({ value }: { value: boolean }) => (
  <td className="px-3 py-4 text-center">
    {value ? (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/15">
        <Check className="h-4 w-4 text-primary" />
      </span>
    ) : (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted/60">
        <X className="h-4 w-4 text-muted-foreground/30" />
      </span>
    )}
  </td>
);

const ease = [0.22, 1, 0.36, 1] as const;

const ProblemStatement = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const tableY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" ref={ref} className="py-32 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="badge-pill mb-6 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
              The Problem
            </span>
            <h2 className="text-section text-foreground mb-6">
              Existing tools are{" "}
              <span className="gradient-text-emerald">fragmented</span>,{" "}
              <span className="gradient-text-emerald">technical</span>, &{" "}
              <span className="gradient-text-emerald">siloed</span>
            </h2>
            <p className="readable text-muted-foreground" style={{ fontSize: "var(--font-body-lg)" }}>
              PolyPhen-2 and SIFT require bioinformatics expertise. ClinVar has no predictive capability. VEP is command-line only. Researchers waste hours switching between disconnected platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            style={{ y: tableY }}
            className="bento-card p-6 lg:p-8"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="px-3 py-3.5 text-left text-muted-foreground font-semibold text-xs uppercase tracking-wider">Platform</th>
                    {headers.map((h) => (
                      <th key={h} className="px-3 py-3.5 text-center text-muted-foreground font-semibold text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {platforms.map((p, i) => (
                    <tr key={i} className={`border-b border-border/20 transition-colors ${i === 0 ? "bg-primary/5" : "hover:bg-secondary/40"}`}>
                      <td className={`px-3 py-4 font-bold text-sm ${i === 0 ? "text-primary" : "text-foreground"}`}>{p.name}</td>
                      <Cell value={p.web} />
                      <Cell value={p.ai} />
                      <Cell value={p.disease} />
                      <Cell value={p.noInstall} />
                      <Cell value={p.unified} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
