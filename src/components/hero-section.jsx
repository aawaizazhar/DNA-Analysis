import React, { useRef, useEffect, useState } from 'react';

const SEQ = 'ATCGGCTA[T→A]GCATCG···PATHOGENIC···GGCATCGA[G→C]TTACCGA···BENIGN···ATCGCTGA[A→T]TACCGA···LIKELY_PATHOGENIC···';
const ticker = (SEQ + SEQ + SEQ + SEQ);

export default function Hero() {
  const containerRef = useRef(null);
  const helixRef = useRef(null);
  const textRef = useRef(null);
  const tiltTarget = useRef({ x: 0, y: 0 });
  const tiltCurrent = useRef({ x: 0, y: 0 });
  const [bpCount, setBpCount] = useState(0);
  const [phaseOffset, setPhaseOffset] = useState(0);

  // Scroll Parallax + Mouse Tilt + Helix Animation Loop
  useEffect(() => {
    let raf;
    let localPhase = 0;

    const onMove = (e) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      tiltTarget.current = {
        x: ((e.clientX - left) / width - 0.5) * 2,
        y: ((e.clientY - top) / height - 0.5) * 2,
      };
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      if (helixRef.current) helixRef.current.style.transform = `translateY(${-scrollY * 0.1}px)`;
      if (textRef.current) textRef.current.style.transform = `translateY(${-scrollY * 0.05}px)`;
    };

    const loop = () => {
      // Smoothing for tilt
      const c = tiltCurrent.current;
      const t = tiltTarget.current;
      c.x += (t.x - c.x) * 0.1;
      c.y += (t.y - c.y) * 0.1;
      
      const tiltEl = document.getElementById('hero-tilt-container');
      if (tiltEl) {
        // High impact tilt: 12 degrees
        tiltEl.style.transform = `rotateY(${c.x * 12}deg) rotateX(${-c.y * 12}deg)`;
      }

      // Continuous helix rotation phase
      localPhase += 0.008;
      setPhaseOffset(localPhase);

      raf = requestAnimationFrame(loop);
    };

    const el = containerRef.current;
    if (el) el.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      if (el) el.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Base Pair Counter Animation
  useEffect(() => {
    let startTimestamp = null;
    const target = 3247891532;
    const duration = 2500;
    const easeOutQuart = x => 1 - Math.pow(1 - x, 4);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setBpCount(Math.floor(target * easeOutQuart(progress)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  /* Build SVG helix paths */
  const STEPS = 45;
  const helixParts = [];
  const leftPts = [];
  const rightPts = [];

  for (let i = 0; i < STEPS; i++) {
    const y = i * 28;
    const phase = i * 0.4 + phaseOffset; // Dynamic phase
    const sin = Math.sin(phase);
    const cos = Math.cos(phase);
    const lx = 100 + sin * 45;
    const rx = 100 - sin * 45;
    const depth = (cos + 1) / 2;
    leftPts.push(`${lx},${y}`);
    rightPts.push(`${rx},${y}`);

    helixParts.push(
      <g key={i}>
        <line x1={lx} y1={y} x2={rx} y2={y} stroke="#8B5CF6" strokeWidth={1} strokeOpacity={0.08 + depth * 0.05} />
        <circle cx={lx} cy={y} r={1.5} fill="#00D68F" fillOpacity={0.15 + depth * 0.25} />
        <circle cx={rx} cy={y} r={1.5} fill="#00D68F" fillOpacity={0.15 + depth * 0.25} />
      </g>
    );
  }

const renderTicker = (text) => {
  const regex = /(\[T→A\]|\[G→C\]|\[A→T\]|PATHOGENIC|LIKELY_PATHOGENIC|BENIGN)/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    switch (part) {
      case '[T→A]':
      case '[G→C]':
      case '[A→T]':
      case 'PATHOGENIC':
      case 'LIKELY_PATHOGENIC':
        return <span key={index} className="text-[#F87171]">{part}</span>;
      case 'BENIGN':
        return <span key={index} className="text-[#00D68F]">{part}</span>;
      default:
        return <span key={index}>{part}</span>;
    }
  });
};
const TICKER_ELEMENTS = renderTicker(ticker);

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-[100vh] w-full bg-void flex flex-col justify-start pt-[120px] md:pt-[150px] overflow-hidden"
      >
        {/* DNA Helix Parallax Container */}
        <div
          ref={helixRef}
          className="absolute top-0 bottom-0 w-full md:w-auto md:top-0 md:left-[50%] md:right-0 pointer-events-none will-change-transform z-0"
          style={{ perspective: '1100px' }}
        >
          <div
            id="hero-tilt-container"
            className="w-full h-full flex justify-center items-start pt-20 origin-center transition-transform duration-150 ease-out"
          >
            <svg
              viewBox="0 0 200 1300"
              className="w-[240px] md:w-[380px] h-full opacity-0 animate-[fadeIn_1.2s_ease-out_0.6s_forwards] overflow-visible"
            >
              <g>
                {helixParts}
                <path d={`M ${leftPts.join(' L ')}`} stroke="#00D68F" strokeWidth="1.5" strokeOpacity="0.15" fill="none" />
                <path d={`M ${rightPts.join(' L ')}`} stroke="#00D68F" strokeWidth="1.5" strokeOpacity="0.15" fill="none" />
              </g>
            </svg>
          </div>
        </div>

        {/* Hero text block */}
        <div 
          ref={textRef}
          className="relative z-10 w-full px-6 md:pl-[6vw] md:pr-12 pt-0 flex flex-col items-start will-change-transform"
        >
          {/* Top Label */}
          <div className="flex items-center mb-10 h-8 opacity-0 animate-[fadeIn_0.5s_ease-out_0.2s_forwards]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 text-phosphor flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2L4 12l8 10 8-10L12 2z" /></svg>
              </div>
              <div className="font-mono text-[10px] text-[#00D68F] uppercase tracking-[0.2em]">Precision Genomic Intelligence</div>
            </div>
            <div className="ml-12 hidden md:flex items-center justify-center w-[30px] h-[30px] rounded-full border border-phosphor/30 bg-[#00D68F]/5 shadow-[0_0_15px_rgba(0,214,143,0.05)]">
              <div className="w-1.5 h-1.5 rounded-full bg-phosphor shadow-[0_0_8px_rgba(0,214,143,0.8)]" />
            </div>
          </div>

          <h1 className="text-[38px] sm:text-[60px] lg:text-[82px] font-sans font-black text-white leading-[0.82] tracking-[-0.03em] mb-8 flex flex-col items-start translate-x-[-0.04em] uppercase select-none">
            <span className="block overflow-hidden">
              <span className="inline-block opacity-0 translate-y-full animate-[slideUpFade_0.6s_ease-out_0.25s_forwards] origin-left transform scale-x-100 sm:scale-x-105 lg:scale-x-[1.2]">Decode</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block opacity-0 translate-y-full animate-[slideUpFade_0.6s_ease-out_0.3s_forwards] origin-left transform scale-x-100 sm:scale-x-105 lg:scale-x-[1.2]">The</span>
            </span>
            <span className="block overflow-hidden w-full">
              <span className="inline-block text-phosphor opacity-0 translate-y-full animate-[slideUpFade_0.6s_ease-out_0.35s_forwards] origin-left transform scale-x-100 sm:scale-x-105 lg:scale-x-[1.2]">Language</span>
            </span>
            <div className="flex gap-[0.2em] overflow-hidden">
              <span className="inline-block opacity-0 translate-y-full animate-[slideUpFade_0.6s_ease-out_0.4s_forwards] origin-left transform scale-x-100 sm:scale-x-105 lg:scale-x-[1.2]">Of</span>
              <span className="inline-block text-outline opacity-0 translate-y-full animate-[slideUpFade_0.6s_ease-out_0.45s_forwards] origin-left transform scale-x-100 sm:scale-x-105 lg:scale-x-[1.2]">Your</span>
            </div>
            <span className="block overflow-hidden">
              <span className="inline-block text-outline-phosphor opacity-0 translate-y-full animate-[slideUpFade_0.6s_ease-out_0.5s_forwards] origin-left transform scale-x-100 sm:scale-x-105 lg:scale-x-[1.2]">DNA</span>
            </span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-12 w-full">
            <p className="text-[#64748B] font-mono text-[14px] md:text-[16px] leading-[1.8] max-w-[680px] opacity-0 animate-[fadeIn_0.6s_ease-out_0.7s_forwards]">
              AI-powered genomic analysis that turns raw sequence data into clinical insight. From pathogenicity scoring to real-time simulation — in seconds, not weeks.
            </p>
          </div>

          <div className="opacity-0 animate-[fadeIn_0.6s_ease-out_0.8s_forwards] flex flex-col items-start mt-8 mb-8">
            <a href="#get-started" className="btn-phosphor-ghost mb-4 text-[16px] font-medium tracking-wide rounded-none border-b-2 border-x-0 border-t-0 px-2 py-1 hover:px-6 transition-all">
              Start Analyzing Free &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Genomic Ticker with alternating rows */}
      <div className="w-full bg-surface overflow-hidden py-3 border-y border-border/30 flex flex-col gap-1 z-20 relative">
        <div
          className="inline-block hover:[animation-play-state:paused] cursor-default select-none will-change-transform"
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: '#1E2D4A', animation: 'marquee 35s linear infinite' }}
        >
          {TICKER_ELEMENTS}
        </div>
        <div
          className="inline-block hover:[animation-play-state:paused] cursor-default select-none will-change-transform opacity-50"
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: '#1E2D4A', animation: 'marquee 40s linear infinite reverse' }}
        >
          {TICKER_ELEMENTS}
        </div>
      </div>
    </>
  );
}
