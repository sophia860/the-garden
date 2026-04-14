import React from 'react';
import EditorialHero from '../components/shared/EditorialHero';
import EditorialSection from '../components/shared/EditorialSection';

export default function Editions() {
  return (
    <div>
      <EditorialHero
        eyebrow="Page Gallery Editions"
        title="A publishing house grown out of a garden."
        subtitle="Books, collections, and special issues that first made sense inside the Garden."
      />

      <EditorialSection
        number="I"
        heading="What we publish"
      >
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-3">
          <p>Page Gallery Editions publishes:</p>
          <ul className="space-y-2 pl-6">
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Journals and special issues.</li>
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Poetry collections, full‑length and short.</li>
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Novels and longform prose.</li>
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Occasional chapbooks and experimental forms that refuse to pick a shelf.</li>
          </ul>
          <p className="mt-4">
            Every Edition has a clear line back to the Garden.
            We do not acquire manuscripts from nowhere.
            We work with projects that have already put down roots in our ecosystem.
          </p>
        </div>
      </EditorialSection>

      <EditorialSection
        number="II"
        heading="From seed to book."
      >
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
          <p>
            First, a writer tends a piece or a cluster of pieces inside the Garden.
            They live there as seeds, drafts, and returns.
            An editor or journal lives alongside them.
          </p>
          <p>
            Over time, through issues, boards, and quiet conversations, the project begins to ask for a longer life.
            It wants a spine.
          </p>
          <p>
            When everyone can feel that, the work moves into Editions.
            There, we edit, design, and produce it as a book or special issue, then carry it into the world through the Shop, events, and partnerships.
          </p>
          <p className="font-serif text-foreground italic">
            Throughout, the Garden remains visible as the ground it grew from.
          </p>
        </div>
      </EditorialSection>

      <EditorialSection
        number="III"
        heading="The archive"
        bordered={false}
      >
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
          <p>
            The Editions archive is a record of what has taken root here: books, issues, and projects that began as seeds in individual gardens and grew into something shared.
          </p>
          <p>
            Each Edition comes with a path: which gardens it grew from, which issues it passed through, whose hands carried it.
          </p>
          <p>
            You can browse by writer, theme, or pathway — following grief, joy, illness, work, desire — across forms and years.
          </p>
        </div>
      </EditorialSection>
    </div>
  );
}