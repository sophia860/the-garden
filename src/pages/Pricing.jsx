import React from 'react';
import EditorialHero from '../components/shared/EditorialHero';
import EditorialSection from '../components/shared/EditorialSection';
import EditorialCard from '../components/shared/EditorialCard';

export default function Pricing() {
  return (
    <div>
      <EditorialHero
        eyebrow="Pricing"
        title="Free for writers. Transparent for journals."
        subtitle="The core Garden remains free. Journals and institutions pay for the infrastructure they use, not for access to writers."
      />

      <EditorialSection number="I" heading="Writers">
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
          <p className="font-serif text-foreground text-2xl md:text-3xl font-bold">Free.</p>
          <p>No tiers, no usage caps, no surprise fees.</p>
          <p>
            You keep your garden even if you never submit to a journal or Edition.
            If you do publish with us, payment terms and splits are agreed project by project and are clearly documented.
          </p>
        </div>
      </EditorialSection>

      <EditorialSection number="II" heading="Journals and presses">
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
          <p>Journals and small presses pay for:</p>
          <ul className="space-y-2 pl-6">
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Gatehouse submissions and review tools.</li>
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Collaborative Garden workspaces for editorial teams.</li>
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Access to Residency support where applicable.</li>
          </ul>
          <p className="mt-4">
            We do not take a cut of your subscription revenue.
            We do not own your archives.
            We charge for the infrastructure we maintain so that you, and your writers, can move slowly and well.
          </p>
        </div>
      </EditorialSection>

      <EditorialSection
        number="III"
        heading="Institutions and partners"
        bordered={false}
      >
        <div className="max-w-3xl font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-4">
          <p>
            Universities, cultural institutions, and funding bodies can support the Garden and The Page Gallery through:
          </p>
          <ul className="space-y-2 pl-6">
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Residency sponsorships.</li>
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Editions partnerships.</li>
            <li className="relative before:content-['–'] before:absolute before:-left-5 before:text-muted-foreground">Direct support for free access and maintenance.</li>
          </ul>
          <p className="mt-4">
            If you want writers and small journals to have a place where their inner work is not immediately monetised or mined for metrics, this is one way to help.
          </p>
        </div>
      </EditorialSection>
    </div>
  );
}