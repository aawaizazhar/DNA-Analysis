import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? window.scrollY / docHeight : 0;
      document.documentElement.style.setProperty('--scroll-p', p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    if (location.pathname === '/') {
      ['features', 'how-it-works', 'use-cases', 'impact'].forEach(id => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionObserver.disconnect();
    };
  }, [location.pathname]);

  const navLinks = [
    { label: 'Capabilities', id: 'capabilities', path: '/capabilities' },
    { label: 'Pipeline', id: 'pipeline', path: '/pipeline' },
    { label: 'Applications', id: 'applications', path: '/applications' },
    { label: 'Pricing', id: 'pricing', path: '/pricing' },
    { label: 'Contact', id: 'contact', path: '/contact' },
  ];

  const handleClick = (e, link) => {
    setMenuOpen(false);
    if (link.path.startsWith('/#')) {
      e.preventDefault();
      const id = link.id;
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // For all other links, scroll to top (React Router handles the actual routing)
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[1.5px] bg-phosphor z-[200] shadow-[0_0_10px_rgba(0,214,143,0.5)]"
        style={{
          width: 'calc(var(--scroll-p, 0) * 100%)',
          transition: 'width 0.1s linear',
        }}
      />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen || location.pathname !== '/'
            ? 'bg-void/80 backdrop-blur-[12px] border-b border-[#1E2D4A] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo Removed as per request */}
          <div className="flex items-center" />

          {/* Desktop Links (Centered) */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={(e) => handleClick(e, link)}
                className={`font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200 ${
                  activeId === link.id || (location.pathname === link.path) ? 'text-phosphor' : 'text-[#64748B] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth" className="font-mono text-[11px] uppercase tracking-widest text-[#64748B] hover:text-white border border-[#1E2D4A] px-5 py-2 rounded-[4px] transition-all">
              Log In
            </Link>
            <Link
              to="/auth"
              className="font-mono text-[11px] uppercase tracking-widest bg-phosphor text-void px-5 py-2 rounded-[4px] font-bold hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,214,143,0.3)]"
            >
              Get Started <span>&rarr;</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative z-[60]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-5 h-0.5 bg-white transition-all mb-1 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-white transition-all mt-1 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-void border-b border-[#1E2D4A] overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col px-6 py-8 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                onClick={(e) => handleClick(e, link)}
                className={`font-mono text-[12px] uppercase tracking-widest ${activeId === link.id ? 'text-phosphor' : 'text-white'}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-4">
              <Link to="/auth" onClick={() => setMenuOpen(false)} className="text-center font-mono text-[12px] uppercase tracking-widest border border-[#1E2D4A] py-3 rounded-md text-white">Log In</Link>
              <Link to="/auth" onClick={() => setMenuOpen(false)} className="text-center font-mono text-[12px] uppercase tracking-widest bg-phosphor py-3 rounded-md text-void font-bold shadow-[0_0_10px_rgba(0,214,143,0.3)]">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
