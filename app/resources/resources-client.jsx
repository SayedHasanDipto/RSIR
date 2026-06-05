'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Download, 
  Search, 
  Lock, 
  X,
  FileUp,
  BookOpen,
  FolderOpen
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { StaggerReveal } from '@/components/stagger-reveal';

export function ResourcesClient({ dbResources = [] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAuthWall, setShowAuthWall] = useState(false);
  const [targetDownloadUrl, setTargetDownloadUrl] = useState('');

  // Format resources
  const resources = dbResources.map((r) => ({
    id: r._id,
    title: r.title || 'Untitled Resource',
    category: r.category || 'General',
    date: r.createdAt ? new Date(r.createdAt).toLocaleDateString('bn-BD') : '—',
    size: r.fileSize ? (r.fileSize < 1024 * 1024 ? `${(r.fileSize / 1024).toFixed(1)} KB` : `${(r.fileSize / (1024 * 1024)).toFixed(1)} MB`) : '—',
    fileUrl: r.fileUrl || null,
    description: r.description || '',
    downloadCount: r.downloadCount || 0
  }));

  // Categories
  const uniqueCategories = Array.from(new Set(resources.map(r => r.category)));
  const categories = [
    { id: 'all', label: 'সব ক্যাটাগরি' },
    ...uniqueCategories.map(cat => ({ id: cat, label: cat }))
  ];

  // Filter & Search
  const filteredResources = resources.filter(res => {
    const matchesCategory = activeCategory === 'all' || res.category === activeCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (fileUrl, id) => {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (isLoggedIn) {
      // Record download
      fetch(`/api/admin/resources/${id}/download`, { method: 'POST' }).catch(() => {});
      window.open(fileUrl, '_blank');
    } else {
      setTargetDownloadUrl(fileUrl);
      setShowAuthWall(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white pt-24 relative overflow-hidden flex flex-col justify-between">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 w-full flex-grow">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gold font-extrabold hover:text-gold-light mb-6 group transition-colors text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <span className="px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 mb-4 border border-gold/20">
            <FolderOpen className="w-3.5 h-3.5" />
            রিসোর্স ব্যাংক
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Study <span className="text-gold">Resources</span>
          </h1>
          
          <p className="text-white/70 text-lg leading-relaxed font-medium">
            ইংরেজি গ্রামার, সাহিত্য, এবং ইসলামী ইতিহাস বিষয়ের প্রয়োজনীয় হ্যান্ডআউট, লেকচার শিট এবং পিডিএফ নোটস ডাউনলোড করুন।
          </p>
        </div>

        {/* Filter Controls (Search + Categories) */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/5">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar max-w-full w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all text-xs sm:text-sm whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'text-primary-navy bg-gold shadow-lg shadow-gold/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="রিসোর্স অনুসন্ধান করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0a0f1d] border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors text-white placeholder-white/30"
            />
          </div>
        </div>

        {/* Resource Items Grid */}
        <StaggerReveal selector=".resource-card-wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="resource-card-wrap bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/5 hover:border-gold/30 shadow-xl hover:shadow-gold/5 transition-all duration-300 group flex flex-col justify-between h-full relative"
              >
                <div>
                  {/* Category Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-extrabold bg-gold/10 text-gold px-2.5 py-1 rounded-full uppercase tracking-wider border border-gold/15">
                      {res.category}
                    </span>
                    <span className="text-[11px] font-medium text-white/40">{res.date}</span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex gap-4 items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gold shrink-0 border border-white/5">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors leading-tight mb-2 line-clamp-2">
                        {res.title}
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {res.description || 'এই রিসোর্সের কোনো বিবরণ দেওয়া হয়নি।'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer and Download Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-white/50">{res.size}</span>
                  
                  {res.fileUrl ? (
                    <button
                      onClick={() => handleDownload(res.fileUrl, res.id)}
                      className="flex items-center gap-2 bg-gold hover:bg-gold-light text-primary-navy px-4 py-2 rounded-xl font-extrabold text-xs transition-all shadow-md group/btn"
                    >
                      <Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                      ডাউনলোড
                    </button>
                  ) : (
                    <span className="text-xs text-white/20 font-medium">কোনো ফাইল নেই</span>
                  )}
                </div>
              </div>
            ))}

            {filteredResources.length === 0 && (
              <div className="col-span-full py-20 text-center flex flex-col items-center">
                <FileUp className="w-16 h-16 text-white/20 mb-4" />
                <h3 className="text-xl font-bold text-white mb-1">কোনো রিসোর্স পাওয়া যায়নি</h3>
                <p className="text-white/40 text-sm">অনুগ্রহ করে অন্য কোনো সার্চ বা ফিল্টার চেষ্টা করুন।</p>
              </div>
            )}
          </div>
        </StaggerReveal>
      </div>

      {/* AUTHENTICATION WALL MODAL */}
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
              className="bg-[#0e1626] border border-white/10 rounded-3xl w-full max-w-md p-6 sm:p-8 relative z-10 shadow-2xl text-center flex flex-col items-center text-white"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 shadow-inner animate-pulse">
                <Lock className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                লগইন প্রয়োজন 🔐
              </h3>
              <h4 className="text-gold/90 font-bold text-sm mb-4">
                Login Required
              </h4>

              <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium px-2">
                এই স্টাডি শিট/রিসোর্সটি ডাউনলোড করতে অনুগ্রহ করে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন।
              </p>

              <div className="w-full flex flex-col gap-3">
                <Link href={`/login?redirect=${encodeURIComponent('/resources')}`} className="w-full">
                  <button className="w-full py-3.5 bg-gold hover:bg-gold-light text-primary-navy font-extrabold rounded-xl shadow-lg shadow-gold/10 hover:shadow-gold/25 transition-all flex items-center justify-center gap-2 text-sm">
                    লগইন করুন (Login Now)
                    <ArrowRight className="w-4.5 h-4.5" />
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

      <Footer />
    </main>
  );
}
