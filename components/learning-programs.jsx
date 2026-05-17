'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Award, 
  Compass, 
  GraduationCap, 
  Clock, 
  Users, 
  Layers, 
  CheckCircle2, 
  ChevronDown, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { RevealAnimation } from './reveal-animation';
import { StaggerReveal } from './stagger-reveal';

const programs = [
  {
    id: 'english-mastery',
    title: 'English Mastery Hub',
    subtitle: 'ইংরেজি দক্ষতা অর্জন',
    description: 'সহজ ও কার্যকর পদ্ধতিতে শূন্য থেকে অ্যাডভান্স লেভেলের ইংরেজি শিখুন। ব্যাকরণ ও বাস্তব জীবনের কথোপকথনে দক্ষ হয়ে উঠুন।',
    icon: BookOpen,
    color: 'from-blue-600/10 to-indigo-600/10',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    iconBg: 'bg-blue-500/10 text-blue-500',
    tag: 'জনপ্রিয়',
    duration: '৪ মাস',
    modulesCount: '১৬টি মডিউল',
    enrolledCount: '১২০০+ শিক্ষার্থী',
    benefits: [
      'ব্যবহারিক ইংরেজি ব্যাকরণ ও ভোকাবুলারি',
      'দৈনন্দিন কথোপকথনের নিয়মিত প্র্যাকটিস সেশন',
      'উচ্চারণ ও ফোনেটিক্স (Pronunciation & Phonetics)',
      'সারাজীবন লাইভ মেন্টরশিপ ও গ্রুপ স্টাডি সাপোর্ট'
    ],
    cta: 'শুরু করুন',
    link: '/signup'
  },
  {
    id: 'ielts-blueprint',
    title: 'IELTS Band 7.5+ Blueprint',
    subtitle: 'আইইএলটিএস প্রস্তুতি',
    description: 'উচ্চশিক্ষা ও ক্যারিয়ার গঠনে প্রয়োজনীয় IELTS স্কোরে পৌঁছাতে সম্পূর্ণ গাইডলাইন। রিয়েল-টাইম মক টেস্ট ও মেন্টর ফিডব্যাক।',
    icon: Award,
    color: 'from-amber-600/10 to-orange-600/10',
    glowColor: 'rgba(245, 158, 11, 0.15)',
    iconBg: 'bg-amber-500/10 text-amber-500',
    tag: 'প্রো',
    duration: '৩ মাস',
    modulesCount: '১২টি মডিউল',
    enrolledCount: '৪৫০+ শিক্ষার্থী',
    benefits: [
      '৪টি সেগমেন্ট (Listening, Reading, Writing, Speaking) কভার',
      '১-অন-১ স্পিকিং প্র্যাকটিস ও স্পেশাল ফিডব্যাক সেশন',
      'রাইটিং টাস্ক লাইভ ইভালুয়েশন ও ব্যান্ড স্কোরের প্রজেকশন',
      '১০+ ফুল-লেন্থ মক টেস্ট ও রিয়েল এক্সাম টিপস'
    ],
    cta: 'প্রস্তুতি নিন',
    link: '/signup'
  },
  {
    id: 'islamic-history',
    title: 'Islamic History & Culture',
    subtitle: 'ইসলামী ইতিহাস ও সংস্কৃতি',
    description: 'ইসলামের সোনালী ইতিহাস, ঐতিহ্য ও সংস্কৃতির গভীরে অনুসন্ধান। সভ্যতার উত্থান-পতন ও আমাদের সমকালীন শিক্ষা।',
    icon: Compass,
    color: 'from-emerald-600/10 to-teal-600/10',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    iconBg: 'bg-emerald-500/10 text-emerald-500',
    tag: 'ফ্রি কোর্স',
    duration: 'সেলফ-পেসড',
    modulesCount: '২৪টি লেকচার',
    enrolledCount: '৮০০+ শিক্ষার্থী',
    benefits: [
      'খোলাফায়ে রাশেদীনের ইতিহাস ও সমকালীন খেলাফত',
      'ইসলামী সভ্যতার সোনালী যুগ ও বিজ্ঞানচর্চা',
      'ঐতিহাসিক মানচিত্র ও ডকুমেন্টারি ভিডিও মডিউলস',
      'সাপ্তাহিক স্পেশাল লাইভ আলোচনা ও কুইজ সেশন'
    ],
    cta: 'অন্বেষণ করুন',
    link: '/signup'
  },
  {
    id: 'academic-support',
    title: 'Academic Foundation',
    subtitle: 'একাডেমিক সাপোর্ট',
    description: 'স্কুল, কলেজ ও মাদ্রাসা সিলেবাসের ওপর বোর্ড পরীক্ষার সিলেবাস নিখুঁতভাবে শেষ করতে বিশেষ একাডেমিক মেন্টরশিপ।',
    icon: GraduationCap,
    color: 'from-purple-600/10 to-pink-600/10',
    glowColor: 'rgba(168, 85, 247, 0.15)',
    iconBg: 'bg-purple-500/10 text-purple-500',
    tag: 'একাডেমিক',
    duration: '৬ মাস',
    modulesCount: '৩০টি মডিউল',
    enrolledCount: '৬০০+ শিক্ষার্থী',
    benefits: [
      'এইচএসসি ও আলিম সিলেবাসের ওপর পূর্ণাঙ্গ প্রস্তুতি',
      'জটিল অধ্যায়গুলোর সহজতম বাংলা ব্যাখ্যা ও ক্লাস',
      'এক্সাম হ্যাকস ও টেস্ট পেপার সলভ করার কৌশল',
      'প্রতি সপ্তাহের বিশেষ ডাউট-ক্লিয়ারিং প্র্যাক্টিক্যাল ক্লাস'
    ],
    cta: 'ভর্তি হোন',
    link: '/signup'
  }
];

export function LearningPrograms() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="programs" className="py-24 bg-background relative overflow-hidden">
      {/* Background soft glowing lights */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary-navy-light/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <RevealAnimation direction="up">
            <span className="px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs sm:text-sm font-bold uppercase tracking-widest inline-flex items-center gap-2 mb-4 border border-gold/20">
              <Sparkles className="w-3.5 h-3.5" />
              আপনার শিক্ষাগত যাত্রা
            </span>
          </RevealAnimation>
          
          <RevealAnimation direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4 tracking-tight leading-tight">
              আমাদের <span className="text-gold">সিগনেচার প্রোগ্রামসমূহ</span>
            </h2>
          </RevealAnimation>

          <RevealAnimation direction="up" delay={0.2}>
            <p className="text-foreground/70 text-base sm:text-lg max-w-2xl mx-auto font-medium">
              দক্ষ মেন্টরশিপ ও আধুনিক কারিকুলামের মাধ্যমে আপনার দক্ষতাকে নতুন উচ্চতায় নিয়ে যাওয়ার জন্য বিশেষভাবে ডিজাইনকৃত কোর্সসমূহ।
            </p>
          </RevealAnimation>
        </div>

        {/* Interactive Grid */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {programs.map((program) => {
            const Icon = program.icon;
            const isExpanded = expandedId === program.id;

            return (
              <motion.div
                key={program.id}
                layout
                whileHover={{ 
                  y: -6,
                  boxShadow: `0 20px 40px -15px ${program.glowColor || 'rgba(0,0,0,0.1)'}`
                }}
                transition={{ duration: 0.3 }}
                className={`group bg-card/60 backdrop-blur-md rounded-3xl border border-border/80 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden`}
              >
                {/* Decorative program glow background */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${program.color} rounded-bl-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                <div>
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${program.iconBg} flex items-center justify-center shadow-inner`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider bg-gold/10 text-gold border border-gold/20">
                      {program.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-primary mb-1 group-hover:text-gold transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gold/90 font-extrabold text-sm mb-4">
                    {program.subtitle}
                  </p>

                  <p className="text-foreground/75 text-sm leading-relaxed mb-6">
                    {program.description}
                  </p>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3 py-4 border-y border-border/60 mb-6 text-xs sm:text-sm font-semibold text-foreground/70">
                    <div className="flex items-center gap-1.5 justify-center bg-background/40 py-2 px-1 rounded-xl">
                      <Clock className="w-4 h-4 text-gold shrink-0" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-center bg-background/40 py-2 px-1 rounded-xl">
                      <Layers className="w-4 h-4 text-gold shrink-0" />
                      <span>{program.modulesCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-center bg-background/40 py-2 px-1 rounded-xl">
                      <Users className="w-4 h-4 text-gold shrink-0" />
                      <span>{program.enrolledCount}</span>
                    </div>
                  </div>

                  {/* Expandable Benefits Area */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 pb-6">
                          <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
                            প্রোগ্রাম এর মূল সুবিধাসমূহ:
                          </h4>
                          {program.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-foreground/80 text-sm">
                              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="font-medium leading-relaxed">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mt-2 pt-2">
                  <button
                    onClick={() => toggleExpand(program.id)}
                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-primary/70 hover:text-gold text-sm font-bold border border-border/80 hover:border-gold/30 hover:bg-gold/5 transition-all"
                  >
                    <span>{isExpanded ? 'লুকান' : 'বিস্তারিত মডিউল'}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <Link href={program.link} className="shrink-0">
                    <button className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-primary text-white hover:bg-gold hover:text-primary-navy font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-gold/15 transition-all group/btn">
                      <span>{program.cta}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </StaggerReveal>

        {/* Global CTA below the grid */}
        <div className="mt-16 text-center">
          <RevealAnimation direction="up" delay={0.3}>
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl bg-card/40 backdrop-blur-md border border-border/60 shadow-xl max-w-xl mx-auto">
              <span className="text-sm sm:text-base font-bold text-foreground/75 px-3">
                আপনার জন্য কোন লার্নিং ট্র্যাকটি উপযুক্ত বুঝতে পারছেন না?
              </span>
              <Link href="/signup">
                <button className="px-6 py-3 bg-gold text-primary font-extrabold rounded-2xl hover:bg-gold-light hover:scale-105 transition-all shadow-md">
                  ফ্রি কাউন্সেলিং নিন
                </button>
              </Link>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
