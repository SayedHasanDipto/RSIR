import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { LearningPrograms } from '@/components/learning-programs';
import { IhcChronicles } from '@/components/ihc-chronicles';
import { ResourceBank } from '@/components/resource-bank';
import { StudentFeedback } from '@/components/student-feedback';
import { SidebarNoticeBoard } from '@/components/sidebar-notice-board';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LearningPrograms />
      <IhcChronicles />
      <ResourceBank />
      <StudentFeedback />
      <SidebarNoticeBoard />
      <Footer />
    </main>
  );
}
