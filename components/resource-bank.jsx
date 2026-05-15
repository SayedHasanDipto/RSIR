'use client';

import { Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerReveal } from './stagger-reveal';
import { RevealAnimation } from './reveal-animation';

const resources = [
  { id: 1, name: 'English Grammar Complete Guide', category: 'English', date: 'May 12, 2024', size: '2.4 MB' },
  { id: 2, name: 'IELTS Speaking Preparation', category: 'English', date: 'May 10, 2024', size: '1.8 MB' },
  { id: 3, name: 'Advanced Vocabulary List', category: 'English', date: 'May 8, 2024', size: '0.9 MB' },
  { id: 4, name: 'Islamic History Timeline', category: 'IHC', date: 'May 7, 2024', size: '3.2 MB' },
  { id: 5, name: 'Ottoman Empire Study Notes', category: 'IHC', date: 'May 5, 2024', size: '2.1 MB' },
  { id: 6, name: 'Quranic Verse Compilation', category: 'IHC', date: 'May 3, 2024', size: '1.5 MB' },
  { id: 7, name: 'Essay Writing Techniques', category: 'English', date: 'April 30, 2024', size: '1.3 MB' },
  { id: 8, name: 'Islamic Art Reference Guide', category: 'IHC', date: 'April 28, 2024', size: '4.7 MB' },
];

export function ResourceBank() {
  return (
    <section id="resources" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <RevealAnimation direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Resource Bank</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">Download study materials, notes, and guides prepared for your success</p>
          </RevealAnimation>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-border/50 shadow-xl shadow-gray-100">
          <table className="w-full min-w-[800px] md:min-w-0">
            <thead>
              <tr className="bg-primary text-white text-sm sm:text-base">
                <th className="px-4 sm:px-8 py-5 text-left font-bold tracking-wider">File Name</th>
                <th className="px-4 sm:px-8 py-5 text-left font-bold tracking-wider">Category</th>
                <th className="px-4 sm:px-8 py-5 text-left font-bold tracking-wider hidden sm:table-cell">Upload Date</th>
                <th className="px-4 sm:px-8 py-5 text-left font-bold tracking-wider">Size</th>
                <th className="px-4 sm:px-8 py-5 text-center font-bold tracking-wider">Action</th>
              </tr>
            </thead>
            <StaggerReveal as="tbody" selector="tr" className="divide-y divide-border/50">
                {resources.map((resource, index) => (
                  <motion.tr
                    key={resource.id}
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                    className={`transition-colors text-sm sm:text-base ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                    }`}
                  >
                    <td className="px-4 sm:px-8 py-5">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <FileText size={18} className="text-gold flex-shrink-0" />
                        <span className="font-bold text-primary line-clamp-1">{resource.name}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-8 py-5">
                      <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-tighter ${
                        resource.category === 'English'
                          ? 'bg-blue-100 text-blue-700'
                           : 'bg-amber-100 text-amber-700'
                      }`}>
                        {resource.category}
                      </span>
                    </td>
                    <td className="px-4 sm:px-8 py-5 text-foreground/50 font-medium hidden sm:table-cell">{resource.date}</td>
                    <td className="px-4 sm:px-8 py-5 text-foreground/50 font-medium">{resource.size}</td>
                    <td className="px-4 sm:px-8 py-5">
                      <div className="flex justify-center">
                        <motion.button 
                          whileHover={{ scale: 1.05, backgroundColor: '#c9ad67' }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 bg-gold text-primary px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold transition-all shadow-md group"
                        >
                          <Download size={16} className="group-hover:translate-y-1 transition-transform" />
                          <span className="hidden lg:inline">Download</span>
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
            </StaggerReveal>
          </table>
        </div>

        {/* Info Box */}
        <RevealAnimation direction="up" delay={0.5}>
          <div className="mt-12 bg-light-gray/50 border border-border/50 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <p className="text-primary font-bold text-lg mb-1">
                  <span className="text-gold">Total Resources: {resources.length}</span> Premium Files
                </p>
                <p className="text-foreground/60">All files are in high-quality PDF format and optimized for reading.</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg"
              >
                Get All Access
              </motion.button>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
