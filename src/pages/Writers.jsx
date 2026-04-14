import React from 'react';
import EditorialHero from '../components/shared/EditorialHero';
import EditorialSection from '../components/shared/EditorialSection';
import EditorialCard from '../components/shared/EditorialCard';

export default function Writers() {
  return (
    <div>
      <EditorialHero
        eyebrow="For writers"
        title="A live notebook that journals can read."
        subtitle="Your Garden profile is built from pages, not credentials."
        primaryCta="Join as a writer"
        primaryCtaLink="/"
        secondaryCta="Explore writers"
        secondaryCtaLink="/"
      />

      <EditorialSection
        number="I"
        heading={'A place for the life before "finished".'}
        body={`Most tools only meet your work once it is presentable. The Garden is built for everything that happens before that point: seeds, partial drafts, notes to self, excavated paragraphs, voice memos turned into lines.\nYou are not asked to tidy your thinking into a brand. You are invited to keep a record of how it actually happens.`}
      />

      <EditorialSection
        number="II"
        heading="Your Studio"
        body={`The Writer's Studio is where you write, rewrite, and return. You can split a piece into sections, tag them, move them around, and leave yourself notes in the margins. Autosave and snapshots keep a trail of versions, so you always know what you changed and when.\nStates — Seed, Sprout, Bloom — honour the work of becoming instead of pretending everything is already done. A Seed can stay a Seed for six months. Nothing in the system penalises it for that.`}
      />

      <EditorialSection
        number="III"
        heading="Most writing is not finished. It is interrupted."
      >
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4 mb-10">
          <p>In the Garden, each piece exists in a state:</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EditorialCard title="Seed">
            <p>A glimpse, a note, a first attempt you are not ready to show.</p>
          </EditorialCard>
          <EditorialCard title="Sprout">
            <p>A draft that has a shape but not yet a form.</p>
          </EditorialCard>
          <EditorialCard title="Bloom">
            <p>Something that can stand up on its own, even if you still want to tinker.</p>
          </EditorialCard>
        </div>
        <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mt-8 max-w-2xl">
          These states are for you and for the editors you invite in. They are not a ranking system. They are a way to name where you are with a piece, without shame.
        </p>
      </EditorialSection>

      <EditorialSection
        number="IV"
        heading="Private, shared, or public — you choose."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { title: 'Private', desc: 'Only you.' },
            { title: 'Trusted circle', desc: 'Selected readers, collaborators, or editors.' },
            { title: 'Garden‑public', desc: 'Visible to other members of the Garden.' },
            { title: 'Published', desc: 'Pieces that have gone on to appear in The Page Gallery or Editions.' },
          ].map((item) => (
            <EditorialCard key={item.title} title={item.title}>
              <p>{item.desc}</p>
            </EditorialCard>
          ))}
        </div>
        <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mt-8 max-w-2xl">
          You can move a piece between these states as often as you need. There are no public stats attached to any of them — no like counts, no follower numbers, no graphs telling you whether your voice is "growing" fast enough.
        </p>
      </EditorialSection>

      <EditorialSection
        number="V"
        heading="Mirrors, not scores."
        body={`The Garden shows you only the numbers that help you understand your own practice. You might see that you have spent ten hours this month revisiting drafts about labour. You might notice that you have not reopened an October piece in eight months. You might watch certain tags — grief, mothers, sea — keep finding each other across time.\nThe Garden can surface those patterns. It cannot have the recognition for you.`}
      />

      <EditorialSection
        number="VI"
        heading="Visibility without performance."
        body={`You do not have to build a brand or a following to be read here. Journals and readers move through the Garden the way you do: following threads, themes, and paths, not popularity charts.\nYou can mark certain pieces or projects as "open to journals". Editors can send you specific requests, with rights and payment clearly spelled out. You respond from your Studio, inside the same space where the piece was born.`}
      />

      <EditorialSection
        number="VII"
        heading="From Garden to Gallery to Editions."
        body={`When a piece is ready for the stage, you can submit it to The Page Gallery or to partner journals directly from your Garden. If it finds a home in an issue, the original piece remains in your Studio with a note that says where it has gone.\nSome projects ask to be bigger than an issue — a sequence of poems, a long essay, a book. Those projects move into Page Gallery Editions, where they are edited, designed, and carried into the world as physical and digital objects.\nAt every stage, you can see the path your work has taken, and you remain in control of what happens next.`}
      />

      <EditorialSection
        number="VIII"
        heading="A notebook that remembers you."
        body={`It feels like keeping a notebook that can show you what you have actually been thinking about for the last year. It remembers the drafts you abandoned and the images that would not leave you alone.\nIt does not score you. It does not prompt you to post. It gives you somewhere to put the mornings, the mess, the sentences that might one day become something, and the ones that never have to.`}
        bordered={false}
      />
    </div>
  );
}