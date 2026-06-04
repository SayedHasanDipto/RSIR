'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Plus, Pencil, Trash2, Clock } from 'lucide-react';
import { DataTable } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchPosts = useCallback(async (p = page, search = searchQuery) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: p.toString(), limit: '15' });
      if (search) params.set('search', search);

      const res = await fetch(`/api/admin/posts?${params}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      setPage(1);
      fetchPosts(1, query);
    }, 400);
    setSearchTimeout(timeout);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Post deleted successfully');
        fetchPosts();
      } else {
        toast.error('Failed to delete post');
      }
    } catch {
      toast.error('Failed to delete post');
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center shrink-0">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="min-w-0">
            <p className="text-white/90 font-medium truncate max-w-[280px]">{val}</p>
            <p className="text-xs text-white/30 truncate max-w-[280px]">{row.excerpt || row.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (val) => (
        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-purple-500/10 text-purple-400">
          {val || 'General'}
        </span>
      ),
    },
    {
      key: 'author',
      label: 'Author',
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
        <span className="text-xs text-white/30 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {val ? new Date(val).toLocaleDateString() : '—'}
        </span>
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
            Posts
          </motion.h1>
          <p className="text-white/40 text-sm mt-1">Manage your articles and blog posts</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-gold hover:bg-gold-light text-primary-navy font-bold gap-2 shadow-lg shadow-gold/10">
            <Plus className="w-4 h-4" />
            Add Post
          </Button>
        </Link>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={posts}
        total={total}
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => { setPage(p); fetchPosts(p); }}
        onSearch={handleSearch}
        searchPlaceholder="Search posts..."
        emptyMessage="No posts found. Create your first post!"
        emptyIcon={FileText}
        actions={(row) => (
          <>
            <Link href={`/admin/posts/${row._id}/edit`}>
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
