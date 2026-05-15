'use client';

import { ArrowRight } from '@gravity-ui/icons';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { Counter } from './counter';
import { FloatingAnimation } from './floating-animation';

export function HeroSection() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);

  useGSAP(() => {
    if (!headlineRef.current) return;

    const words = headlineRef.current.innerText.split(' ');
    headlineRef.current.innerHTML = words
      .map(word => `<span class="inline-block opacity-0 translate-y-10">${word}&nbsp;</span>`)
      .join('');

    gsap.to(headlineRef.current.querySelectorAll('span'), {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power4.out',
      delay: 0.5,
    });

    gsap.fromTo('.hero-image-wrapper', 
      { 
        clipPath: 'inset(100% 0% 0% 0%)',
        scale: 1.2,
        opacity: 0
      },
      { 
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.8
      }
    );

    gsap.from('.hero-content > *', {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      delay: 1,
    });
  }, { scope: containerRef });

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-[85vh] flex items-center py-24 relative overflow-hidden bg-background"
    >
      {/* Background Motion */}
      <motion.div 
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ willChange: 'transform, opacity' }}
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
        style={{ willChange: 'transform, opacity' }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text */}
          <div className="hero-content space-y-8">
            <div>
              <h1
                ref={headlineRef}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-primary mb-6"
              >
                Master English & Unlock Islamic History
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed max-w-xl mx-auto md:mx-0">
                With Robiul Islam, embark on a transformative learning journey that combines advanced English language skills with enriching Islamic History & Culture knowledge.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(22, 33, 62, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary hover:bg-primary-navy-light text-white px-8 md:px-10 py-4 rounded-xl font-bold transition-all flex items-center gap-2 justify-center group"
              >
                Explore Lessons
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(201, 173, 103, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-gold text-primary px-8 md:px-10 py-4 rounded-xl font-bold transition-all text-center"
              >
                Learn More
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-border/50 max-w-lg mx-auto md:mx-0">
              <div className="text-center md:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-gold">
                  <Counter end={500} suffix="+" />
                </p>
                <p className="text-[10px] sm:text-xs font-bold text-foreground/60 uppercase tracking-widest">Students</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-gold">
                  <Counter end={200} suffix="+" />
                </p>
                <p className="text-[10px] sm:text-xs font-bold text-foreground/60 uppercase tracking-widest">Lessons</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-gold">
                  <Counter end={4.9} duration={2.5} suffix="★" />
                </p>
                <p className="text-[10px] sm:text-xs font-bold text-foreground/60 uppercase tracking-widest">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center md:justify-end mt-12 md:mt-0">
            <FloatingAnimation className="relative w-full max-w-sm md:max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-primary/20 rounded-3xl blur-3xl opacity-50"></div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-br from-primary via-primary-navy-light to-primary-navy rounded-3xl p-1 shadow-2xl overflow-hidden hero-image-wrapper"
              >
                <div className="bg-gradient-to-br from-primary-navy-light to-primary-navy rounded-2xl h-80 sm:h-96 md:h-[500px] flex items-center justify-center overflow-hidden relative">
                  <Image 
                    src="/hero.jpg" 
                    alt="Robiul Islam" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* Subtle overlay for text readability if needed later */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-card rounded-2xl p-4 sm:p-5 shadow-2xl border border-border/50 backdrop-blur-sm bg-card/95 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  </div>
                  <div>
                    <p className="font-bold text-primary">Certified Educator</p>
                    <p className="text-xs text-foreground/60 font-medium">10+ Years Experience</p>
                  </div>
                </div>
              </motion.div>
            </FloatingAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
