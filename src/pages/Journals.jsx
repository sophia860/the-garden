import React from 'react';
import EditorialHero from '../components/shared/EditorialHero';
import EditorialSection from '../components/shared/EditorialSection';

export default function Journals() {
  return (
    <div>
      <EditorialHero
        eyebrow="For journals and editors"
        title="A reading room and scouting network, not another submissions portal."
        subtitle="Built by editors who were tired of systems that treat writers like support tickets."
        primaryCta="Join as a journal"
        primaryCtaLink="/"
      />

      <EditorialSection
        number="I"
        heading="You are not short of submissions. You are short of context."
        body={`Most submission systems deliver a stack of files and no sense of the life around them. You read in isolation, guess at the writer's larger project, and hope you are catching people at the right moment.\nThe Garden lets you work differently. You can follow writers over time, see how pieces relate to each other, and grow issues from relationships rather than one‑off encounters.`}
      />

      <EditorialSection
        number="II"
        heading="Scout from living gardens."
        body={`Browse writer gardens and follow the ones that speak to you. Save pieces to scouting boards, see what else a writer is working on, and notice when a draft quietly turns into a bloom.\nYou are not limited to what happens to arrive in your inbox this season. You can build a list of voices you care about and return to them when you are ready.`}
      />

      <EditorialSection
        number="III"
        heading="Humane submissions."
        body={`When you do open for submissions, you do it through Gatehouse — a submissions space built inside the Garden.\nWriters submit from the same Studio where they drafted the piece. You see exactly what they see: tags, states, notes to self if they choose to share them.\nYou can configure windows, assign readers, and keep track of decisions without abstracting writers into ticket numbers. Responses are clear and timely, even when the answer is no.`}
      />

      <EditorialSection
        number="IV"
        heading="Issues grown, not assembled."
        body={`Use Garden Maps and Boards to gather the pieces you are drawn to into loose constellations. Watch threads emerge: grief and housing, mother tongues, chronic bodies, strange work.\nWhen an issue begins to cohere, you move into an Issue view where you can order pieces, pair them with artworks, and write the connective tissue around them.\nAn issue is no longer a hurried arrangement of the last hundred submissions. It is something that has been growing in your Garden for months.`}
      />

      <EditorialSection
        number="V"
        heading="Why writers don't hate this."
        bordered={false}
      >
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
          <p>No AI reads or scores their work.</p>
          <p>No hidden platform fees just to be considered.</p>
          <p>No black‑box rankings that decide who is "visible".</p>
          <p>
            Writers submit from within their own gardens and always have a record of what they sent, where, and why.
            They can see what you are asking for, what rights you want, and how long you expect to take.
          </p>
          <p className="font-serif text-foreground text-lg italic">
            The distance between "writer" and "editor" becomes a conversation again, not a form.
          </p>
        </div>
      </EditorialSection>
    </div>
  );
}