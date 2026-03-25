import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const tiers = [
    {
      name: 'Student',
      price: 'Free',
      currency: '',
      period: '',
      limit: '10 Predictions / Day',
      target: 'Undergraduates & Beginners',
      features: [
        'Gene search and sequence browser',
        'SNV mutation simulation',
        'Evo2 pathogenicity prediction (harmful / benign)',
        'ClinVar classification lookup',
        'hg38 genome assembly only',
        'No history, no export, no disease association'
      ],
      cta: 'Start Analyzing',
      popular: false
    },
    {
      name: 'Researcher',
      price: '4,500',
      currency: 'PKR',
      period: '/mo',
      limit: '100 Predictions / Day',
      target: 'Grad Students & Academic Labs',
      features: [
        'Everything in Student',
        'ML-based disease association predictions (e.g. breast cancer, cystic fibrosis)',
        'hg19, hg38, and GRCh38 genome assemblies',
        'Prediction history (last 30 days)',
        'Export results as CSV and PDF'
      ],
      cta: 'Get Researcher Now',
      popular: true
    },
    {
      name: 'Institutional',
      price: '12,000',
      currency: 'PKR',
      period: '/mo',
      limit: 'Unlimited Predictions',
      target: 'University Depts & Labs',
      features: [
        'Everything in Researcher',
        'Up to 10 team seats',
        'Batch processing (up to 20 variants)',
        'Full prediction history (no time limit)',
        'Priority GPU inference queue (faster results)',
        'Usage analytics dashboard',
        'Dedicated support contact'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-void pt-[160px] pb-32 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-phosphor/5 blur-[160px] rounded-full -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="font-mono text-[11px] text-[#00D68F] uppercase tracking-[0.4em] mb-8">PRICING TIERS</div>
          <h1 className="text-display text-[36px] md:text-[84px] text-white font-black leading-[0.85] uppercase tracking-tight mb-8 scale-x-100 md:scale-x-[1.4] origin-center" style={{ transformOrigin: 'center' }}>
            Scale Your <span className="text-phosphor">Insight.</span>
          </h1>
          <p className="text-[#64748B] font-mono text-[14px] md:text-[18px] leading-[1.8] max-w-[600px] mx-auto">
            Transparent pricing for individuals, labs, and enterprises. Start with our free tier and upgrade as your research demands it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, i) => (
            <div 
              key={tier.name}
              className={`relative bg-[#0b0f16] border transition-all duration-300 rounded-2xl p-8 md:p-10 flex flex-col h-full hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${
                tier.popular ? 'border-phosphor/50 shadow-[0_0_30px_rgba(0,214,143,0.05)]' : 'border-[#1E2D4A] hover:border-[#1E2D4A]/80'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-phosphor text-void px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_0_15px_rgba(0,214,143,0.5)]">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-mono text-[14px] text-white uppercase tracking-widest mb-2">{tier.name}</h3>
                <p className="font-mono text-[10px] text-[#00D68F] uppercase tracking-widest mb-6 min-h-[30px]">{tier.target}</p>
                <div className="flex items-end gap-1 mb-2">
                  {tier.currency && <span className="text-white text-[16px] font-mono opacity-50 mb-1.5 pr-1">{tier.currency}</span>}
                  <span className="text-white text-[42px] lg:text-[48px] font-black leading-none">{tier.price}</span>
                  {tier.period && <span className="text-[#64748B] font-mono text-[12px] mb-1.5 ml-1">{tier.period}</span>}
                </div>
                <div className="text-phosphor font-mono text-[11px] uppercase tracking-widest font-bold">{tier.limit}</div>
              </div>

              <div className="space-y-4 mb-12 flex-1">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tier.popular ? "#00D68F" : "#1E2D4A"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[#64748B] text-[13px] font-mono leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                to={tier.name === 'Institutional' ? '/contact' : '/auth'} 
                className={`w-full py-4 text-center font-bold text-[12px] uppercase tracking-[0.2em] rounded-lg transition-all active:scale-[0.98] ${
                  tier.popular 
                    ? 'bg-phosphor text-void shadow-[0_0_20px_rgba(0,214,143,0.3)] hover:bg-white hover:shadow-none' 
                    : 'bg-transparent border border-[#1E2D4A] text-white hover:border-phosphor/50 hover:text-phosphor'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Disclaimer / Notes Region */}
        <div className="mt-16 text-center max-w-[800px] mx-auto bg-[#0b0f16] border border-[#1E2D4A]/50 rounded-lg p-5">
          <p className="text-[#FBBF24] font-mono text-[12px] leading-relaxed uppercase tracking-widest">
            <span className="font-bold mr-2 text-[14px]">!</span>
            This platform is strictly for educational and research use. It is not intended for clinical diagnosis or treatment decisions.
          </p>
        </div>

      </div>
    </div>
  );
}
