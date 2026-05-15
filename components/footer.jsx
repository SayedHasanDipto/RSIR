'use client';

import { Facebook, Youtube, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { RevealAnimation } from './reveal-animation';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-navy text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-navy-light/10 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <RevealAnimation direction="up">
            <div className="flex items-center gap-3 mb-6 group">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="font-extrabold text-primary-navy">RI</span>
              </motion.div>
              <h3 className="text-xl font-extrabold tracking-tight">Robiul Islam</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Dedicated to providing quality education in English language and Islamic History & Culture to students worldwide through modern pedagogical approaches.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ y: -5, backgroundColor: '#d4af37', color: '#1a2f5a' }}
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center transition-all border border-white/10"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5, backgroundColor: '#d4af37', color: '#1a2f5a' }}
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center transition-all border border-white/10"
              >
                <Youtube size={18} />
              </motion.a>
            </div>
          </RevealAnimation>

          {/* Quick Links */}
          <RevealAnimation direction="up" delay={0.1}>
            <h4 className="text-lg font-bold mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/#home' },
                { label: 'English Hub', href: '/#english' },
                { label: 'IHC Chronicles', href: '/#ihc' },
                { label: 'Resource Bank', href: '/#resources' }
              ].map((item) => (
                <li key={item.label}>
                  <motion.a 
                    href={item.href} 
                    whileHover={{ x: 5, color: '#d4af37' }}
                    className="text-white/60 hover:text-gold transition-colors text-sm font-medium inline-block"
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </RevealAnimation>

          {/* Resources */}
          <RevealAnimation direction="up" delay={0.2}>
            <h4 className="text-lg font-bold mb-6 text-gold">Resources</h4>
            <ul className="space-y-3">
              {['Study Materials', 'Video Library', 'Blog Articles', 'FAQs'].map((link) => (
                <li key={link}>
                  <motion.a 
                    href="#" 
                    whileHover={{ x: 5, color: '#d4af37' }}
                    className="text-white/60 hover:text-gold transition-colors text-sm font-medium inline-block"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </RevealAnimation>

          {/* Contact */}
          <RevealAnimation direction="up" delay={0.3}>
            <h4 className="text-lg font-bold mb-6 text-gold">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gold">
                  <Mail size={16} />
                </div>
                <a href="mailto:info@robiulislam.com" className="text-white/60 hover:text-gold transition-colors text-sm font-medium">
                  info@robiulislam.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gold">
                  <Phone size={16} />
                </div>
                <a href="tel:+1234567890" className="text-white/60 hover:text-gold transition-colors text-sm font-medium">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gold mt-1">
                  <MapPin size={16} />
                </div>
                <span className="text-white/60 text-sm font-medium leading-relaxed">
                  Online Platform, Serving Globally
                </span>
              </li>
            </ul>
          </RevealAnimation>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm font-medium">
            &copy; 2024 Robiul Islam. All rights reserved. Designed for Excellence.
          </p>
          
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>

          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-gold text-primary-navy rounded-2xl flex items-center justify-center shadow-xl shadow-gold/20"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
