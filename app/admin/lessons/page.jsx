'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Video, Plus, Pencil, Trash2, Eye, Youtube, Facebook, Link2 } from 'lucide-react';
import { DataTable } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminLessonsPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const fetchLessons = useCallback(async (p = page, search = searchQuery, category = filterCategory) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: p.toString(), limit: '15' });
      if (search) params.set('search', search);
      if (category) params.set('category', category);

      const res = await fetch(`/api/admin/lessons?${params}`);
      if (res.ok) {
        const data = await res.json();
        setLessons(data.lessons);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      toast.error('Failed to load lessons');
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, filterCategory]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      setPage(1);
      fetchLessons(1, query, filterCategory);
    }, 400);
    setSearchTimeout(timeout);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;
    
    try {
      const res = await fetch(`/api/admin/lessons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Lesson deleted successfully');
        fetchLessons();
      } else {
        toast.error('Failed to delete lesson');
      }
    } catch {
      toast.error('Failed to delete lesson');
    }
  };

  const videoTypeIcon = (type) => {
    switch(type) {
      case 'youtube': return <Youtube className="w-3.5 h-3.5 text-red-400" />;
      case 'facebook': return <Facebook className="w-3.5 h-3.5 text-blue-400" />;
      default: return <Link2 className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold/20 to-gold-dark/20 flex items-center justify-center shrink-0">
            {videoTypeIcon(row.videoType)}
          </div>
          <div className="min-w-0">
            <p className="text-white/90 font-medium truncate max-w-[250px]">{val}</p>
            <p className="text-xs text-white/30 truncate max-w-[250px]">{row.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (val) => (
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          val === 'English Hub' 
            ? 'bg-blue-500/10 text-blue-400' 
            : 'bg-amber-500/10 text-amber-400'
        }`}>
          {val}
        </span>
      ),
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      render: (val) => (
        <span className="text-xs text-white/50">{val || '—'}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          val === 'published' 
            ? 'bg-emerald-500/10 text-emerald-400' 
            : 'bg-yellow-500/10 text-yellow-400'
        }`}>
          {val || 'published'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (val) => (
        <span className="text-xs text-white/30">{val ? new Date(val).toLocaleDateString() : '—'}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            Video Lessons
          </motion.h1>
          <p className="text-white/40 text-sm mt-1">Manage your video lessons and courses</p>
        </div>
        <Link href="/admin/lessons/new">
          <Button className="bg-gold hover:bg-gold-light text-primary-navy font-bold gap-2 shadow-lg shadow-gold/10">
            <Plus className="w-4 h-4" />
            Add Lesson
          </Button>
        </Link>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2">
        {['', 'English Hub', 'IHC Chronicles'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilterCategory(cat);
              setPage(1);
              fetchLessons(1, searchQuery, cat);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filterCategory === cat
                ? 'bg-gold/10 text-gold border border-gold/20'
                : 'text-white/40 hover:text-white/60 border border-white/5 hover:border-white/10'
            }`}
          >
            {cat || 'All'}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={lessons}
        total={total}
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => { setPage(p); fetchLessons(p); }}
        onSearch={handleSearch}
        searchPlaceholder="Search lessons..."
        emptyMessage="No lessons found. Add your first lesson!"
        emptyIcon={Video}
        actions={(row) => (
          <>
            <Link href={`/admin/lessons/${row._id}/edit`}>
              <button className="p-2 rounded-lg text-white/40 hover:text-gold hover:bg-gold/10 transition-all" title="Edit">
                <Pencil className="w-4 h-4" />
              </button>
            </Link>
            <button 
              onClick={() => handleDelete(row._id)} 
              className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      />
    </div>
  );
}
