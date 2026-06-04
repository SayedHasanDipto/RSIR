'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Compass,
  Palette,
  Globe,
  Sparkles,
  X,
  BookMarked,
  Lock
} from 'lucide-react';
import Image from 'next/image';
import { RevealAnimation } from './reveal-animation';
import { StaggerReveal } from './stagger-reveal';

const iconPool = [BookOpen, Compass, Palette, Globe, BookMarked];
const colorPool = [
  'rgba(59, 130, 246, 0.4)',
  'rgba(245, 158, 11, 0.4)',
  'rgba(16, 185, 129, 0.4)',
  'rgba(168, 85, 247, 0.4)',
  'rgba(239, 68, 68, 0.4)',
  'rgba(99, 102, 241, 0.4)'
];

const fallbackImage = 'https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?w=800&q=80';

export function IhcChronicles({ initialArticles = [] }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAuthWall, setShowAuthWall] = useState(false);
  const [targetRedirectUrl, setTargetRedirectUrl] = useState('');

  // Transform DB posts into display articles
  const articles = initialArticles.map((post, index) => ({
    id: post._id,
    slug: post.slug || post._id,
    title: post.title || 'Untitled',
    banglaTitle: '',
    category: post.category || 'General',
    categoryLabel: post.category || 'General',
    date: post.createdAt ? new Date(post.createdAt).toLocaleDateString('bn-BD') : '',
    readTime: '5 min',
    excerpt: post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : ''),
    content: post.content || '',
    imageUrl: post.thumbnailUrl || fallbackImage,
    icon: iconPool[index % iconPool.length],
    accentColor: colorPool[index % colorPool.length]
  }));

  // Build dynamic category tabs from actual data
  const uniqueCategories = Array.from(new Set(articles.map(a => a.category)));
  const categories = [
    { id: 'all', label: 'সব বিষয়' },
    ...uniqueCategories.map(cat => ({ id: cat, label: cat }))
  ];

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const handleArticleAccess = (slug) => {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (isLoggedIn) {
      router.push(`/articles/${slug}`);
    } else {
      setTargetRedirectUrl(`/articles/${slug}`);
      setShowAuthWall(true);
    }
  };

  const handleArchiveAccess = () => {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (isLoggedIn) {
      router.push('/articles');
    } else {
      setTargetRedirectUrl('/articles');
      setSelectedArticle(null);
      setShowAuthWall(true);
    }
  };

  // Don't render section if no articles
  if (articles.length === 0) {
    return null;
  }

  return (
    <section id="ihc" className="py-24 bg-[#0a0f1d] text-white relative overflow-hidden">
      {/* Decorative cosmic background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <RevealAnimation direction="up">
            <span className="px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs sm:text-sm font-bold uppercase tracking-widest inline-flex items-center gap-2 mb-4 border border-gold/20">
              <Sparkles className="w-3.5 h-3.5" />
              ইতিহাস ও ঐতিহ্যের রূপরেখা
            </span>
          </RevealAnimation>

          <RevealAnimation direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              IHC <span className="text-gold">Chronicles</span>
            </h2>
          </RevealAnimation>

          <RevealAnimation direction="up" delay={0.2}>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto font-medium">
              ইসলামী স্বর্ণযুগের জ্ঞানবিজ্ঞান, ইতিহাস এবং নন্দনতত্ত্বের অমূল্য নিদর্শনসমূহ নিয়ে বিশেষ বুদ্ধিবৃত্তিক ও গবেষণাধর্মী আর্টিকেল কালেকশন।
            </p>
          </RevealAnimation>
        </div>

        {/* Category Tabs */}
        {uniqueCategories.length > 1 && (
          <div className="flex justify-center mb-16 px-4 relative z-20">
            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-3 sm:pb-0 no-scrollbar max-w-full bg-slate-900/50 backdrop-blur-md p-2 rounded-2xl border border-white/5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-5 py-2.5 rounded-xl font-bold transition-all text-xs sm:text-sm whitespace-nowrap ${activeCategory === cat.id
                    ? 'text-primary-navy bg-gold shadow-lg shadow-gold/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.slice(0, 4).map((article) => {
              const Icon = article.icon;
              return (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-slate-900/40 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 hover:border-gold/30 shadow-xl hover:shadow-gold/5 transition-all duration-300 group cursor-pointer flex flex-col h-full relative"
                >
                  {/* Glowing hover light */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${article.accentColor}, transparent 60%)`
                    }}
                  />

                  {/* Image Area */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden shrink-0">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-extrabold bg-gold/10 text-gold px-2.5 py-1 rounded-full uppercase tracking-wider border border-gold/15">
                          {article.categoryLabel}
                        </span>
                        <span className="text-[11px] font-medium text-white/40">{article.date}</span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors leading-tight line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3 font-medium mt-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-white/50 text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        <span>{article.readTime} পাঠ</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-gold group-hover:text-white font-extrabold text-xs tracking-wider transition-colors uppercase">
                        পড়ুন
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <RevealAnimation direction="up" delay={0.2}>
            <button
              onClick={handleArchiveAccess}
              className="px-10 py-4 bg-gold hover:bg-gold-light text-primary-navy font-extrabold rounded-2xl shadow-xl shadow-gold/10 hover:shadow-gold/25 transition-all flex items-center gap-2 group"
            >
              সবগুলো আর্টিকেল দেখুন (See All)
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </RevealAnimation>
        </div>
      </div>

      {/* READER DIALOG MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              className="bg-[#0e1626] border border-white/10 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl premium-scrollbar flex flex-col"
              data-lenis-prevent="true"
            >
              <div className="relative h-64 sm:h-72 w-full shrink-0">
                <Image
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1626] via-black/30 to-transparent" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-10 flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-extrabold bg-gold/15 text-gold px-3 py-1 rounded-full border border-gold/20 uppercase tracking-widest">
                    {selectedArticle.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1.5 text-white/40 text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>{selectedArticle.readTime} রিড</span>
                  </div>
                  <span className="text-xs text-white/40 font-semibold">{selectedArticle.date}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 leading-tight">
                  {selectedArticle.title}
                </h3>

                <div className="text-white/80 text-base leading-relaxed space-y-4 font-medium whitespace-pre-line">
                  {selectedArticle.content}
                </div>
              </div>

              <div className="px-6 py-4 bg-[#0a0f1d]/80 backdrop-blur-md border-t border-white/5 flex justify-end gap-4 shrink-0">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-white/80 hover:text-white hover:bg-white/5 font-bold text-sm transition-all"
                >
                  বন্ধ করুন
                </button>
                <button
                  onClick={() => handleArticleAccess(selectedArticle.slug)}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-light text-primary-navy font-extrabold rounded-xl shadow-md transition-all flex items-center gap-1.5 text-sm"
                >
                  পূর্ণাঙ্গ আর্টিকেল দেখুন
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AUTH WALL MODAL */}
      <AnimatePresence>
        {showAuthWall && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthWall(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              className="bg-[#0e1626] border border-white/10 rounded-3xl w-full max-w-md p-6 sm:p-8 relative z-10 shadow-2xl text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 shadow-inner animate-pulse">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                লগইন প্রয়োজন 🔐
              </h3>
              <h4 className="text-gold/90 font-bold text-sm mb-4">Login Required</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium px-2">
                এই গবেষণাধর্মী আর্টিকেলটি সম্পূর্ণ পড়তে অনুগ্রহ করে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন।
              </p>
              <div className="w-full flex flex-col gap-3">
                <Link href={`/login?redirect=${encodeURIComponent(targetRedirectUrl)}`} className="w-full">
                  <button className="w-full py-3.5 bg-gold hover:bg-gold-light text-primary-navy font-extrabold rounded-xl shadow-lg shadow-gold/10 hover:shadow-gold/25 transition-all flex items-center justify-center gap-2 text-sm">
                    লগইন করুন (Login Now)
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/signup" className="w-full">
                  <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl text-sm transition-all">
                    নতুন অ্যাকাউন্ট তৈরি করুন (Register)
                  </button>
                </Link>
                <button
                  onClick={() => setShowAuthWall(false)}
                  className="w-full py-2.5 text-white/50 hover:text-white/80 font-bold text-xs transition-all tracking-wider uppercase mt-2"
                >
                  ফিরে যান (Go Back)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
