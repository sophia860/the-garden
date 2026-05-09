import React, { useState, useEffect, useMemo, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const STATE_META = {
  seed:   { glyph: '·',  label: 'Seed',   style: 'border-black/20 text-black/40' },
  sprout: { glyph: '↑',  label: 'Sprout', style: 'border-black/40 text-black/60' },
  bloom:  { glyph: '✦',  label: 'Bloom',  style: 'border-black text-black' },
};

function FeedFragment({ fragment, onTagClick }) {
  const [expanded, setExpanded] = useState(false);
  const meta = STATE_META[fragment.state] || STATE_META.seed;
  const isLong = fragment.body && fragment.body.length > 400;
  const preview = isLong && !expanded ? fragment.body.slice(0, 400).trimEnd() + '…' : fragment.body;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="border-b border-black/10 py-10 first:pt-0"
    >
      {/* Meta row */}
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <span className={`font-mono text-[10px] uppercase tracking-widest border px-2 py-0.5 ${meta.style}`}>
          {meta.glyph} {meta.label}
        </span>
        <span className="font-mono text-[10px] text-black/25 uppercase tracking-widest">
          {fragment.created_by?.split('@')[0] || 'anonymous'}
        </span>
        <span className="font-mono text-[10px] text-black/20">
          {new Date(fragment.updated_date || fragment.created_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        {fragment.word_count > 0 && (
          <span className="font-mono text-[10px] text-black/20">{fragment.word_count}w</span>
        )}
      </div>

      {/* Title */}
      <h2 className="font-serif font-black text-xl md:text-2xl text-black leading-tight mb-4">
        {fragment.title}
      </h2>

      {/* Body */}
      {fragment.body && (
        <div className="font-body text-base leading-[1.85] text-black/70 mb-4 max-w-2xl">
          {preview}
        </div>
      )}
      {isLong && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="font-mono text-[10px] uppercase tracking-widest border-b border-black/30 text-black/40 hover:text-black hover:border-black transition-colors mb-4"
        >
          {expanded ? 'Collapse ↑' : 'Read more →'}
        </button>
      )}

      {/* Tags */}
      {fragment.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {fragment.tags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="font-mono text-[10px] uppercase tracking-widest border border-black/20 px-2 py-0.5 text-black/40 hover:border-black hover:text-black transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export default function GardenFeed() {
  const [fragments, setFragments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTag, setFilterTag] = useState(null);
  const [filterState, setFilterState] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    base44.entities.Fragment.filter({ visibility: 'public' }, '-updated_date', 200)
      .then(data => { setFragments(data); setLoading(false); })
      .catch(() => {
        // fallback: show all if filter fails
        base44.entities.Fragment.list('-updated_date', 200)
          .then(data => { setFragments(data.filter(f => f.visibility === 'public')); setLoading(false); });
      });
  }, []);

  const allTags = useMemo(() => [...new Set(fragments.flatMap(f => f.tags || []))].sort(), [fragments]);

  const filtered = useMemo(() => fragments.filter(f => {
    if (filterState && f.state !== filterState) return false;
    if (filterTag && !(f.tags || []).includes(filterTag)) return false;
    if (search) {
      const q = search.toLowerCase();
      return f.title?.toLowerCase().includes(q) || f.body?.toLowerCase().includes(q) || (f.tags || []).some(t => t.includes(q));
    }
    return true;
  }), [fragments, filterState, filterTag, search]);

  const handleTagClick = (tag) => setFilterTag(prev => prev === tag ? null : tag);
  const clearFilters = () => { setFilterTag(null); setFilterState(null); setSearch(''); };
  const hasFilters = filterTag || filterState || search;

  return (
    <div className="min-h-screen bg-white">

      {/* Ticker */}
      <div className="overflow-hidden border-b border-black bg-black text-white py-2">
        <div className="flex gap-16 whitespace-nowrap" style={{ animation: 'feedticker 22s linear infinite' }}>
          {['Public garden', '✦', 'Slow reading', '✦', 'Living writing', '✦', 'Seeds · Sprouts · Blooms', '✦', 'Public garden', '✦', 'Slow reading', '✦', 'Living writing', '✦', 'Seeds · Sprouts · Blooms', '✦'].map((t, i) => (
            <span key={i} className="font-mono text-[10px] uppercase tracking-[0.25em]">{t}</span>
          ))}
        </div>
      </div>

      {/* Header */}
      <div
        className="border-b border-black px-6 lg:px-10 py-12 relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/30 mb-3">The Garden · Public Feed</p>
              <h1 className="font-serif font-black leading-none text-black" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
                The Reading<br />Room.
              </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <p className="font-body text-base text-black/55 leading-relaxed max-w-sm">
                Fragments writers have chosen to share publicly. Not a feed — a room. Scroll slowly.
              </p>
              <div className="flex gap-3 mt-6">
                <Link to="/garden" className="font-mono text-[10px] uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-black/70 transition-colors">
                  Your Studio
                </Link>
                <Link to="/garden/graph" className="font-mono text-[10px] uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                  Fragment Map
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="border-b border-black/10 px-6 lg:px-10 py-4 sticky top-[88px] bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search fragments…"
            className="font-mono text-xs border border-black/20 px-3 py-1.5 outline-none focus:border-black transition-colors bg-white w-44"
          />

          {/* State filters */}
          {['seed', 'sprout', 'bloom'].map(s => (
            <button
              key={s}
              onClick={() => setFilterState(filterState === s ? null : s)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${filterState === s ? 'bg-black text-white border-black' : 'border-black/20 text-black/40 hover:border-black hover:text-black'}`}
            >
              {STATE_META[s].glyph} {s}
            </button>
          ))}

          {/* Active tag */}
          {filterTag && (
            <button
              onClick={() => setFilterTag(null)}
              className="font-mono text-[10px] uppercase tracking-widest bg-black text-white px-3 py-1.5 flex items-center gap-1.5"
            >
              ✕ {filterTag}
            </button>
          )}

          {hasFilters && (
            <button onClick={clearFilters} className="font-mono text-[10px] text-black/30 hover:text-black transition-colors uppercase tracking-widest">
              clear
            </button>
          )}

          <span className="ml-auto font-mono text-[10px] text-black/25">
            {filtered.length} {filtered.length === 1 ? 'fragment' : 'fragments'}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-16">

          {/* Feed */}
          <div>
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <span className="font-mono text-xs text-black/25 animate-pulse">reading the garden…</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-32 text-center space-y-4">
                <p className="font-serif text-4xl text-black/10 select-none">✦</p>
                <p className="font-mono text-xs text-black/30 uppercase tracking-widest">
                  {fragments.length === 0 ? 'No public fragments yet.' : 'Nothing matches these filters.'}
                </p>
                {hasFilters && (
                  <button onClick={clearFilters} className="font-mono text-xs text-black/40 hover:text-black border-b border-black/30 transition-colors">
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filtered.map(fragment => (
                  <FeedFragment key={fragment.id} fragment={fragment} onTagClick={handleTagClick} />
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-10">
            {/* About */}
            <div className="border-t-4 border-black pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 mb-3">About this room</p>
              <p className="font-body text-sm text-black/55 leading-relaxed">
                These are fragments writers have chosen to make public. They exist at every stage — seed, sprout, bloom. There are no likes, no shares, no rankings.
              </p>
            </div>

            {/* Tag cloud */}
            {allTags.length > 0 && (
              <div className="border-t border-black/10 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 mb-4">Browse by tag</p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`font-mono text-[10px] uppercase tracking-widest border px-2 py-1 transition-colors ${filterTag === tag ? 'bg-black text-white border-black' : 'border-black/20 text-black/40 hover:border-black hover:text-black'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            {!loading && (
              <div className="border-t border-black/10 pt-6 space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30">In this room</p>
                {['seed', 'sprout', 'bloom'].map(s => {
                  const count = fragments.filter(f => f.state === s).length;
                  return count > 0 ? (
                    <div key={s} className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">{STATE_META[s].glyph} {s}s</span>
                      <span className="font-serif font-black text-xl text-black">{count}</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {/* CTA */}
            <div className="border-t border-black/10 pt-6">
              <p className="font-body text-sm text-black/50 leading-relaxed mb-4">
                Writers: share your own fragments to appear here.
              </p>
              <Link
                to="/garden"
                className="font-mono text-[10px] uppercase tracking-widest bg-black text-white px-4 py-2.5 inline-block hover:bg-black/70 transition-colors"
              >
                Enter the Studio →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @keyframes feedticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}