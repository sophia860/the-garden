import React from 'react';

export default function GardenStats({ fragments }) {
  const seeds   = fragments.filter(f => f.state === 'seed').length;
  const sprouts = fragments.filter(f => f.state === 'sprout').length;
  const blooms  = fragments.filter(f => f.state === 'bloom').length;
  const words   = fragments.reduce((sum, f) => sum + (f.word_count || 0), 0);
  const allTags = [...new Set(fragments.flatMap(f => f.tags || []))];

  const stats = [
    { label: 'Seeds',   value: seeds,           glyph: '·',  color: 'text-amber-600' },
    { label: 'Sprouts', value: sprouts,          glyph: '↑',  color: 'text-emerald-600' },
    { label: 'Blooms',  value: blooms,           glyph: '✦',  color: 'text-foreground' },
    { label: 'Words',   value: words.toLocaleString(), glyph: '—',  color: 'text-muted-foreground' },
    { label: 'Tags',    value: allTags.length,   glyph: '#',  color: 'text-muted-foreground' },
  ];

  return (
    <div className="flex items-center gap-6 flex-wrap">
      {stats.map(s => (
        <div key={s.label} className="flex items-baseline gap-1.5">
          <span className={`font-mono text-sm font-bold ${s.color}`}>{s.value}</span>
          <span className="font-mono text-xs text-muted-foreground/50 uppercase tracking-widest">{s.label}</span>
        </div>
      ))}
    </div>
  );
}