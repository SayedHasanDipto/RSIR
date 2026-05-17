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

const categories = [
  { id: 'all', label: 'সব বিষয়' },
  { id: 'history', label: 'ইতিহাস ও সাম্রাজ্য' },
  { id: 'culture-art', label: 'শিল্প ও সংস্কৃতি' },
  { id: 'science-philosophy', label: 'বিজ্ঞান ও দর্শন' }
];

const articles = [
  {
    id: 1,
    title: 'The Splendor of Islamic Architecture',
    banglaTitle: 'ইসলামী স্থাপত্যের সোনালী শৈলী',
    category: 'culture-art',
    categoryLabel: 'স্থাপত্য ও সংস্কৃতি',
    date: '১০ মে, ২০২৬',
    readTime: '৬ মিনিট',
    excerpt: 'স্পেনের আলহামব্রা থেকে শুরু করে তুরস্কের ব্লু মস্ক—ইসলামী স্থাপত্যের ঐতিহাসিক নিদর্শন ও তাদের পেছনের অনন্য বিজ্ঞান ও জ্যামিতিক নকশার বিশ্লেষণ।',
    content: `ইসলামী স্থাপত্য কেবল ইটের পর ইট গেঁথে তৈরি কোনো দালান নয়, বরং এটি হলো শিল্প, জ্যামিতি এবং আধ্যাত্মিকতার এক অপূর্ব সংমিশ্রণ। অষ্টম শতাব্দী থেকে শুরু করে ইসলামী বিশ্বের স্থপতিরা এমন সব জ্যামিতিক নকশা এবং গম্বুজ তৈরি করেছিলেন যা আজও আধুনিক স্থপতিদের বিস্মিত করে। 

স্পেনের গ্রানাডার 'আলহামব্রা প্রাসাদ' বা ইস্তাম্বুলের 'সুলতান আহমেদ মসজিদ' (ব্লু মস্ক)-এর দিকে তাকালে দেখা যায় কীভাবে আলো, ছায়া এবং পানির প্রবাহকে জ্যামিতিক নকশার সাথে সমন্বয় করা হয়েছে। ক্যালিগ্রাফি এবং স্টুকো আর্টের সূক্ষ্ম কাজ দেয়ালগুলোকে জীবন্ত করে তুলেছে। এই স্থাপত্যগুলো ইসলামের বৈশ্বিক জ্ঞানচর্চা ও নন্দনতত্ত্বের জীবন্ত দলিল।`,
    imageUrl: 'https://images.unsplash.com/photo-1571908194757-d2dd6571b51c?q=80&w=1248&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    icon: Palette,
    accentColor: 'rgba(59, 130, 246, 0.4)'
  },
  {
    id: 2,
    title: 'Understanding the Quran: A Scholarly Approach',
    banglaTitle: 'পবিত্র কুরআনের বৈজ্ঞানিক ও তাত্ত্বিক বিশ্লেষণ',
    category: 'science-philosophy',
    categoryLabel: 'কুরআন ও বিজ্ঞান',
    date: '৮ মে, ২০২৬',
    readTime: '৮ মিনিট',
    excerpt: 'পবিত্র কুরআনের আয়াতসমূহের ঐতিহাসিক প্রেক্ষাপট, ভাষাগত অলংকার এবং সমকালীন জ্ঞান-বিজ্ঞানের সাথে তাদের যৌক্তিক সামঞ্জস্য নিয়ে একটি বুদ্ধিবৃত্তিক আলোচনা।',
    content: `পবিত্র কুরআন কেবল একটি ধর্মীয় গ্রন্থই নয়, বরং এটি একটি অনন্য ভাষাগত অলৌকিক নিদর্শন (Linguistic Miracle) এবং প্রজ্ঞার উৎস। সপ্তম শতাব্দীর আরবে যেখানে কাব্যচর্চা ছিল অনন্য উচ্চতায়, সেখানে কুরআনের ছন্দ ও গদ্যরীতি আরব কবিদের স্তব্ধ করে দিয়েছিল। 

আধুনিক গবেষক ও স্কলাররা কুরআনের এমন অনেক আয়াতের সন্ধান পেয়েছেন যা আধুনিক জ্যোতির্বিদ্যা, ভ্রূণতত্ত্ব এবং সমুদ্রবিজ্ঞানের আবিষ্কারগুলোর সাথে হুবহু মিলে যায়। যেমন মহাবিশ্বের ক্রমপ্রসারণ (Expanding Universe) কিংবা পর্বতমালার ভূমিকা নিয়ে কুরআনের আয়াতসমূহ আজ বিজ্ঞানীদেরও ভাবিয়ে তুলেছে। এই আর্টিকেলে আমরা তাফসীর ও আধুনিক বিজ্ঞানের আলোকে কুরআনের বুদ্ধিবৃত্তিক ব্যাখ্যা অনুসন্ধান করব।`,
    imageUrl: 'https://images.unsplash.com/photo-1624357824434-27d181804b20?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&q=80',
    icon: BookMarked,
    accentColor: 'rgba(245, 158, 11, 0.4)'
  },
  {
    id: 3,
    title: 'The Contributions of Islamic Scientists',
    banglaTitle: 'মুসলিম বিজ্ঞানীদের যুগান্তকারী আবিষ্কারসমূহ',
    category: 'science-philosophy',
    categoryLabel: 'বিজ্ঞান ও আবিষ্কার',
    date: '৫ মে, ২০২৬',
    readTime: '৭ মিনিট',
    excerpt: 'বীজগণিতের জনক আল-খাওয়ারিজমি থেকে শুরু করে আধুনিক আলোকবিজ্ঞানের প্রতিষ্ঠাতা ইবনে আল-হাইথাম—বিজ্ঞান জগতের মুসলিম পথিকৃৎদের অমূল্য অবদান।',
    content: `ইউরোপ যখন অন্ধ যুগে নিমজ্জিত ছিল, তখন বাগদাদের 'বায়তুল হিকমাহ' (House of Wisdom)-তে মুসলিম বিজ্ঞানীরা বিশ্বকে উপহার দিচ্ছিলেন আধুনিক বিজ্ঞানের ভিত্তি। আল-খাওয়ারিজমি আবিষ্কার করলেন বীজগণিত (Algebra), যা ছাড়া আজকের কম্পিউটার অ্যালগরিদম কল্পনাও করা যায় না।

ইবনে আল-হাইথাম (Alhazen) প্রথম প্রমাণ করলেন কীভাবে আমরা আলো দেখি এবং তার হাত ধরেই আবিষ্কৃত হলো ক্যামেরার আদি রূপ 'ক্যামেরা অবস্কিউরা' ও আধুনিক অপটিক্স। ইবনে সিনা (Avicenna)-এর চিকিৎসাশাস্ত্রের বিশ্বকোষ 'আল-কানুন ফিত-তিব' শত শত বছর ধরে ইউরোপের বিশ্ববিদ্যালয়গুলোতে প্রধান পাঠ্যবই হিসেবে ব্যবহৃত হয়েছে। আধুনিক সভ্যতার প্রতিটি পদে রয়েছে এই মহান বিজ্ঞানীদের অবদান।`,
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80',
    icon: Globe,
    accentColor: 'rgba(16, 185, 129, 0.4)'
  },
  {
    id: 4,
    title: 'Islamic Calligraphy: Art Meets Spirituality',
    banglaTitle: 'ইসলামী ক্যালিগ্রাফি: বর্ণে বর্ণে আধ্যাত্মিকতার ছোঁয়া',
    category: 'culture-art',
    categoryLabel: 'শিল্প ও ক্যালিগ্রাফি',
    date: '১ মে, ২০২৬',
    readTime: '৫ মিনিট',
    excerpt: 'নাসখ, থুলুথ এবং কুফিক লিপির নান্দনিক রূপান্তর এবং কীভাবে ক্যালিগ্রাফি ইসলামী সংস্কৃতিতে আধ্যাত্মিক ধ্যানের অন্যতম রূপ হিসেবে প্রতিষ্ঠিত হলো।',
    content: `ক্যালিগ্রাফি ইসলামী শিল্পকলার সবচেয়ে সম্মানিত ও নান্দনিক মাধ্যম। মূর্তিপূজা বা প্রতিকৃতি অঙ্কনের নিষেধাজ্ঞার প্রেক্ষাপট থেকে মুসলিম শিল্পীরা তাদের সমস্ত সৃজনশীলতা ঢেলে দিয়েছিলেন আল্লাহর পবিত্র বাণীকে অক্ষরের শৈল্পিক রূপ দেওয়ার কাজে।

কুফিক লিপি (Kufic) থেকে শুরু করে থুলুথ (Thuluth) ও নাসখ (Naskh) লিপির জ্যামিতিক নিখুঁত অনুপাত তৈরি করতে শিল্পীরা বছরের পর বছর সাধনা করতেন। প্রতিটি টান, প্রতিটি বিন্দুর পেছনে লুকিয়ে থাকত গভীর আধ্যাত্মিক ধ্যান। এই অনন্য শিল্পরীতি কীভাবে শতাব্দী পেরিয়ে আজও সমকালীন মডার্ন আর্টের সাথে মিশে গেছে, তাই আমরা আলোচনা করব।`,
    imageUrl: 'https://images.unsplash.com/photo-1766326057606-2497458466fb?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&q=80',
    icon: Palette,
    accentColor: 'rgba(168, 85, 247, 0.4)'
  },
  {
    id: 5,
    title: 'Daily Life in the Ottoman Empire',
    banglaTitle: 'উসমানীয় সাম্রাজ্যের দৈনিক জীবন ও সামাজিক ঐতিহ্য',
    category: 'history',
    categoryLabel: 'ইতিহাস ও সমাজ',
    date: '২৮ এপ্রিল, ২০২৬',
    readTime: '৬ মিনিট',
    excerpt: 'তিনটি মহাদেশ জুড়ে বিস্তৃত উসমানীয় সালতানাতের সাধারণ নাগরিকদের জীবনযাত্রা, কফি হাউজের ঐতিহ্য, শিক্ষা এবং তাদের সামাজিক সুশাসনের চমৎকার বিবরণ।',
    content: `উসমানীয় সাম্রাজ্য (Ottoman Empire) কেবল যুদ্ধ এবং বিজয়ের ইতিহাস নয়, বরং এটি ছিল এক সমৃদ্ধ সামাজিক ও সাংস্কৃতিক মেলবন্ধন। উসমানীয় ইস্তাম্বুলের কফি হাউজগুলো ছিল কবি, বুদ্ধিজীবী এবং সাধারণ নাগরিকদের আড্ডার স্থল, যেখানে নিয়মিত জন্ম নিত নতুন সব দার্শনিক ও রাজনৈতিক চিন্তা।

উসমানীয়দের অনন্য জনকল্যাণমূলক ব্যবস্থা (Waqf) এবং চিকিৎসা ব্যবস্থা ছিল সমসাময়িক বিশ্বের চেয়ে অনেক এগিয়ে। তাদের সমাজে প্রতিটি ধর্মের মানুষ নিজস্ব ধর্মীয় স্বাধীনতায় শান্তিতে বসবাস করত। উসমানীয় সুলতানদের রাজকীয় জীবনযাত্রা থেকে শুরু করে সাধারণ তুর্কি নাগরিকদের ঘরোয়া সংস্কৃতি নিয়ে সাজানো হয়েছে এই আর্টিকেলটি।`,
    imageUrl: 'https://images.unsplash.com/photo-1665465651786-988659be475c?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&q=80',
    icon: Compass,
    accentColor: 'rgba(239, 68, 68, 0.4)'
  },
  {
    id: 6,
    title: 'Islamic Philosophy and Ethics',
    banglaTitle: 'ইসলামী দর্শন, যুক্তিবিদ্যা ও নৈতিক আদর্শ',
    category: 'science-philosophy',
    categoryLabel: 'দর্শন ও যুক্তি',
    date: '২৫ এপ্রিল, ২০২৬',
    readTime: '৯ মিনিট',
    excerpt: 'আল-গাজালির আধ্যাত্মিক দর্শন এবং ইবনে রুশদের যুক্তিবাদী চিন্তাধারার মধ্যে মেলবন্ধন। কীভাবে ইসলামী দর্শন বিশ্বব্যাপী নৈতিকতার নতুন দিগন্ত খুলে দেয়।',
    content: `ইসলামী দর্শন (Falsafa) গ্রীক যুক্তিবিদ্যাকে ধারণ করে তা ঈমান ও ওহীর আলোর সাথে সমন্বয় ঘটিয়েছে। ইমাম আল-গাজালি (Al-Ghazali) যখন সংশয়বাদের ঝড় কাটিয়ে আধ্যাত্মিক সুফিবাদের দিকে পা বাড়ান, তখন তিনি ইসলামের তাত্ত্বিক রূপকে এক মজবুত ভিত্তি দেন। 

অন্যদিকে ইবনে রুশদ (Averroes) অ্যারিস্টটলের দর্শনকে এমন চমৎকারভাবে ব্যাখ্যা করেছিলেন যা পরবর্তীকালে ইউরোপের রেনেসাঁ বা নবজাগরণের প্রধান চালিকাশক্তিতে পরিণত হয়েছিল। জ্ঞান, যুক্তি এবং ঐশ্বরিক সত্যের মধ্যকার ভারসাম্যই ইসলামী দর্শনের মূল সৌন্দর্য। এই দর্শনে নৈতিকতা কেবল একটি ধারণা নয়, বরং এটি মানুষের দৈনন্দিন আচরণের প্রধান নির্দেশিকা।`,
    imageUrl: 'https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&q=80',
    icon: BookOpen,
    accentColor: 'rgba(99, 102, 241, 0.4)'
  }
];

export function IhcChronicles() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAuthWall, setShowAuthWall] = useState(false);
  const [targetRedirectUrl, setTargetRedirectUrl] = useState('');

  const handleArticleAccess = (articleId) => {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    if (isLoggedIn) {
      router.push(`/articles/${articleId}`);
    } else {
      setTargetRedirectUrl(`/articles/${articleId}`);
      setSelectedArticle(null);
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

  const filteredArticles = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory);

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
              ইসলামী স্বর্ণযুগের জ্ঞানবিজ্ঞান, ইতিহাস এবং নন্দনতত্ত্বের অমূল্য নিদর্শনসমূহ নিয়ে বিশেষ বুদ্ধিবৃত্তিক ও গবেষণাধর্মী আর্টিকেল কালেকশন।
            </p>
          </RevealAnimation>
        </div>

        {/* Category Tabs / Filters */}
        <div className="flex justify-center mb-16 px-4">
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

        {/* Responsive Grid with Framer Motion AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, index) => {
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
                      {/* Meta Tags */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-extrabold bg-gold/10 text-gold px-2.5 py-1 rounded-full uppercase tracking-wider border border-gold/15">
                          {article.categoryLabel}
                        </span>
                        <span className="text-[11px] font-medium text-white/40">{article.date}</span>
                      </div>

                      {/* Titles */}
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors leading-tight line-clamp-1">
                        {article.title}
                      </h3>
                      <h4 className="text-sm font-bold text-gold/90 mb-4 line-clamp-1">
                        {article.banglaTitle}
                      </h4>

                      {/* Excerpt */}
                      <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Bottom row */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-white/50 text-xs font-semibold">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        <span>{article.readTime} পাঠ</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-gold group-hover:text-white font-extrabold text-xs tracking-wider transition-colors group/link uppercase">
                        পড়ুন
                        <ArrowRight className="w-4.5 h-4.5 group-hover/link:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Global Button */}
        <div className="flex justify-center mt-16">
          <RevealAnimation direction="up" delay={0.2}>
            <button
              onClick={handleArchiveAccess}
              className="px-10 py-4 bg-gold hover:bg-gold-light text-primary-navy font-extrabold rounded-2xl shadow-xl shadow-gold/10 hover:shadow-gold/25 transition-all flex items-center gap-2 group"
            >
              সবগুলো আর্টিকেল দেখুন
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </RevealAnimation>
        </div>
      </div>

      {/* GORGEOUS READER DIALOG MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card content */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              className="bg-[#0e1626] border border-white/10 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl no-scrollbar flex flex-col"
            >
              {/* Header Image Cover */}
              <div className="relative h-64 sm:h-72 w-full shrink-0">
                <Image
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1626] via-black/30 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Text Area */}
              <div className="p-6 sm:p-10 flex-grow">
                {/* Tags */}
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

                {/* Heading titles */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
                  {selectedArticle.title}
                </h3>
                <h4 className="text-lg sm:text-xl font-bold text-gold mb-6">
                  {selectedArticle.banglaTitle}
                </h4>

                {/* Actual Article content paragraphs */}
                <div className="text-white/80 text-base leading-relaxed space-y-4 font-medium whitespace-pre-line">
                  {selectedArticle.content}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-4 bg-[#0a0f1d]/80 backdrop-blur-md border-t border-white/5 flex justify-end gap-4 shrink-0">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-white/80 hover:text-white hover:bg-white/5 font-bold text-sm transition-all"
                >
                  বন্ধ করুন
                </button>
                <button
                  onClick={() => handleArticleAccess(selectedArticle.id)}
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

      {/* AUTHENTICATION WALL MODAL */}
      <AnimatePresence>
        {showAuthWall && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthWall(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Card content */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              className="bg-[#0e1626] border border-white/10 rounded-3xl w-full max-w-md p-6 sm:p-8 relative z-10 shadow-2xl text-center flex flex-col items-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-6 shadow-inner animate-pulse">
                <Lock className="w-8 h-8" />
              </div>

              {/* Headings */}
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                লগইন প্রয়োজন 🔐
              </h3>
              <h4 className="text-gold/90 font-bold text-sm mb-4">
                Login Required
              </h4>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-6 font-medium px-2">
                এই গবেষণাধর্মী আর্টিকেলটি সম্পূর্ণ পড়তে অনুগ্রহ করে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন। এটি শিক্ষার্থীদের জন্য একটি বিশেষ সুযোগ!
              </p>

              {/* Actions */}
              <div className="w-full flex flex-col gap-3">
                <Link href={`/login?redirect=${encodeURIComponent(targetRedirectUrl)}`} className="w-full">
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
    </section>
  );
}
