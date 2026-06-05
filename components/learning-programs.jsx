'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

export function LearningPrograms({ initialLessons = [] }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState(null);

  if (!initialLessons || initialLessons.length === 0) {
    return null;
  }

  const programs = initialLessons.map((lesson, index) => ({
    id: lesson._id,
    title: lesson.title,
    subtitle: lesson.category,
    description: lesson.description || 'No description provided.',
    icon: [BookOpen, Award, Compass, GraduationCap][index % 4],
    color: [
      'from-blue-600/10 to-indigo-600/10',
      'from-amber-600/10 to-orange-600/10',
      'from-emerald-600/10 to-teal-600/10',
      'from-purple-600/10 to-pink-600/10'
    ][index % 4],
    iconBg: [
      'bg-blue-500/10 text-blue-500',
      'bg-amber-500/10 text-amber-500',
      'bg-emerald-500/10 text-emerald-500',
      'bg-purple-500/10 text-purple-500'
    ][index % 4],
    tag: lesson.difficulty || 'Intermediate',
    duration: lesson.duration || 'N/A',
    modulesCount: 'Video Lesson',
    enrolledCount: 'Available Now',
    benefits: [
      'Comprehensive Video Content',
      `Instructor: ${lesson.instructor || 'RSIR Expert'}`,
      `Category: ${lesson.category}`
    ],
    cta: 'Watch Now',
    link: `/lessons/${lesson._id}`
  }));

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="programs" className="py-24 bg-background relative overflow-hidden">
      {/* Background soft glowing lights - CSS only */}
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
              আমাদের <span className="text-gold">ভিডিও লেসনসমূহ</span>
            </h2>
          </RevealAnimation>

          <RevealAnimation direction="up" delay={0.15}>
            <p className="text-foreground/70 text-base sm:text-lg max-w-2xl mx-auto font-medium">
              দক্ষ মেন্টরশিপ ও আধুনিক কারিকুলামের মাধ্যমে আপনার দক্ষতাকে নতুন উচ্চতায় নিয়ে যাওয়ার জন্য বিশেষভাবে ডিজাইনকৃত কোর্সসমূহ।
            </p>
          </RevealAnimation>
        </div>

        {/* Interactive Grid — removed layout prop from cards */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {programs.slice(0, 4).map((program) => {
            const Icon = program.icon;
            const isExpanded = expandedId === program.id;

            return (
              <div
                key={program.id}
                className="group bg-card/60 backdrop-blur-md rounded-3xl border border-border/80 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden hover:-translate-y-1.5 hover:shadow-xl"
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

                  {/* Expandable Benefits Area — simplified animation */}
                  {isExpanded && (
                    <div className="overflow-hidden animate-expand-in">
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
                    </div>
                  )}
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mt-2 pt-2">
                  <button
                    onClick={() => toggleExpand(program.id)}
                    className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-primary/70 hover:text-gold text-sm font-bold border border-border/80 hover:border-gold/30 hover:bg-gold/5 transition-all"
                  >
                    <span>{isExpanded ? 'লুকান' : 'বিস্তারিত মডিউল'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <Link href={program.link} className="shrink-0">
                    <button className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-primary text-white hover:bg-gold hover:text-primary-navy font-bold rounded-xl shadow-lg shadow-primary/10 hover:shadow-gold/15 transition-all group/btn">
                      <span>{program.cta}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </StaggerReveal>

        {/* Global CTA below the grid */}
        <div className="mt-16 text-center">
          <RevealAnimation direction="up" delay={0.2}>
            <button 
              onClick={(e) => {
                e.preventDefault();
                const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
                if (isLoggedIn) {
                  router.push('/lessons');
                } else {
                  router.push('/login?redirect=/lessons');
                }
              }}
              className="px-10 py-4 bg-gold hover:bg-gold-light text-primary-navy font-extrabold rounded-2xl shadow-xl shadow-gold/10 hover:shadow-gold/25 transition-all flex items-center gap-2 mx-auto group"
            >
              সবগুলো ভিডিও লেসন দেখুন (See All)
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
