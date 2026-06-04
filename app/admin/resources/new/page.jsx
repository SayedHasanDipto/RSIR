"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/input"; // assume UI components exist
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { VideoUrlInput } from "@/components/admin/video-url-input";

export default function NewResourcePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    fileUrl: "",
    status: "published",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/resources");
      } else {
        console.error("Failed to create resource");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6 p-6 bg-white/[0.02] rounded-xl"
    >
      <h1 className="text-2xl font-bold text-white">Add New Resource</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/70">Title</label>
          <Input value={form.title} onChange={handleChange("title")} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70">Description</label>
          <Textarea value={form.description} onChange={handleChange("description")} rows={4} />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70">Category</label>
          <Input value={form.category} onChange={handleChange("category")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70">File URL</label>
          <VideoUrlInput value={form.fileUrl} onChange={handleChange("fileUrl")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70">Status</label>
          <select
            value={form.status}
            onChange={handleChange("status")}
            className="w-full rounded bg-white/[0.02] border border-white/10 text-white p-2"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className="flex gap-4 mt-4">
          <Button type="submit" disabled={submitting} variant="primary">
            {submitting ? "Saving…" : "Create Resource"}
          </Button>
          <Link
            href="/admin/resources"
            className="inline-flex items-center justify-center px-4 py-2 border border-white/20 rounded text-white hover:bg-white/10 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </motion.div>
  );
}
