'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function EditPostPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'General',
    thumbnailUrl: '',
    status: 'published',
  });

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        const post = data.post;
        setForm({
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          category: post.category || 'General',
          thumbnailUrl: post.thumbnailUrl || '',
          status: post.status || 'published',
        });
      } else {
        toast.error('Post not found');
        router.push('/admin/posts');
      }
    } catch {
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success('Post updated successfully!');
        router.push('/admin/posts');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to update post');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'thumbnail');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        updateField('thumbnailUrl', data.url);
        toast.success('Thumbnail uploaded');
      } else {
        toast.error('Failed to upload thumbnail');
      }
    } catch {
      toast.error('Upload failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/posts">
          <button className="p-2 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            Edit Post
          </motion.h1>
          <p className="text-white/40 text-sm">Update post content and settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-5"
        >
          <h2 className="text-lg font-semibold text-white/80 mb-4">Post Details</h2>

          <div className="space-y-2">
            <Label className="text-white/80 font-medium">Title *</Label>
            <Input
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="e.g. How to Master English Grammar"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-gold/50 focus:border-gold"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white/80 font-medium">Excerpt / Summary</Label>
            <textarea
              value={form.excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
              placeholder="A short summary of the post..."
              rows={2}
              className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:ring-gold/50 focus:border-gold outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white/80 font-medium">Category</Label>
            <select
              value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm focus:ring-gold/50 focus:border-gold outline-none"
            >
              <option value="General" className="bg-[#060d1f]">General</option>
              <option value="English Hub" className="bg-[#060d1f]">English Hub</option>
              <option value="IHC Chronicles" className="bg-[#060d1f]">IHC Chronicles</option>
              <option value="Announcement" className="bg-[#060d1f]">Announcement</option>
              <option value="Tips & Tricks" className="bg-[#060d1f]">Tips & Tricks</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-white/80 font-medium">Content</Label>
            <textarea
              value={form.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Write your post content here..."
              rows={12}
              className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:ring-gold/50 focus:border-gold outline-none resize-none"
            />
          </div>
        </motion.div>

        {/* Thumbnail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-5"
        >
          <h2 className="text-lg font-semibold text-white/80 mb-4">Featured Image</h2>

          {form.thumbnailUrl && (
            <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden border border-white/10 mb-4">
              <img src={form.thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => updateField('thumbnailUrl', '')}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white/70 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-white/80 font-medium">Upload Image</Label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleThumbnailUpload}
              className="block w-full text-sm text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20 file:cursor-pointer"
            />
          </div>

          <div className="text-xs text-white/30">Or paste an image URL directly:</div>
          <Input
            value={form.thumbnailUrl}
            onChange={(e) => updateField('thumbnailUrl', e.target.value)}
            placeholder="https://..."
            className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-gold/50 focus:border-gold"
          />
        </motion.div>

        {/* Status & Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Label className="text-white/80 font-medium">Status</Label>
              <div className="flex gap-2">
                {['published', 'draft'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateField('status', s)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      form.status === s
                        ? s === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        : 'text-white/40 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <Button
              type="submit"
              disabled={saving}
              className="bg-gold hover:bg-gold-light text-primary-navy font-bold gap-2 px-8 py-6 shadow-lg shadow-gold/10 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Update Post'}
            </Button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
