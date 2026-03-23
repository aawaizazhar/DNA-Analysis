import React, { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState('idle'); // idle, sending, sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('sent');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-void pt-[160px] pb-32 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-phosphor/5 blur-[160px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-500/5 blur-[160px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Column: Info */}
          <div>
            <div className="font-mono text-[11px] text-[#00D68F] uppercase tracking-[0.4em] mb-12 flex items-center gap-1">
              CONTACT
            </div>
            <h1 className="text-display text-[48px] md:text-[84px] text-white font-black leading-[0.85] uppercase tracking-tight mb-12" style={{ transform: 'scaleX(1.4)', transformOrigin: 'left center' }}>
              Connect With <span className="text-phosphor">Precision.</span>
            </h1>
            <p className="text-[#64748B] font-mono text-[14px] md:text-[18px] leading-[1.8] max-w-[500px] mb-16">
              Our team of genomic intelligence experts is ready to assist with your institutional research, technical inquiry, or security audit.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-mono text-[12px] text-white uppercase tracking-widest mb-4">Research Support</h3>
                <p className="font-mono text-[13px] text-[#64748B]">support@dnaanalyzer.ai</p>
                <p className="font-mono text-[13px] text-[#64748B]">Mon-Fri 08:00 - 18:00 EST</p>
              </div>
              <div>
                <h3 className="font-mono text-[12px] text-white uppercase tracking-widest mb-4">Global HQ</h3>
                <p className="font-mono text-[13px] text-[#64748B]">100 Cambridge Center</p>
                <p className="font-mono text-[13px] text-[#64748B]">Cambridge, MA 02142</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-[#0b0f16] border border-[#1E2D4A] rounded-2xl p-8 md:p-12 shadow-2xl relative">
            {formState === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-[fadeIn_0.5s_ease-out]">
                <div className="w-16 h-16 bg-phosphor/20 rounded-full flex items-center justify-center mb-8 border border-phosphor/30">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D68F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 className="text-white text-[24px] font-bold mb-4 uppercase tracking-widest">Message Received</h3>
                <p className="text-[#64748B] font-mono text-[13px]">Our intelligence branch is reviewing your transmission.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block font-mono text-[10px] text-[#64748B] uppercase tracking-[0.2em] mb-3 ml-1">Full Name</label>
                    <input type="text" className="w-full bg-void border border-[#1E2D4A] rounded px-5 py-4 text-white text-[13px] font-mono focus:border-phosphor transition-colors outline-none h-[52px]" placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-[#64748B] uppercase tracking-[0.2em] mb-3 ml-1">Work Email</label>
                    <input type="email" className="w-full bg-void border border-[#1E2D4A] rounded px-5 py-4 text-white text-[13px] font-mono focus:border-phosphor transition-colors outline-none h-[52px]" placeholder="jane@institute.edu" required />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-[#64748B] uppercase tracking-[0.2em] mb-3 ml-1">Inquiry Category</label>
                  <select className="w-full bg-void border border-[#1E2D4A] rounded px-5 py-4 text-white text-[13px] font-mono focus:border-phosphor transition-colors outline-none appearance-none h-[52px] cursor-pointer">
                    <option value="research">Research Cohorts</option>
                    <option value="licensing">Institutional Licensing</option>
                    <option value="support">Technical Support</option>
                    <option value="security">Security & Governance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-[#64748B] uppercase tracking-[0.2em] mb-3 ml-1">Message Detail</label>
                  <textarea rows="5" className="w-full bg-void border border-[#1E2D4A] rounded px-5 py-4 text-white text-[13px] font-mono focus:border-phosphor transition-colors outline-none resize-none" placeholder="Transmission payload..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formState === 'sending'}
                  className="w-full h-[60px] bg-phosphor hover:bg-white text-void font-bold text-[13px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {formState === 'sending' ? 'Sending...' : 'Initialize Transmission →'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
