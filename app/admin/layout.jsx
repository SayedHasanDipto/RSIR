import { getAdminSession } from '@/lib/admin';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Admin Panel | RSIR',
  description: 'Manage your content — lessons, posts, and resources.',
};

export default async function AdminLayout({ children }) {
  // Server-side admin check
  const session = await getAdminSession();

  if (!session) {
    redirect('/login?redirect=/admin');
  }

  return (
    <div className="flex min-h-screen bg-[#060d1f]">
      <AdminSidebar />
      <main className="flex-1 lg:ml-0 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#060d1f]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="lg:hidden w-8" /> {/* Spacer for mobile menu button */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="text-right">
                <p className="text-sm font-medium text-white/80">{session.user.name || 'Admin'}</p>
                <p className="text-xs text-white/30">{session.user.email}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-primary-navy font-bold text-sm">
                {(session.user.name || 'A').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#1a2f5a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}
