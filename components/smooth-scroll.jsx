'use client';

import { ReactLenis } from 'lenis/react';

export function SmoothScroll({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, touchMultiplier: 2 }}>
      {children}
    </ReactLenis>
  );
}
