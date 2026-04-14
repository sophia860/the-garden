import React from 'react';
import EditorialSection from '../shared/EditorialSection';

export default function HomeWhyExists() {
  return (
    <EditorialSection
      number="V"
      heading="Why the Garden exists"
      columns
      ctaText="Read the full founding essay"
      ctaLink="/manifesto"
    >
      <div className="md:columns-2 md:gap-12 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
        <p className="mb-4">
          Every writing platform makes the same gesture: a blank box, a word count, a submit button.
          The infrastructure assumes the work happens somewhere else.
          It wants the parcel, not the hands that made it.
        </p>
        <p className="mb-4 font-serif text-foreground text-lg md:text-xl italic">
          The Garden was built for the hands.
        </p>
        <p className="mb-4">
          We do not charge you to think.
          The core of the Garden is free by design, because the unperformed inner life of a writer should not require a subscription.
          Monetisation — books, issues, workshops, residencies — lives in Page Gallery Editions and the Shop, downstream of the work, not in front of it.
        </p>
      </div>
    </EditorialSection>
  );
}