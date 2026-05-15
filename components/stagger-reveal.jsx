'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function StaggerReveal({
  children,
  stagger = 0.1,
  delay = 0,
  duration = 0.8,
  selector = '> *',
  className = '',
  as: Component = 'div',
}) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);

    gsap.fromTo(
      elements,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}
