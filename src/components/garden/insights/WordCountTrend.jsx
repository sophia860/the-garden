import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function WordCountTrend({ fragments }) {
  const { chartData, totalWords, avgWords, longestTitle } = useMemo(() => {
    if (!fragments.length) return { chartData: [], totalWords: 0, avgWords: 0, longestTitle: '—' };

    // Group by month, cumulative words
    const monthly = {};
    fragments.forEach(f => {
      const date = new Date(f.created_date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthly[key]) monthly[key] = { key, words: 0, count: 0 };
      monthly[key].words += f.word_count || 0;
      monthly[key].count += 1;
    });

    const sorted = Object.values(monthly).sort((a, b) => a.key.localeCompare(b.key));

    // Cumulative
    let cumWords = 0;
    const chartData = sorted.map(m => {
      cumWords += m.words;
      const [year, month] = m.key.split('-');
      const label = new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'short', year: '2-digit' });
      return { label, words: m.words, cumulative: cumWords, fragments: m.count };
    });

    const totalWords = fragments.reduce((s, f) => s + (f.word_count || 0), 0);
    const withWords = fragments.filter(f => f.word_count > 0);
    const avgWords = withWords.length ? Math.round(totalWords / withWords.length) : 0;
    const longest = fragments.reduce((best, f) => (!best || (f.word_count || 0) > (best.word_count || 0)) ? f : best, null);
    const longestTitle = longest?.title || '—';

    return { chartData, totalWords, avgWords, longestTitle };
  }, [fragments]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="border border-black bg-white px-3 py-2 shadow-sm">
        <p className="font-mono text-[10px] text-black/40 mb-1 uppercase tracking-widest">{label}</p>
        <p className="font-mono text-xs text-black">{payload[0]?.value?.toLocaleString()} cumulative words</p>
        <p className="font-mono text-[10px] text-black/40">+{payload[1]?.value?.toLocaleString()} this month</p>
      </div>
    );
  };

  return (
    <div className="border border-black p-6 bg-white">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 mb-1">Word Count</p>
          <h3 className="font-serif text-xl font-black text-black">Cumulative Growth</h3>
        </div>
        <p className="font-serif font-black text-2xl text-black">{totalWords.toLocaleString()}<span className="font-body text-sm text-black/30 ml-1">words</span></p>
      </div>

      {chartData.length > 1 ? (
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="cumGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#000" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#000" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fontFamily: 'monospace', fontSize: 8, fill: 'rgba(0,0,0,0.3)' }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontFamily: 'monospace', fontSize: 8, fill: 'rgba(0,0,0,0.3)' }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="cumulative" stroke="#000" strokeWidth={1.5} fill="url(#cumGrad)" dot={false} />
            <Area type="monotone" dataKey="words" stroke="rgba(0,0,0,0.2)" strokeWidth={1} fill="none" dot={false} strokeDasharray="3 3" />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[180px] flex items-center justify-center">
          <p className="font-mono text-xs text-black/20">Not enough data yet</p>
        </div>
      )}

      <div className="border-t border-black/10 pt-4 mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/30 mb-1">Avg per fragment</p>
          <p className="font-serif font-black text-2xl text-black">{avgWords.toLocaleString()}</p>
        </div>
        <div className="overflow-hidden">
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/30 mb-1">Longest piece</p>
          <p className="font-body text-sm text-black truncate" title={longestTitle}>{longestTitle}</p>
        </div>
      </div>
    </div>
  );
}