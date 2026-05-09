import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Force simulation ────────────────────────────────────────────────────────
function runForce(nodes, edges, dims, iterations = 180) {
  const W = dims.width, H = dims.height;
  const cx = W / 2, cy = H / 2;

  // initialise positions on a circle
  const pos = {};
  nodes.forEach((n, i) => {
    const angle = (2 * Math.PI * i) / nodes.length - Math.PI / 2;
    const r = Math.min(W, H) * 0.32;
    pos[n.id] = {
      x: cx + r * Math.cos(angle) + (Math.random() - 0.5) * 20,
      y: cy + r * Math.sin(angle) + (Math.random() - 0.5) * 20,
      vx: 0, vy: 0,
    };
  });

  const edgeSet = new Set(edges.map(e => `${e.source}-${e.target}`));
  const connected = (a, b) => edgeSet.has(`${a}-${b}`) || edgeSet.has(`${b}-${a}`);

  for (let iter = 0; iter < iterations; iter++) {
    const alpha = 1 - iter / iterations;

    // repulsion
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = pos[nodes[i].id], b = pos[nodes[j].id];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const force = (7000 / (dist * dist)) * alpha;
        const fx = (dx / dist) * force, fy = (dy / dist) * force;
        a.vx -= fx; a.vy -= fy;
        b.vx += fx; b.vy += fy;
      }
    }

    // attraction
    edges.forEach(e => {
      const a = pos[e.source], b = pos[e.target];
      if (!a || !b) return;
      const dx = b.x - a.x, dy = b.y - a.y;
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      const target = 120;
      const force = ((dist - target) / dist) * 0.12 * alpha;
      const fx = dx * force, fy = dy * force;
      a.vx += fx; a.vy += fy;
      b.vx -= fx; b.vy -= fy;
    });

    // gravity toward center
    nodes.forEach(n => {
      const p = pos[n.id];
      p.vx += (cx - p.x) * 0.006 * alpha;
      p.vy += (cy - p.y) * 0.006 * alpha;
    });

    // integrate + damping
    nodes.forEach(n => {
      const p = pos[n.id];
      p.vx *= 0.72; p.vy *= 0.72;
      p.x = Math.max(60, Math.min(W - 60, p.x + p.vx));
      p.y = Math.max(60, Math.min(H - 60, p.y + p.vy));
    });
  }

  return Object.fromEntries(Object.entries(pos).map(([id, { x, y }]) => [id, { x, y }]));
}

function buildEdges(nodes) {
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const shared = (nodes[i].tags || []).filter(t => (nodes[j].tags || []).includes(t));
      if (shared.length > 0) {
        edges.push({ source: nodes[i].id, target: nodes[j].id, tags: shared, weight: shared.length });
      }
    }
  }
  return edges;
}

const STATE_STYLE = {
  seed:   { fill: '#fff',    stroke: '#000', textFill: '#000', glyph: '·',  r: 12, label: 'Seed'   },
  sprout: { fill: '#f0f0f0', stroke: '#000', textFill: '#000', glyph: '↑',  r: 14, label: 'Sprout' },
  bloom:  { fill: '#000',    stroke: '#000', textFill: '#fff', glyph: '✦',  r: 18, label: 'Bloom'  },
};

export default function GardenNetworkGraph({ nodes = [] }) {
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ width: 800, height: 540 });
  const [positions, setPositions] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [filterTag, setFilterTag] = useState(null);
  const [filterState, setFilterState] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const edges = useMemo(() => buildEdges(nodes), [nodes]);
  const allTags = useMemo(() => [...new Set(nodes.flatMap(n => n.tags || []))].sort(), [nodes]);

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      setDims({ width, height: Math.max(480, Math.min(width * 0.65, 640)) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Run force layout when nodes or dims change
  useEffect(() => {
    if (nodes.length === 0) return;
    const result = runForce(nodes, edges, dims);
    setPositions(result);
  }, [nodes.length, dims.width, dims.height]);

  // ── Drag helpers ────────────────────────────────────────────────────────
  const getSVGPoint = useCallback((clientX, clientY) => {
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return { x: 0, y: 0 };
    const pt = svgEl.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    return pt.matrixTransform(svgEl.getScreenCTM().inverse());
  }, []);

  const startDrag = useCallback((id, clientX, clientY) => {
    const sp = getSVGPoint(clientX, clientY);
    dragOffset.current = {
      x: sp.x - (positions?.[id]?.x || 0),
      y: sp.y - (positions?.[id]?.y || 0),
    };
    setDragging(id);
    setSelected(id);
  }, [positions, getSVGPoint]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const client = e.touches ? e.touches[0] : e;
      const sp = getSVGPoint(client.clientX, client.clientY);
      setPositions(prev => ({
        ...prev,
        [dragging]: {
          x: Math.max(60, Math.min(dims.width - 60, sp.x - dragOffset.current.x)),
          y: Math.max(60, Math.min(dims.height - 60, sp.y - dragOffset.current.y)),
        },
      }));
    };
    const onUp = () => setDragging(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, dims, getSVGPoint]);

  // ── Filtering ──────────────────────────────────────────────────────────
  const visibleIds = useMemo(() => {
    return new Set(
      nodes
        .filter(n => (!filterTag || (n.tags || []).includes(filterTag)))
        .filter(n => (!filterState || n.state === filterState))
        .map(n => n.id)
    );
  }, [nodes, filterTag, filterState]);

  const selectedNode = nodes.find(n => n.id === selected);
  const connectedEdges = selected ? edges.filter(e => e.source === selected || e.target === selected) : [];

  if (!positions || nodes.length === 0) {
    return (
      <div ref={containerRef} className="w-full h-[480px] border border-black flex items-center justify-center bg-white">
        <span className="font-mono text-xs text-black/30 animate-pulse">
          {nodes.length === 0 ? 'no fragments to map yet.' : 'growing the graph…'}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 bg-white">
      {/* Controls row */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        {/* Tag pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => { setFilterTag(null); setFilterState(null); }}
            className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 border transition-colors ${!filterTag && !filterState ? 'bg-black text-white border-black' : 'border-black/20 text-black/40 hover:border-black hover:text-black'}`}
          >
            all
          </button>
          {['seed', 'sprout', 'bloom'].map(s => (
            <button
              key={s}
              onClick={() => setFilterState(filterState === s ? null : s)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 border transition-colors ${filterState === s ? 'bg-black text-white border-black' : 'border-black/20 text-black/40 hover:border-black hover:text-black'}`}
            >
              {STATE_STYLE[s].glyph} {s}
            </button>
          ))}
          {allTags.slice(0, 10).map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(filterTag === tag ? null : tag)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 border transition-colors ${filterTag === tag ? 'bg-black text-white border-black' : 'border-black/20 text-black/40 hover:border-black hover:text-black'}`}
            >
              {tag}
            </button>
          ))}
        </div>
        <p className="font-mono text-[10px] text-black/25 hidden md:block">
          {nodes.length} fragments · {edges.length} connections
        </p>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="w-full border border-black relative select-none overflow-hidden bg-white"
        onClick={() => setSelected(null)}
        style={{
          height: dims.height,
          cursor: dragging ? 'grabbing' : 'default',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <svg width={dims.width} height={dims.height} className="absolute inset-0">
          {/* Edges */}
          {edges.map((edge, i) => {
            const s = positions[edge.source], t = positions[edge.target];
            if (!s || !t) return null;
            if (!visibleIds.has(edge.source) || !visibleIds.has(edge.target)) return null;
            const isHighlighted = hovered === i || (selected && (edge.source === selected || edge.target === selected));
            const mx = (s.x + t.x) / 2 + (t.y - s.y) * 0.12;
            const my = (s.y + t.y) / 2 - (t.x - s.x) * 0.12;
            return (
              <g key={i}>
                <path
                  d={`M${s.x},${s.y} Q${mx},${my} ${t.x},${t.y}`}
                  stroke="#000"
                  strokeWidth={isHighlighted ? edge.weight + 1 : 0.75}
                  fill="none"
                  opacity={isHighlighted ? 0.7 : 0.12}
                  strokeDasharray={isHighlighted ? 'none' : '3 4'}
                  style={{ transition: 'opacity 0.2s, stroke-width 0.15s' }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                />
                {isHighlighted && (
                  <text x={mx} y={my - 6} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#000" opacity="0.5">
                    {edge.tags.join(' · ')}
                  </text>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const pos = positions[node.id];
            if (!pos || !visibleIds.has(node.id)) return null;
            const st = STATE_STYLE[node.state] || STATE_STYLE.seed;
            const isSelected = selected === node.id;
            const r = isSelected ? st.r + 5 : st.r;
            return (
              <g
                key={node.id}
                transform={`translate(${pos.x},${pos.y})`}
                onMouseDown={e => { e.stopPropagation(); startDrag(node.id, e.clientX, e.clientY); }}
                onTouchStart={e => { e.stopPropagation(); startDrag(node.id, e.touches[0].clientX, e.touches[0].clientY); }}
                style={{ cursor: 'grab' }}
              >
                {isSelected && (
                  <circle r={r + 8} fill="none" stroke="#000" strokeWidth="0.5" opacity="0.2" strokeDasharray="2 3" />
                )}
                <circle
                  r={r}
                  fill={st.fill}
                  stroke={st.stroke}
                  strokeWidth={isSelected ? 2 : 1.5}
                  style={{ transition: 'r 0.15s ease' }}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={node.state === 'bloom' ? 12 : 10}
                  fill={st.textFill}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {st.glyph}
                </text>
                <text
                  y={r + 11}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill={isSelected ? '#000' : '#555'}
                  fontWeight={isSelected ? '700' : '400'}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {node.label.length > 24 ? node.label.slice(0, 23) + '…' : node.label}
                </text>
              </g>
            );
          })}
        </svg>

        <p className="absolute bottom-3 right-4 font-mono text-[9px] text-black/15 pointer-events-none">
          drag · click to inspect · filter above
        </p>
      </div>

      {/* Inspector panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="border border-black p-6 bg-white"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start gap-8 flex-wrap">
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 mb-1">
                  {STATE_STYLE[selectedNode.state]?.glyph} {selectedNode.state}
                </p>
                <h3 className="font-serif text-xl font-black text-black mb-3 leading-tight">{selectedNode.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {(selectedNode.tags || []).map(tag => (
                    <button
                      key={tag}
                      onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                      className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border transition-colors ${filterTag === tag ? 'bg-black text-white border-black' : 'border-black/30 text-black/50 hover:border-black hover:text-black'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {connectedEdges.length > 0 && (
                <div className="min-w-[200px] max-w-xs">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/30 mb-2">
                    Connected ({connectedEdges.length})
                  </p>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {connectedEdges.map((e, i) => {
                      const otherId = e.source === selectedNode.id ? e.target : e.source;
                      const other = nodes.find(n => n.id === otherId);
                      return (
                        <button
                          key={i}
                          className="flex items-center gap-2 w-full text-left group"
                          onClick={() => setSelected(otherId)}
                        >
                          <span className="font-mono text-[9px] text-black/25 shrink-0">
                            {e.tags.join(', ')} →
                          </span>
                          <span className="font-body text-xs text-black/50 group-hover:text-black transition-colors truncate">
                            {other?.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex gap-6 flex-wrap">
        {Object.entries(STATE_STYLE).map(([state, { fill, stroke, glyph, label }]) => (
          <div key={state} className="flex items-center gap-2">
            <svg width="20" height="20">
              <circle cx="10" cy="10" r="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
              <text x="10" y="10" textAnchor="middle" dominantBaseline="middle" fontSize="9" fill={fill === '#000' ? '#fff' : '#000'}>{glyph}</text>
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/50">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <svg width="28" height="10">
            <line x1="0" y1="5" x2="28" y2="5" stroke="#000" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/50">shared tag</span>
        </div>
      </div>
    </div>
  );
}