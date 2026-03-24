import React, { useRef, useState, useEffect } from 'react';

export default function CTA() {
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

  return (
    <section
      id="get-started"
      ref={sectionRef}
      className="relative bg-void py-[160px] md:py-[220px] px-6 overflow-hidden flex items-center justify-center"
    >
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-[15%] w-2.5 h-2.5 rounded-full bg-phosphor/40 blur-[1px] animate-pulse" />
      <div className="absolute bottom-1/3 right-[18%] w-8 h-8 rounded-full border border-phosphor/20" />
      <div className="absolute top-[45%] left-1/2 -translate-x-[400px] w-1.5 h-1.5 rounded-full bg-phosphor animate-ping" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-phosphor/5 blur-[120px] pointer-events-none rounded-full" />

      <div className={`max-w-[1200px] mx-auto text-center relative z-10 transition-all duration-1000 delay-200 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {/* Top Label */}
        <div className="font-mono text-[10px] md:text-[11px] text-[#00D68F] uppercase tracking-[0.4em] mb-12 flex justify-center items-center gap-1">
          GET STARTED
        </div>

        {/* Main Heading (Wide stacked style) */}
        <h2 className="flex flex-col items-center justify-center mb-10 select-none">
          <span className="block text-white font-black text-[36px] sm:text-[54px] md:text-[86px] leading-[0.85] tracking-[-0.03em] uppercase scale-x-100 md:scale-x-[1.4] origin-center" style={{ transformOrigin: 'center' }}>
            Your genome
          </span>
          <span className="block text-white font-black text-[36px] sm:text-[54px] md:text-[86px] leading-[0.85] tracking-[-0.03em] uppercase scale-x-100 md:scale-x-[1.4] origin-center" style={{ transformOrigin: 'center' }}>
            data
          </span>
          <span className="block text-white font-black text-[36px] sm:text-[54px] md:text-[86px] leading-[0.85] tracking-[-0.03em] uppercase scale-x-100 md:scale-x-[1.4] origin-center" style={{ transformOrigin: 'center' }}>
            deserves
          </span>
          <span className="block text-[#00D68F] font-black text-[36px] sm:text-[54px] md:text-[86px] leading-[0.85] tracking-[-0.03em] uppercase scale-x-100 md:scale-x-[1.4] origin-center" style={{ transformOrigin: 'center' }}>
            better.
          </span>
        </h2>

        {/* Tagline */}
        <p className="font-mono text-[12px] md:text-[15px] text-[#64748B] tracking-wider mb-14 max-w-[700px] mx-auto opacity-70 leading-relaxed">
          Start analyzing in minutes. No credit card. No setup. Just results.
        </p>

        {/* Primary Button */}
        <div className="flex justify-center">
          <Link to="/auth" className="bg-[#00D68F] hover:bg-white text-void font-bold px-10 py-4 text-[13px] md:text-[14px] transition-all duration-300 active:scale-95 flex items-center gap-2 group">
            Create Free Account 
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
