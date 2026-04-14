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
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Section number */}
          {number && (
            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-4">
              — {number}
            </p>
          )}

          {/* Heading */}
          {heading && (
            <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-8 max-w-3xl">
              {heading}
            </h2>
          )}

          {/* Body text */}
          {body && (
            <div className={`font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8 ${columns ? 'md:columns-2 md:gap-12' : 'max-w-3xl'}`}>
              {typeof body === 'string' ? (
                body.split('\n').map((para, i) => (
                  <p key={i} className="mb-4">{para}</p>
                ))
              ) : (
                body
              )}
            </div>
          )}

          {/* CTA */}
          {ctaText && ctaLink && (
            <Link
              to={ctaLink}
              className="inline-block font-mono text-xs uppercase tracking-widest border-b border-foreground pb-1 hover:text-accent transition-colors"
            >
              {ctaText} →
            </Link>
          )}

          {/* Children (cards, steps, etc.) */}
          {children && <div className="mt-12">{children}</div>}
        </motion.div>

        {/* Bottom rule */}
        {bordered && (
          <div className="mt-16 md:mt-24 border-t border-border" />
        )}
      </div>
    </section>
  );
}