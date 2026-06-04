import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, User, BookOpen, Star, PlayCircle, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getLessonById } from '@/lib/content';
import { notFound } from 'next/navigation';

export default async function LessonPage({ params }) {
  const { id } = await params;
  const lesson = await getLessonById(id);

  if (!lesson) {
    notFound();
  }

  // Extract YouTube or Facebook embed URL
  let embedUrl = null;
  if (lesson.videoUrl) {
    const url = lesson.videoUrl;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtube.com/embed/')) {
      embedUrl = url;
    } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
      embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=800`;
    } else {
      embedUrl = url; // direct video URL
    }
  }

  const thumbnailSrc = lesson.thumbnailUrl || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80';

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/lessons"
          className="flex items-center gap-2 text-primary hover:text-gold transition-colors font-bold mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Lessons
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            {/* Video Player */}
            <div className="relative aspect-video bg-primary-navy rounded-3xl overflow-hidden shadow-2xl">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={lesson.title}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <Image
                    src={thumbnailSrc}
                    alt={lesson.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle size={100} className="text-white opacity-80 drop-shadow-2xl" />
                  </div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-gold font-bold uppercase tracking-widest text-xs mb-2">Video Lesson</p>
                    <h2 className="text-2xl font-bold">{lesson.title}</h2>
                  </div>
                </>
              )}
            </div>

            {/* Lesson Info */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <span className="px-4 py-1.5 bg-gold/10 text-gold rounded-full text-xs font-bold uppercase tracking-wider">
                  {lesson.category}
                </span>
                <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                  {lesson.difficulty || 'Intermediate'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
                {lesson.title}
              </h1>

              {lesson.description && (
                <p className="text-xl text-foreground/70 leading-relaxed italic border-l-4 border-gold pl-6">
                  {lesson.description}
                </p>
              )}

              {lesson.content && (
                <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed pt-6">
                  <h3 className="text-2xl font-bold text-primary mb-4">Lesson Overview</h3>
                  <div className="whitespace-pre-line">{lesson.content}</div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Instructor Card */}
            <div className="bg-white rounded-3xl border border-border/50 p-8 shadow-xl shadow-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden relative shadow-lg shrink-0">
                  <Image
                    src="/hero.jpg"
                    alt={lesson.instructor || 'Instructor'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-gold uppercase tracking-tighter">Instructor</p>
                  <p className="text-xl font-bold text-primary">{lesson.instructor || 'Robiul Islam'}</p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                An expert in both English linguistics and Islamic history, dedicated to bridging cultures through education.
              </p>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
                <span className="text-xs font-bold text-primary ml-2">5.0 (482 Reviews)</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-primary-navy rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
              <h3 className="text-lg font-bold mb-6 relative z-10">Quick Details</h3>
              <ul className="space-y-6 relative z-10">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Clock size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Duration</p>
                    <p className="font-bold">{lesson.duration || '—'}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <BookOpen size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Category</p>
                    <p className="font-bold">{lesson.category}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <User size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Difficulty</p>
                    <p className="font-bold">{lesson.difficulty || 'Intermediate'}</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white rounded-3xl border border-border/50 p-8 shadow-xl shadow-gray-100">
              <h3 className="text-lg font-bold text-primary mb-6">What you'll learn</h3>
              <ul className="space-y-4">
                {[
                  "Master core terminology",
                  "Analyze complex case studies",
                  "Practical application tasks",
                  "Final assessment guide"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-gold mt-0.5" />
                    <span className="text-sm font-medium text-foreground/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
