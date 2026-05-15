'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Clock, Star } from 'lucide-react';
import { lessons } from '@/lib/lessons-data';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { StaggerReveal } from '@/components/stagger-reveal';

export default function AllLessonsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gold font-bold hover:underline mb-2 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary">All Video Lessons</h1>
            <p className="text-foreground/60 text-lg max-w-xl">
              Our complete library of English language and Islamic History & Culture educational content.
            </p>
          </div>
          <div className="bg-white border border-border/50 px-6 py-4 rounded-2xl shadow-sm hidden md:block">
            <p className="text-primary font-bold">
              <span className="text-gold">{lessons.length}</span> Total Lessons
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* English Hub Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">EN</span>
              English Hub
            </h2>
            <StaggerReveal selector=".lesson-card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {lessons.filter(l => l.category === 'English Hub').map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            </StaggerReveal>
          </div>

          {/* IHC Chronicles Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm">IHC</span>
              IHC Chronicles
            </h2>
            <StaggerReveal selector=".lesson-card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {lessons.filter(l => l.category === 'IHC Chronicles').map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            </StaggerReveal>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function LessonCard({ lesson }) {
  return (
    <Link href={`/lessons/${lesson.id}`} className="lesson-card group">
      <motion.div
        whileHover={{ y: -8 }}
        className="bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
      >
        <div className="relative aspect-video bg-primary-navy-light flex items-center justify-center text-4xl overflow-hidden">
          <motion.span 
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="relative z-10 transition-transform duration-500"
          >
            {lesson.thumbnail}
          </motion.span>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <Play size={40} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="p-5 flex-grow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded">
              {lesson.difficulty}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-foreground/40 font-bold">
              <Clock size={12} />
              {lesson.duration}
            </div>
          </div>
          <h3 className="font-bold text-primary group-hover:text-gold transition-colors line-clamp-2">
            {lesson.title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}
