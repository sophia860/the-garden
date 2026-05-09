import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import FragmentCard from '../components/garden/FragmentCard';
import FragmentEditor from '../components/garden/FragmentEditor';
import GardenToolbar from '../components/garden/GardenToolbar';
import GardenStats from '../components/garden/GardenStats';
import GardenNetworkGraph from '../components/garden/GardenNetworkGraph';

export default function Garden() {
  const [fragments, setFragments] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [editing, setEditing]     = useState(null); // null | fragment | 'new'
  const [search, setSearch]       = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState(null);
  const [sort, setSort]           = useState('-updated_date');
  const [viewMode, setViewMode]   = useState('grid');

  const load = async () => {
    setLoading(true);
    const data = await base44.entities.Fragment.list(sort, 200);
    setFragments(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [sort]);

  // Real-time subscription
  useEffect(() => {
    const unsub = base44.entities.Fragment.subscribe((event) => {
      if (event.type === 'create') setFragments(prev => [event.data, ...prev]);
      if (event.type === 'update') setFragments(prev => prev.map(f => f.id === event.id ? event.data : f));
      if (event.type === 'delete') setFragments(prev => prev.filter(f => f.id !== event.id));
    });
    return unsub;
  }, []);

  const allTags = useMemo(() =>
    [...new Set(fragments.flatMap(f => f.tags || []))].sort(),
    [fragments]
  );

  const filtered = useMemo(() => {
    return fragments.filter(f => {
      if (stateFilter !== 'all' && f.state !== stateFilter) return false;
      if (tagFilter && !(f.tags || []).includes(tagFilter)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          f.title?.toLowerCase().includes(q) ||
          f.body?.toLowerCase().includes(q) ||
          (f.tags || []).some(t => t.includes(q))
        );
      }
      return true;
    });
  }, [fragments, stateFilter, tagFilter, search]);

  const handleSave = async () => {
    setEditing(null);
    await load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this fragment?')) return;
    await base44.entities.Fragment.delete(id);
  };

  // Convert fragments to graph node format
  const graphNodes = fragments.map(f => ({
    id: f.id,
    label: f.title,
    state: f.state || 'seed',
    tags: f.tags || [],
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Fragment editor overlay */}
      <AnimatePresence>
        {editing && (
          <FragmentEditor
            fragment={editing === 'new' ? null : editing}
            onSave={handleSave}
            onClose={() => setEditing(null)}
          />
        )}
      </AnimatePresence>

      {/* Page header */}
      <div className="border-b border-black px-6 lg:px-10 py-8"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                The Garden
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold leading-none">
                Your Studio
              </h1>
            </div>
            <GardenStats fragments={fragments} />
          </div>
          <GardenToolbar
            search={search} onSearch={setSearch}
            stateFilter={stateFilter} onStateFilter={setStateFilter}
            tagFilter={tagFilter} onTagFilter={setTagFilter}
            allTags={allTags}
            sort={sort} onSort={setSort}
            viewMode={viewMode} onViewMode={setViewMode}
            onNew={() => setEditing('new')}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <span className="font-mono text-xs text-muted-foreground animate-pulse">tending the garden…</span>
          </div>
        ) : fragments.length === 0 ? (
          <EmptyState onNew={() => setEditing('new')} />
        ) : viewMode === 'graph' ? (
          <GardenNetworkGraph nodes={graphNodes.length > 0 ? graphNodes : undefined} />
        ) : (
          <>
            {filtered.length === 0 ? (
              <p className="font-mono text-xs text-muted-foreground text-center py-20">
                No fragments match these filters.
              </p>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                <AnimatePresence>
                  {filtered.map(fragment => (
                    <FragmentCard
                      key={fragment.id}
                      fragment={fragment}
                      onClick={() => setEditing(fragment)}
                      onPin={() => {}}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onNew }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-32 text-center space-y-6"
    >
      <div className="font-serif text-6xl text-foreground/10 select-none" style={{ transform: 'rotate(-2deg)' }}>
        ✦
      </div>
      <div>
        <h2 className="font-serif text-2xl font-bold mb-2">Your garden is empty.</h2>
        <p className="font-body text-muted-foreground max-w-sm leading-relaxed">
          Every garden begins with a single seed. Write anything — a fragment, a question, a line that arrived this morning and hasn't explained itself yet.
        </p>
      </div>
      <button
        onClick={onNew}
        className="font-mono text-xs uppercase tracking-widest bg-foreground text-white px-6 py-3 hover:bg-foreground/80 transition-colors"
      >
        Plant a seed
      </button>
    </motion.div>
  );
}