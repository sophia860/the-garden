import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Eye, EyeOff, Sprout, Flower2, Leaf } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const STATE_META = {
  seed:   { label: 'Seed',   icon: '·',  color: 'text-amber-800',  bg: 'bg-amber-50',   border: 'border-amber-200' },
  sprout: { label: 'Sprout', icon: '↑',  color: 'text-emerald-700',bg: 'bg-emerald-50', border: 'border-emerald-200' },
  bloom:  { label: 'Bloom',  icon: '✦',  color: 'text-foreground',  bg: 'bg-foreground', border: 'border-foreground' },
};

const VISIBILITY_META = {
  private: { label: 'Private',      icon: EyeOff },
  circle:  { label: 'Shared circle',icon: Eye },
  public:  { label: 'Public',       icon: Eye },
};

export default function FragmentEditor({ fragment, onSave, onClose }) {
  const [title, setTitle] = useState(fragment?.title || '');
  const [body, setBody] = useState(fragment?.body || '');
  const [state, setState] = useState(fragment?.state || 'seed');
  const [tags, setTags] = useState(fragment?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [visibility, setVisibility] = useState(fragment?.visibility || 'private');
  const [saving, setSaving] = useState(false);
  const bodyRef = useRef(null);

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;

  useEffect(() => {
    bodyRef.current?.focus();
  }, []);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, '-');
    if (t && !tags.includes(t)) setTags(prev => [...prev, t]);
    setTagInput('');
  };

  const removeTag = (tag) => setTags(prev => prev.filter(t => t !== tag));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); }
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    const data = { title: title.trim(), body, state, tags, visibility, word_count: wordCount };
    if (fragment?.id) {
      await base44.entities.Fragment.update(fragment.id, data);
    } else {
      await base44.entities.Fragment.create(data);
    }
    setSaving(false);
    onSave();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white flex flex-col"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          {/* State toggle */}
          <div className="flex items-center gap-1">
            {Object.entries(STATE_META).map(([s, meta]) => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={`px-3 py-1 font-mono text-xs border transition-colors ${
                  state === s
                    ? `${meta.bg} ${s === 'bloom' ? 'text-white' : meta.color} ${meta.border}`
                    : 'border-border text-muted-foreground hover:border-foreground/30'
                }`}
              >
                {meta.icon} {meta.label}
              </button>
            ))}
          </div>
          {/* Visibility */}
          <select
            value={visibility}
            onChange={e => setVisibility(e.target.value)}
            className="font-mono text-xs border border-border px-2 py-1 bg-white text-muted-foreground focus:outline-none"
          >
            {Object.entries(VISIBILITY_META).map(([v, { label }]) => (
              <option key={v} value={v}>{label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">{wordCount} words</span>
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="font-mono text-xs uppercase tracking-widest bg-foreground text-white px-4 py-2 disabled:opacity-40 hover:bg-foreground/80 transition-colors"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Editor area */}
      <div className="flex-1 overflow-y-auto px-6 md:px-16 lg:px-32 py-12 max-w-4xl mx-auto w-full">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Working title…"
          className="w-full font-serif text-3xl md:text-4xl font-bold placeholder:text-foreground/20 border-none outline-none mb-8 bg-transparent"
        />
        <textarea
          ref={bodyRef}
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Begin anywhere. This is a seed."
          className="w-full font-body text-base md:text-lg leading-[1.9] text-foreground/80 placeholder:text-foreground/20 border-none outline-none resize-none min-h-[60vh] bg-transparent"
          onInput={e => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
        />
      </div>

      {/* Tag bar */}
      <div className="border-t border-border px-6 py-3 flex items-center gap-3 flex-wrap">
        <Tag className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
        {tags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 font-mono text-xs border border-border px-2 py-0.5">
            {tag}
            <button onClick={() => removeTag(tag)} className="text-muted-foreground hover:text-foreground ml-1">×</button>
          </span>
        ))}
        <input
          type="text"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder="add tag…"
          className="font-mono text-xs outline-none bg-transparent placeholder:text-foreground/20 min-w-[80px]"
        />
      </div>
    </motion.div>
  );
}