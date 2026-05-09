import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function GrowthMetrics({ fragments }) {
  const { seeds, sprouts, blooms, total, bloomRate, sproutRate } = useMemo(() => {
    const seeds   = fragments.filter(f => f.state === 'seed').length;
    const sprouts = fragments.filter(f => f.state === 'sprout').length;
    const blooms  = fragments.filter(f => f.state === 'bloom').length;
    const total   = fragments.length;
    return {
      seeds, sprouts, blooms, total,
      bloomRate:  total ? Math.round((blooms  / total) * 100) : 0,
      sproutRate: total ? Math.round(((sprouts + blooms) / total) * 100) : 0,
    };
  }, [fragments]);

  const stages = [
    { key: 'seed',   label: 'Seeds',   glyph: '·',  count: seeds,   pct: total ? (seeds  / total) * 100 : 0, fill: '#e5e5e5' },
    { key: 'sprout', label: 'Sprouts', glyph: '↑',  count: sprouts, pct: total ? (sprouts/ total) * 100 : 0, fill: '#888' },
    { key: 'bloom',  label: 'Blooms',  glyph: '✦',  count: blooms,  pct: total ? (blooms / total) * 100 : 0, fill: '#000' },
  ];

  const maxPct = Math.max(...stages.map(s => s.pct), 1);

  return (
    <div className="border border-black p-6 bg-white space-y-6">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 mb-1">Fragment Growth</p>
          <h3 className="font-serif text-xl font-black text-black">Lifecycle Funnel</h3>
        </div>
        <p className="font-mono text-[10px] text-black/25">{total} total</p>
      </div>

      {/* Funnel bars */}
      <div className="space-y-3">
        {stages.map((stage, i) => (
          <div key={stage.key}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">
                {stage.glyph} {stage.label}
              </span>
              <span className="font-serif font-black text-lg text-black">{stage.count}</span>
            </div>
            <div className="h-6 bg-black/5 relative overflow-hidden">
              <motion.div
                className="h-full absolute left-0 top-0"
                style={{ background: stage.fill }}
                initial={{ width: 0 }}
                animate={{ width: `${(stage.pct / maxPct) * 100}%` }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] text-black/30">
                {Math.round(stage.pct)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="border-t border-black/10 pt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/30 mb-1">Bloom rate</p>
          <p className="font-serif font-black text-3xl text-black">{bloomRate}<span className="text-base font-body text-black/40">%</span></p>
          <p className="font-mono text-[9px] text-black/25 mt-0.5">seeds reaching bloom</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/30 mb-1">Germination</p>
          <p className="font-serif font-black text-3xl text-black">{sproutRate}<span className="text-base font-body text-black/40">%</span></p>
          <p className="font-mono text-[9px] text-black/25 mt-0.5">beyond seed stage</p>
        </div>
      </div>
    </div>
  );
}