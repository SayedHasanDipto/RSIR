'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VideoUrlInput } from '@/components/admin/video-url-input';
import { toast } from 'sonner';

export default function NewLessonPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'English Hub',
    duration: '',
    description: '',
    content: '',
    instructor: 'Robiul Islam',
    difficulty: 'Intermediate',
    videoUrl: '',
    videoType: 'youtube',
    thumbnailUrl: '',
    status: 'published',
  });

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
      const res = await fetch('/api/admin/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success('Lesson created successfully!');
        router.push('/admin/lessons');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to create lesson');
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/lessons">
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
            Add New Lesson
          </motion.h1>
          <p className="text-white/40 text-sm">Create a new video lesson</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-5"
        >
          <h2 className="text-lg font-semibold text-white/80 mb-4">Basic Information</h2>

          <div className="space-y-2">
            <Label className="text-white/80 font-medium">Title *</Label>
            <Input
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="e.g. Advanced Grammar Fundamentals"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-gold/50 focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white/80 font-medium">Category *</Label>
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm focus:ring-gold/50 focus:border-gold outline-none"
              >
                <option value="English Hub" className="bg-primary-navy">English Hub</option>
                <option value="IHC Chronicles" className="bg-primary-navy">IHC Chronicles</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="text-white/80 font-medium">Difficulty</Label>
              <select
                value={form.difficulty}
                onChange={(e) => updateField('difficulty', e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm focus:ring-gold/50 focus:border-gold outline-none"
              >
                <option value="Beginner" className="bg-primary-navy">Beginner</option>
                <option value="Intermediate" className="bg-primary-navy">Intermediate</option>
                <option value="Advanced" className="bg-primary-navy">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white/80 font-medium">Duration</Label>
              <Input
                value={form.duration}
                onChange={(e) => updateField('duration', e.target.value)}
                placeholder="e.g. 45 min"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-gold/50 focus:border-gold"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80 font-medium">Instructor</Label>
              <Input
                value={form.instructor}
                onChange={(e) => updateField('instructor', e.target.value)}
                placeholder="Robiul Islam"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-gold/50 focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white/80 font-medium">Short Description</Label>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Brief description of the lesson..."
              rows={3}
              className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:ring-gold/50 focus:border-gold outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white/80 font-medium">Full Content</Label>
            <textarea
              value={form.content}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Detailed lesson content..."
              rows={6}
              className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:ring-gold/50 focus:border-gold outline-none resize-none"
            />
          </div>
        </motion.div>

        {/* Video Source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-5"
        >
          <h2 className="text-lg font-semibold text-white/80 mb-4">Video Source</h2>
          <VideoUrlInput
            value={form.videoUrl}
            onChange={(url) => updateField('videoUrl', url)}
            onVideoTypeChange={(type) => updateField('videoType', type)}
          />
        </motion.div>

        {/* Thumbnail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-5"
        >
          <h2 className="text-lg font-semibold text-white/80 mb-4">Thumbnail</h2>
          
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
            <Label className="text-white/80 font-medium">Upload Thumbnail Image</Label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleThumbnailUpload}
              className="block w-full text-sm text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20 file:cursor-pointer"
            />
          </div>

          <div className="text-xs text-white/30">Or paste a thumbnail URL directly:</div>
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
          transition={{ delay: 0.4 }}
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
              {saving ? 'Saving...' : 'Save Lesson'}
            </Button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
