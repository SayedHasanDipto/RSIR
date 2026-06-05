'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export function CursorComet() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const trailsRef = useRef([]);
  const rafRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const quickTos = useRef({ trails: [] });

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const trails = trailsRef.current.filter(Boolean);

    if (!cursor || !follower) return;

    // Pre-create all quickTo instances once (much faster than gsap.to per frame)
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "none" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "none" });
    const fxTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" });
    const fyTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" });

    // Pre-create quickTo for each trail (avoids creating new tweens every frame)
    const trailQuickTos = trails.map((trail, i) => ({
      x: gsap.quickTo(trail, "x", { duration: 0.3 + (i * 0.08), ease: "power2.out" }),
      y: gsap.quickTo(trail, "y", { duration: 0.3 + (i * 0.08), ease: "power2.out" }),
    }));

    const updateHoverState = (isHovering) => {
      if (isHoveringRef.current !== isHovering) {
        isHoveringRef.current = isHovering;
        gsap.to(cursor, {
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? '#ffffff' : '#3b82f6',
          duration: 0.2,
        });
        gsap.to(follower, {
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.6 : 0.2,
          borderColor: isHovering ? '#ffffff' : '#8b5cf6',
          duration: 0.2,
        });
      }
    };

    const handleMouseOver = (e) => {
      if (e.target && e.target.closest && e.target.closest('a, button, [role="button"], input, select, textarea')) {
        updateHoverState(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target && e.target.closest && e.target.closest('a, button, [role="button"], input, select, textarea')) {
        updateHoverState(false);
      }
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      // Update cursor + follower
      xTo(clientX);
      yTo(clientY);
      fxTo(clientX);
      fyTo(clientY);

      // Update trails via pre-created quickTo (no new tween creation)
      for (let i = 0; i < trailQuickTos.length; i++) {
        trailQuickTos[i].x(clientX);
        trailQuickTos[i].y(clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      {/* Reduced trail count from 12 to 6 for better performance */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={el => trailsRef.current[i] = el}
          className="fixed top-0 left-0 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${14 - i * 2}px`,
            height: `${14 - i * 2}px`,
            backgroundColor: i === 0 ? '#3b82f6' : '#8b5cf6',
            opacity: 0.7 - i * 0.1,
            filter: `blur(${i * 1.5}px)`,
            boxShadow: i < 2 ? '0 0 15px #8b5cf6' : 'none',
            willChange: 'transform',
          }}
        />
      ))}

      {/* Main Glowing Head - using plain div instead of motion.div */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_#3b82f6] z-20"
        style={{ backgroundColor: '#3b82f6', willChange: 'transform' }}
      />

      {/* Outer Ring - using plain div instead of motion.div */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] border-[#8b5cf6] rounded-full -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ opacity: 0.2, willChange: 'transform' }}
      />
    </div>
  );
}
