'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { StaggerReveal } from '@/components/stagger-reveal';

// Using the same articles data as in the component for now
const articles = [
  { id: 1, title: 'The Splendor of Islamic Architecture', category: 'Culture', date: 'May 10, 2024', excerpt: 'Explore the masterpieces of Islamic architecture across centuries.', image: '🏛️', color: 'from-blue-100 to-blue-50' },
  { id: 2, title: 'Understanding the Quran: A Scholarly Approach', category: 'Islamic Studies', date: 'May 8, 2024', excerpt: 'Deep dive into the interpretation and wisdom of the Quran.', image: '📜', color: 'from-amber-100 to-amber-50' },
  { id: 3, title: 'The Contributions of Islamic Scientists', category: 'History', date: 'May 5, 2024', excerpt: 'Discover the groundbreaking achievements of Islamic scholars.', image: '🔬', color: 'from-green-100 to-green-50' },
  { id: 4, title: 'Islamic Calligraphy: Art Meets Spirituality', category: 'Art', date: 'May 1, 2024', excerpt: 'The beauty and significance of Islamic calligraphy through time.', image: '🎨', color: 'from-purple-100 to-purple-50' },
  { id: 5, title: 'Daily Life in the Ottoman Empire', category: 'History', date: 'April 28, 2024', excerpt: 'A glimpse into the culture and society of the Ottoman era.', image: '🏘️', color: 'from-rose-100 to-rose-50' },
  { id: 6, title: 'Islamic Philosophy and Ethics', category: 'Philosophy', date: 'April 25, 2024', excerpt: 'Examining the philosophical foundations of Islamic thought.', image: '🤔', color: 'from-indigo-100 to-indigo-50' },
];

export default function AllArticlesPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mb-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gold font-bold hover:underline mb-4 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6">IHC Chronicles</h1>
          <p className="text-foreground/60 text-xl leading-relaxed">
            Delve into the rich tapestry of Islamic History and Culture through our curated collection of articles and scholarly insights.
          </p>
        </div>

        <StaggerReveal selector=".article-card">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`} className="article-card">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-all group h-full flex flex-col"
                >
                  <div className={`h-56 bg-gradient-to-br ${article.color} flex items-center justify-center text-7xl`}>
                    <motion.span whileHover={{ scale: 1.1 }}>{article.image}</motion.span>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold bg-gold/10 text-gold px-3 py-1 rounded-full uppercase">
                        {article.category}
                      </span>
                      <span className="text-xs text-foreground/40 font-medium">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-gold transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-foreground/60 text-sm line-clamp-2 mb-6">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-gold font-bold text-sm">
                      Read More <ArrowRight size={16} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </StaggerReveal>
      </div>

      <Footer />
    </main>
  );
}
