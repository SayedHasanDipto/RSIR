'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bars, Xmark } from '@gravity-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { authClient } from '@/lib/auth-client';

export function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [session, setSession] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    authClient.getSession()
      .then(res => {
        if (res?.data) {
          setSession(res.data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsPending(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Video Lessons', href: '/lessons' },
    { label: 'IHC Chronicles', href: '/#ihc' },
    { label: 'Resource Bank', href: '/#resources' },
  ];

  const handleNavLinkClick = (e, item) => {
    if (item.label !== 'Home') {
      const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      if (!isLoggedIn) {
        e.preventDefault();
        router.push(`/login?redirect=${item.href}`);
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-primary to-primary-navy-light rounded-lg flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-lg">RI</span>
            </motion.div>
            <span className="hidden md:inline text-lg font-bold text-primary group-hover:text-primary-navy-light transition-colors">
              Robiul Islam
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -2 }}
                onClick={(e) => handleNavLinkClick(e, item)}
                className="text-foreground hover:text-gold transition-colors text-sm font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Right Side: Auth Buttons */}
          <AuthButtons />
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-background"
            >
              <div className="px-2 pt-2 pb-6 space-y-1 border-t border-border">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="block px-3 py-3 text-foreground hover:bg-card rounded-lg transition-colors font-medium"
                    onClick={(e) => {
                      setIsOpen(false);
                      handleNavLinkClick(e, item);
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                {session ? (
                  <div className="grid grid-cols-2 gap-3 mt-4 px-3">
                    <Link href="/admin" onClick={() => setIsOpen(false)} className="w-full">
                      <motion.button 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="w-full text-center py-2.5 bg-gold text-primary-navy rounded-lg font-bold text-xs shadow-md cursor-pointer"
                      >
                        Admin Panel
                      </motion.button>
                    </Link>
                    <motion.button 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      onClick={async () => {
                        setIsOpen(false);
                        await authClient.signOut();
                        localStorage.setItem('userLoggedIn', 'false');
                        window.location.href = '/';
                      }}
                      className="w-full text-center py-2.5 border border-white/10 text-white/70 hover:text-white rounded-lg font-medium text-xs cursor-pointer"
                    >
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mt-4 px-3">
                    <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                      <motion.button 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: navItems.length * 0.1 }}
                        className="w-full text-center py-2.5 border border-primary text-primary rounded-lg transition-colors font-medium text-xs cursor-pointer"
                      >
                        Login
                      </motion.button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)} className="w-full">
                      <motion.button 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: (navItems.length + 1) * 0.1 }}
                        className="w-full text-center py-2.5 bg-primary text-white rounded-lg transition-colors font-medium shadow-md text-xs cursor-pointer"
                      >
                        Join Now
                      </motion.button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );

  function AuthButtons() {
    const router = useRouter();

    const handleSignOut = async () => {
      await authClient.signOut();
      localStorage.setItem('userLoggedIn', 'false');
      window.location.href = '/';
    };

    if (isPending) {
      return <div className="text-white/30 text-xs">Loading...</div>;
    }

    return (
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <Link href="/admin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold hover:bg-gold-light text-primary-navy px-4 py-2 rounded-lg transition-all shadow-md font-bold text-sm"
              >
                Admin Panel
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="text-foreground hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all text-sm font-medium"
            >
              Logout
            </motion.button>
          </>
        ) : (
          <>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary hover:text-primary-navy-light font-medium px-4 py-2"
                >
                  Login
                </motion.button>
              </Link>
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -10px rgba(212, 175, 55, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold hover:bg-gold-light text-primary-navy px-6 py-2 rounded-lg transition-all shadow-md font-bold"
                >
                  Join Now
                </motion.button>
              </Link>
            </div>
          </>
        )}

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary p-2 shrink-0"
        >
          {isOpen ? <Xmark className="w-6 h-6" /> : <Bars className="w-6 h-6" />}
        </button>
      </div>
    );
  }
}
