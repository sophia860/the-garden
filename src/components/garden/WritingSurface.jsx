/**
 * WritingSurface — the core emotional-typography writing component.
 * Hidden textarea captures raw keystrokes; rendered output shows styled bursts.
 */
import React, { useRef, useCallback, useReducer, useImperativeHandle, forwardRef } from 'react';
import { SignalProcessor } from '@/lib/signalProcessor';
import { BurstDetector } from '@/lib/burstDetector';
import { mapBurstToStyle } from '@/lib/fontMapper';

// We expose getBurstsAsText() to parent via ref
const WritingSurface = forwardRef(function WritingSurface(
  { darkMode = false, placeholder = 'Begin writing…', onBurstsChange, className = '' },
  ref
) {
  const textareaRef  = useRef(null);
  const processorRef = useRef(new SignalProcessor());
  const detectorRef  = useRef(new BurstDetector());
  const burstsRef    = useRef([]);       // completed bursts
  const pendingRef   = useRef([]);       // chars not yet flushed into a burst
  const [, forceRender] = React.useReducer(x => x + 1, 0);

  // Expose plain text + bursts to parent
  useImperativeHandle(ref, () => ({
    getText: () => {
      const completedText = burstsRef.current.map(b => b.text).join('');
      const pendingText   = pendingRef.current.map(c => c.char).join('');
      return completedText + pendingText;
    },
    getBursts: () => burstsRef.current,
    clear: () => {
      processorRef.current.reset();
      detectorRef.current.reset();
      burstsRef.current  = [];
      pendingRef.current = [];
      if (textareaRef.current) textareaRef.current.value = '';
      forceRender();
    },
  }));

  // Keep pendingRef in sync so we can read it outside event handlers
  const pendingCharsRef = useRef([]);

  const handleKeyDown = useCallback((e) => {
    const now = performance.now();

    if (e.key === 'Backspace') {
      e.preventDefault();
      const signal = processorRef.current.process(now, true);

      // Remove last character: first from pending, then from last burst
      if (pendingCharsRef.current.length > 0) {
        pendingCharsRef.current.pop();
      } else if (burstsRef.current.length > 0) {
        const last = burstsRef.current[burstsRef.current.length - 1];
        if (last.text.length > 1) {
          burstsRef.current[burstsRef.current.length - 1] = { ...last, text: last.text.slice(0, -1) };
        } else {
          burstsRef.current.pop();
        }
      }
      // Re-sync detector pending from pendingCharsRef
      detectorRef.current.reset();
      burstsRef.current = [...burstsRef.current]; // shallow copy to trigger re-render
      pendingRef.current = pendingCharsRef.current.map(c => ({ char: c, signal }));
      forceRender();
      onBurstsChange?.(burstsRef.current);
      return;
    }

    // Only handle printable chars + space + enter
    if (e.key.length !== 1 && e.key !== 'Enter') return;
    if (e.ctrlKey || e.metaKey) return;

    e.preventDefault();
    const char = e.key === 'Enter' ? '\n' : e.key;
    const signal = processorRef.current.process(now, false);

    // On space/newline, flush detector
    if (char === ' ' || char === '\n') {
      const flushed = detectorRef.current.flushPending();
      if (flushed) burstsRef.current = [...burstsRef.current, flushed];
      pendingCharsRef.current = [];
      // Add space/newline as its own tiny burst
      const spaceBurst = {
        id: `sp-${Date.now()}`,
        text: char,
        confidence: 0.5,
        hesitation: 0,
        pauseBefore: 0,
        avgIKI: 200,
      };
      burstsRef.current = [...burstsRef.current, spaceBurst];
      pendingRef.current = [];
      forceRender();
      onBurstsChange?.(burstsRef.current);
      return;
    }

    // Push char into burst detector
    const newBursts = detectorRef.current.push(char, signal);
    if (newBursts.length > 0) {
      burstsRef.current = [...burstsRef.current, ...newBursts];
      pendingCharsRef.current = [char]; // only current char is pending now
    } else {
      pendingCharsRef.current = [...pendingCharsRef.current, char];
    }

    // Build a fake pending burst for display
    const pendingBurst = pendingCharsRef.current.length > 0 ? [{
      id: 'pending',
      text: pendingCharsRef.current.join(''),
      confidence: signal.confidence,
      hesitation: signal.hesitation,
      pauseBefore: signal.pause,
      avgIKI: 200,
    }] : [];

    pendingRef.current = pendingBurst;
    forceRender();
    onBurstsChange?.(burstsRef.current);
  }, [darkMode, onBurstsChange]);

  // Click on display → focus hidden textarea
  const focus = () => textareaRef.current?.focus();

  const allBursts = [...burstsRef.current, ...pendingRef.current];
  const isEmpty = allBursts.length === 0;

  return (
    <div className={`relative cursor-text ${className}`} onClick={focus}>
      {/* Hidden textarea for capturing input */}
      <textarea
        ref={textareaRef}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 opacity-0 resize-none w-full h-full cursor-text z-10"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Writing surface"
      />

      {/* Rendered emotional typography output */}
      <div
        className="relative z-0 min-h-[200px] leading-relaxed font-body"
        style={{ fontSize: '1.125rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
      >
        {isEmpty && (
          <span className="pointer-events-none select-none" style={{ opacity: 0.25, fontStyle: 'italic' }}>
            {placeholder}
          </span>
        )}
        {allBursts.map((burst, i) => {
          const style = mapBurstToStyle(burst, darkMode);
          const isPending = burst.id === 'pending';
          return (
            <span
              key={burst.id}
              style={{
                fontWeight: style.fontWeight,
                color: style.color,
                opacity: style.opacity,
                marginLeft: style.marginLeft,
                letterSpacing: style.letterSpacing,
                transition: isPending ? 'none' : 'font-weight 0.3s ease, color 0.3s ease, opacity 0.3s ease',
                fontFamily: 'var(--font-body)',
              }}
            >
              {burst.text}
            </span>
          );
        })}
        {/* Blinking cursor */}
        <span
          className="inline-block w-0.5 h-[1.1em] align-middle ml-px"
          style={{
            backgroundColor: darkMode ? '#F0E8DE' : '#1A1A1A',
            animation: 'blink 1s step-end infinite',
            verticalAlign: 'text-bottom',
          }}
        />
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
});

export default WritingSurface;