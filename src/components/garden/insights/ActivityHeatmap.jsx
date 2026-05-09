import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

function getDateKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export default function ActivityHeatmap({ fragments }) {
  const { weeks, maxCount, totalActive } = useMemo(() => {
    // Count activity per day (created + updated)
    const counts = {};
    fragments.forEach(f => {
      if (f.created_date) {
        const k = getDateKey(f.created_date);
        counts[k] = (counts[k] || 0) + 1;
      }
      if (f.updated_date && f.updated_date !== f.created_date) {
        const k = getDateKey(f.updated_date);
        counts[k] = (counts[k] || 0) + 0.5; // updates count lighter
      }
    });

    // Build 52-week grid ending today
    const today = new Date();
    const endDate = new Date(today);
    const startDate = addDays(endDate, -(52 * 7 - 1));

    // Align start to Sunday
    const dayOfWeek = startDate.getDay();
    const alignedStart = addDays(startDate, -dayOfWeek);

    const weeks = [];
    let current = new Date(alignedStart);

    while (current <= endDate) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const k = getDateKey(current);
        const inRange = current >= startDate && current <= today;
        week.push({ date: new Date(current), key: k, count: inRange ? (counts[k] || 0) : null });
        current = addDays(current, 1);
      }
      weeks.push(week);
    }

    const allCounts = Object.values(counts).filter(c => c > 0);
    const maxCount = allCounts.length ? Math.max(...allCounts) : 1;
    const totalActive = Object.keys(counts).length;

    return { weeks, maxCount, totalActive };
  }, [fragments]);

  const months = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const m = week[0].date.getMonth();
      if (m !== lastMonth) {
        labels.push({ index: i, label: week[0].date.toLocaleString('default', { month: 'short' }) });
        lastMonth = m;
      }
    });
    return labels;
  }, [weeks]);

  const getIntensity = (count) => {
    if (!count) return 0;
    return Math.min(count / maxCount, 1);
  };

  const getCellStyle = (count) => {
    if (count === null) return { background: 'transparent' };
    if (!count) return { background: '#f0f0f0', border: '1px solid #e8e8e8' };
    const intensity = getIntensity(count);
    const lightness = Math.round(95 - intensity * 85);
    return { background: `hsl(0 0% ${lightness}%)`, border: '1px solid transparent' };
  };

  const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div className="border border-black p-6 bg-white">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 mb-1">Writing Activity</p>
          <h3 className="font-serif text-xl font-black text-black">Heat Map</h3>
        </div>
        <p className="font-mono text-[10px] text-black/25">{totalActive} active days</p>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-1 ml-6">
            {weeks.map((_, i) => {
              const label = months.find(m => m.index === i);
              return (
                <div key={i} className="w-[13px] mr-[2px] flex-shrink-0">
                  {label && (
                    <span className="font-mono text-[8px] text-black/30 uppercase">{label.label}</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex flex-col gap-[2px] mr-1.5 w-4 flex-shrink-0">
              {DAYS.map((d, i) => (
                <div key={i} className="h-[13px] flex items-center">
                  <span className="font-mono text-[7px] text-black/25">{d}</span>
                </div>
              ))}
            </div>

            {/* Grid */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px] mr-[2px]">
                {week.map((day, di) => (
                  <motion.div
                    key={di}
                    className="w-[13px] h-[13px] rounded-[2px] relative group"
                    style={getCellStyle(day.count)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (wi * 7 + di) * 0.0005 }}
                    title={day.count !== null ? `${day.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}: ${Math.round(day.count)} activity` : ''}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 ml-6">
            <span className="font-mono text-[8px] text-black/25 uppercase">Less</span>
            {[0, 0.25, 0.5, 0.75, 1].map((intensity, i) => {
              const lightness = intensity === 0 ? 95 : Math.round(95 - intensity * 85);
              return (
                <div key={i} className="w-[13px] h-[13px] rounded-[2px]" style={{ background: intensity === 0 ? '#f0f0f0' : `hsl(0 0% ${lightness}%)` }} />
              );
            })}
            <span className="font-mono text-[8px] text-black/25 uppercase">More</span>
          </div>
        </div>
      </div>
    </div>
  );
}