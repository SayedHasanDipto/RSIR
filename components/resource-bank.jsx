'use client';

import { File, ArrowDownToLine } from '@gravity-ui/icons';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { StaggerReveal } from './stagger-reveal';
import { RevealAnimation } from './reveal-animation';

export function ResourceBank({ initialResources = [] }) {
  const router = useRouter();

  // Transform DB resources into display format
  const resources = initialResources.map((r) => ({
    id: r._id,
    name: r.title || 'Untitled Resource',
    category: r.category || 'General',
    date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '—',
    size: r.fileSize ? `${(r.fileSize / (1024 * 1024)).toFixed(1)} MB` : '—',
    fileUrl: r.fileUrl || null,
    description: r.description || '',
  }));

  // Don't render section if no resources
  if (resources.length === 0) {
    return null;
  }

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
                {resources.slice(0, 4).map((resource, index) => (
                  <motion.tr
                    key={resource.id}
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                    className={`transition-colors text-sm sm:text-base ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                    }`}
                  >
                    <td className="px-4 sm:px-8 py-5">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <File className="w-5 h-5 text-gold flex-shrink-0" />
                        <div>
                          <span className="font-bold text-primary line-clamp-1">{resource.name}</span>
                          {resource.description && (
                            <p className="text-xs text-foreground/40 line-clamp-1 mt-0.5">{resource.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-8 py-5">
                      <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-tighter ${
                        resource.category === 'English' || resource.category === 'English Hub'
                          ? 'bg-blue-100 text-blue-700'
                          : resource.category === 'IHC' || resource.category === 'IHC Chronicles'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {resource.category}
                      </span>
                    </td>
                    <td className="px-4 sm:px-8 py-5 text-foreground/50 font-medium hidden sm:table-cell">{resource.date}</td>
                    <td className="px-4 sm:px-8 py-5 text-foreground/50 font-medium">{resource.size}</td>
                    <td className="px-4 sm:px-8 py-5">
                      <div className="flex justify-center">
                        {resource.fileUrl ? (
                          <motion.button 
                            onClick={(e) => {
                              const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
                              if (isLoggedIn) {
                                window.open(resource.fileUrl, '_blank');
                              } else {
                                router.push('/login?redirect=/');
                              }
                            }}
                            whileHover={{ scale: 1.05, backgroundColor: '#c9ad67' }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-gold text-primary px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold transition-all shadow-md group"
                          >
                            <ArrowDownToLine className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                            <span className="hidden lg:inline">Download</span>
                          </motion.button>
                        ) : (
                          <span className="text-xs text-foreground/30 font-medium">No file</span>
                        )}
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
              <div>
                <motion.button 
                  onClick={(e) => {
                    e.preventDefault();
                    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
                    if (isLoggedIn) {
                      router.push('/resources');
                    } else {
                      router.push('/login?redirect=/resources');
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg"
                >
                  সবগুলো পিডিএফ দেখুন (See All)
                </motion.button>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
