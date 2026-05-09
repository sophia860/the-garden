import React, { useState, useEffect, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GardenNetworkGraph from '../components/garden/GardenNetworkGraph';

export default function GardenGraph() {
  const [fragments, setFragments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Fragment.list('-updated_date', 200).then(data => {
      setFragments(data);
      setLoading(false);
    });
  }, []);

  const nodes = useMemo(() =>
    fragments.map(f => ({
      id: f.id,
      label: f.title || 'Untitled',
      state: f.state || 'seed',
      tags: f.tags || [],
    })),
    [fragments]
  );

  const tagCount = useMemo(() => [...new Set(fragments.flatMap(f => f.tags || []))].length, [fragments]);
  const edgeCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if ((nodes[i].tags || []).some(t => (nodes[j].tags || []).includes(t))) count++;
      }
    }
    return count;
  }, [nodes]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className="border-b border-black px-6 lg:px-10 py-10 relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/30 mb-3">The Garden · Network</p>
              <h1 className="font-serif font-black leading-none text-black" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                Fragment Map
              </h1>
              <p className="font-body text-sm text-black/50 mt-3 max-w-md leading-relaxed">
                A living graph of your writing — nodes are fragments, edges are shared tags. Drag to rearrange. Click to inspect.
              </p>
            </motion.div>

            {!loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-8"
              >
                {[
                  { value: fragments.length, label: 'fragments' },
                  { value: tagCount, label: 'unique tags' },
                  { value: edgeCount, label: 'connections' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-right">
                    <p className="font-serif font-black text-3xl leading-none text-black">{value}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-black/30 mt-1">{label}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Nav links */}
          <div className="flex gap-4 mt-8">
            <Link
              to="/garden"
              className="font-mono text-[10px] uppercase tracking-widest border border-black/20 px-4 py-2 hover:border-black text-black/50 hover:text-black transition-colors"
            >
              ← Back to Studio
            </Link>
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {loading ? (
          <div className="flex items-center justify-center h-[480px] border border-black"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          >
            <span className="font-mono text-xs text-black/30 animate-pulse">growing the graph…</span>
          </div>
        ) : (
          <GardenNetworkGraph nodes={nodes} />
        )}
      </div>

      {/* How to read */}
      <div className="border-t border-black/10 max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/25 mb-6">— How to read this</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { glyph: '·', title: 'Seeds', body: 'Early thoughts, fragments, beginnings. Small, unfinished, potential.' },
            { glyph: '↑', title: 'Sprouts', body: 'Growing pieces with more substance. Taking shape, finding form.' },
            { glyph: '✦', title: 'Blooms', body: 'Finished or near-finished work. Fully developed, ready for light.' },
          ].map(({ glyph, title, body }) => (
            <div key={title} className="border-t border-black/10 pt-6">
              <p className="font-serif font-black text-2xl text-black/20 mb-2">{glyph}</p>
              <h3 className="font-serif font-black text-lg text-black mb-2">{title}</h3>
              <p className="font-body text-sm text-black/50 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}