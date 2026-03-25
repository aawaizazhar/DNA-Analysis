import React, { useEffect, useRef, useState } from 'react';

function Counter({ target, duration = 1400, prefix = '', suffix = '', isVisible, onComplete }) {
  const [count, setCount] = useState(0);
  const [flash, setFlash] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;

    let startTimestamp = null;
    // Ease-out-expo curve per precise instructions
    const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
    const numTarget = parseFloat(target);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = numTarget * easeOutExpo(progress);
      setCount(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numTarget);
        setFlash(true);
        setTimeout(() => setFlash(false), 250);
        hasAnimated.current = true;
        if (onComplete) onComplete();
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, target, duration, onComplete]);

  const displayCount =
    target.toString().includes('.') ? count.toFixed(1) : Math.floor(count);

  return (
    <div className={`transition-colors duration-300 ${flash ? 'text-phosphor' : 'text-white'}`}>
      {prefix}
      {displayCount}
      {suffix}
    </div>
  );
}

export default function SocialProof() {
  const [isVisible, setIsVisible] = useState(false);
  const [counted, setCounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleStatsComplete = () => {
    setCounted(true);
  };

  const stats = [
    { label: 'VARIANTS ANALYZED', target: 4.2, suffix: 'M+' },
    { label: 'ACCURACY', target: 98.7, suffix: '%' },
    { label: 'AVG LATENCY', prefix: '<', target: 3, suffix: 's' },
    { label: 'PUBLICATIONS', target: 200, suffix: '+' },
  ];

  return (
    <section
      id="impact"
      ref={sectionRef}
      className={`bg-surface py-[120px] px-6 md:px-12 w-full section-animate ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="mb-20 relative">
          <div className="flex items-center justify-center mb-10 h-8">
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-[30px] h-[30px] rounded-full border border-phosphor/30 bg-[#00D68F]/5 shadow-[0_0_15px_rgba(0,214,143,0.05)]">
              <div className="w-1.5 h-1.5 rounded-full bg-phosphor shadow-[0_0_8px_rgba(0,214,143,0.8)]" />
            </div>
          </div>
          <div className="text-center">
            <div className="mono-label mb-4">// Trusted By Researchers</div>
          </div>
        </div>

        {/* Stats Row (2x2 grid on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-border/50">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`stat-border-reveal pt-6 text-center md:text-left md:pl-8 first:pl-0 flex flex-col items-center md:items-start ${counted ? 'counted' : ''}`}
            >
              <div className="font-display text-[32px] md:text-[72px] leading-none mb-3">
                <Counter
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                  onComplete={i === 0 ? handleStatsComplete : undefined}
                />
              </div>
              <div className="mono-label text-muted max-w-[100px] md:max-w-none text-center md:text-left">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* §8 gradient bleed */}
      <div className="h-20 -mb-[120px] relative z-0 bleed-surface-to-void" />
    </section>
  );
}
