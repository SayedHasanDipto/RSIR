'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, ArrowRight } from '@gravity-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { lessons } from '@/lib/lessons-data';
import Image from 'next/image';

const englishVideos = lessons.filter(l => l.category === 'English Hub');
const ihcVideos = lessons.filter(l => l.category === 'IHC Chronicles');

export function VideoLessonsGrid() {
  const [activeTab, setActiveTab] = useState('english');
  const videos = activeTab === 'english' ? englishVideos : ihcVideos;

  return (
    <section id="english" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            Video Lessons
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 text-lg max-w-2xl mx-auto"
          >
            Explore our comprehensive collection of video lessons designed for deep learning.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16 px-4">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 sm:pb-0 no-scrollbar max-w-full">
            {['english', 'ihc'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold transition-all whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-primary hover:bg-light-gray'
                }`}
              >
                <span className="relative z-10">
                  {tab === 'english' ? 'English Hub' : 'IHC Chronicles'}
                </span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-xl shadow-xl shadow-primary/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {videos.map((video, index) => (
                <Link key={video.id} href={`/lessons/${video.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                    className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-shadow group cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full h-48 bg-gradient-to-br from-primary-navy-light to-primary-navy flex items-center justify-center overflow-hidden">
                      {video.thumbnailUrl ? (
                        <Image 
                          src={video.thumbnailUrl} 
                          alt={video.title} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <Image 
                          src="/placeholder.jpg" 
                          alt={video.title} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all flex items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Play className="w-12 h-12 text-white fill-white drop-shadow-2xl" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-foreground/50">
                        <div className="w-2 h-2 rounded-full bg-gold"></div>
                        <p className="text-sm font-medium">{video.duration}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link href="/lessons">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-primary font-bold rounded-xl hover:bg-gold-light transition-all shadow-lg hover:shadow-gold/20 group">
              View All Lessons 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
