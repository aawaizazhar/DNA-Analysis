import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-void border-t border-border/50 pt-16 pb-8 px-6 md:px-12 w-full">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        {/* Logo / Tagline */}
        <div>
          <div className="font-mono text-white text-lg font-medium tracking-widest mb-4">
            DNAAnalyzer<span className="text-phosphor rounded-full w-2 h-2 bg-phosphor inline-block ml-1"></span>
          </div>
          <p className="text-muted text-[14px] max-w-xs leading-relaxed">
            The standard in real-time genomic interpretation. Empowering the next generation of precision medicine.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-mono text-[11px] uppercase tracking-widest mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                { name: 'Capabilities', path: '/capabilities' },
                { name: 'Pipeline', path: '/pipeline' },
                { name: 'Applications', path: '/applications' },
                { name: 'Pricing', path: '/pricing' }
              ].map(l => (
                <li key={l.name}><a href={l.path} className="text-muted text-[14px] hover:text-white transition-colors">{l.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-mono text-[11px] uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              {['About', 'Careers', 'Blog', 'Contact'].map(l => (
                <li key={l}><a href="#" className="text-muted text-[14px] hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-mono text-[11px] uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Privacy', 'Terms', 'Security'].map(l => (
                <li key={l}><a href="#" className="text-muted text-[14px] hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="md:justify-self-end flex space-x-4">
          <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-phosphor hover:border-phosphor/50 transition-colors">
            X
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-phosphor hover:border-phosphor/50 transition-colors">
            in
          </a>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
        <span className="font-mono text-[11px] text-muted tracking-wide">
          © 2025 DNAAnalyzer. Built for science.
        </span>
        <span className="font-mono text-[11px] text-muted tracking-wide flex items-center mt-4 md:mt-0">
          <span className="w-2 h-2 rounded-full bg-phosphor mr-2"></span>
          All systems operational
        </span>
      </div>
    </footer>
  );
}
