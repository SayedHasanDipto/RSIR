'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Calendar, Clock, Users, Pencil, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const DEFAULT_FORM = {
  title: '',
  type: 'English Hub Session',
  date: '',
  time: '',
  seats: 30,
  color: 'border-gold',
  status: 'published',
};

export default function AdminClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/classes');
      if (res.ok) {
        const data = await res.json();
        setClasses(data);
      }
    } catch {
      toast.error('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/classes/${editingId}` : '/api/admin/classes';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, status: formData.status || 'published' }),
      });

      if (res.ok) {
        toast.success(editingId ? 'Class updated!' : 'Class added!');
        closeForm();
        fetchClasses();
      } else {
        toast.error(editingId ? 'Failed to update class' : 'Failed to add class');
      }
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (cls) => {
    setEditingId(cls._id);
    setFormData({
      title: cls.title || '',
      type: cls.type || 'English Hub Session',
      date: cls.date ? new Date(cls.date).toISOString().split('T')[0] : '',
      time: cls.time || '',
      seats: cls.seats ?? 30,
      color: cls.color || 'border-gold',
      status: cls.status || 'published',
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this class?')) return;
    try {
      const res = await fetch(`/api/admin/classes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Class deleted');
        fetchClasses();
      } else {
        toast.error('Failed to delete class');
      }
    } catch {
      toast.error('Failed to delete class');
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(DEFAULT_FORM);
  };

  const openAddNew = () => {
    setEditingId(null);
    setFormData(DEFAULT_FORM);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Upcoming Classes</h1>
          <p className="text-white/60 text-sm mt-1">Manage scheduled live sessions.</p>
        </div>
        <Button
          onClick={showForm ? closeForm : openAddNew}
          className="bg-gold hover:bg-gold-light text-primary-navy font-bold gap-2"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Cancel' : 'Add New Class'}
        </Button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#0f1a35] border border-white/10 p-6 rounded-2xl"
          >
            <h2 className="text-lg font-semibold text-white/80 mb-5">
              {editingId ? 'Edit Class' : 'Add New Class'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70">Class Title *</Label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="e.g. Advanced Grammar Mastery"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">Session Type</Label>
                  <select
                    className="w-full bg-white/5 border border-white/10 text-white rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="English Hub Session" className="bg-[#0f1a35]">English Hub Session</option>
                    <option value="IHC Chronicles Session" className="bg-[#0f1a35]">IHC Chronicles Session</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">Date *</Label>
                  <Input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">Time *</Label>
                  <Input
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="e.g. 6:00 PM"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">Available Seats</Label>
                  <Input
                    type="number"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70">Accent Color</Label>
                  <select
                    className="w-full bg-white/5 border border-white/10 text-white rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  >
                    <option value="border-gold" className="bg-[#0f1a35]">Gold</option>
                    <option value="border-primary" className="bg-[#0f1a35]">Primary Blue</option>
                  </select>
                </div>
              </div>

              {/* Status toggle */}
              <div className="space-y-2">
                <Label className="text-white/70">Status</Label>
                <div className="flex gap-2">
                  {['published', 'draft'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({ ...formData, status: s })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        formData.status === s
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

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <Button type="submit" className="bg-gold hover:bg-gold-light text-primary-navy font-bold gap-2">
                  <Save className="w-4 h-4" />
                  {editingId ? 'Update Class' : 'Save Class'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Classes List */}
      <div className="bg-[#0f1a35] border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-white/60">Loading classes...</div>
        ) : classes.length === 0 ? (
          <div className="p-12 text-center">
            <Calendar className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <p className="text-white/40 font-medium">No upcoming classes scheduled.</p>
            <button
              onClick={openAddNew}
              className="mt-3 text-sm text-gold hover:text-gold-light transition-colors"
            >
              Add your first class →
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {classes.map((cls) => (
              <motion.div
                key={cls._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-1 h-12 rounded-full shrink-0 ${
                    cls.color === 'border-gold' ? 'bg-gold' : 'bg-primary'
                  }`} />
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-base truncate">{cls.title}</h3>
                    <p className="text-gold text-xs font-medium">{cls.type}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-white/40 text-xs flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(cls.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {cls.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {cls.seats} seats
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        cls.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {cls.status || 'published'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <button
                    onClick={() => handleEdit(cls)}
                    className="p-2 rounded-lg text-white/30 hover:text-gold hover:bg-gold/10 transition-all"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cls._id)}
                    className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
