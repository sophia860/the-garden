import React from 'react';
import { motion } from 'framer-motion';

export default function StepBlock({ stepNumber, title, body }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="flex gap-6 md:gap-8"
    >
      <div className="flex-shrink-0">
        <span className="font-serif text-5xl md:text-7xl font-black text-foreground/10 leading-none">
          {stepNumber}
        </span>
      </div>
      <div className="pt-2">
        <h3 className="font-serif text-lg md:text-xl font-bold mb-3">{title}</h3>
        <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg">
          {body}
        </p>
      </div>
    </motion.div>
  );
}