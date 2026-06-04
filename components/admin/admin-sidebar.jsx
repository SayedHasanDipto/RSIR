'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  FolderDown, 
  LogOut, 
  ChevronLeft, 
  Menu,
  Plus,
  Home,
  Calendar
} from 'lucide-react';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

const navItems = [
  { 
    label: 'Dashboard', 
    href: '/admin', 
    icon: LayoutDashboard,
    exact: true,
  },
  { 
    label: 'Video Lessons', 
    href: '/admin/lessons', 
    icon: Video,
    children: [
      { label: 'All Lessons', href: '/admin/lessons' },
      { label: 'Add New', href: '/admin/lessons/new' },
    ],
  },
  { 
    label: 'Posts', 
    href: '/admin/posts', 
    icon: FileText,
    children: [
      { label: 'All Posts', href: '/admin/posts' },
      { label: 'Add New', href: '/admin/posts/new' },
    ],
  },
  { 
    label: 'Resources / PDFs', 
    href: '/admin/resources', 
    icon: FolderDown,
    children: [
      { label: 'All Resources', href: '/admin/resources' },
      { label: 'Upload New', href: '/admin/resources/new' },
    ],
  },
  {
    label: 'Upcoming Classes',
    href: '/admin/classes',
    icon: Calendar,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (item) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Area */}
      <div className="p-6 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center shadow-lg shadow-gold/20">
            <span className="text-primary-navy font-bold text-lg">RI</span>
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-white font-bold text-sm">RSIR Admin</span>
              <span className="text-white/40 text-xs">Content Manager</span>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);

          return (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  active
                    ? 'bg-gold/10 text-gold'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold rounded-r-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-gold' : 'text-white/40 group-hover:text-white/70'}`} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>

              {/* Sub-items */}
              {!collapsed && active && item.children && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8 mt-1 space-y-1"
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        pathname === child.href
                          ? 'text-gold bg-gold/5'
                          : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                      }`}
                    >
                      {child.label === 'Add New' || child.label === 'Upload New' ? (
                        <Plus className="w-3 h-3" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <Home className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">View Site</span>}
        </Link>
        <button
          onClick={async () => {
            await authClient.signOut();
            localStorage.setItem('userLoggedIn', 'false');
            window.location.href = '/login';
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary-navy-dark/90 backdrop-blur-xl border border-white/10 rounded-xl text-white/70 hover:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-[#0a1228] border-r border-white/5 z-40 transition-all duration-300 ${
          collapsed ? 'w-[72px]' : 'w-[260px]'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <SidebarContent />

        {/* Collapse Toggle (Desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-primary-navy border border-white/10 rounded-full items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <ChevronLeft className={`w-3 h-3 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </aside>
    </>
  );
}
