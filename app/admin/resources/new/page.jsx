'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, FileDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function NewResourcePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'General',
    fileUrl: '',
    fileSize: 0,
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
      const res = await fetch('/api/admin/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success('Resource created successfully!');
        router.push('/admin/resources');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to create resource');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'pdf');

    setUploading(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        updateField('fileUrl', data.url);
        updateField('fileSize', data.size);
        toast.success('File uploaded successfully');
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to upload file');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/resources">
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
            Upload New Resource
          </motion.h1>
          <p className="text-white/40 text-sm">Add a PDF or downloadable resource</p>
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
          <h2 className="text-lg font-semibold text-white/80 mb-4">Resource Details</h2>

          <div className="space-y-2">
            <Label className="text-white/80 font-medium">Title *</Label>
            <Input
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="e.g. Grammar Reference Guide"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-gold/50 focus:border-gold"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white/80 font-medium">Description</Label>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Brief description of the resource..."
              rows={3}
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
              <option value="Grammar" className="bg-[#060d1f]">Grammar</option>
              <option value="Vocabulary" className="bg-[#060d1f]">Vocabulary</option>
              <option value="Practice Tests" className="bg-[#060d1f]">Practice Tests</option>
            </select>
          </div>
        </motion.div>

        {/* File Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-5"
        >
          <h2 className="text-lg font-semibold text-white/80 mb-4">File</h2>

          {form.fileUrl && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <FileDown className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-emerald-400 truncate">{form.fileUrl}</p>
                {form.fileSize > 0 && (
                  <p className="text-xs text-white/30 mt-0.5">{(form.fileSize / 1024).toFixed(1)} KB</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => { updateField('fileUrl', ''); updateField('fileSize', 0); }}
                className="text-white/30 hover:text-white transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-white/80 font-medium">Upload PDF File</Label>
            <div className="relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="block w-full text-sm text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20 file:cursor-pointer disabled:opacity-50"
              />
              {uploading && (
                <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
                  <div className="w-3 h-3 border border-gold/30 border-t-gold rounded-full animate-spin" />
                  Uploading...
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-white/30">Or paste a file URL directly (Google Drive, Dropbox, etc.):</div>
          <Input
            value={form.fileUrl}
            onChange={(e) => updateField('fileUrl', e.target.value)}
            placeholder="https://drive.google.com/..."
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
              disabled={saving || uploading}
              className="bg-gold hover:bg-gold-light text-primary-navy font-bold gap-2 px-8 py-6 shadow-lg shadow-gold/10 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Create Resource'}
            </Button>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
