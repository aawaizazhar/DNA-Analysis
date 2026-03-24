import React, { useEffect, useState, useRef } from 'react';
import CTA from '../components/CTA';

const StepSection = ({ step, index, active }) => {
  return (
    <div className={`relative min-h-screen py-32 flex items-center transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-30'}`}>
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 w-full">
        {/* Left text */}
        <div className="flex-1 w-full lg:sticky lg:top-40 self-start">
          <div className="font-mono text-[72px] lg:text-[120px] font-black text-phosphor leading-[0.8] mb-8 tracking-tighter" style={{ transform: 'scaleX(1.2)', transformOrigin: 'left' }}>
            {step.num}
          </div>
          <h2 className="text-[36px] md:text-[52px] font-black leading-[1.05] tracking-[-0.02em] mb-6">
            {step.title}
          </h2>
          <p className="text-[#64748B] text-[16px] md:text-[18px] leading-relaxed max-w-[500px]">
            {step.desc}
          </p>
        </div>

        {/* Right visualizer */}
        <div className="flex-1 w-full">
          <div className={`bg-[#0b0f16] border border-[#1E2D4A] rounded-2xl p-8 md:p-12 w-full font-mono shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 ${active ? 'shadow-phosphor/10 border-phosphor/30 scale-100' : 'scale-[0.98]'}`}>
            {step.renderCode()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Pipeline() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const stepEls = document.querySelectorAll('.pipeline-step');
      let currentActive = 0;
      stepEls.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4) {
          currentActive = i;
        }
      });
      setActiveStep(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const coloredDNA = "ATGC ATGC ATG CAT".split('').map((char, index) => {
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
        <div className="flex flex-col space-y-6 text-[14px]">
          <div className="flex justify-between items-center text-[#64748B] border-b border-border/50 pb-4">
            <span>waiting_for_input... <span className="text-white animate-pulse">_</span></span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-4 text-white">
            <span className="text-[#64748B]">Gene Target</span>
            <span className="font-bold border border-border/50 bg-void px-3 py-1 rounded">BRCA1</span>
            
            <span className="text-[#64748B]">Reference</span>
            <span className="font-bold border border-border/50 bg-void px-3 py-1 rounded">GRCh38 (hg38)</span>
            
            <span className="text-[#64748B]">Mutation</span>
            <span className="font-bold border border-border/50 bg-void px-3 py-1 rounded">c.5266dupC</span>
          </div>
          <div className="mt-4 pt-4 border-t border-border/30 text-phosphor/80">
            [+] Input configuration standardized and locked.
          </div>
        </div>
      )
    },
    {
      num: '02',
      title: 'Data Processing',
      desc: 'Our system instantly fetches the precise DNA sequence from global databases and validates the mutation, acting as a smart, automated backend process.',
      renderCode: () => (
        <div className="flex flex-col text-[#64748B] text-[14px] space-y-8">
           <div className="flex justify-between items-center">
             <span className="text-white">Fetching wild-type & variant sequences...</span>
             <span className="text-phosphor">200 OK</span>
           </div>
           
           <div className="bg-void p-4 rounded border border-border/50 font-bold tracking-widest text-[16px] mb-2">{coloredDNA}</div>
           
           <div className="space-y-4">
             <div className="flex justify-between text-[11px] uppercase tracking-widest text-phosphor">
               <span>Sequence Integrity Matrix</span>
               <span className="text-white">100% Validated</span>
             </div>
             <div className="h-1.5 w-full bg-[#161c2b] rounded-full overflow-hidden">
               <div className="h-full bg-phosphor rounded-full shadow-[0_0_10px_#00D68F] w-full" />
             </div>
             <div className="text-white text-[12px]"><span className="text-phosphor mr-2">↳</span> Variant mathematically localized: chr17:43057088 G&gt;A</div>
           </div>
        </div>
      )
    },
    {
      num: '03',
      title: 'AI Analysis',
      desc: 'The neural network predicts whether the mutation is harmful or benign while simultaneously identifying possible disease associations and comparing results with known clinical data.',
      renderCode: () => (
        <div className="flex flex-col gap-6 text-[14px] text-white/80">
          <div className="flex justify-between items-center text-[#64748B] border-b border-border/50 pb-4">
            <span>running_inference_models...</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[130px_1fr] gap-4 items-center bg-void border border-phosphor/50 shadow-[0_0_15px_rgba(0,214,143,0.1)] p-4 rounded-lg">
             <span className="text-phosphor font-bold uppercase tracking-widest">Prediction</span>
             <span className="text-white text-lg">Harmful (Pathogenic)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[130px_1fr] gap-4 items-center bg-void border border-[#60A5FA]/30 p-4 rounded-lg">
             <span className="text-[#60A5FA] font-bold uppercase tracking-widest">Disease Link</span>
             <span className="text-white">Hereditary Breast & Ovarian Cancer</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[130px_1fr] gap-4 items-center bg-void border border-border/50 p-4 rounded-lg">
             <span className="text-[#64748B] font-bold uppercase tracking-widest">Clinical Data</span>
             <span className="text-white">Matches 142 known ClinVar cases</span>
          </div>
        </div>
      )
    },
    {
      num: '04',
      title: 'Results',
      desc: 'View clear, comprehensive outputs detailing mutation impact, clinical validation, and actionable disease insights — all delivered in real-time in an easy-to-understand format.',
      renderCode: () => (
        <div className="flex flex-col text-[14px]">
          <div className="flex items-center space-x-4 mb-8 bg-void border border-phosphor/30 rounded p-4 shadow-[0_0_15px_rgba(0,214,143,0.05)]">
            <div className="w-12 h-12 shrink-0 rounded-full bg-phosphor/10 flex items-center justify-center border border-phosphor/30 text-phosphor">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <div>
              <div className="text-phosphor font-semibold uppercase tracking-widest text-[11px]">Final Output</div>
              <div className="text-white font-mono text-[16px]">Mutation Assessment Ready</div>
            </div>
          </div>
          <div className="space-y-4 text-white font-mono border-l-2 border-phosphor/50 pl-6 py-2">
             <div className="flex flex-col md:flex-row md:justify-between gap-1">
                <span className="text-[#64748B]">Mutation Impact:</span> 
                <span className="text-phosphor font-bold">High (Frameshift)</span>
             </div>
             <div className="flex flex-col md:flex-row md:justify-between gap-1">
                <span className="text-[#64748B]">Clinical Validation:</span> 
                <span className="text-white">ClinVar Confirmed</span>
             </div>
             <div className="flex flex-col md:flex-row md:justify-between gap-1">
                <span className="text-[#64748B]">Disease Insights:</span> 
                <span className="text-[#F87171] font-bold">Increased Risk Profile</span>
             </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <main className="bg-void min-h-screen text-white pt-32">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-left mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-start mb-6 border border-phosphor/20 bg-phosphor/5 px-4 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-phosphor shadow-[0_0_8px_rgba(0,214,143,0.8)] mr-3" />
            <span className="font-mono text-[10px] text-phosphor uppercase tracking-[0.2em] font-medium">Architecture</span>
          </div>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-sans font-black leading-[1.0] tracking-[-0.04em] mb-6 block" style={{ transform: 'scaleX(1.1)', transformOrigin: 'left center' }}>
            The Diagnostic Pipeline. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30">Re-engineered.</span>
          </h1>
          <p className="font-mono text-[14px] md:text-[16px] text-muted max-w-[500px] leading-relaxed">
            From raw FASTQ to finalized ACMG-compliant report. Fully automated. Mathematically rigorous. Unbelievably fast.          </p>
        </div>

        {/* Steps container */}
        <div ref={containerRef} className="relative">
          {steps.map((step, i) => (
            <div key={i} className="pipeline-step w-full">
              <StepSection step={step} index={i} active={activeStep === i} />
            </div>
          ))}
        </div>
      </div>
      <CTA />
    </main>
  );
}
