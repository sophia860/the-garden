import React from 'react';
import EditorialHero from '../components/shared/EditorialHero';
import EditorialSection from '../components/shared/EditorialSection';
import EditorialCard from '../components/shared/EditorialCard';

export default function Residency() {
  return (
    <div>
      <EditorialHero
        eyebrow="Residency"
        title="A residency programme for journals, built inside the Garden."
        subtitle="Space, tools, and companionship for independent editors and small presses."
      />

      <EditorialSection
        number="I"
        heading="What the residency offers"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditorialCard title="Garden workspace">
            <p>A Garden workspace tailored to your publication.</p>
          </EditorialCard>
          <EditorialCard title="Gatehouse access">
            <p>Access to Gatehouse submissions and Issues tools.</p>
          </EditorialCard>
          <EditorialCard title="Production support">
            <p>Support in design, editing, and production from The Page Gallery team.</p>
          </EditorialCard>
          <EditorialCard title="Shared space">
            <p>A shared space with other residents to compare notes and methods.</p>
          </EditorialCard>
        </div>
        <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mt-8 max-w-2xl">
          Some residents go on to become imprints within Page Gallery Editions.
          Others leave with a stronger structure and a clearer sense of their own path.
        </p>
      </EditorialSection>

      <EditorialSection
        number="II"
        heading="Who it is for"
      >
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
          <p>The Residency is for editors and collectives who:</p>
          <ul className="space-y-2 pl-6">
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Care more about voice than novelty.</li>
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Are willing to move slowly.</li>
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Are building journals, presses, or series that might not fit inside existing commercial structures.</li>
          </ul>
          <p className="mt-4">
            We are particularly interested in projects led by people living with chronic illness and disability, caregivers, and those working outside major literary centres.
          </p>
        </div>
      </EditorialSection>

      <EditorialSection
        number="III"
        heading="How it works"
        bordered={false}
      >
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
          <p>Residencies run in seasons.</p>
          <p>
            During a season, you bring a concrete project — an issue, a folio, a new journal — into the Garden.
          </p>
          <p>
            We help you set up your space, shape your submissions, and move from scattered pieces to a finished object.
            You share process, not just results, with the other residents.
          </p>
          <p>
            At the end of the season, your project exists in the world.
            We decide together whether it wants to remain under the Page Gallery umbrella, become an Edition, or stand entirely on its own.
          </p>
        </div>
      </EditorialSection>
    </div>
  );
}