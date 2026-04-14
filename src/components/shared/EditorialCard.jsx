import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialCard({ number, title, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`border border-border p-8 md:p-10 ${className}`}
    >
      {number && (
        <span className="font-mono text-xs text-muted-foreground tracking-widest block mb-4">
          {number}
        </span>
      )}
      {title && (
        <h3 className="font-serif text-xl md:text-2xl font-bold mb-4 leading-tight">
          {title}
        </h3>
      )}
      <div className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}