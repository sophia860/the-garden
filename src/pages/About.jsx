import React from 'react';
import EditorialHero from '../components/shared/EditorialHero';
import EditorialSection from '../components/shared/EditorialSection';

export default function About() {
  return (
    <div>
      <EditorialHero
        eyebrow="About"
        title="The Page Gallery & The Garden"
        subtitle="A digital literary magazine, a writers' garden, and a publishing house."
      />

      <EditorialSection
        number="I"
        heading="Where this began"
      >
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
          <p>
            The Page Gallery began as an online gallery of poems, short stories, and artwork — a place to honour the inner worlds of writers without themes, formulas, or special issues that told them what to think about.
          </p>
          <p>
            As the work accumulated, one problem kept returning: every structure built for writers intercepts the work only after it has performed the miracle of existing. Nothing holds the mind in the act of making.
          </p>
          <p className="font-serif text-foreground text-lg md:text-xl italic">
            The Garden is the attempt to build that missing space.
          </p>
          <p>
            A digital garden for language, where unfinished work is not a stage to rush through but the main event.
          </p>
        </div>
      </EditorialSection>

      <EditorialSection
        number="II"
        heading="What we believe"
      >
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
          <p>
            We believe the most important part of a creative life is the part no one sees.
            The years of fragments.
            The ideas that never became "pieces".
            The daily rotation through mediocrity, the dogged returning, the slow accumulation of connections only you could have made.
          </p>
          <p>
            We believe slowness is not a failure but a founding condition.
            Many of us live with chronic illnesses and bodies that do not cooperate with growth charts.
            We build systems that assume people get tired.
          </p>
          <p>
            We believe that automating attention is the same as withdrawing it.
            We do not use AI to read, rank, or sort submissions.
            We read with nervous systems, not models.
          </p>
          <p>
            We believe that if a piece matters to the writer, it matters.
            The Page Gallery publishes work that feels honest, unexpected, and emotionally resonant.
            The Garden gives that work somewhere to live before it is ready to stand under bright light.
          </p>
        </div>
      </EditorialSection>

      <EditorialSection
        number="III"
        heading="How we are funded"
      >
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
          <p>
            The Garden itself is free to use.
            We do not charge writers to think on our servers.
          </p>
          <p>
            Revenue comes from Page Gallery Editions, events, and partnerships, as well as support from individuals and institutions who believe the inner life of writing deserves infrastructure.
          </p>
          <p>
            As the project grows, memberships may make sense — not as paywalls around the act of making, but as ways for readers and institutions to sustain a space that remains slow, careful, and unmonetised at its core.
          </p>
        </div>
      </EditorialSection>

      <EditorialSection
        number="IV"
        heading="The Garden Manifesto"
        body={`The founding essay for The Garden begins with the submit button and ends with the mind in the act of making. It lays out the problems we see in current literary and creator platforms and the values that shape every feature here.\nIf you want to understand why this space exists, read that essay. Everything else is an implementation detail.`}
        ctaText="Read the Manifesto"
        ctaLink="/manifesto"
        bordered={false}
      />
    </div>
  );
}