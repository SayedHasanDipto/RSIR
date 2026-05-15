'use client';

import { Clock, Calendar, Bell, ArrowRight } from '@gravity-ui/icons';
import { FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { StaggerReveal } from './stagger-reveal';
import { RevealAnimation } from './reveal-animation';

export function SidebarNoticeBoard() {
  return (
    <section className="py-24 bg-[#fcfcfc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Upcoming Classes */}
          <RevealAnimation direction="left" className="md:col-span-2">
            <div className="bg-white rounded-3xl border border-border/50 p-8 md:p-10 shadow-xl shadow-gray-100 h-full">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
                  <Calendar className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-primary">Upcoming Classes</h3>
                  <p className="text-foreground/50 font-medium">Join our live interactive sessions</p>
                </div>
              </div>

              <StaggerReveal selector=".class-item" className="space-y-4">
                {[
                  { title: 'Advanced Grammar Mastery', type: 'English Hub Session', time: 'Monday, May 20 • 6:00 PM', color: 'border-gold', seats: 30 },
                  { title: 'Islamic Civilization 101', type: 'IHC Chronicles Session', time: 'Wednesday, May 22 • 7:30 PM', color: 'border-primary', seats: 25 },
                  { title: 'IELTS Speaking Workshop', type: 'English Hub Session', time: 'Friday, May 24 • 5:00 PM', color: 'border-gold', seats: 20 },
                  { title: 'Ottoman Empire Deep Dive', type: 'IHC Chronicles Session', time: 'Saturday, May 25 • 2:00 PM', color: 'border-primary', seats: 35 },
                ].map((cls, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10, backgroundColor: "rgba(249, 250, 251, 1)" }}
                    className={`class-item border-l-4 ${cls.color} pl-6 py-5 rounded-r-2xl transition-all cursor-pointer bg-white group`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-xl text-primary mb-1 group-hover:text-gold transition-colors">{cls.title}</p>
                        <p className="text-sm font-semibold text-foreground/40 uppercase tracking-widest">{cls.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-sm font-medium text-foreground/60">
                      <Clock className="w-4 h-4 text-gold" />
                      <span>{cls.time} • <span className="text-primary font-bold">{cls.seats} seats available</span></span>
                    </div>
                  </motion.div>
                ))}
              </StaggerReveal>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(22, 33, 62, 0.95)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-10 bg-primary text-white py-5 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                View Full Schedule <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </RevealAnimation>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Announcements */}
            <RevealAnimation direction="right">
              <div className="bg-white rounded-3xl border border-border/50 p-8 shadow-xl shadow-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                    <Bell className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-primary">Notice Board</h3>
                </div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-gold/5 border-l-4 border-gold rounded-r-xl"
                  >
                    <p className="text-xs font-bold text-gold mb-1 uppercase tracking-tighter">New Update</p>
                    <p className="text-sm font-bold text-primary leading-tight">Summer Batch Registration Open! Limited seats available.</p>
                  </motion.div>
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-xl"
                  >
                    <p className="text-xs font-bold text-primary mb-1 uppercase tracking-tighter">Resources</p>
                    <p className="text-sm font-bold text-primary leading-tight">New resource materials added to the Resource Bank.</p>
                  </motion.div>
                </div>
              </div>
            </RevealAnimation>

            {/* Facebook Feed */}
            <RevealAnimation direction="right" delay={0.2}>
              <div className="bg-white rounded-3xl border border-border/50 p-8 shadow-xl shadow-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-600">
                    <FaFacebook className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-primary">Stay Connected</h3>
                </div>

                <p className="text-sm font-medium text-foreground/60 mb-8 leading-relaxed">
                  Join our community of 2.5K+ learners for daily tips, motivation, and study hacks.
                </p>

                <motion.button
                  onClick={() => window.open('https://www.facebook.com/profile.php?id=100094579020051', '_blank')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#1877F2] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3"
                >
                  <FaFacebook className="w-5 h-5" />
                  Follow on Facebook
                </motion.button>

                <div className="mt-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-700">U{i}</div>
                      ))}
                    </div>
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-tighter">
                      1K+ followers
                    </p>
                  </div>
                </div>
              </div>
            </RevealAnimation>

            {/* Newsletter Signup */}
            <RevealAnimation direction="right" delay={0.3}>
              <div className="bg-gradient-to-br from-gold/10 via-white to-primary/5 rounded-3xl border border-gold/30 p-8 shadow-xl shadow-gold/5 relative overflow-hidden group">
                <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-gold/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

                <h3 className="text-xl font-extrabold text-primary mb-2 relative z-10">Get Updates</h3>
                <p className="text-sm font-medium text-foreground/60 mb-6 leading-relaxed relative z-10">Subscribe for class reminders and exclusive learning materials.</p>

                <div className="space-y-3 relative z-10">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 rounded-2xl border border-border/50 bg-white/80 backdrop-blur-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#b39a5c" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gold text-primary py-4 rounded-2xl font-bold transition-all shadow-lg"
                  >
                    Subscribe Now
                  </motion.button>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
