import { Dna } from "lucide-react";

const Footer = () => (
  <footer className="py-20 border-t border-border/50 relative z-10">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Dna className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground tracking-tight">
              DNA<span className="text-primary">Analyzer</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            AI-Driven Genomic Analysis for Education & Research. Making bioinformatics accessible to&nbsp;everyone.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-foreground mb-5 text-xs uppercase tracking-[0.15em]">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {["Home", "Features", "How It Works", "Sign Up"].map(l => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-foreground mb-5 text-xs uppercase tracking-[0.15em]">Technology</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {["Evo2 (Arc Institute)", "ClinVar", "React + Vite", "FastAPI (Python)", "Modal GPU", "Vercel"].map(t => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-foreground mb-5 text-xs uppercase tracking-[0.15em]">Institution</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            University of Sialkot (USKT)<br />
            Department of Software Engineering<br />
            BSSE 2022–2026 Final Year Project
          </p>
        </div>
      </div>

      <div className="pt-8 flex flex-wrap justify-between items-center gap-4 border-t border-border/40">
        <p className="text-xs text-muted-foreground/70">© {new Date().getFullYear()} DNA Mutation Analyzer. All rights reserved.</p>
        <p className="text-xs text-muted-foreground/70">For academic and research use only.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
