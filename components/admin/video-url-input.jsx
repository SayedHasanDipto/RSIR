'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Youtube, Facebook, Link2, Play, X, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const platforms = [
  { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  { id: 'custom', label: 'Direct URL', icon: Link2, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
];

function detectPlatform(url) {
  if (!url) return null;
  if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
  if (/facebook\.com|fb\.watch|fb\.com/.test(url)) return 'facebook';
  return 'custom';
}

function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function getEmbedUrl(url, platform) {
  if (platform === 'youtube') {
    const id = extractYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (platform === 'facebook') {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`;
  }
  return url;
}

export function VideoUrlInput({ value, onChange, onVideoTypeChange }) {
  const [url, setUrl] = useState(value || '');
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [embedUrl, setEmbedUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (value && !url) {
      setUrl(value);
      const detected = detectPlatform(value);
      setSelectedPlatform(detected);
    }
  }, [value]);

  const handleUrlChange = (newUrl) => {
    setUrl(newUrl);
    const detected = detectPlatform(newUrl);
    if (detected) {
      setSelectedPlatform(detected);
      const embed = getEmbedUrl(newUrl, detected);
      setEmbedUrl(embed);
      onChange?.(newUrl);
      onVideoTypeChange?.(detected);
    }
  };

  const handlePreviewToggle = () => {
    if (!showPreview && url) {
      const platform = selectedPlatform || detectPlatform(url);
      const embed = getEmbedUrl(url, platform);
      setEmbedUrl(embed);
    }
    setShowPreview(!showPreview);
  };

  return (
    <div className="space-y-4">
      <Label className="text-white/80 font-medium">Video Source</Label>
      
      {/* Platform Selector */}
      <div className="flex gap-2">
        {platforms.map((p) => {
          const Icon = p.icon;
          const active = selectedPlatform === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setSelectedPlatform(p.id);
                onVideoTypeChange?.(p.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                active
                  ? `${p.bg} ${p.color}`
                  : 'border-white/10 text-white/40 hover:text-white/60 hover:border-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              {p.label}
            </button>
          );
        })}
      </div>

      {/* URL Input */}
      <div className="relative">
        <Input
          type="url"
          placeholder={
            selectedPlatform === 'youtube'
              ? 'https://www.youtube.com/watch?v=...'
              : selectedPlatform === 'facebook'
              ? 'https://www.facebook.com/watch/?v=...'
              : 'Enter video URL...'
          }
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/20 pr-24 focus:ring-gold/50 focus:border-gold"
        />
        {url && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <button
              type="button"
              onClick={handlePreviewToggle}
              className="p-1.5 rounded-lg bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
              title="Preview video"
            >
              <Play className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setUrl('');
                setEmbedUrl(null);
                setShowPreview(false);
                onChange?.('');
              }}
              className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Auto-detected badge */}
      {url && selectedPlatform && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs"
        >
          <div className={`w-2 h-2 rounded-full ${
            selectedPlatform === 'youtube' ? 'bg-red-400' : 
            selectedPlatform === 'facebook' ? 'bg-blue-400' : 'bg-emerald-400'
          }`} />
          <span className="text-white/40">
            {selectedPlatform === 'youtube' ? 'YouTube video detected' : 
             selectedPlatform === 'facebook' ? 'Facebook video detected' : 'Direct URL'}
          </span>
        </motion.div>
      )}

      {/* Video Preview */}
      <AnimatePresence>
        {showPreview && embedUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl border border-white/10"
          >
            <div className="relative bg-black aspect-video">
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video preview"
              />
            </div>
            <div className="bg-white/5 px-4 py-2 flex items-center justify-between">
              <span className="text-xs text-white/40">Preview</span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors"
              >
                Open original <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
