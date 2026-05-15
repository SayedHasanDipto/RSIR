'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function RevealAnimation({
  children,
  direction = 'up',
  delay = 0,
  duration = 1,
  distance = 50,
  className = '',
  triggerOnce = true,
}) {
  const elementRef = useRef(null);

  useGSAP(() => {
    const element = elementRef.current;
    if (!element) return;

    let x = 0;
    let y = 0;

    if (direction === 'up') y = distance;
    if (direction === 'down') y = -distance;
    if (direction === 'left') x = distance;
    if (direction === 'right') x = -distance;

    gsap.fromTo(
      element,
      {
        x,
        y,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: triggerOnce ? 'play none none none' : 'play none none reverse',
        },
      }
    );
  }, { scope: elementRef });

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
