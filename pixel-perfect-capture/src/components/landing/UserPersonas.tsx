import { motion, useScroll, useTransform } from "framer-motion";
import { Microscope, GraduationCap, BookOpen } from "lucide-react";
import { useRef } from "react";

const personas = [
  {
    icon: Microscope,
    role: "Researcher",
    desc: "Prioritise variants faster. Run real-time pathogenicity checks and disease association analysis without switching between fragmented tools.",
  },
  {
    icon: GraduationCap,
    role: "Educator",
    desc: "Bring genetics to life in the classroom. Demonstrate how AI interprets DNA mutations with a tool your students can access from any browser.",
  },
  {
    icon: BookOpen,
    role: "Student",
    desc: "Learn by doing. Explore real genomic data, simulate mutations, and understand the connection between DNA changes and disease.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const UserPersonas = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} className="py-32 section-alt relative biotech-grid-bg">
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          left: "-8%",
          top: "20%",
          background: "radial-gradient(circle, hsl(173 80% 40% / 0.05), transparent 70%)",
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
            Who it's for
          </span>
          <h2 className="text-section text-foreground mb-5">
            Built for <span className="gradient-text-emerald">every level</span> of expertise
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {personas.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.65, ease }}
              className="bento-card p-8 lg:p-10 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-400">
                <p.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4 tracking-tight">{p.role}</h3>
              <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "var(--font-body)" }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserPersonas;
