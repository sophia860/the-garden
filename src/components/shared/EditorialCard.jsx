import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialCard({ number, title, children, className = '', dark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className={`border p-8 md:p-10 ${dark ? 'border-white/20 bg-white/5' : 'border-black'} ${className}`}
    >
      {number && (
        <span className={`font-mono text-[10px] uppercase tracking-[0.3em] block mb-4 ${dark ? 'text-white/30' : 'text-black/30'}`}>
          {number}
        </span>
      )}
      {title && (
        <h3 className={`font-serif text-xl md:text-2xl font-black mb-4 leading-tight ${dark ? 'text-white' : 'text-black'}`}>
          {title}
        </h3>
      )}
      <div className={`font-body text-sm md:text-base leading-relaxed ${dark ? 'text-white/60' : 'text-black/60'}`}>
        {children}
      </div>
    </motion.div>
  );
}