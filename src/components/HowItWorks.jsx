import React, { useEffect, useState, useRef } from 'react';

function StepItem({ step, index, isActive }) {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (stepRef.current) observer.observe(stepRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={stepRef}
      className={`relative z-10 transition-all duration-1000 pb-20 md:pb-28 flex flex-col justify-center ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Desktop Number Intersecting the Line */}
      <div 
        className={`hidden md:block absolute left-[-162px] top-1/2 -translate-y-1/2 font-black select-none pointer-events-none transition-all duration-500 ${
          isActive ? 'text-phosphor scale-110 opacity-100' : 'text-[#1E2D4A] scale-100 opacity-50'
        }`}
        style={{ 
          fontSize: '72px',
          lineHeight: '0.8',
          transform: `scaleX(1.8) ${isActive ? 'scale(1.05)' : 'scale(1)'}`,
          transformOrigin: 'left center',
          letterSpacing: '-0.06em'
        }}
      >
        {step.num}
      </div>

      {/* Mobile Number */}
      <div 
        className={`md:hidden block mb-6 font-black select-none pointer-events-none transition-colors duration-500 ${
          isActive ? 'text-phosphor' : 'text-[#1E2D4A] opacity-50'
        }`}
        style={{ 
          fontSize: '48px',
          lineHeight: '0.8',
          transform: 'scaleX(1.5)',
          transformOrigin: 'left center',
          letterSpacing: '-0.06em'
        }}
      >
        {step.num}
      </div>

      {/* Content Block */}
      <div className="relative">
        <h3 className={`text-[22px] md:text-[26px] font-sans font-bold mb-3 transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/40'}`}>
          {step.title}
        </h3>
        <p className={`font-mono text-[13px] md:text-[14px] leading-relaxed max-w-[550px] mb-8 transition-colors duration-500 ${isActive ? 'text-[#64748B]' : 'text-[#64748B]/30'}`}>
          {step.desc}
        </p>

        <div className={`bg-[#0b0f16] border transition-all duration-500 rounded-md p-6 md:p-8 w-full font-mono shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group ${
          isActive ? 'border-phosphor/30 shadow-phosphor/5' : 'border-[#1E2D4A] opacity-40'
        }`}>
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full ${isVisible ? 'animate-[shimmer_1.5s_ease-in-out_forwards]' : ''} pointer-events-none`} />
          {step.renderCode()}
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const [vis, setVis] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!stepsContainerRef.current) return;
      
      const container = stepsContainerRef.current;
      const rect = container.getBoundingClientRect();
      const stepEls = container.querySelectorAll('.z-10'); // Each StepItem div
      
      let currentActive = 0;
      stepEls.forEach((el, i) => {
        const elRect = el.getBoundingClientRect();
        // If the center of the viewport is within this element
        if (elRect.top < window.innerHeight / 2 && elRect.bottom > window.innerHeight / 2) {
          currentActive = i;
        }
      });
      setActiveStep(currentActive);

      // Calculate vertical line progress
      const totalH = rect.height;
      const scrolled = Math.max(0, Math.min(totalH, window.innerHeight / 2 - rect.top));
      setProgress((scrolled / totalH) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const DNASeq = "ATGC ATGC ATG CAT";
  const coloredDNA = DNASeq.split('').map((char, index) => {
    let colorClass = 'text-white';
    if (char === 'A') colorClass = 'text-[#00D68F]';
    if (char === 'T') colorClass = 'text-[#F87171]';
    if (char === 'G') colorClass = 'text-[#EAB308]';
    if (char === 'C') colorClass = 'text-[#60A5FA]';
    if (char === ' ') return <span key={index}>&nbsp;&nbsp;</span>;
    return <span key={index} className={colorClass}>{char}</span>;
  });

  const steps = [
    {
      num: '01',
      title: 'User Input',
      desc: 'Select a gene, choose the genome version, and enter the genetic mutation. Our intuitive interface keeps the process simple and focused on what matters most.',
      renderCode: () => (
        <div className="flex flex-col space-y-2 text-[#64748B] text-[12px] md:text-[13px] font-mono">
          <div className="flex justify-between"><span>Gene:</span> <span className="text-white">BRCA1</span></div>
          <div className="flex justify-between"><span>Genome Version:</span> <span className="text-white">GRCh38</span></div>
          <div className="flex justify-between"><span>Mutation:</span> <span className="text-white">c.5266dupC</span></div>
          <div className="text-phosphor pt-2 border-t border-border/50 mt-2">→ Input Parameters Locked</div>
        </div>
      )
    },
    {
      num: '02',
      title: 'Data Processing',
      desc: 'Our system instantly fetches the precise DNA sequence from global databases and validates the mutation, acting as a smart, automated backend process.',
      renderCode: () => (
        <div className="flex flex-col space-y-2 text-[#64748B] text-[12px] md:text-[13px] font-mono">
          <div className="flex justify-between items-center"><span>Fetching DNA sequence...</span> <span className="text-white">OK</span></div>
          <div className="flex justify-between items-center"><span>Validating mutation integrity...</span> <span className="text-white">OK</span></div>
          <div className="text-white font-mono mt-2 pt-3 border-t border-border/50 font-bold tracking-widest">
            {coloredDNA}
          </div>
        </div>
      )
    },
    {
      num: '03',
      title: 'AI Analysis',
      desc: 'The neural network predicts whether the mutation is harmful or benign while simultaneously identifying possible disease associations and comparing results with known clinical data.',
      renderCode: () => (
        <div className="flex flex-col gap-3 text-[#64748B] text-[12px] md:text-[13px] font-mono">
          <div className="flex justify-between items-center bg-void p-2 rounded border border-phosphor/20"><span className="text-phosphor uppercase tracking-widest font-bold">Prediction</span> <span className="text-white">Harmful (Pathogenic)</span></div>
          <div className="flex justify-between items-center bg-void p-2 rounded border border-[#60A5FA]/20"><span className="text-[#60A5FA] uppercase tracking-widest font-bold">Disease</span> <span className="text-white w-[140px] text-right truncate">Breast Cancer</span></div>
          <div className="flex justify-between items-center bg-void p-2 rounded border border-border/50"><span className="uppercase tracking-widest font-bold text-white/70">Clinical Data</span> <span className="text-white">ClinVar Match</span></div>
        </div>
      )
    },
    {
      num: '04',
      title: 'Results',
      desc: 'View clear, comprehensive outputs detailing mutation impact, clinical validation, and actionable disease insights — all delivered in real-time in an easy-to-understand format.',
      renderCode: () => (
        <div className="flex flex-col gap-3 text-[#64748B] text-[12px] md:text-[13px] font-mono">
          <div className="flex items-center"><span className="text-[#1E2D4A] mr-3 font-bold">{'>'}</span><span className="w-[120px] shrink-0 text-white/50">Mutation Impact</span> <span className="text-phosphor ml-2">High (Frameshift)</span></div>
          <div className="flex items-center"><span className="text-[#1E2D4A] mr-3 font-bold">{'>'}</span><span className="w-[120px] shrink-0 text-white/50">Clinical Validation</span> <span className="text-white ml-2">ClinVar Confirmed</span></div>
          <div className="flex items-center"><span className="text-[#1E2D4A] mr-3 font-bold">{'>'}</span><span className="w-[120px] shrink-0 text-white/50">Disease Insights</span> <span className="text-[#F87171] ml-2">Increased Risk</span></div>
        </div>
      )
    }
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className={`bg-void py-[80px] md:py-[100px] px-6 md:px-12 section-animate ${vis ? 'visible' : ''}`}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12 md:mb-20 relative pl-0 md:pl-[140px]">
          <div className="flex items-center mb-8 h-8">
            <div className="font-mono text-[10px] text-[#00D68F] uppercase tracking-[0.2em]">// Pipeline Architecture</div>
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-[30px] h-[30px] rounded-full border border-phosphor/30 bg-[#00D68F]/5 shadow-[0_0_15px_rgba(0,214,143,0.05)]">
              <div className="w-1.5 h-1.5 rounded-full bg-phosphor shadow-[0_0_8px_rgba(0,214,143,0.8)]" />
            </div>
          </div>

          <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-sans font-black text-white leading-[1.0] tracking-[-0.02em] mb-4 inline-block capitalize transform origin-left scale-x-100 sm:scale-x-[1.2] lg:scale-x-[1.4]">
            Four Steps To <span className="text-phosphor">Full Clarity</span>
          </h2>
        </div>

        <div className="relative pl-0 md:pl-[140px]" ref={stepsContainerRef}>
          {/* Desktop Vertical Timeline Line (Static Unfilled) */}
          <div className="hidden md:block absolute left-[50px] top-4 bottom-4 w-[1px] bg-[#1E2D4A]" />
          
          {/* Desktop Vertical Timeline Line (Dynamic Filling) */}
          <div 
            className="hidden md:block absolute left-[50px] top-4 w-[1px] bg-phosphor transition-all duration-300 ease-out z-20" 
            style={{ height: `${progress}%` }}
          />

          <div className="relative">
            {steps.map((step, i) => (
              <StepItem key={i} step={step} index={i} isActive={activeStep === i} />
            ))}
          </div>
        </div>
      </div>

      <div className="h-20 -mb-[120px] relative z-0 bleed-void-to-surface" />
    </section>
  );
}
