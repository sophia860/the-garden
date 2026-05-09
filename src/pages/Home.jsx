import React from 'react';
import EditorialHero from '../components/shared/EditorialHero';
import EditorialSection from '../components/shared/EditorialSection';
import EditorialCard from '../components/shared/EditorialCard';
import StepBlock from '../components/shared/StepBlock';
import HomeGardenFeed from '../components/home/HomeGardenFeed';
import HomeWhyExists from '../components/home/HomeWhyExists';
import HomeEcosystem from '../components/home/HomeEcosystem';

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <EditorialHero
        eyebrow="The Page Gallery"
        title="The Garden"
        subtitle="A platform interested in the hands, not just the parcel."
        body={
          <p>
            Most platforms only see a text field and a submit button.
            They assume the work happens somewhere else, off‑screen, in the hours nobody is counting.
            The Garden is where that life before "submit" actually lives — drafts, fragments, obsessions, and the slow work of making.
          </p>
        }
        primaryCta="Enter the Garden"
        primaryCtaLink="/garden"
        secondaryCta="Read the founding essay"
        secondaryCtaLink="/manifesto"
        large
      />

      {/* FOR WRITERS */}
      <EditorialSection
        number="I"
        heading="Are you a writer who spends more time reading submission guides than writing?"
        body={`The current ecosystem asks you to re‑format the same piece for every portal, chase response times across half a dozen platforms, and perform intimacy on schedule. You polish, export, attach, upload, and hope your work survives the journey through forms that were never built with writers in mind.\nThe Garden flips the direction of travel. You tend a living notebook. Journals, editors, and collaborators come to your pages, not the other way round.`}
      />

      {/* THREE WAYS */}
      <EditorialSection
        number="II"
        heading="Three ways to live here"
        body={<p className="mb-4">The Page Gallery is one ecosystem with three intertwined spaces.</p>}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <EditorialCard number="01" title="Writers">
            <p>
              A live notebook that journals and readers can actually visit.
              Drafts, notes, fragments, and finished pieces live in one quiet studio.
              You decide what stays private, what you share with a small circle, and what you send out into the world.
            </p>
          </EditorialCard>

          <EditorialCard number="02" title="Journals">
            <p>
              A reading room and scouting network instead of another submissions portal.
              Scout from living gardens instead of anonymous queues.
              Run humane submissions, follow writers over time, and grow issues from relationships rather than one‑off files.
            </p>
          </EditorialCard>

          <EditorialCard number="03" title="Page Gallery Editions">
            <p>
              A publishing house grown out of a garden, not a catalogue.
              Editions publishes books, collections, and special issues that first made sense inside the Garden, carrying their roots with them into print and digital form.
            </p>
          </EditorialCard>
        </div>
      </EditorialSection>

      {/* HOW IT WORKS */}
      <EditorialSection
        number="III"
        heading="How the Garden works"
      >
        <div className="space-y-12 md:space-y-16">
          <StepBlock
            stepNumber="1"
            title="Write in the Garden"
            body="Seeds, sprouts, and blooms — all the stages of a piece live in one place that isn't a feed. The Writer's Studio holds drafts, fragments, marginalia, and returns, without punishing you for slowness or absence."
          />
          <StepBlock
            stepNumber="2"
            title="Be read and scouted"
            body="Editors, artists, and readers move through pages slowly, following tags, paths, and invitations instead of trends and metrics. Journals can follow your garden long before they ask for a specific piece, learning your voice at its own pace."
          />
          <StepBlock
            stepNumber="3"
            title="Become issues, books, commissions"
            body="When work is ready for the stage, it travels through The Page Gallery and Page Gallery Editions. Pieces become journal issues, folios, books, and commissions without losing the soil they grew in."
          />
        </div>
      </EditorialSection>

      {/* GARDEN FEED */}
      <HomeGardenFeed />

      {/* WHY THE GARDEN EXISTS */}
      <HomeWhyExists />

      {/* ONE ECOSYSTEM */}
      <HomeEcosystem />
    </div>
  );
}