'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, BookOpen, Star, PlayCircle, CheckCircle2 } from 'lucide-react';
import { lessons } from '@/lib/lessons-data';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { RevealAnimation } from '@/components/reveal-animation';
import Image from 'next/image';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lesson = lessons.find(l => l.id === params.id);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Lesson Not Found</h1>
          <button 
            onClick={() => router.push('/')}
            className="text-gold hover:underline font-bold"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-gold transition-colors font-bold mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            {/* Video Player Placeholder */}
            <RevealAnimation direction="up">
              <div className="relative aspect-video bg-primary-navy rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative z-10"
                  >
                    <PlayCircle size={100} className="text-white opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-2xl" />
                  </motion.div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div className="text-white">
                    <p className="text-gold font-bold uppercase tracking-widest text-xs mb-2">Streaming Now</p>
                    <h2 className="text-2xl font-bold">{lesson.title}</h2>
                  </div>
                </div>
                {/* Decorative overlay */}
                <div className="absolute inset-0 border-[16px] border-white/10 pointer-events-none rounded-3xl" />
              </div>
            </RevealAnimation>

            {/* Lesson Info */}
            <div className="space-y-6">
              <RevealAnimation direction="up" delay={0.2}>
                <div className="flex flex-wrap gap-4 items-center mb-4">
                  <span className="px-4 py-1.5 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-wider">
                    {lesson.category}
                  </span>
                  <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                    {lesson.difficulty}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                  {lesson.title}
                </h1>
              </RevealAnimation>

              <RevealAnimation direction="up" delay={0.3}>
                <p className="text-xl text-foreground/70 leading-relaxed italic border-l-4 border-gold pl-6">
                  {lesson.description}
                </p>
              </RevealAnimation>

              <RevealAnimation direction="up" delay={0.4}>
                <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed pt-6">
                  <h3 className="text-2xl font-bold text-primary mb-4">Lesson Overview</h3>
                  <p>{lesson.content}</p>
                </div>
              </RevealAnimation>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Instructor Card */}
            <RevealAnimation direction="right">
              <div className="bg-white rounded-3xl border border-border/50 p-8 shadow-xl shadow-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden relative shadow-lg shrink-0">
                    <Image
                      src="/hero.jpg"
                      alt={lesson.instructor}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gold uppercase tracking-tighter">Instructor</p>
                    <p className="text-xl font-bold text-primary">{lesson.instructor}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                  An expert in both English linguistics and Islamic history, dedicated to bridging cultures through education.
                </p>
                <div className="flex gap-2">
                  <Star size={16} className="fill-gold text-gold" />
                  <Star size={16} className="fill-gold text-gold" />
                  <Star size={16} className="fill-gold text-gold" />
                  <Star size={16} className="fill-gold text-gold" />
                  <Star size={16} className="fill-gold text-gold" />
                  <span className="text-xs font-bold text-primary ml-2">5.0 (482 Reviews)</span>
                </div>
              </div>
            </RevealAnimation>

            {/* Quick Stats */}
            <RevealAnimation direction="right" delay={0.1}>
              <div className="bg-primary-navy rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-gold/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                <h3 className="text-lg font-bold mb-6 relative z-10">Quick Details</h3>
                <ul className="space-y-6 relative z-10">
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Clock size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Duration</p>
                      <p className="font-bold">{lesson.duration}</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <BookOpen size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Lessons</p>
                      <p className="font-bold">1 Module • 4 Sections</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <User size={20} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Students</p>
                      <p className="font-bold">1.2K+ Enrolled</p>
                    </div>
                  </li>
                </ul>
              </div>
            </RevealAnimation>

            {/* Learning Outcomes */}
            <RevealAnimation direction="right" delay={0.2}>
              <div className="bg-white rounded-3xl border border-border/50 p-8 shadow-xl shadow-gray-100">
                <h3 className="text-lg font-bold text-primary mb-6">What you'll learn</h3>
                <ul className="space-y-4">
                  {[
                    "Master core terminology",
                    "Analyze complex case studies",
                    "Practical application tasks",
                    "Final assessment guide"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <CheckCircle2 size={18} className="text-gold mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
