'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Video, FileText, FolderDown, Plus, ArrowUpRight, 
  TrendingUp, Clock, Eye
} from 'lucide-react';
import { StatsCard } from '@/components/admin/stats-card';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: 'Add Video Lesson', href: '/admin/lessons/new', icon: Video, color: 'from-red-500/20 to-orange-500/20' },
    { label: 'Create Post', href: '/admin/posts/new', icon: FileText, color: 'from-blue-500/20 to-cyan-500/20' },
    { label: 'Upload PDF', href: '/admin/resources/new', icon: FolderDown, color: 'from-emerald-500/20 to-green-500/20' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white tracking-tight"
        >
          Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/40 mt-1"
        >
          Welcome back! Here&apos;s an overview of your content.
        </motion.p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Lessons"
          value={loading ? '—' : stats?.stats?.totalLessons || 0}
          subtitle={`${stats?.stats?.publishedLessons || 0} published · ${stats?.stats?.draftLessons || 0} drafts`}
          icon={Video}
          gradient="from-red-500/20 to-orange-500/20"
          delay={0}
        />
        <StatsCard
          title="Total Posts"
          value={loading ? '—' : stats?.stats?.totalPosts || 0}
          subtitle={`${stats?.stats?.publishedPosts || 0} published · ${stats?.stats?.draftPosts || 0} drafts`}
          icon={FileText}
          gradient="from-blue-500/20 to-cyan-500/20"
          delay={0.1}
        />
        <StatsCard
          title="Resources / PDFs"
          value={loading ? '—' : stats?.stats?.totalResources || 0}
          subtitle={`${stats?.stats?.publishedResources || 0} published · ${stats?.stats?.draftResources || 0} drafts`}
          icon={FolderDown}
          gradient="from-emerald-500/20 to-green-500/20"
          delay={0.2}
        />
        <StatsCard
          title="Total Content"
          value={loading ? '—' : (stats?.stats?.totalLessons || 0) + (stats?.stats?.totalPosts || 0) + (stats?.stats?.totalResources || 0)}
          subtitle="Across all categories"
          icon={TrendingUp}
          gradient="from-gold/20 to-gold-dark/20"
          delay={0.3}
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 group cursor-pointer hover:border-gold/20 transition-all duration-300"
                >
                  <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity bg-gradient-to-br ${action.color}`} />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color}`}>
                      <Icon className="w-5 h-5 text-white/80" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{action.label}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-5 h-5 text-gold" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
        >
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-semibold text-white/80 flex items-center gap-2">
              <Video className="w-4 h-4 text-gold" />
              Recent Lessons
            </h3>
            <Link href="/admin/lessons" className="text-xs text-gold hover:text-gold-light flex items-center gap-1 transition-colors">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-8 text-center text-white/20 text-sm">Loading...</div>
            ) : stats?.recentLessons?.length > 0 ? (
              stats.recentLessons.map((lesson) => (
                <Link key={lesson._id} href={`/admin/lessons/${lesson._id}/edit`}>
                  <div className="px-5 py-3.5 hover:bg-white/[0.02] transition-colors flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold/50" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/70 truncate font-medium">{lesson.title}</p>
                      <p className="text-xs text-white/30">{lesson.category}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      lesson.status === 'published' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {lesson.status || 'published'}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center">
                <Video className="w-8 h-8 text-white/10 mx-auto mb-2" />
                <p className="text-white/30 text-sm">No lessons yet</p>
                <Link href="/admin/lessons/new" className="text-xs text-gold hover:text-gold-light mt-1 inline-block">
                  Add your first lesson →
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden"
        >
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-semibold text-white/80 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gold" />
              Recent Posts
            </h3>
            <Link href="/admin/posts" className="text-xs text-gold hover:text-gold-light flex items-center gap-1 transition-colors">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-8 text-center text-white/20 text-sm">Loading...</div>
            ) : stats?.recentPosts?.length > 0 ? (
              stats.recentPosts.map((post) => (
                <Link key={post._id} href={`/admin/posts/${post._id}/edit`}>
                  <div className="px-5 py-3.5 hover:bg-white/[0.02] transition-colors flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400/50" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/70 truncate font-medium">{post.title}</p>
                      <div className="flex items-center gap-2 text-xs text-white/30">
                        <Clock className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      post.status === 'published' 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {post.status || 'published'}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center">
                <FileText className="w-8 h-8 text-white/10 mx-auto mb-2" />
                <p className="text-white/30 text-sm">No posts yet</p>
                <Link href="/admin/posts/new" className="text-xs text-gold hover:text-gold-light mt-1 inline-block">
                  Create your first post →
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
