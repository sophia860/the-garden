import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── TICKER ── */}
      <div className="overflow-hidden border-b border-black bg-black text-white py-2">
        <div className="flex gap-16 animate-[marquee_18s_linear_infinite] whitespace-nowrap">
          {['Free for writers', '✦', 'No usage caps', '✦', 'No surprise fees', '✦', 'You keep your garden forever', '✦', 'Free for writers', '✦', 'No usage caps', '✦', 'No surprise fees', '✦', 'You keep your garden forever', '✦'].map((t, i) => (
            <span key={i} className="font-mono text-xs uppercase tracking-widest">{t}</span>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section
        className="relative border-b border-black overflow-hidden"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] mb-6 opacity-50">Pricing</p>
            <h1
              className="font-serif font-black leading-none tracking-tight text-black"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
            >
              Free.<br />
              <span className="italic font-normal opacity-40" style={{ fontSize: '0.55em' }}>for writers.</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            {/* decorative star */}
            <div className="text-6xl font-serif mb-6 opacity-10 select-none">✦</div>
            <p className="font-body text-base md:text-lg leading-relaxed text-black/70 max-w-sm">
              The core Garden is free. Journals and institutions pay for the infrastructure they use, not for access to writers.
            </p>
          </motion.div>
        </div>

        {/* stamp */}
        <div
          className="absolute top-8 right-8 md:top-12 md:right-12 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-black flex items-center justify-center rotate-12 opacity-10 select-none"
        >
          <span className="font-serif font-black text-sm text-center leading-tight">No<br/>Tiers</span>
        </div>
      </section>

      {/* ── THREE CARDS ── */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-40 mb-12">— Who it's for</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black">

          {/* Writers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="border-b md:border-b-0 md:border-r border-black p-8 md:p-10 flex flex-col"
          >
            <div className="font-mono text-xs uppercase tracking-widest opacity-40 mb-4">01 — Writers</div>
            <div
              className="font-serif font-black leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
            >
              £0
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-black/50 mb-4">Forever.</p>
            <ul className="font-body text-sm text-black/70 space-y-3 flex-1">
              <li className="flex gap-3"><span className="opacity-30">–</span>Full Garden studio</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>Unlimited fragments</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>Private, circle & public visibility</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>Tag network & graph view</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>Your garden stays yours</li>
            </ul>
            <Link
              to="/garden"
              className="mt-8 inline-block font-mono text-xs uppercase tracking-widest bg-black text-white px-5 py-3 text-center hover:bg-black/80 transition-colors"
            >
              Enter the Garden →
            </Link>
          </motion.div>

          {/* Journals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="border-b md:border-b-0 md:border-r border-black p-8 md:p-10 flex flex-col bg-black text-white"
          >
            <div className="font-mono text-xs uppercase tracking-widest opacity-40 mb-4">02 — Journals & Presses</div>
            <div
              className="font-serif font-black leading-none mb-2"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Infrastructure<br/>pricing.
            </div>
            <p className="font-mono text-xs uppercase tracking-widest opacity-40 mb-6">Pay for what you use.</p>
            <ul className="font-body text-sm text-white/70 space-y-3 flex-1">
              <li className="flex gap-3"><span className="opacity-30">–</span>Gatehouse submissions & review</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>Collaborative editorial workspaces</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>Residency support tools</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>No cut of subscription revenue</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>You own your archives</li>
            </ul>
            <Link
              to="/residency"
              className="mt-8 inline-block font-mono text-xs uppercase tracking-widest border border-white/40 text-white px-5 py-3 text-center hover:bg-white hover:text-black transition-colors"
            >
              Learn about residency →
            </Link>
          </motion.div>

          {/* Institutions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 md:p-10 flex flex-col"
          >
            <div className="font-mono text-xs uppercase tracking-widest opacity-40 mb-4">03 — Institutions</div>
            <div
              className="font-serif font-black leading-none mb-6 italic"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Partner<br/>with us.
            </div>
            <ul className="font-body text-sm text-black/70 space-y-3 flex-1">
              <li className="flex gap-3"><span className="opacity-30">–</span>Residency sponsorships</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>Editions partnerships</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>Direct support for free access</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>Universities & cultural bodies</li>
              <li className="flex gap-3"><span className="opacity-30">–</span>Funding bodies welcome</li>
            </ul>
            <Link
              to="/about"
              className="mt-8 inline-block font-mono text-xs uppercase tracking-widest border border-black px-5 py-3 text-center hover:bg-black hover:text-white transition-colors"
            >
              Get in touch →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PHILOSOPHY STRIP ── */}
      <section
        className="border-t border-b border-black py-16 md:py-24"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p
              className="font-serif font-black leading-tight text-black"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', transform: 'rotate(-0.5deg)' }}
            >
              "We charge for the infrastructure we maintain so that you, and your writers, can move slowly and well."
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="space-y-6">
            <p className="font-body text-base text-black/60 leading-relaxed">
              The current ecosystem asks writers to perform. We refuse to participate in that structure. Your garden belongs to you — not to a platform that monetises your presence.
            </p>
            <p className="font-body text-base text-black/60 leading-relaxed">
              If you publish with us through Editions, payment terms are agreed project by project and clearly documented. No buried clauses.
            </p>
            <div className="pt-4">
              <Link
                to="/manifesto"
                className="font-mono text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
              >
                Read the founding essay →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ROW ── */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-40 mb-12">— Common questions</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {[
            { q: 'Will my garden ever be paywalled?', a: 'No. The core writing environment — your fragments, your network, your private studio — stays free regardless of what happens commercially.' },
            { q: 'Do you take a cut of my work?', a: 'Never automatically. If your work is published through Page Gallery Editions, the arrangement is explicit and agreed with you directly before anything is signed.' },
            { q: 'What exactly do journals pay for?', a: 'Infrastructure: submissions tooling, collaborative review spaces, hosting. Not access to writer gardens — those belong to the writers.' },
            { q: 'Can I export my fragments?', a: 'Yes. Your data is yours. Export at any time in plain text or structured format. No lock-in.' },
          ].map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-t border-black pt-6"
            >
              <h3 className="font-serif text-lg md:text-xl font-bold mb-3 leading-tight">{q}</h3>
              <p className="font-body text-sm text-black/60 leading-relaxed">{a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="border-t border-black bg-black text-white py-20 md:py-28 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-40 mb-6">Start here</p>
          <h2
            className="font-serif font-black leading-none text-white mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Plant a seed.
          </h2>
          <Link
            to="/garden"
            className="inline-block font-mono text-xs uppercase tracking-widest border border-white px-8 py-4 hover:bg-white hover:text-black transition-colors"
          >
            Enter the Garden — it's free
          </Link>
        </motion.div>
      </section>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}