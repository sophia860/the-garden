import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function TagCloud({ fragments }) {
  const tagStats = useMemo(() => {
    const counts = {};
    fragments.forEach(f => (f.tags || []).forEach(t => { counts[t] = (counts[t] || 0) + 1; }));
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 24)
      .map(([tag, count]) => ({ tag, count }));
  }, [fragments]);

  const max = tagStats[0]?.count || 1;

  if (!tagStats.length) return null;

  return (
    <div className="border border-black p-6 bg-white">
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 mb-1">Tag Landscape</p>
        <h3 className="font-serif text-xl font-black text-black">Top Themes</h3>
      </div>

      <div className="flex flex-wrap gap-2 items-baseline">
        {tagStats.map(({ tag, count }, i) => {
          const weight = count / max;
          const size = 10 + Math.round(weight * 16);
          const opacity = 0.3 + weight * 0.7;
          return (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="font-mono uppercase tracking-widest border border-black/20 px-2 py-1 cursor-default hover:border-black hover:text-black transition-colors"
              style={{ fontSize: size, opacity, color: `hsl(0 0% ${Math.round((1 - weight) * 50)}%)` }}
              title={`${count} fragment${count !== 1 ? 's' : ''}`}
            >
              {tag}
            </motion.span>
          );
        })}
      </div>

      <div className="border-t border-black/10 pt-4 mt-6">
        <p className="font-mono text-[10px] text-black/25">{tagStats.length} unique tags across {fragments.length} fragments</p>
      </div>
    </div>
  );
}