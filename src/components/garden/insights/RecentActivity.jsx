import React, { useMemo } from 'react';

const STATE_GLYPH = { seed: '·', sprout: '↑', bloom: '✦' };

export default function RecentActivity({ fragments }) {
  const recent = useMemo(() => {
    return [...fragments]
      .sort((a, b) => new Date(b.updated_date) - new Date(a.updated_date))
      .slice(0, 8);
  }, [fragments]);

  const streakDays = useMemo(() => {
    const activeDays = new Set(fragments.map(f => {
      const d = new Date(f.updated_date);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }));
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (activeDays.has(key)) streak++;
      else if (i > 0) break;
    }
    return streak;
  }, [fragments]);

  return (
    <div className="border border-black p-6 bg-white">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 mb-1">Recently Tended</p>
          <h3 className="font-serif text-xl font-black text-black">Latest Fragments</h3>
        </div>
        <div className="text-right">
          <p className="font-serif font-black text-2xl text-black">{streakDays}</p>
          <p className="font-mono text-[9px] text-black/25 uppercase tracking-widest">day streak</p>
        </div>
      </div>

      <div className="space-y-0">
        {recent.map((f, i) => (
          <div key={f.id} className={`flex items-start gap-3 py-3 ${i < recent.length - 1 ? 'border-b border-black/08' : ''}`}>
            <span className="font-mono text-sm text-black/30 mt-0.5 w-4 flex-shrink-0">{STATE_GLYPH[f.state] || '·'}</span>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm text-black leading-snug truncate">{f.title}</p>
              {f.tags?.length > 0 && (
                <p className="font-mono text-[9px] text-black/25 mt-0.5">{f.tags.slice(0, 3).join(' · ')}</p>
              )}
            </div>
            <span className="font-mono text-[9px] text-black/20 flex-shrink-0 mt-1">
              {new Date(f.updated_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}