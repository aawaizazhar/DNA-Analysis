import React, { useRef, useState, useEffect } from 'react';

export default function UseCases() {
  const sectionRef = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cards = [
    { 
      id: 'Rx', role: 'Researcher', 
      desc: 'Automate variant curation pipelines. Run batch analyses across entire cohorts overnight. Export publication-ready data with full provenance.',
      quote: '"We went from 3 weeks to 4 hours per cohort. That\'s not optimization - that\'s a completely different way of working."',
      stat: '↑ 40h saved per researcher / month'
    },
    { 
      id: 'Ed', role: 'Educator', 
      desc: 'Real-world datasets, live annotation tools, and interactive simulations - ready-made for genomics curricula at any level.',
      quote: '"My students went from reading about pathogenicity to actually scoring variants in the first week. Engagement tripled."',
      stat: '↑ 3x student engagement reported'
    },
    { 
      id: 'Sx', role: 'Student', 
      desc: 'Learn genomic analysis with guided workflows, annotated examples, and a sandboxed environment where mistakes don\'t cost grants.',
      quote: '"I published my first variant interpretation paper using DNAAnalyzer data. Couldn\'t have done it without the unified interface."',
      stat: '↑ 12,000+ student researchers onboarded'
    },
  ];

  return (
    <section
      id="use-cases"
      ref={sectionRef}
      className={`bg-void py-[120px] px-6 md:px-12 section-animate ${vis ? 'visible' : ''}`}
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="mb-20 relative">
          <div className="flex items-center mb-10 h-8">
            <div className="font-mono text-[11px] text-[#00D68F] uppercase tracking-[0.2em]">// One Platform</div>
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-[30px] h-[30px] rounded-full border border-phosphor/30 bg-[#00D68F]/5 shadow-[0_0_15px_rgba(0,214,143,0.05)]">
              <div className="w-1.5 h-1.5 rounded-full bg-phosphor shadow-[0_0_8px_rgba(0,214,143,0.8)]" />
            </div>
          </div>
          
          <h2 className="text-[32px] sm:text-[60px] lg:text-[76px] font-sans font-black text-white leading-[1.0] tracking-[-0.04em] mb-6 inline-block transform-none sm:scale-x-[1.15] origin-left" style={{ transformOrigin: 'left center' }}>
            Every Role, Every Workflow.
          </h2>
          <p className="text-[#64748B] font-mono text-[14px]">
            Built for the bench, the classroom, and the clinic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((item) => (
            <div
              key={item.id}
              className="bg-[#0b0e14] border border-[#1E2D4A] rounded-[16px] p-8 flex flex-col h-full hover:border-[#00D68F]/30 hover:shadow-[0_8px_30px_rgba(0,214,143,0.05)] transition-all duration-300"
            >
              <div className="w-11 h-11 border border-[#00D68F]/20 rounded-lg mb-8 flex items-center justify-center text-phosphor font-mono text-[13px] bg-[#00D68F]/5">
                {item.id}
              </div>
              <h3 className="text-[20px] font-semibold text-white/95 mb-4">{item.role}</h3>
              <p className="text-[#64748B] font-mono text-[13px] leading-[1.8] mb-10 flex-1">
                {item.desc}
              </p>
              
              <div className="border-l-2 border-[#00D68F] pl-4 mb-10">
                <p className="text-[#64748B] font-mono italic text-[12px] leading-[1.8]">
                  {item.quote}
                </p>
              </div>
              
              <div className="text-phosphor font-mono text-[10px] font-semibold uppercase tracking-widest mt-auto">
                {item.stat}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-20 -mb-[120px] relative z-0 bleed-void-to-surface" />
    </section>
  );
}
