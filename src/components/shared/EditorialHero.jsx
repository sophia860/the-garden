import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function EditorialHero({
  eyebrow,
  title,
  subtitle,
  body,
  primaryCta,
  primaryCtaLink = '/',
  secondaryCta,
  secondaryCtaLink = '/manifesto',
  large = false,
}) {
  return (
    <section className={`relative ${large ? 'py-24 md:py-40' : 'py-20 md:py-32'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Decorative number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 1.2 }}
          className="absolute top-8 right-8 font-serif text-[12rem] md:text-[20rem] font-black leading-none select-none pointer-events-none"
        >
          ✦
        </motion.div>

        <div className="max-w-4xl">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6"
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`font-serif font-bold leading-[0.95] tracking-tight mb-6 ${
              large ? 'text-5xl md:text-7xl lg:text-8xl' : 'text-4xl md:text-6xl lg:text-7xl'
            }`}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-serif text-xl md:text-2xl italic text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {body && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10"
            >
              {body}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            {primaryCta && (
              <Link
                to={primaryCtaLink}
                className="inline-block font-mono text-xs uppercase tracking-widest bg-foreground text-background px-6 py-3 hover:bg-foreground/90 transition-colors"
              >
                {primaryCta}
              </Link>
            )}
            {secondaryCta && (
              <Link
                to={secondaryCtaLink}
                className="inline-block font-mono text-xs uppercase tracking-widest border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                {secondaryCta}
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 md:mt-24">
        <div className="border-t-2 border-foreground" />
      </div>
    </section>
  );
}