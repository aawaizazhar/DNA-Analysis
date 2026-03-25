import React, { useRef, useEffect, useState } from 'react';

export default function Problem() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const errors = [
    { gene: 'BRCA2 c.1013dupA', status: 'Tool timeout', isError: true, dotColor: 'bg-mutation-red' },
    { gene: 'TP53 p.R248W', status: 'Format mismatch', isError: true, dotColor: 'bg-mutation-red' },
    { gene: 'EGFR exon 19 del', status: 'Pending (day 4)', isError: false, dotColor: 'bg-muted' },
    { gene: 'MLH1 c.676C>T', status: 'DB conflict', isError: true, dotColor: 'bg-mutation-red' },
    { gene: 'APC c.3927_3931delAAAGA', status: 'Parse error', isError: true, dotColor: 'bg-mutation-red' },
  ];

  return (
    <section ref={sectionRef} className={`bg-void py-[120px] w-full px-6 md:px-12 section-animate ${isVisible ? 'visible' : ''}`}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column */}
        <div className="flex flex-col">
          <div className="flex items-center mb-12 h-8">
            <div className="font-mono text-[10px] text-mutation-red uppercase tracking-[0.2em]">// The Problem</div>
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-[30px] h-[30px] rounded-full border border-mutation-red/20 bg-mutation-red/5">
              <div className="w-1.5 h-1.5 rounded-full bg-mutation-red shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
            </div>
          </div>
          
          <h2 className="text-[38px] sm:text-[80px] lg:text-[100px] font-sans font-black leading-[0.9] tracking-tighter text-white mb-10 capitalize">
            <div className="block">Your</div>
            <div className="block">Current</div>
            <div className="block">Stack Is</div>
            <div className="block text-[#F87171]">Lying To</div>
            <div className="block text-[#F87171]">You.</div>
          </h2>

          <div className="space-y-12 max-w-[500px]">
            {/* Problem 1 */}
            <div className="border-l-2 border-mutation-red pl-6 py-1">
              <h3 className="text-white font-bold text-lg mb-2">Fragmented tooling</h3>
              <p className="text-muted font-mono text-sm leading-relaxed">
                You're duct-taping BLAST, SIFT, PolyPhen-2, and three spreadsheets together. Every tool speaks a different format. Data gets lost in translation.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="border-l-2 border-mutation-red pl-6 py-1">
              <h3 className="text-white font-bold text-lg mb-2">Weeks, not seconds</h3>
              <p className="text-muted font-mono text-sm leading-relaxed">
                Manual variant interpretation takes 3-5 days per gene. By the time you have results, the research window has closed.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="border-l-2 border-mutation-red pl-6 py-1">
              <h3 className="text-white font-bold text-lg mb-2">No unified truth</h3>
              <p className="text-muted font-mono text-sm leading-relaxed">
                ClinVar, gnomAD, OMIM - all siloed. Your team makes decisions on incomplete data, then argues about which database was "right."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Terminal Table) */}
        <div className="bg-[#0b0e14] rounded-xl border border-border/50 p-6 sm:p-8 font-mono text-[13px] shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-border/30">
            <div className="text-muted uppercase tracking-widest text-[#64748B]">MANUAL WORKFLOW</div>
            <div className="flex items-center space-x-2 text-mutation-red border border-mutation-red/30 bg-mutation-red/5 px-2.5 py-1 rounded-md text-xs font-semibold">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
              <span>847 UNRESOLVED</span>
            </div>
          </div>
          
          {/* List */}
          <div className="space-y-0 text-[13px]">
            {errors.map((error, i) => (
              <div key={i} className="flex justify-between items-center border-b border-border/20 py-4 last:border-0">
                <div className="flex items-center text-muted">
                  <span className={`w-1.5 h-1.5 rounded-full ${error.dotColor} mr-3`}></span>
                  <span className="text-[#94A3B8]">{error.gene}</span>
                </div>
                <div className={error.isError ? "text-mutation-red" : "text-[#64748B]"}>
                  {error.status}
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer Warning */}
          <div className="w-full flex items-center space-x-3 text-mutation-red border border-mutation-red/20 bg-mutation-red/5 p-4 rounded-md mt-6 shadow-[0_0_15px_rgba(248,113,113,0.05)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
            <span className="text-sm font-medium">12 of 17 tools unavailable. Export manually.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
