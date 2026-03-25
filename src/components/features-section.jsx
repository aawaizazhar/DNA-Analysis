import React, { useEffect, useState, useRef } from 'react';

export default function Features() {
  const sectionRef = useRef(null);
  const [vis, setVis] = useState(false);
  
  // Interactive Demo State
  const [geneInput, setGeneInput] = useState('BRCA1');
  const [demoStats, setDemoStats] = useState({
    pathScore: 0.940,
    confidence: 0.98,
    freq: 0.0001
  });

  // Live Simulation state
  const [bars, setBars] = useState([40, 70, 50, 90, 30, 60]);

  useEffect(() => {
    // 1.5s tick for Live Simulation sliding chart
    const simInterval = setInterval(() => {
      setBars(prev => {
        const next = [...prev.slice(1), Math.floor(Math.random() * 80) + 20];
        return next;
      });
    }, 1500);

    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { clearInterval(simInterval); observer.disconnect(); };
  }, []);

  const handleGeneChange = (e) => {
    const val = e.target.value.toUpperCase();
    setGeneInput(val);
    
    // Generate new plausible but random numbers
    setDemoStats({
      pathScore: 0.1 + Math.random() * 0.89,
      confidence: 0.85 + Math.random() * 0.14,
      freq: Math.max(0.0001, Math.random() * 0.05)
    });
  };

  /* §3 icon: tiny 3-turn helix SVG */
  const HelixIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-phosphor">
      {[0,1,2,3,4,5].map(i => {
        const y = 2 + i * 3;
        const w = Math.sin(i * 1.1) * 5;
        return <line key={i} x1={10-w} y1={y} x2={10+w} y2={y} stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.7"/>;
      })}
      <path d={`M ${[0,1,2,3,4,5].map(i=>`${10-Math.sin(i*1.1)*5},${2+i*3}`).join(' L ')}`} stroke="currentColor" strokeWidth="0.8" fill="none"/>
      <path d={`M ${[0,1,2,3,4,5].map(i=>`${10+Math.sin(i*1.1)*5},${2+i*3}`).join(' L ')}`} stroke="currentColor" strokeWidth="0.8" fill="none"/>
    </svg>
  );

  /* §3 icon: small bar chart */
  const BarChartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-phosphor">
      <rect x="3" y="10" width="3" height="7" rx="0.5" fill="currentColor" fillOpacity="0.5"/>
      <rect x="8.5" y="6" width="3" height="11" rx="0.5" fill="currentColor" fillOpacity="0.7"/>
      <rect x="14" y="3" width="3" height="14" rx="0.5" fill="currentColor" fillOpacity="1"/>
    </svg>
  );

  /* §3 icon: 3 clustering dots */
  const ClusterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="7" cy="10" r="3" fill="#8B5CF6" fillOpacity="0.6"/>
      <circle cx="12" cy="7" r="2.5" fill="#8B5CF6" fillOpacity="0.8"/>
      <circle cx="13" cy="13" r="2" fill="#8B5CF6" fillOpacity="1"/>
    </svg>
  );

  const cardBase = 'bg-[#121622] border-[1.5px] border-[#2A3750] rounded-[24px] p-6 lg:p-8 shadow-xl transition-all duration-300 hover:border-phosphor hover:-translate-y-1.5 hover:shadow-[0_12px_45px_-5px_rgba(0,214,143,0.25)] flex flex-col';
  const scoreColor = demoStats.pathScore > 0.8 ? '#cd5b5b' : demoStats.pathScore < 0.2 ? '#00D68F' : '#FBBF24';

  return (
    <section
      id="features"
      ref={sectionRef}
      className={`bg-void py-[120px] px-6 md:px-12 section-animate ${vis ? 'visible' : ''}`}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 lg:mb-20 relative">
          <div className="flex items-center mb-8 h-8">
            <div className="font-mono text-[10px] text-[#00D68F] uppercase tracking-[0.2em]">// Platform Capabilities</div>
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-[30px] h-[30px] rounded-full border border-phosphor/30 bg-[#00D68F]/5 shadow-[0_0_15px_rgba(0,214,143,0.05)]">
              <div className="w-1.5 h-1.5 rounded-full bg-phosphor shadow-[0_0_8px_rgba(0,214,143,0.8)]" />
            </div>
          </div>
          
          <h2 className="text-[42px] sm:text-[56px] lg:text-[72px] font-sans font-black text-white leading-[1.0] tracking-[-0.02em] mb-6 inline-block capitalize transform origin-left scale-x-100 sm:scale-x-105 lg:scale-x-[1.1]">
            Everything You Need, <span className="text-phosphor">Unified.</span>
          </h2>
          <p className="text-[#64748B] font-mono text-[13px] leading-[1.8] max-w-[440px] mt-4">
            One platform that ingests, interprets, and visualizes genomic data — in real time.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">

          {/* Left Column (50%) */}
          <div className="flex-1 flex flex-col gap-5 lg:gap-6 w-full lg:w-1/2">
            
            {/* Card 1 — Hero: Real AI Pathogenicity (Interactive Demo) */}
            <div className={`${cardBase} flex-1 justify-between`}>
              <div>
                <div className="inline-block bg-phosphor/10 border border-phosphor/20 px-3 py-1.5 rounded mb-6">
                  <span className="font-mono text-[9px] text-phosphor tracking-widest uppercase font-semibold">Interactive Demo</span>
                </div>
                <h3 className="text-[24px] lg:text-[28px] font-sans font-medium text-white/95 mb-4">AI-Powered Simulation</h3>
                <p className="text-muted text-[15px] max-w-[340px] leading-relaxed mb-8">
                  Search any gene, choose genome version, apply custom variants, and instantly let AI predict whether it's harmful or benign.
                </p>
                
                <input 
                  type="text" 
                  value={geneInput} 
                  onChange={handleGeneChange}
                  className="bg-void border border-border/80 rounded px-5 py-3 font-mono text-white/90 text-[13px] focus:border-phosphor focus:outline-none transition-colors w-full max-w-[240px] shadow-inner"
                  placeholder="Enter Gene..."
                />
              </div>

              <div className="mt-12 bg-[#090b11] border border-border/70 rounded-2xl p-6 lg:p-7 w-full shadow-inner">
                <div className="flex justify-between items-end mb-4">
                  <span className="font-mono text-[11px] text-muted tracking-widest uppercase">Score</span>
                  <span className="font-mono text-[20px] tracking-widest font-semibold transition-colors duration-300"
                        style={{ color: scoreColor }}>
                    {demoStats.pathScore.toFixed(3)}
                  </span>
                </div>
                
                <div className="h-2 w-full bg-[#161c2b] rounded-full overflow-hidden mb-6 shadow-inner">
                  <div
                    className="h-full rounded-full transition-all duration-[600ms] ease-out shadow-[0_0_10px_currentColor]"
                    style={{
                      width: `${demoStats.pathScore * 100}%`,
                      backgroundColor: scoreColor,
                      color: scoreColor
                    }}
                  />
                </div>

                <div className="flex justify-between font-mono text-[11px] text-[#55677e] border-t border-border/30 pt-4 mt-2">
                  <span className="tracking-widest">CONF: {(demoStats.confidence * 100).toFixed(1)}%</span>
                  <span className="tracking-widest">FREQ: {demoStats.freq.toFixed(4)}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row inside Left Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 shrink-0">
              
              {/* Card 5 — Disease Link */}
              <div className={`${cardBase} hover:border-sequence/50 relative group/card !p-6 lg:!p-7`}>
                <div className="absolute inset-0 bg-sequence/5 opacity-0 group-hover/card:opacity-100 transition-opacity rounded-[24px]" />
                <div className="relative z-10 w-full h-full flex flex-col">
                  <div className="w-12 h-12 mb-5 bg-sequence/10 rounded-xl border border-sequence/20 flex items-center justify-center">
                    <ClusterIcon />
                  </div>
                  <h3 className="text-[16px] lg:text-[18px] font-sans font-semibold text-white/90 mb-2 mt-auto">Disease Association</h3>
                  <p className="text-muted text-[13px] leading-relaxed">Predict exact diseases and deep insights linked to specific mutations.</p>
                </div>
              </div>

              {/* Card 6 — Browser Access */}
              <div className={`${cardBase} !p-6 lg:!p-7`}>
                <h3 className="text-[16px] lg:text-[18px] font-sans font-semibold text-white/90 mb-6">Browser Access</h3>
                <p className="text-muted text-[13px] leading-relaxed mt-auto">
                  No installation required. No-code workflows. Start instantly through your browser.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column (50%) */}
          <div className="flex-1 flex flex-col gap-5 lg:gap-6 w-full lg:w-1/2">

            {/* Top Row inside Right Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 shrink-0 h-auto sm:h-[240px]">
              
              {/* Card 2 — Gene Browser */}
              <div className={`${cardBase} !p-6 lg:!p-7`}>
                <div className="w-12 h-12 mb-5 bg-phosphor/10 rounded-xl border border-phosphor/20 flex items-center justify-center">
                  <HelixIcon />
                </div>
                <h3 className="text-[16px] lg:text-[18px] font-sans font-semibold text-white/90 mb-2 mt-auto">Gene Exploration</h3>
                <p className="text-muted text-[13px] leading-relaxed">Search genes, select genomes, view sequences fully.</p>
              </div>

              {/* Card 3 — Live Simulation */}
              <div className={`${cardBase} p-0 pt-6 px-6 lg:pt-7 lg:px-7 overflow-hidden justify-between`}>
                <h3 className="text-[16px] lg:text-[18px] font-sans font-semibold text-white/90 mb-4">Unified Dashboard</h3>
                <p className="text-muted text-[13px] mb-4">Predict, validate, and extract insights in a structured UI.</p>
                <div className="flex-1 flex items-end justify-between gap-1.5 mt-auto pb-0">
                  {bars.map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-[#105e46] transition-all duration-[1000ms] ease-out min-w-[12px] rounded-t-sm"
                      style={{ height: `${Math.max(15, h)}%` }}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Card 4 — ClinVar Sync */}
            <div className={`${cardBase} flex-1 justify-center py-8 lg:py-10`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 w-full h-full">
                <div className="flex-1 h-full flex flex-col justify-center">
                  <div className="w-12 h-12 mb-6 bg-phosphor/10 rounded-xl border border-phosphor/20 flex items-center justify-center">
                    <BarChartIcon />
                  </div>
                  <h3 className="text-[16px] lg:text-[20px] font-sans font-semibold text-white/90 mb-3">Clinical Validation</h3>
                  <p className="text-muted text-[14px] leading-relaxed max-w-[280px]">Compare mutations natively with real clinical registries like ClinVar.</p>
                </div>
                
                <div className="w-full md:w-[240px] flex flex-col justify-center gap-4 shrink-0">
                  {[
                    { w: '100%', color: 'bg-[#984a4a]', label: 'Pathogenic' },
                    { w: '70%', color: 'bg-[#987a2a]', label: 'VUS' },
                    { w: '40%', color: 'bg-[#1e6e4c]', label: 'Benign' },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex-1 h-4 rounded-sm bg-[#090b11] border border-border/40 overflow-hidden shadow-inner">
                        <div className={`h-full ${bar.color} rounded-sm`} style={{ width: bar.w }} />
                      </div>
                      <span className="text-[10px] font-mono text-[#55677e] w-[60px] text-right tracking-widest uppercase">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div className="h-20 -mb-[120px] relative z-0 bleed-void-to-surface" />
    </section>
  );
}
