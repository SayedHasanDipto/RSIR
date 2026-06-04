"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FolderDown, Plus, ArrowUpRight, FileText } from 'lucide-react';
import { StatsCard } from '@/components/admin/stats-card';

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/resources');
        if (res.ok) {
          const data = await res.json();
          setResources(data.resources || []);
        }
      } catch (e) {
        console.error('Failed to fetch resources', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white tracking-tight"
      >
        Resources
      </motion.h1>

      {/* Quick Add */}
      <div className="flex justify-end">
        <Link
          href="/admin/resources/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gold text-black hover:bg-gold/80 transition"
        >
          <Plus className="w-4 h-4" /> Add Resource
        </Link>
      </div>

      {/* List */}
      <div className="grid gap-4">
        {loading ? (
          <p className="text-white/40">Loading...</p>
        ) : resources.length === 0 ? (
          <p className="text-white/40">No resources uploaded yet.</p>
        ) : (
          resources.map((res) => (
            <Link
              key={res._id}
              href={`/admin/resources/${res._id}/edit`}
              className="block p-4 rounded bg-white/[0.02] hover:bg-white/[0.04] transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80 truncate">{res.title}</p>
                  <p className="text-xs text-white/40">{res.category}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    res.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-yellow-500/10 text-yellow-400'
                  }`}
                >
                  {res.status || 'draft'}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
