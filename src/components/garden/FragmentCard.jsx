import React from 'react';
import { motion } from 'framer-motion';
import { Pin } from 'lucide-react';

const STATE_META = {
  seed:   { glyph: '·',  label: 'Seed',   ring: 'border-amber-200',  dot: 'bg-amber-400' },
  sprout: { glyph: '↑',  label: 'Sprout', ring: 'border-emerald-200',dot: 'bg-emerald-500' },
  bloom:  { glyph: '✦',  label: 'Bloom',  ring: 'border-foreground', dot: 'bg-foreground' },
};

const VISIBILITY_LABEL = { private: 'private', circle: 'circle', public: 'public' };

export default function FragmentCard({ fragment, onClick, onPin }) {
  const meta = STATE_META[fragment.state] || STATE_META.seed;
  const preview = fragment.body ? fragment.body.slice(0, 160).trimEnd() + (fragment.body.length > 160 ? '…' : '') : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`group border ${meta.ring} bg-white p-5 cursor-pointer hover:shadow-sm transition-shadow relative`}
    >
      {/* State dot + label */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{meta.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground/50">{VISIBILITY_LABEL[fragment.visibility]}</span>
          {fragment.pinned && <Pin className="w-3 h-3 text-muted-foreground" />}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-serif text-base font-bold leading-snug mb-2 group-hover:text-foreground/70 transition-colors">
        {fragment.title}
      </h3>

      {/* Body preview */}
      {preview && (
        <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
          {preview}
        </p>
      )}

      {/* Tags */}
      {fragment.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto">
          {fragment.tags.slice(0, 5).map(tag => (
            <span key={tag} className="font-mono text-[10px] border border-border px-1.5 py-px text-muted-foreground">
              {tag}
            </span>
          ))}
          {fragment.tags.length > 5 && (
            <span className="font-mono text-[10px] text-muted-foreground/40">+{fragment.tags.length - 5}</span>
          )}
        </div>
      )}

      {/* Word count */}
      {fragment.word_count > 0 && (
        <p className="absolute bottom-3 right-4 font-mono text-[10px] text-muted-foreground/30">
          {fragment.word_count}w
        </p>
      )}
    </motion.div>
  );
}