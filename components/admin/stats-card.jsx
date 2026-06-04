'use client';

import { motion } from 'framer-motion';

export function StatsCard({ title, value, subtitle, icon: Icon, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 group hover:border-white/10 transition-all duration-300"
    >
      {/* Gradient Glow Background */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${gradient || 'bg-gold'}`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient || 'from-gold/20 to-gold-dark/20'}`}>
            {Icon && <Icon className="w-5 h-5 text-gold" />}
          </div>
        </div>
        
        <div className="space-y-1">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
            className="text-3xl font-bold text-white tracking-tight"
          >
            {value}
          </motion.h3>
          <p className="text-sm font-medium text-white/60">{title}</p>
          {subtitle && (
            <p className="text-xs text-white/30 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
