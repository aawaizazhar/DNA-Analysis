import React, { useEffect, useRef, useState } from 'react';
import CTA from '../components/call-to-action';

const ApplicationCard = ({ role, tag, title, desc, quote, stat, statLabel, delay }) => {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`bg-[#0b0f16] border border-[#1E2D4A] rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden transition-all duration-1000 group ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-phosphor/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative z-10">
        <div className="flex-1">
          <div className="inline-flex items-center mb-6">
            <span className="w-8 h-8 rounded border border-phosphor/30 bg-phosphor/10 text-phosphor font-mono text-[14px] flex items-center justify-center mr-4">
              {role}
            </span>
            <span className="font-mono text-[11px] text-[#64748B] uppercase tracking-widest">{tag}</span>
          </div>
          
          <h2 className="text-[32px] md:text-[40px] font-sans font-black leading-[1.1] tracking-[-0.02em] mb-4 text-white">
            {title}
          </h2>
          <p className="text-[#64748B] text-[15px] leading-relaxed max-w-[500px] mb-8">
            {desc}
          </p>

          <div className="border-l-2 border-phosphor pl-6 mt-8">
            <p className="text-white/80 font-mono italic text-[14px] leading-relaxed mb-4">
              "{quote}"
            </p>
          </div>
        </div>

        <div className="lg:w-[350px] shrink-0 flex flex-col justify-center">
          <div className="bg-void border border-border/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-phosphor/30 transition-colors">
            <div className="text-[48px] font-black text-phosphor font-sans tracking-tighter mb-2" style={{ transform: 'scaleX(1.1)' }}>
              {stat}
            </div>
            <div className="font-mono text-[11px] text-[#64748B] uppercase tracking-widest w-full border-t border-border/50 pt-4 mt-2">
              {statLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Applications() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const apps = [
    {
      role: 'Rx',
      tag: 'Clinical Research',
      title: 'High-Throughput Curation.',
      desc: 'Automate variant curation pipelines. Run batch analyses across entire cohorts overnight. Eliminate manual literature searches by instantly linking variants to the latest PMIDs and ClinVar submissions. Export publication-ready data with full provenance.',
      quote: "We went from 3 weeks to 4 hours per cohort. That's not optimization - that's a completely different way of working. DNAAnalyzer essentially acts as an extra bioinformatician on our team.",
      stat: '↑ 40h',
      statLabel: 'Saved per researcher / month'
    },
    {
      role: 'Ed',
      tag: 'Bioinformatics Education',
      title: 'Interactive Pedagogy.',
      desc: 'Bring real-world datasets into the classroom. DNAAnalyzer provides live annotation tools and interactive structural simulations ready-made for genomics curricula. Students can visualize protein folding changes in real-time instead of relying on static textbook diagrams.',
      quote: "My students went from reading about pathogenicity to actually scoring variants in the first week. Engagement tripled. The UI is so intuitive they don't need a computational background.",
      stat: '3x',
      statLabel: 'Increase in student engagement'
    },
    {
      role: 'Sx',
      tag: 'Student Workspaces',
      title: 'Learn Without Limits.',
      desc: 'Learn genomic analysis with guided workflows, annotated examples, and a sandboxed environment where mistakes don’t cost grants. Access the same industrial-grade variant calling and simulation engines used by top-tier diagnostic labs.',
      quote: "I published my first variant interpretation paper using DNAAnalyzer data. I couldn't have done it without the unified interface consolidating so many disconnected bioinformatics tools.",
      stat: '12K+',
      statLabel: 'Student researchers onboarded'
    }
  ];

  return (
    <main className="bg-void min-h-screen pt-32 text-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 mb-16 lg:mb-24 text-center">
        <div className="inline-flex items-center justify-center mb-6 border border-phosphor/20 bg-phosphor/5 px-4 py-1.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-phosphor shadow-[0_0_8px_rgba(0,214,143,0.8)] mr-3" />
          <span className="font-mono text-[10px] text-phosphor uppercase tracking-[0.2em] font-medium">Use Cases</span>
        </div>
        <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-sans font-black leading-[1.0] tracking-[-0.04em] mb-6 inline-block" style={{ transform: 'scaleX(1.1)', transformOrigin: 'center' }}>
          Every Role.<br/>
          <span className="text-phosphor">Every Workflow.</span>
        </h1>
        <p className="font-mono text-[14px] md:text-[16px] text-[#64748B] max-w-[500px] mx-auto leading-relaxed">
          From the bench, to the classroom, to the clinic. Built to accelerate genomic discovery regardless of your computational background.
        </p>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        {apps.map((app, i) => (
          <ApplicationCard key={i} {...app} delay={i} />
        ))}
      </div>

      <div className="mt-20">
        <CTA />
      </div>
    </main>
  );
}
