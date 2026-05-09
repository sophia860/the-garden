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
    <section
      className={`relative bg-white border-b border-black overflow-hidden ${large ? 'py-24 md:py-40' : 'py-20 md:py-28'}`}
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="max-w-4xl">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40 mb-6"
            >
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`font-serif font-black leading-[0.92] tracking-tight text-black mb-6 ${
              large ? 'text-5xl md:text-7xl lg:text-[7rem]' : 'text-4xl md:text-6xl lg:text-7xl'
            }`}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-xl md:text-2xl italic text-black/50 mb-8 max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {body && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-base md:text-lg text-black/60 leading-relaxed max-w-2xl mb-10"
            >
              {body}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {primaryCta && (
              <Link
                to={primaryCtaLink}
                className="inline-block font-mono text-xs uppercase tracking-widest bg-black text-white px-6 py-3 hover:bg-black/70 transition-colors"
              >
                {primaryCta}
              </Link>
            )}
            {secondaryCta && (
              <Link
                to={secondaryCtaLink}
                className="inline-block font-mono text-xs uppercase tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors"
              >
                {secondaryCta}
              </Link>
            )}
          </motion.div>
        </div>
      </div>

      {/* Decorative watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 font-serif font-black leading-none select-none pointer-events-none text-black"
        style={{ fontSize: 'clamp(8rem, 20vw, 22rem)', lineHeight: 1, transform: 'translate(10%, -10%)' }}
      >
        ✦
      </motion.div>
    </section>
  );
}