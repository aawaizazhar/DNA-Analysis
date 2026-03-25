import React, { useEffect, useState, useRef } from 'react';
import CTA from '../components/call-to-action';

export default function Capabilities() {
  const [vis, setVis] = useState(false);
  const heroRef = useRef(null);

  // Interactive Demo State
  const [geneInput, setGeneInput] = useState('BRCA1');
  const [demoStats, setDemoStats] = useState({
    pathScore: 0.940,
    confidence: 0.98,
    freq: 0.0001
  });

  const [bars, setBars] = useState([40, 70, 50, 90, 30, 60, 40, 80, 55, 65, 30, 90]);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);

    const simInterval = setInterval(() => {
      setBars(prev => {
        const next = [...prev.slice(1), Math.floor(Math.random() * 80) + 20];
        return next;
      });
    }, 1500);

    return () => {
      clearInterval(simInterval);
      observer.disconnect();
    };
  }, []);

  const handleGeneChange = (e) => {
    const val = e.target.value.toUpperCase();
    setGeneInput(val);
    setDemoStats({
      pathScore: 0.1 + Math.random() * 0.89,
      confidence: 0.85 + Math.random() * 0.14,
      freq: Math.max(0.0001, Math.random() * 0.05)
    });
  };

  const scoreColor = demoStats.pathScore > 0.8 ? '#cd5b5b' : demoStats.pathScore < 0.2 ? '#00D68F' : '#FBBF24';

  return (
    <main className="bg-void min-h-screen pt-32 text-white overflow-hidden">
      
      {/* Hero Section */}
      <section ref={heroRef} className={`relative px-6 md:px-12 pb-24 lg:pb-32 transition-all duration-1000 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,214,143,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
        
        <div className="max-w-[1240px] mx-auto text-center relative z-10 pt-10">
          <div className="inline-flex items-center justify-center mb-6 border border-phosphor/20 bg-phosphor/5 px-4 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-phosphor shadow-[0_0_8px_rgba(0,214,143,0.8)] mr-3" />
            <span className="font-mono text-[10px] text-phosphor uppercase tracking-[0.2em] font-medium">Platform Capabilities</span>
          </div>
          <h1 className="text-[52px] md:text-[72px] lg:text-[90px] font-sans font-black leading-[0.9] tracking-[-0.04em] mb-8 capitalize inline-block" style={{ transform: 'scaleX(1.1)', transformOrigin: 'center' }}>
            Unmatched Power. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">Infinite Scale.</span>
          </h1>
          <p className="font-mono text-[14px] md:text-[16px] text-muted max-w-[600px] mx-auto leading-relaxed">
            DNAAnalyzer provides an entirely browser-based, no-code environment. Explore genes, simulate custom variants, and receive instant AI pathogenicity predictions unified into a single dashboard.
          </p>
        </div>
      </section>

      {/* Zig-Zag 1: Exploration, Simulation & Real-time AI */}
      <section className="py-24 border-t border-border/50 relative bg-[#090b11]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1">
            <div className="font-mono text-[12px] text-phosphor uppercase tracking-widest mb-4">01. Explore & Predict</div>
            <h2 className="text-[36px] md:text-[48px] font-black leading-[1.1] tracking-[-0.02em] mb-6">Real-Time AI & Simulation.</h2>
            <p className="text-muted text-[15px] leading-relaxed mb-8">
              Search any gene, select your reference genome, and view raw DNA sequences. Apply custom mutations (e.g., G → A SNVs) and instantly let our cloud-based neural networks predict whether the impact is pathogenic or benign. Zero batch-processing delays.
            </p>
            <ul className="space-y-4 font-mono text-[13px] text-[#64748B]">
              <li className="flex items-center"><div className="w-1 h-1 bg-phosphor rounded-full mr-4" /> Gene exploration & sequence navigation</li>
              <li className="flex items-center"><div className="w-1 h-1 bg-phosphor rounded-full mr-4" /> Interactive single nucleotide variant (SNV) simulation</li>
              <li className="flex items-center"><div className="w-1 h-1 bg-phosphor rounded-full mr-4" /> Cloud-accelerated, instantaneous predictions</li>
            </ul>
          </div>
          
          {/* Interactive Demo Block */}
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-phosphor/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative bg-[#121622] border-[1.5px] border-[#2A3750] rounded-[24px] p-8 md:p-10 shadow-2xl hover:border-phosphor transition-colors duration-500">
              <h3 className="text-[20px] font-semibold text-white/95 mb-4">Simulate & Predict</h3>
              <p className="text-muted text-[13px] mb-8">Type a gene and visualize real-time AI disruption modeling.</p>
              
              <input 
                type="text" 
                value={geneInput} 
                onChange={handleGeneChange}
                className="bg-void border border-border/80 rounded px-5 py-4 font-mono text-white/90 text-[14px] focus:border-phosphor focus:outline-none transition-colors w-full mb-8"
                placeholder="Enter Gene Symbol (e.g., TP53, BRCA1)"
              />

              <div className="bg-[#090b11] border border-border/70 rounded-2xl p-6 shadow-inner">
                <div className="flex justify-between items-end mb-4">
                  <span className="font-mono text-[11px] text-muted tracking-widest uppercase">Variant Pathogenicity Score</span>
                  <span className="font-mono text-[24px] tracking-widest font-semibold transition-colors duration-300"
                        style={{ color: scoreColor }}>
                    {demoStats.pathScore.toFixed(3)}
                  </span>
                </div>
                
                <div className="h-2 w-full bg-[#161c2b] rounded-full overflow-hidden mb-6">
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
                  <span className="tracking-widest capitalize">{demoStats.pathScore > 0.8 ? 'Prediction: Harmful' : demoStats.pathScore < 0.2 ? 'Prediction: Benign' : 'Prediction: Uncertain'}</span>
                  <span className="tracking-widest">Model Conf: {(demoStats.confidence * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zig-Zag 2: Clinical Validation & Disease Association */}
      <section className="py-24 border-t border-border/50 relative bg-void">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 w-full grid grid-cols-1 gap-6">
            {/* ClinVar Sync Card */}
            <div className="bg-[#121622] border-[1.5px] border-[#2A3750] rounded-[24px] p-8 md:p-10 shadow-xl group hover:-translate-y-1 transition-transform duration-300">
               <h3 className="text-[20px] font-semibold text-white/95 mb-6">Clinical Validation (ClinVar)</h3>
               <div className="space-y-4">
                  {[
                    { w: '90%', color: 'from-[#984a4a] to-[#cd5b5b]', label: 'Pathogenic Evidence' },
                    { w: '65%', color: 'from-[#987a2a] to-[#FBBF24]', label: 'VUS (Uncertain)' },
                    { w: '30%', color: 'from-[#1e6e4c] to-[#00D68F]', label: 'Benign Confirmation' },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-[#55677e] w-[140px] uppercase tracking-widest">{bar.label}</span>
                      <div className="flex-1 h-3 rounded-full bg-[#090b11] border border-border/40 overflow-hidden shadow-inner">
                        <div className={`h-full bg-gradient-to-r ${bar.color} rounded-full transition-all duration-1000 group-hover:w-full`} style={{ width: bar.w }} />
                      </div>
                    </div>
                  ))}
               </div>
            </div>
            
            {/* Disease Link Card */}
            <div className="bg-[#090b11] border-[1.5px] border-border/50 rounded-[24px] p-8 md:p-10 hover:border-sequence/50 transition-colors duration-300 relative overflow-hidden group">
               <div className="absolute inset-0 bg-sequence/5 opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between">
                  <div>
                    <h3 className="text-[18px] font-semibold text-white/95 mb-2">Disease Association Prediction</h3>
                    <p className="text-muted text-[13px] max-w-[280px]">Gain deep biological insights by predicting exact diseases linked to underlying mutations.</p>
                  </div>
                  <div className="mt-6 sm:mt-0 w-[60px] h-[60px] shrink-0 rounded-full border border-sequence/30 flex items-center justify-center bg-sequence/10 text-sequence animate-[spin_10s_linear_infinite]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-9.33-5 5.5 5.5 0 0 0-1.1 7.3L5 13l2 2 2.67-2.67M20 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2"></path><path d="M4 14v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path></svg>
                  </div>
               </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="font-mono text-[12px] text-phosphor uppercase tracking-widest mb-4">02. Validation & Insights</div>
            <h2 className="text-[36px] md:text-[48px] font-black leading-[1.1] tracking-[-0.02em] mb-6">Backed By Clinical Data.</h2>
            <p className="text-muted text-[15px] leading-relaxed mb-8">
              Compare AI results against massive volumes of real world clinical registries instantly. Validate whether a simulated mutation is historically pathogenic, classified as benign, or of uncertain significance. Our deep-link algorithms provide biological insights into exactly which diseases might be associated with genetic deviations.
            </p>
          </div>

        </div>
      </section>

      {/* Full Width: Unified Dashboard & No-Code */}
      <section className="py-24 border-t border-border/50 relative bg-[#090b11] overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 text-center mb-16 relative z-10">
           <div className="font-mono text-[12px] text-phosphor uppercase tracking-widest mb-4">03. Streamlined Ecosystem</div>
           <h2 className="text-[36px] md:text-[48px] lg:text-[60px] font-black leading-[1.1] tracking-[-0.02em]">Unified No-Code Dashboard.</h2>
           <p className="text-muted text-[15px] max-w-[500px] mx-auto mt-6">
             Presenting AI predictions, clinical validation, and simulated metrics in a clean, structured UI. Fully accessible from your web browser without writing a single line of code.
           </p>
        </div>

        <div className="max-w-[1240px] mx-auto px-4 sm:px-12">
           <div className="w-full h-[400px] bg-[#121622] border-[1.5px] border-[#2A3750] rounded-[24px] p-6 sm:p-10 shadow-2xl flex flex-col relative z-10">
              <div className="flex justify-between items-center mb-8 border-b border-border/50 pb-4">
                 <div className="font-mono text-[13px] text-white/90 uppercase tracking-widest flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-phosphor shadow-[0_0_8px_rgba(0,214,143,0.8)]" /> Unified Analysis Overview
                 </div>
                 <div className="font-mono text-[10px] text-[#64748B] border border-border/80 px-3 py-1 bg-void rounded">NO-CODE WEB ACCESS</div>
              </div>

              <div className="flex-1 flex items-end justify-between gap-1 sm:gap-4 mt-auto">
                {bars.map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-[#105e46] to-phosphor/80 hover:to-phosphor transition-all duration-[1000ms] ease-out w-full rounded-t-sm relative group cursor-crosshair"
                    style={{ height: `${Math.max(10, h)}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-void border border-phosphor/50 text-phosphor font-mono text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Patient Data {i+1}
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      <CTA />
      
    </main>
  );
}
