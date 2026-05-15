'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import gsap from 'gsap';

export function Counter({ end, duration = 2, suffix = '', className = '', decimals }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const countRef = useRef({ val: 0 });

  // Determine number of decimals if not provided
  const decimalCount = decimals !== undefined 
    ? decimals 
    : (end.toString().split('.')[1]?.length || 0);

  useEffect(() => {
    if (isInView) {
      gsap.to(countRef.current, {
        val: end,
        duration: duration,
        ease: 'power3.out',
        onUpdate: () => {
          const val = countRef.current.val;
          setCount(decimalCount > 0 ? val.toFixed(decimalCount) : Math.floor(val));
        },
      });
    }
  }, [isInView, end, duration, decimalCount]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
