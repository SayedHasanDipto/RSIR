'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { RevealAnimation } from './reveal-animation';

const articles = [
  {
    id: 1,
    title: 'The Splendor of Islamic Architecture',
    category: 'Culture',
    date: 'May 10, 2024',
    excerpt: 'Explore the masterpieces of Islamic architecture across centuries.',
    image: '🏛️',
    color: 'from-blue-100 to-blue-50',
  },
  {
    id: 2,
    title: 'Understanding the Quran: A Scholarly Approach',
    category: 'Islamic Studies',
    date: 'May 8, 2024',
    excerpt: 'Deep dive into the interpretation and wisdom of the Quran.',
    image: '📜',
    color: 'from-amber-100 to-amber-50',
  },
  {
    id: 3,
    title: 'The Contributions of Islamic Scientists',
    category: 'History',
    date: 'May 5, 2024',
    excerpt: 'Discover the groundbreaking achievements of Islamic scholars.',
    image: '🔬',
    color: 'from-green-100 to-green-50',
  },
  {
    id: 4,
    title: 'Islamic Calligraphy: Art Meets Spirituality',
    category: 'Art',
    date: 'May 1, 2024',
    excerpt: 'The beauty and significance of Islamic calligraphy through time.',
    image: '🎨',
    color: 'from-purple-100 to-purple-50',
  },
  {
    id: 5,
    title: 'Daily Life in the Ottoman Empire',
    category: 'History',
    date: 'April 28, 2024',
    excerpt: 'A glimpse into the culture and society of the Ottoman era.',
    image: '🏘️',
    color: 'from-rose-100 to-rose-50',
  },
  {
    id: 6,
    title: 'Islamic Philosophy and Ethics',
    category: 'Philosophy',
    date: 'April 25, 2024',
    excerpt: 'Examining the philosophical foundations of Islamic thought.',
    image: '🤔',
    color: 'from-indigo-100 to-indigo-50',
  },
];

export function IhcChronicles() {
  return (
    <section id="ihc" className="py-24 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <RevealAnimation direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">IHC Chronicles</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">Discover fascinating articles on Islamic History & Culture</p>
          </RevealAnimation>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <RevealAnimation 
              key={article.id} 
              direction={index % 3 === 0 ? 'left' : index % 3 === 2 ? 'right' : 'up'}
              delay={index * 0.1}
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all group cursor-pointer h-full flex flex-col"
              >
                {/* Image/Emoji Area */}
                <div className={`relative bg-gradient-to-br ${article.color} h-56 flex items-center justify-center text-7xl overflow-hidden`}>
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    className="relative z-10 transition-transform duration-500"
                  >
                    {article.image}
                  </motion.div>
                  {/* Decorative background circle */}
                  <div className="absolute w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold bg-gold/10 text-gold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs font-medium text-foreground/40">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-gold transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-foreground/60 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <Link href={`/articles/${article.id}`} className="inline-flex items-center gap-2 text-gold hover:text-primary font-bold text-sm transition-all group/link">
                      Read Article
                      <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </RevealAnimation>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <RevealAnimation direction="up" delay={0.4}>
            <Link href="/articles">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary hover:bg-primary-navy-light text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/20 flex items-center gap-2 group"
              >
                Explore All Articles 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
