'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export function CursorComet() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const trailsRef = useRef([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const trails = trailsRef.current;

    if (!cursor || !follower) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "none" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "none" });
    
    const fxTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" });
    const fyTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      xTo(clientX);
      yTo(clientY);
      fxTo(clientX);
      fyTo(clientY);

      trails.forEach((trail, i) => {
        if (!trail) return;
        gsap.to(trail, {
          x: clientX,
          y: clientY,
          duration: 0.3 + (i * 0.1), // Increasing lag for comet tail effect
          ease: "power2.out",
        });
      });

      const target = e.target;
      const isClickable = target.closest('a, button, [role="button"], input, select, textarea');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden hidden md:block">
      {/* Comet Tail Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          ref={el => trailsRef.current[i] = el}
          className="fixed top-0 left-0 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${16 - i * 1.2}px`,
            height: `${16 - i * 1.2}px`,
            backgroundColor: i === 0 ? '#3b82f6' : '#8b5cf6',
            opacity: 0.8 - i * 0.06,
            filter: `blur(${i * 1.5}px)`,
            boxShadow: i < 3 ? '0 0 20px #8b5cf6' : 'none',
          }}
        />
      ))}

      {/* Main Glowing Head */}
      <motion.div 
        ref={cursorRef} 
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? '#ffffff' : '#3b82f6',
        }}
        className="fixed top-0 left-0 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_#3b82f6] z-20"
      />
      
      {/* Outer Orbiting Ring */}
      <motion.div 
        ref={followerRef} 
        animate={{
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.6 : 0.2,
          borderColor: isHovering ? '#ffffff' : '#8b5cf6'
        }}
        className="fixed top-0 left-0 w-8 h-8 border-[1.5px] rounded-full -translate-x-1/2 -translate-y-1/2 z-10"
      />
    </div>
  );
}
