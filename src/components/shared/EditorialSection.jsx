import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function EditorialSection({
  number,
  heading,
  body,
  ctaText,
  ctaLink,
  children,
  columns = false,
  bordered = true,
  dark = false,
}) {
  return (
    <section className={`py-16 md:py-24 ${dark ? 'bg-black text-white' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {number && (
            <p className={`font-mono text-[10px] uppercase tracking-[0.3em] mb-5 ${dark ? 'text-white/30' : 'text-black/30'}`}>
              — {number}
            </p>
          )}

          {heading && (
            <h2 className={`font-serif font-black leading-[0.95] tracking-tight mb-8 max-w-3xl text-3xl md:text-5xl ${dark ? 'text-white' : 'text-black'}`}>
              {heading}
            </h2>
          )}

          {body && (
            <div className={`font-body text-base md:text-lg leading-relaxed mb-8 ${columns ? 'md:columns-2 md:gap-12' : 'max-w-3xl'} ${dark ? 'text-white/60' : 'text-black/60'}`}>
              {typeof body === 'string' ? (
                body.split('\n').map((para, i) => (
                  <p key={i} className="mb-4">{para}</p>
                ))
              ) : body}
            </div>
          )}

          {ctaText && ctaLink && (
            <Link
              to={ctaLink}
              className={`inline-block font-mono text-xs uppercase tracking-widest border-b pb-1 transition-opacity hover:opacity-50 ${dark ? 'border-white text-white' : 'border-black text-black'}`}
            >
              {ctaText} →
            </Link>
          )}

          {children && <div className="mt-12">{children}</div>}
        </motion.div>

        {bordered && (
          <div className={`mt-16 md:mt-24 border-t ${dark ? 'border-white/10' : 'border-black/10'}`} />
        )}
      </div>
    </section>
  );
}