import React from 'react';
import EditorialSection from '../shared/EditorialSection';

export default function HomeGardenFeed() {
  return (
    <EditorialSection
      number="IV"
      heading="Social media in slow motion."
      body={`The Garden feed is built from pages, not posts. There are no like counts, follower tallies, or trending tabs. Just a slow drift of pieces, paths, and conversations you can actually finish.\nInstead of chasing the latest moment, the feed keeps returning to the questions, images, and themes you and your peers keep circling.`}
      ctaText="See the Garden feed"
      ctaLink="/"
    />
  );
}