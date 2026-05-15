'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import gsap from 'gsap';

export function Counter({ end, duration = 2, suffix = '', className = '', decimals }) {
  const ref = useRef(null);
  const spanRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const countRef = useRef({ val: 0 });

  // Determine number of decimals if not provided
  const decimalCount = decimals !== undefined 
    ? decimals 
    : (end.toString().split('.')[1]?.length || 0);

  useEffect(() => {
    if (isInView && spanRef.current) {
      gsap.to(countRef.current, {
        val: end,
        duration: duration,
        ease: 'power3.out',
        onUpdate: () => {
          if (spanRef.current) {
            const val = countRef.current.val;
            const formatted = decimalCount > 0 ? val.toFixed(decimalCount) : Math.floor(val);
            spanRef.current.innerText = `${formatted}${suffix}`;
          }
        },
      });
    }
  }, [isInView, end, duration, decimalCount, suffix]);

  return (
    <span ref={ref} className={className}>
      <span ref={spanRef}>0{suffix}</span>
    </span>
  );
}
