import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Demo data ──────────────────────────────────────────────────────────────────
const DEMO_NODES = [
  { id: 'n1',  label: 'On grief and geography',        state: 'bloom',  tags: ['grief', 'sea', 'mothers'] },
  { id: 'n2',  label: 'Tidal thought',                 state: 'sprout', tags: ['sea', 'repetition', 'memory'] },
  { id: 'n3',  label: 'The body as weather system',    state: 'seed',   tags: ['grief', 'illness', 'time'] },
  { id: 'n4',  label: 'Letter to my mother\'s hands',  state: 'bloom',  tags: ['mothers', 'hands', 'craft'] },
  { id: 'n5',  label: 'What the ferry remembers',      state: 'sprout', tags: ['sea', 'memory', 'travel'] },
  { id: 'n6',  label: 'Chronic time',                  state: 'seed',   tags: ['illness', 'time', 'slowness'] },
  { id: 'n7',  label: 'On finishing things badly',     state: 'bloom',  tags: ['craft', 'failure', 'repetition'] },
  { id: 'n8',  label: 'Mediocrity as method',          state: 'sprout', tags: ['failure', 'craft', 'process'] },
  { id: 'n9',  label: 'Draft zero',                    state: 'seed',   tags: ['process', 'hands', 'writing'] },
  { id: 'n10', label: 'The unrecorded dream',          state: 'bloom',  tags: ['memory', 'grief', 'writing'] },
  { id: 'n11', label: 'Slowness as resistance',        state: 'sprout', tags: ['slowness', 'illness', 'craft'] },
  { id: 'n12', label: 'Salt and repetition',           state: 'seed',   tags: ['sea', 'repetition', 'memory'] },
];

// ── Derive edges from shared tags ─────────────────────────────────────────────
function buildEdges(nodes) {
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const shared = nodes[i].tags.filter(t => nodes[j].tags.includes(t));
      if (shared.length > 0) {
        edges.push({ source: nodes[i].id, target: nodes[j].id, tags: shared });
      }
    }
  }
  return edges;
}

// ── Simple force-ish initial layout on a circle ───────────────────────────────
function initialPositions(nodes, width, height) {
  const cx = width / 2, cy = height / 2;
  const r = Math.min(width, height) * 0.35;
  return nodes.reduce((acc, node, i) => {
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    acc[node.id] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    return acc;
  }, {});
}

const STATE_COLOR = {
  seed:   { fill: '#f5f0e8', stroke: '#a89880', label: 'Seed' },
  sprout: { fill: '#e8f0e8', stroke: '#6b8f71', label: 'Sprout' },
  bloom:  { fill: '#1a1a1a', stroke: '#1a1a1a', label: 'Bloom' },
};

const TAG_COLORS = [
  '#c9b8a8','#8fb08f','#a8b8c8','#c8a8a8','#b8a8c8',
  '#c8c8a8','#a8c8c8','#c8b0a0','#b0c8a8','#a0a8b8',
];

export default function GardenNetworkGraph({ nodes = DEMO_NODES }) {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 700, height: 520 });
  const [positions, setPositions] = useState({});
  const [dragging, setDragging] = useState(null);
  const [selected, setSelected] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [filterTag, setFilterTag] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const edges = buildEdges(nodes);
  const allTags = [...new Set(nodes.flatMap(n => n.tags))].sort();
  const tagColorMap = allTags.reduce((acc, tag, i) => {
    acc[tag] = TAG_COLORS[i % TAG_COLORS.length];
    return acc;
  }, {});

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDims({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Place nodes when dims are ready
  useEffect(() => {
    setPositions(initialPositions(nodes, dims.width, dims.height));
  }, [dims.width, dims.height, nodes.length]);

  // ── Drag ──────────────────────────────────────────────────────────────────
  const onNodeMouseDown = useCallback((e, id) => {
    e.stopPropagation();
    const svgEl = containerRef.current.querySelector('svg');
    const pt = svgEl.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const svgPt = pt.matrixTransform(svgEl.getScreenCTM().inverse());
    dragOffset.current = { x: svgPt.x - positions[id].x, y: svgPt.y - positions[id].y };
    setDragging(id);
    setSelected(id);
  }, [positions]);

  useEffect(() => {
    if (!dragging) return;
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return;

    const onMove = (e) => {
      const pt = svgEl.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      const sp = pt.matrixTransform(svgEl.getScreenCTM().inverse());
      setPositions(prev => ({
        ...prev,
        [dragging]: { x: sp.x - dragOffset.current.x, y: sp.y - dragOffset.current.y }
      }));
    };
    const onUp = () => setDragging(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging]);

  // Touch drag
  useEffect(() => {
    if (!dragging) return;
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return;
    const onMove = (e) => {
      const touch = e.touches[0];
      const pt = svgEl.createSVGPoint();
      pt.x = touch.clientX; pt.y = touch.clientY;
      const sp = pt.matrixTransform(svgEl.getScreenCTM().inverse());
      setPositions(prev => ({
        ...prev,
        [dragging]: { x: sp.x - dragOffset.current.x, y: sp.y - dragOffset.current.y }
      }));
    };
    const onEnd = () => setDragging(null);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
    return () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onEnd); };
  }, [dragging]);

  const onNodeTouchStart = useCallback((e, id) => {
    const touch = e.touches[0];
    const svgEl = containerRef.current.querySelector('svg');
    const pt = svgEl.createSVGPoint();
    pt.x = touch.clientX; pt.y = touch.clientY;
    const svgPt = pt.matrixTransform(svgEl.getScreenCTM().inverse());
    dragOffset.current = { x: svgPt.x - positions[id].x, y: svgPt.y - positions[id].y };
    setDragging(id);
    setSelected(id);
  }, [positions]);

  // ── Filtering helpers ─────────────────────────────────────────────────────
  const visibleNodeIds = filterTag
    ? new Set(nodes.filter(n => n.tags.includes(filterTag)).map(n => n.id))
    : new Set(nodes.map(n => n.id));

  const selectedNode = nodes.find(n => n.id === selected);

  if (Object.keys(positions).length === 0) {
    return <div ref={containerRef} className="w-full h-[520px] flex items-center justify-center">
      <span className="font-mono text-xs text-foreground/30">loading graph…</span>
    </div>;
  }

  return (
    <div className="w-full space-y-4">
      {/* Tag filter pills */}
      <div className="flex flex-wrap gap-2 px-1">
        <button
          onClick={() => setFilterTag(null)}
          className={`font-mono text-xs px-3 py-1 border transition-colors ${!filterTag ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-foreground/40'}`}
        >
          all
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(filterTag === tag ? null : tag)}
            className={`font-mono text-xs px-3 py-1 border transition-colors ${filterTag === tag ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:border-foreground/40'}`}
            style={filterTag === tag ? {} : { borderLeftColor: tagColorMap[tag], borderLeftWidth: 3 }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Graph canvas */}
      <div
        ref={containerRef}
        className="w-full border border-border relative select-none overflow-hidden"
        style={{ height: 520, cursor: dragging ? 'grabbing' : 'default' }}
        onClick={() => setSelected(null)}
      >
        <svg
          width={dims.width}
          height={dims.height}
          className="absolute inset-0"
        >
          <defs>
            {allTags.map(tag => (
              <marker
                key={tag}
                id={`arrow-${tag}`}
                markerWidth="6" markerHeight="6"
                refX="5" refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill={tagColorMap[tag]} opacity="0.6" />
              </marker>
            ))}
          </defs>

          {/* Edges */}
          {edges.map((edge, i) => {
            const s = positions[edge.source];
            const t = positions[edge.target];
            if (!s || !t) return null;
            const bothVisible = visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target);
            if (!bothVisible) return null;
            const isHighlighted = hoveredEdge === i || (selected && (edge.source === selected || edge.target === selected));
            const tagColor = tagColorMap[edge.tags[0]];
            const mx = (s.x + t.x) / 2 + (t.y - s.y) * 0.15;
            const my = (s.y + t.y) / 2 - (t.x - s.x) * 0.15;
            return (
              <g key={i}>
                <path
                  d={`M${s.x},${s.y} Q${mx},${my} ${t.x},${t.y}`}
                  stroke={tagColor}
                  strokeWidth={isHighlighted ? 2 : 1}
                  fill="none"
                  opacity={isHighlighted ? 0.9 : 0.25}
                  strokeDasharray={isHighlighted ? 'none' : '4 3'}
                  style={{ transition: 'opacity 0.2s, stroke-width 0.2s' }}
                  onMouseEnter={() => setHoveredEdge(i)}
                  onMouseLeave={() => setHoveredEdge(null)}
                />
                {/* Edge tag label on hover */}
                {isHighlighted && (
                  <text
                    x={mx} y={my}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="9"
                    fontFamily="monospace"
                    fill={tagColor}
                    opacity="0.9"
                  >
                    {edge.tags.join(' · ')}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const pos = positions[node.id];
            if (!pos || !visibleNodeIds.has(node.id)) return null;
            const { fill, stroke } = STATE_COLOR[node.state];
            const isSelected = selected === node.id;
            const r = isSelected ? 22 : 16;
            return (
              <g
                key={node.id}
                transform={`translate(${pos.x},${pos.y})`}
                onMouseDown={e => onNodeMouseDown(e, node.id)}
                onTouchStart={e => onNodeTouchStart(e, node.id)}
                style={{ cursor: 'grab' }}
              >
                {/* Glow ring when selected */}
                {isSelected && (
                  <circle r={r + 6} fill="none" stroke={stroke} strokeWidth="1" opacity="0.2" />
                )}
                <circle
                  r={r}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isSelected ? 2 : 1.5}
                  style={{ transition: 'r 0.15s ease' }}
                />
                {/* State glyph */}
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={node.state === 'bloom' ? '13' : '11'}
                  fill={node.state === 'bloom' ? '#fff' : stroke}
                  style={{ pointerEvents: 'none' }}
                >
                  {node.state === 'seed' ? '·' : node.state === 'sprout' ? '↑' : '✦'}
                </text>
                {/* Label */}
                <text
                  y={r + 10}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill={isSelected ? '#1a1a1a' : '#666'}
                  fontWeight={isSelected ? '600' : '400'}
                  style={{ pointerEvents: 'none', whiteSpace: 'pre' }}
                >
                  {node.label.length > 22 ? node.label.slice(0, 21) + '…' : node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hint */}
        <p className="absolute bottom-3 right-4 font-mono text-[10px] text-foreground/20 pointer-events-none">
          drag nodes · click to inspect · filter by tag
        </p>
      </div>

      {/* Node inspector */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
            className="border border-border p-5 bg-white"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-mono text-xs text-muted-foreground mb-1 uppercase tracking-widest">
                  {STATE_COLOR[selectedNode.state].label}
                </p>
                <h3 className="font-serif text-lg font-bold mb-3">{selectedNode.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                      className="font-mono text-xs px-2 py-0.5 border hover:bg-foreground hover:text-background transition-colors"
                      style={{ borderLeftColor: tagColorMap[tag], borderLeftWidth: 3 }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              {/* Connected nodes */}
              <div className="hidden md:block text-right min-w-[180px]">
                <p className="font-mono text-xs text-muted-foreground mb-2 uppercase tracking-widest">Connected to</p>
                {edges
                  .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                  .map((e, i) => {
                    const otherId = e.source === selectedNode.id ? e.target : e.source;
                    const other = nodes.find(n => n.id === otherId);
                    return (
                      <button
                        key={i}
                        className="block text-right w-full font-body text-xs text-muted-foreground hover:text-foreground transition-colors mb-1 truncate"
                        onClick={ev => { ev.stopPropagation(); setSelected(otherId); }}
                      >
                        <span className="text-foreground/30 mr-1">via {e.tags.join(', ')} →</span>
                        {other?.label}
                      </button>
                    );
                  })
                }
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex gap-6 px-1">
        {Object.entries(STATE_COLOR).map(([state, { fill, stroke, label }]) => (
          <div key={state} className="flex items-center gap-2">
            <svg width="18" height="18">
              <circle cx="9" cy="9" r="7" fill={fill} stroke={stroke} strokeWidth="1.5" />
            </svg>
            <span className="font-mono text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}