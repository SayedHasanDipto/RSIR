import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/content';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Article Not Found | RSIR' };
  return { title: `${post.title} | RSIR` };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const fallbackImage = 'https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?w=800&q=80';
  const imageUrl = post.thumbnailUrl || fallbackImage;

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/#ihc"
          className="inline-flex items-center gap-2 text-primary hover:text-gold transition-colors font-bold mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Chronicles
        </Link>

        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gold/10 text-gold uppercase tracking-wider border border-gold/20">
              {post.category || 'General'}
            </span>
            <div className="flex items-center gap-2 text-foreground/50 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('bn-BD') : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground/50 text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-lg text-foreground/70 font-medium leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Featured Image */}
        <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-slate max-w-none prose-headings:text-primary prose-headings:font-bold prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl mx-auto text-foreground/80 leading-relaxed font-medium whitespace-pre-line bg-card/30 p-6 sm:p-10 rounded-3xl border border-border/50 shadow-inner">
          {post.content ? (
            post.content
          ) : (
            <p className="text-center italic text-foreground/50">No content available for this article.</p>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
