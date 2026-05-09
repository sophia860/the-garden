import React from 'react';
import EditorialSection from '../shared/EditorialSection';

export default function HomeEcosystem() {
  return (
    <EditorialSection
      number="VI"
      heading="The Page Gallery and The Garden"
      bordered={false}
    >
      <div className="max-w-3xl font-body text-base md:text-lg text-black/60 leading-relaxed space-y-4">
        <p>
          The Page Gallery began as an online gallery of poems, short stories, and original artwork — a place to honour the inner worlds of writers without themes or formulas.
        </p>
        <p>
          The Garden grew from a simple recognition: every structure built for writers intercepts the work only after it has performed the miracle of existing. Nothing holds the mind in the act of making.
        </p>
        <p className="font-serif text-black font-black text-lg md:text-xl italic">
          The Garden exists for that act.
        </p>
        <p>
          The Page Gallery is where some of that work walks out under clear light.
          Page Gallery Editions is where a few pieces become books and long‑form projects that can live on shelves as well as screens.
        </p>
      </div>
    </EditorialSection>
  );
}