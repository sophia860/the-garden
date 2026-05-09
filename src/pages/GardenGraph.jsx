import React from 'react';
import EditorialHero from '../components/shared/EditorialHero';
import GardenNetworkGraph from '../components/garden/GardenNetworkGraph';

export default function GardenGraph() {
  return (
    <div>
      <EditorialHero
        eyebrow="The Garden · Connections"
        title="Your ideas, in conversation."
        subtitle="A non-linear map of fragments connected by shared tags. Drag, filter, and follow the threads your writing keeps returning to."
      />

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8">
            — Connection graph · demo data
          </p>
          <GardenNetworkGraph />
        </div>
      </section>
    </div>
  );
}