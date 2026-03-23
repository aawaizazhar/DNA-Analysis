import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const onMouseMove = (e) => {
      setIsHidden(false);
      const { clientX: x, clientY: y } = e;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const onMouseDown = () => setIsPointer(true);
    const onMouseUp = () => setIsPointer(false);

    const onMouseEnter = () => setIsHidden(false);
    const onMouseLeave = () => setIsHidden(true);

    const checkPointer = () => {
      const hoveredEl = document.querySelectorAll(':hover');
      const lastEl = hoveredEl[hoveredEl.length - 1];
      if (lastEl) {
        const style = window.getComputedStyle(lastEl);
        setIsPointer(style.cursor === 'pointer');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseover', checkPointer);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', checkPointer);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-phosphor/40 rounded-full pointer-events-none z-[1000] transition-transform duration-300 ease-out will-change-transform ${isHidden ? 'opacity-0' : 'opacity-100'} ${isPointer ? 'scale-150 border-phosphor/20 bg-phosphor/5' : 'scale-100'}`}
      />
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-phosphor rounded-full pointer-events-none z-[1001] transition-transform duration-75 ease-out will-change-transform ${isHidden ? 'opacity-0' : 'opacity-100'} ${isPointer ? 'scale-[2] shadow-[0_0_10px_rgba(0,214,143,0.8)]' : 'scale-100'}`}
      />
    </>
  );
}
