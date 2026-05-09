/**
 * WritingStudio — the full emotional-typography writing experience.
 * A distraction-free page where the text itself reveals how you wrote.
 */
import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, RotateCcw, Eye, EyeOff, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import WritingSurface from '@/components/garden/WritingSurface';

const STATE_OPTIONS = ['seed', 'sprout', 'bloom'];
const VIS_OPTIONS   = ['private', 'circle', 'public'];

export default function WritingStudio() {
  const surfaceRef  = useRef(null);
  const [title, setTitle]       = useState('');
  const [state, setFragState]   = useState('seed');
  const [visibility, setVis]    = useState('private');
  const [tags, setTags]         = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showLegend, setShowLegend] = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [burstCount, setBurstCount] = useState(0);

  const onBurstsChange = useCallback((bursts) => {
    setBurstCount(bursts.length);
  }, []);

  const handleSave = async () => {
    const text = surfaceRef.current?.getText() || '';
    if (!title.trim() && !text.trim()) return;
    setSaving(true);
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const tagArr = tags.split(',').map(t => t.trim()).filter(Boolean);
    await base44.entities.Fragment.create({
      title: title.trim() || 'Untitled',
      body: text,
      state,
      visibility,
      tags: tagArr,
      word_count: wordCount,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClear = () => {
    if (!confirm('Clear the canvas? This cannot be undone.')) return;
    surfaceRef.current?.clear();
    setTitle('');
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ background: darkMode ? 'hsl(30 10% 8%)' : '#FFFFFF' }}
    >
      {/* Top bar */}
      <div
        className="border-b sticky top-0 z-20 transition-colors duration-300"
        style={{
          borderColor: darkMode ? 'rgba(255,255,255,0.08)' : '#000',
          background: darkMode ? 'hsl(30 10% 8%)' : '#FFFFFF',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-4">
          {/* Back */}
          <Link
            to="/garden"
            className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-opacity hover:opacity-50"
            style={{ color: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Garden
          </Link>

          <div className="flex-1" />

          {/* Burst counter */}
          <span
            className="font-mono text-[9px] uppercase tracking-widest hidden sm:block"
            style={{ color: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
          >
            {burstCount} burst{burstCount !== 1 ? 's' : ''}
          </span>

          {/* Legend toggle */}
          <button
            onClick={() => setShowLegend(v => !v)}
            className="p-1.5 transition-opacity hover:opacity-60"
            style={{ color: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
            title="Toggle legend"
          >
            {showLegend ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          {/* Dark mode */}
          <button
            onClick={() => setDarkMode(d => !d)}
            className="p-1.5 transition-opacity hover:opacity-60"
            style={{ color: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
            title="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Clear */}
          <button
            onClick={handleClear}
            className="p-1.5 transition-opacity hover:opacity-60"
            style={{ color: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
            title="Clear canvas"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="font-mono text-[10px] uppercase tracking-widest px-4 py-2 transition-colors disabled:opacity-40 flex items-center gap-2"
            style={{
              background: darkMode ? 'rgba(240,232,222,0.9)' : '#000',
              color: darkMode ? '#1A1A1A' : '#FFF',
            }}
          >
            <Save className="w-3.5 h-3.5" />
            {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save to Garden'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-32">
        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* State */}
          <div className="flex gap-0">
            {STATE_OPTIONS.map(s => (
              <button
                key={s}
                onClick={() => setFragState(s)}
                className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border-t border-b border-r first:border-l transition-colors"
                style={{
                  borderColor: darkMode ? 'rgba(255,255,255,0.15)' : '#000',
                  background: state === s
                    ? (darkMode ? 'rgba(240,232,222,0.9)' : '#000')
                    : 'transparent',
                  color: state === s
                    ? (darkMode ? '#1A1A1A' : '#FFF')
                    : (darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'),
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Visibility */}
          <div className="flex gap-0">
            {VIS_OPTIONS.map(v => (
              <button
                key={v}
                onClick={() => setVis(v)}
                className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border-t border-b border-r first:border-l transition-colors"
                style={{
                  borderColor: darkMode ? 'rgba(255,255,255,0.15)' : '#000',
                  background: visibility === v
                    ? (darkMode ? 'rgba(240,232,222,0.9)' : '#000')
                    : 'transparent',
                  color: visibility === v
                    ? (darkMode ? '#1A1A1A' : '#FFF')
                    : (darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'),
                }}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Tags */}
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="tags, comma-separated"
            className="font-mono text-[10px] flex-1 min-w-[160px] bg-transparent outline-none border-b py-1.5 transition-colors"
            style={{
              borderColor: darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)',
              color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
            }}
          />
        </div>

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full bg-transparent outline-none font-serif font-black leading-tight mb-8 border-none"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: darkMode ? 'rgba(240,232,222,0.9)' : '#000',
          }}
        />

        {/* The surface */}
        <WritingSurface
          ref={surfaceRef}
          darkMode={darkMode}
          placeholder="Begin writing. Your confidence, hesitation, and pauses will shape the weight and colour of every word."
          onBurstsChange={onBurstsChange}
          className="w-full"
        />
      </div>

      {/* Legend */}
      <AnimatePresence>
        {showLegend && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 right-6 z-30 p-4 border"
            style={{
              background: darkMode ? 'hsl(30 10% 10%)' : '#FFF',
              borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#000',
              maxWidth: '220px',
            }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-3"
               style={{ color: darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)' }}>
              Emotional key
            </p>
            <div className="space-y-2">
              {[
                { label: 'Confident', weight: 700, conf: 1.0,  dark: darkMode },
                { label: 'Flowing',   weight: 500, conf: 0.55, dark: darkMode },
                { label: 'Hesitant',  weight: 250, conf: 0.2,  dark: darkMode },
              ].map(({ label, weight, conf, dark }) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <span
                    className="font-body text-sm"
                    style={{
                      fontWeight: weight,
                      color: dark
                        ? `rgb(${Math.round(90 + conf*150)},${Math.round(80 + conf*152)},${Math.round(72 + conf*150)})`
                        : `rgb(${Math.round(138 - conf*112)},${Math.round(133 - conf*107)},${Math.round(128 - conf*102)})`,
                      opacity: 0.65 + conf * 0.35,
                    }}
                  >
                    {label}
                  </span>
                  <span className="font-mono text-[9px]"
                        style={{ color: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}>
                    wght {weight}
                  </span>
                </div>
              ))}
              <div className="pt-1 border-t"
                   style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
                <span className="font-mono text-[9px]"
                      style={{ color: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}>
                  gaps = pauses in thought
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}