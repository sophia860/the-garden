import React from 'react';
import { Search, Network, Plus, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

const STATES = ['all', 'seed', 'sprout', 'bloom'];
const SORT_OPTIONS = [
  { value: '-updated_date', label: 'Recently updated' },
  { value: '-created_date', label: 'Newest first' },
  { value: 'created_date',  label: 'Oldest first' },
];

export default function GardenToolbar({
  search, onSearch,
  stateFilter, onStateFilter,
  tagFilter, onTagFilter,
  allTags,
  sort, onSort,
  viewMode, onViewMode,
  onNew,
}) {
  return (
    <div className="space-y-3">
      {/* Row 1 */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search fragments…"
            className="w-full pl-8 pr-3 py-2 font-mono text-xs border border-border bg-white outline-none focus:border-foreground/40 transition-colors"
          />
        </div>

        {/* State filters */}
        <div className="flex items-center gap-0">
          {STATES.map(s => (
            <button
              key={s}
              onClick={() => onStateFilter(s)}
              className={`font-mono text-xs px-3 py-2 border-t border-b border-r first:border-l transition-colors ${
                stateFilter === s
                  ? 'bg-foreground text-white border-foreground'
                  : 'border-border text-muted-foreground hover:border-foreground/30'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => onSort(e.target.value)}
          className="font-mono text-xs border border-border px-2 py-2 bg-white text-muted-foreground focus:outline-none"
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {/* View toggle */}
        <button
          onClick={() => onViewMode(viewMode === 'grid' ? 'graph' : 'grid')}
          className={`p-2 border transition-colors ${viewMode === 'graph' ? 'bg-foreground text-white border-foreground' : 'border-border text-muted-foreground hover:border-foreground/30'}`}
          title={viewMode === 'graph' ? 'Switch to grid' : 'Switch to graph'}
        >
          <Network className="w-4 h-4" />
        </button>

        {/* Insights */}
        <Link
          to="/garden/insights"
          className="font-mono text-[10px] uppercase tracking-widest border border-border text-muted-foreground hover:border-foreground hover:text-foreground px-3 py-2 transition-colors whitespace-nowrap"
          title="Writing patterns & insights"
        >
          ↗ Insights
        </Link>

        {/* Feed */}
        <Link
          to="/garden/feed"
          className="font-mono text-[10px] uppercase tracking-widest border border-border text-muted-foreground hover:border-foreground hover:text-foreground px-3 py-2 transition-colors whitespace-nowrap"
          title="Reading room — public fragments"
        >
          ↗ Feed
        </Link>

        {/* Full graph page */}
        <Link
          to="/garden/graph"
          className="font-mono text-[10px] uppercase tracking-widest border border-border text-muted-foreground hover:border-foreground hover:text-foreground px-3 py-2 transition-colors whitespace-nowrap"
          title="Open full network map"
        >
          ↗ Map
        </Link>

        {/* New */}
        <button
          onClick={onNew}
          className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest bg-foreground text-white px-4 py-2 hover:bg-foreground/80 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> New
        </button>
      </div>

      {/* Row 2 — tag pills */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tagFilter && (
            <button
              onClick={() => onTagFilter(null)}
              className="font-mono text-[10px] border border-foreground bg-foreground text-white px-2 py-0.5"
            >
              ✕ {tagFilter}
            </button>
          )}
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagFilter(tagFilter === tag ? null : tag)}
              className={`font-mono text-[10px] border px-2 py-0.5 transition-colors ${
                tagFilter === tag
                  ? 'bg-foreground text-white border-foreground'
                  : 'border-border text-muted-foreground hover:border-foreground/30'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}