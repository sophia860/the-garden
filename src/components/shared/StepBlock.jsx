import React from 'react';
import { motion } from 'framer-motion';

export default function StepBlock({ stepNumber, title, body }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-[auto_1fr] gap-8 items-start border-t border-black/10 pt-8"
    >
      <span
        className="font-serif font-black leading-none text-black/10 select-none"
        style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 1 }}
      >
        {stepNumber}
      </span>
      <div className="pt-2">
        <h3 className="font-serif text-xl md:text-2xl font-black text-black mb-3 leading-tight">{title}</h3>
        <p className="font-body text-base text-black/60 leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}