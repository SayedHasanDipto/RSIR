import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Input } from '@/components/ui/input'; // Assume a generic Input component exists or replace with <input>
import { Textarea } from '@/components/ui/textarea'; // Assume exists
import { Button } from '@/components/ui/button'; // Assume exists
import { Select, SelectItem } from '@/components/ui/select'; // Simple select component
import { VideoUrlInput } from '@/components/admin/video-url-input';

export default function EditResourcePage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/admin/resources/${id}`);
        if (res.ok) {
          const data = await res.json();
          setResource(data.resource);
        }
      } catch (e) {
        console.error('Failed to load resource', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleChange = (field) => (e) => {
    setResource({ ...resource, [field]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/resources/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resource),
      });
      if (res.ok) {
        router.push('/admin/resources');
      } else {
        console.error('Save failed');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-white/40">Loading...</p>;
  }

  if (!resource) {
    return <p className="text-white/40">Resource not found.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <h1 className="text-2xl font-bold text-white">Edit Resource</h1>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-white/70">Title</label>
        <Input value={resource.title} onChange={handleChange('title')} />
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-white/70">Description</label>
        <Textarea value={resource.description} onChange={handleChange('description')} rows={4} />
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-white/70">Category</label>
        <Input value={resource.category} onChange={handleChange('category')} />
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-white/70">File URL</label>
        <VideoUrlInput value={resource.fileUrl} onChange={handleChange('fileUrl')} />
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-white/70">Status</label>
        <Select value={resource.status} onValueChange={(v) => setResource({ ...resource, status: v })}>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
        </Select>
      </div>
      <div className="flex gap-4 mt-6">
        <Button onClick={handleSave} disabled={saving} variant="primary">
          {saving ? 'Saving…' : 'Save Changes'}
        </Button>
        <Link href="/admin/resources" className="inline-flex items-center justify-center px-4 py-2 border border-white/20 rounded text-white hover:bg-white/10 transition">
          Cancel
        </Link>
      </div>
    </motion.div>
  );
}
