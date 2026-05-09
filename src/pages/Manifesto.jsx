import React from 'react';
import { motion } from 'framer-motion';

export default function Manifesto() {
  return (
    <div className="bg-white min-h-screen">
      {/* Cover block */}
      <section className="py-20 md:py-32 border-b border-foreground/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Vol / issue stamp */}
            <div className="mb-12 flex items-start justify-between">
              <div>
                <p className="manifesto-label mb-1">Vol. 1</p>
                <p className="manifesto-label">The Garden · The Page Gallery</p>
              </div>
              <p className="manifesto-label text-right">
                typical, classical,<br />
                just like sonnets.
              </p>
            </div>

            {/* Title — large, slightly skewed */}
            <div className="mb-10">
              <h1
                className="font-serif font-black leading-none tracking-tight"
                style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', transform: 'rotate(-0.4deg)' }}
              >
                The Garden
              </h1>
              <div className="flex items-baseline gap-4 mt-2">
                <span className="font-serif font-bold italic text-2xl md:text-4xl opacity-40 line-through">
                  by The Page Gallery
                </span>
              </div>
            </div>

            {/* Subtitle stack */}
            <div className="font-mono text-xs space-y-1 text-foreground/50 mb-12">
              <p>asi es</p>
              <p>si</p>
              <p>a · si · parece</p>
            </div>

            {/* Rule */}
            <div className="border-t border-foreground/20 pt-8">
              <p className="font-mono text-xs text-foreground/40 leading-relaxed max-w-lg">
                This essay is the ground everything else stands on. It explains why The Garden exists, why it is free, why there are no public metrics, why we do not use AI to read your work, and why we are interested in the hands, not just the parcel.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sub-heading annotation */}
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8">
        <p className="font-mono text-xs text-foreground/30 italic text-center tracking-widest">
          — what follows is not a business plan —
        </p>
      </div>

      {/* Body */}
      <section className="pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <ManifestoBody />
        </div>
      </section>
    </div>
  );
}

/* ─── helper components ─── */

function ZineSection({ number, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      {/* Section marker — like a hand-stamped number */}
      <div className="flex items-center gap-4 mb-8">
        <span
          className="font-serif font-black text-6xl md:text-8xl leading-none text-foreground/8 select-none"
          style={{ letterSpacing: '-0.04em' }}
        >
          {number}
        </span>
        <div className="flex-1 border-t border-foreground/15" />
      </div>
      <div className="space-y-5 font-body text-sm md:text-base leading-[1.9] text-foreground/75">
        {children}
      </div>
    </motion.div>
  );
}

function ZinePullQuote({ children }) {
  return (
    <div className="my-10 relative">
      {/* Rough left bar — uneven, like a pen stroke */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/30" style={{ transform: 'rotate(0.5deg)' }} />
      <p className="pl-6 font-serif text-lg md:text-xl italic leading-relaxed text-foreground/80">
        {children}
      </p>
    </div>
  );
}

function ZineAnnotation({ children }) {
  return (
    <p
      className="font-mono text-xs text-foreground/35 leading-relaxed my-6 tracking-wide"
      style={{ transform: 'rotate(-0.2deg)' }}
    >
      {children}
    </p>
  );
}

function ZineStrikethrough({ children }) {
  return (
    <span className="line-through decoration-foreground/40 decoration-1 opacity-50">
      {children}
    </span>
  );
}

function ManifestoBody() {
  return (
    <div>

      {/* Opening — full width, big */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mb-16 pt-4"
      >
        <p className="font-body text-base md:text-lg leading-[1.9] text-foreground/75 drop-cap">
          There is a specific gesture that every literary platform performs and nobody mentions. The gesture is this: a text field, a word count, a submit button. Sometimes there is a cover letter box. Sometimes a dropdown menu for genre. The infrastructure communicates, with the plain efficiency of a customs desk, that writing is a thing you produce elsewhere and then deposit here. The platform receives. The writer delivers. Between those two actions — the making and the handing over — is the entire creative life, and no platform has ever been interested in it. They want the parcel. They have no use for the hands.
        </p>

        <div className="my-10 text-center">
          <p
            className="font-serif text-2xl md:text-3xl font-bold inline-block"
            style={{ transform: 'rotate(-0.5deg)' }}
          >
            IT MEANS THAT
          </p>
          <br />
          <p className="font-serif italic text-base md:text-lg text-foreground/50 mt-2">
            this is the thing about The Garden: it is interested in the hands.
          </p>
        </div>
      </motion.div>

      {/* Two-column layout for sections I–II */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mb-16">
        <ZineSection number="I">
          <p>
            Grant applications, as a genre, have structural expectations. Revenue projections. Membership models. User-acquisition funnels rendered in clean sans-serif, each quarterly target slightly more optimistic than the last, ascending toward a future in which sustainability has been solved and everyone involved can stop holding their breath.
          </p>
          <p>
            We were going to provide these. We drafted the tiers. We imagined the ladders. Then my co-editor Giove and I had the kind of conversation that is only useful when it undoes the thing you planned to say, and what it undid was this: the impulse to dress a creative conviction in financial inevitability.
          </p>
          <p>
            The idea is not safe. The idea is that writing's most important life happens before it is presentable, and that every tool we have built for writers — every journal, platform, app, portal — <ZineStrikethrough>systematically ignores that life in favour of the moment it ends</ZineStrikethrough>. The Garden exists for the life before.
          </p>
          <ZineAnnotation>
            think&nbsp;&nbsp;think<br />
            think&nbsp;&nbsp;think<br />
            think<br />
            &nbsp;&nbsp;all the time<br />
            &nbsp;&nbsp;&nbsp;&nbsp;about it
          </ZineAnnotation>
        </ZineSection>

        <ZineSection number="II">
          <p>
            Here is how the current literary ecosystem functions:
          </p>
          <p>
            Substack charges ten per cent to speak to an audience you assembled yourself and markets this as creative independence. Instagram rewards the photograph of the open notebook more generously than anything written inside it. The creator economy invites writers to monetise their interiority until interiority means whatever fits a tiered pricing model.
          </p>
          <p>
            Even the quiet literary spaces participate. Journals open submission windows. Contests set deadlines. The verb is always <em>submit</em> — a word whose other meaning, which is obedience, is doing more work than anyone acknowledges. The result is a culture in which every writer is performing the act of having written.
          </p>
          <ZinePullQuote>
            The Garden draws one line: is this generative for the person making it?
          </ZinePullQuote>
        </ZineSection>
      </div>

      {/* Full-bleed section III */}
      <ZineSection number="III">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-5">
            <p>
              When someone dies, the rough drafts go first. The note on the counter that trails off mid-sentence. The notebook with three pages of furious handwriting then nothing. The browser tabs nobody will close in the right order. The dreams that were never recorded because who records dreams. Everything interior exits the world without ceremony. We keep the finished work. We lose the rough draft, which is to say we lose the actual person, because the actual person was always the rough draft: contradictory, unfinished, mid-thought.
            </p>
            <p>
              This is not a metaphor. This is what happened, repeatedly, during a period of serious illness. When the scaffolding of a literary life collapsed, what remained was fragments. Notes. The margins of things.
            </p>
            <p>
              The Page Gallery was the first attempt to hold it. A literary journal built to honour the inner worlds of writers, to treat every fragment of thought as material that mattered. The Gallery does not reject; it invites.
            </p>
          </div>
          <div className="md:border-l md:border-foreground/15 md:pl-6 flex flex-col justify-center space-y-4">
            <p className="manifesto-label">we still breath.</p>
            <p className="font-serif text-lg font-bold leading-tight" style={{ transform: 'rotate(-1deg)' }}>
              WE MOVED<br />ON TO BETTER<br />THINGS
            </p>
            <div className="w-16 border-t border-foreground/20" />
            <p className="manifesto-label">and live in the same place</p>
            <p className="font-mono text-xs italic text-foreground/30">so let's move on</p>
          </div>
        </div>
      </ZineSection>

      {/* Section IV */}
      <ZineSection number="IV">
        <p>
          The Garden and The Page Gallery are two separate worlds with a door between them. The Gallery is a stage. The lights are chosen. The curation is careful. The Garden is everything that happens before a piece survives long enough to walk out under those lights.
        </p>
        <p>
          In the Garden, each writer tends a private landscape of text: notes, drafts, fragments, proto-essays, marginalia, obsessive lists, forms that refuse to declare their genre. Pieces exist in states — seed, sprout, bloom — because most writing is not finished; it is interrupted. There are no character limits. No public metrics. No like counts, share counts, follower tallies, or trending indicators. A seed can sit for six months without the system penalising it for underperforming.
        </p>
        <ZinePullQuote>
          Connection replaces chronology. A line tagged <em>grief, mothers, sea</em> can quietly pull a paragraph written four months later into orbit.
        </ZinePullQuote>
      </ZineSection>

      {/* Section V–VI side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 mb-16">
        <ZineSection number="V">
          <p>
            Digital gardening, as Maggie Appleton has documented it, is the practice of maintaining a collection of evolving, interlinked notes that refuses the time-stamp logic of the feed. Where the stream shows you only the zeitgeist of the last twenty-four hours, the garden grows slowly, connects by association, and treats the unfinished as a feature rather than a defect.
          </p>
          <p>
            But digital gardening has remained largely a practice for technologists and knowledge workers. The Garden takes the ethos and builds it for people whose primary material is language.
          </p>
          <ZineAnnotation>Every design choice refuses the stream.</ZineAnnotation>
        </ZineSection>

        <ZineSection number="VI">
          <p>
            Creativity is connecting things. Not talent. Not mystical capacity. The willingness to notice that two apparently unrelated objects are in conversation, and to follow that conversation long enough for it to become something you did not expect. What this requires is not genius. It is wonder.
          </p>
          <p>
            Joan Didion said she wrote to find out what she was thinking. The caution is this: the first draft records the impulse. The real thinking happens in the rewriting. The Garden is built for both the first scrawl and the long return.
          </p>
        </ZineSection>
      </div>

      {/* Section VII */}
      <ZineSection number="VII">
        <div className="max-w-xl">
          <p>
            Mediocrity is the road, not the obstacle on it. If shaming yourself for being mediocre is more compelling than sifting through the mediocrity for whatever might be glinting underneath, you have not found the thing yet.
          </p>
          <p>
            Finishing is a separate skill. Unrelated to talent, unrelated to inspiration. A craft that can only be practised by finishing things that are not good enough, and doing it anyway, and learning from the specific quality of each failure. The fear of being misunderstood is not an error in the creative process. It <em>is</em> the creative process.
          </p>
        </div>
      </ZineSection>

      {/* Section VIII */}
      <ZineSection number="VIII">
        <p>
          The loud anxiety about AI "stealing creativity" consistently misidentifies the threat. The machine is not coming for the novel. The machine is coming for the conditions under which a novel could ever be written: the long undirected research, the unproductive afternoon, the boredom that sends you into a library stack nobody has tagged.
        </p>
        <ZinePullQuote>
          We do not use AI to read or sort submissions. Automating attention is the same as withdrawing it.
        </ZinePullQuote>
        <p>
          A model can cluster text by topic. It cannot experience the slow, bodily recognition that two apparently unrelated submissions belong together because reading them in sequence does something to the nervous system that neither piece does alone. That recognition is editing. That is not outsourceable.
        </p>
      </ZineSection>

      {/* Section IX */}
      <ZineSection number="IX">
        <p>
          I and several members of my editorial team live with chronic illnesses. When the body refuses the culture's demand for relentless output — when the feedback loop of produce-more-to-earn-more-to-produce-more breaks down at the level of the nervous system — you learn that speed is a preference masquerading as a value. The masquerade only holds as long as the body cooperates. Ours do not always cooperate.
        </p>
        <ZineAnnotation>
          Our slowness is not a failure we are engineering around.<br />
          It is the founding condition of everything The Garden believes.
        </ZineAnnotation>
      </ZineSection>

      {/* Section X — closing */}
      <ZineSection number="X">
        <p>
          This is a bet that the most important part of a creative life is the part no one sees. The years of fragments. The ideas that never became "pieces." The daily rotation through mediocrity, the dogged returning, the slow accumulation of connections only you could have made because only you were paying that particular quality of attention to that particular set of obsessions for that particular duration of time. That is not the preamble to the work. That is the work.
        </p>
        <p>
          The Page Gallery will continue to be the room where finished pieces stand in clean light. The Garden will be the terrain underneath: overgrown, uneven, full of false starts, and therefore accurate.
        </p>
      </ZineSection>

      {/* Colophon */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pt-16 mt-8 border-t border-foreground/10 text-center space-y-4"
      >
        <p
          className="font-serif text-xl md:text-2xl font-bold italic leading-relaxed max-w-2xl mx-auto"
          style={{ transform: 'rotate(-0.3deg)' }}
        >
          Not a feed, but a garden. Not a brand, but a consciousness. Not a chart, but the one thing a chart was never built to measure.
        </p>
        <p className="manifesto-label mt-6">The Page Gallery · Arrayan Ediciones</p>
      </motion.div>
    </div>
  );
}