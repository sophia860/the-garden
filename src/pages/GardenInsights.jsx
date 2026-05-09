import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ActivityHeatmap from '../components/garden/insights/ActivityHeatmap';
import GrowthMetrics from '../components/garden/insights/GrowthMetrics';
import WordCountTrend from '../components/garden/insights/WordCountTrend';
import TagCloud from '../components/garden/insights/TagCloud';
import RecentActivity from '../components/garden/insights/RecentActivity';

export default function GardenInsights() {
  const [fragments, setFragments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Fragment.list('-created_date', 500)
      .then(data => { setFragments(data); setLoading(false); });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className="border-b border-black px-6 lg:px-10 py-10 relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/30 mb-3">The Garden · Insights</p>
              <h1 className="font-serif font-black leading-none text-black text-4xl md:text-6xl">
                Your Writing<br />Patterns.
              </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-3 flex-wrap">
              <Link to="/garden" className="font-mono text-[10px] uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                ← Studio
              </Link>
              <Link to="/garden/graph" className="font-mono text-[10px] uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                ↗ Map
              </Link>
              <Link to="/garden/feed" className="font-mono text-[10px] uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                ↗ Feed
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <span className="font-mono text-xs text-black/25 animate-pulse">reading the garden…</span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Heatmap — full width */}
            <ActivityHeatmap fragments={fragments} />

            {/* Row 2: growth + word count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GrowthMetrics fragments={fragments} />
              <WordCountTrend fragments={fragments} />
            </div>

            {/* Row 3: tag cloud + recent activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TagCloud fragments={fragments} />
              <RecentActivity fragments={fragments} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}