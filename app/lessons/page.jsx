import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Play, Clock } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getLessons } from '@/lib/content';

export default async function AllLessonsPage() {
  const lessons = await getLessons();

  const englishLessons = lessons.filter(l => l.category === 'English Hub');
  const ihcLessons = lessons.filter(l => l.category === 'IHC Chronicles');

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {englishLessons.map((lesson) => (
                <LessonCard key={lesson._id} lesson={lesson} />
              ))}
              {englishLessons.length === 0 && (
                <p className="text-foreground/40 col-span-2 text-center py-8">No English lessons yet.</p>
              )}
            </div>
          </div>

          {/* IHC Chronicles Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm">IHC</span>
              IHC Chronicles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ihcLessons.map((lesson) => (
                <LessonCard key={lesson._id} lesson={lesson} />
              ))}
              {ihcLessons.length === 0 && (
                <p className="text-foreground/40 col-span-2 text-center py-8">No IHC lessons yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function LessonCard({ lesson }) {
  const thumbnailSrc = lesson.thumbnailUrl || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80';

  return (
    <Link href={`/lessons/${lesson._id}`} className="lesson-card group">
      <div className="bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all h-full flex flex-col hover:-translate-y-2 duration-300">
        <div className="relative aspect-video bg-primary-navy-light overflow-hidden">
          <Image
            src={thumbnailSrc}
            alt={lesson.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <Play size={40} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="p-5 flex-grow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded">
              {lesson.difficulty || 'Intermediate'}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-foreground/40 font-bold">
              <Clock size={12} />
              {lesson.duration || '—'}
            </div>
          </div>
          <h3 className="font-bold text-primary group-hover:text-gold transition-colors line-clamp-2">
            {lesson.title}
          </h3>
          {lesson.description && (
            <p className="text-xs text-foreground/50 mt-2 line-clamp-2">{lesson.description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
