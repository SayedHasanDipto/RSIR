import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { LearningPrograms } from '@/components/learning-programs';
import { IhcChronicles } from '@/components/ihc-chronicles';
import { ResourceBank } from '@/components/resource-bank';
import { StudentFeedback } from '@/components/student-feedback';
import { SidebarNoticeBoard } from '@/components/sidebar-notice-board';
import { Footer } from '@/components/footer';

import { getPosts, getResources, getLessons, getClasses } from '@/lib/content';

export default async function Home() {
  const [posts, resources, lessons, classes] = await Promise.all([
    getPosts(),
    getResources(),
    getLessons(),
    getClasses(),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LearningPrograms initialLessons={lessons} />
      <IhcChronicles initialArticles={posts} />
      <ResourceBank initialResources={resources} />
      <StudentFeedback />
      <SidebarNoticeBoard initialClasses={classes} />
      <Footer />
    </main>
  );
}
