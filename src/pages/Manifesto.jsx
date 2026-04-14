import React from 'react';
import { motion } from 'framer-motion';

export default function Manifesto() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              The Garden Manifesto
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8 max-w-4xl">
              The Garden by The Page Gallery
            </h1>
            <p className="font-serif text-xl md:text-2xl italic text-muted-foreground max-w-2xl leading-relaxed">
              This essay is the ground everything else stands on. It explains why The Garden exists, why it is free, why there are no public metrics, why we do not use AI to read your work, and why we are interested in the hands, not just the parcel.
            </p>
          </motion.div>
          <div className="mt-16 border-t-2 border-foreground" />
        </div>
      </section>

      {/* Essay body */}
      <section className="pb-24 md:pb-36">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-base md:text-lg leading-[1.8] text-foreground/85 space-y-0"
          >
            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-8 text-center italic">
              What follows is not a business plan
            </p>

            <ManifestoBody />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ManifestoBody() {
  return (
    <div className="space-y-6">
      <p className="drop-cap">
        There is a specific gesture that every literary platform performs and nobody mentions. The gesture is this: a text field, a word count, a submit button. Sometimes there is a cover letter box. Sometimes a dropdown menu for genre. The infrastructure communicates, with the plain efficiency of a customs desk, that writing is a thing you produce elsewhere and then deposit here. The platform receives. The writer delivers. Between those two actions — the making and the handing over — is the entire creative life, and no platform has ever been interested in it. They want the parcel. They have no use for the hands.
      </p>

      <p className="font-serif text-xl md:text-2xl italic text-center py-6">
        This is the thing about The Garden: it is interested in the hands.
      </p>

      {/* Section I */}
      <SectionDivider number="I" />

      <p>
        Grant applications, as a genre, have structural expectations. Revenue projections. Membership models. User-acquisition funnels rendered in clean sans-serif, each quarterly target slightly more optimistic than the last, ascending toward a future in which sustainability has been solved and everyone involved can stop holding their breath. We were going to provide these. We drafted the tiers. We imagined the ladders. Then my co-editor Giove and I had the kind of conversation that is only useful when it undoes the thing you planned to say, and what it undid was this: the impulse to dress a creative conviction in financial inevitability, to make the spreadsheet the opening act so that the idea would seem safer by the time it arrived.
      </p>

      <p>
        The idea is not safe. The idea is that writing's most important life happens before it is presentable, and that every tool we have built for writers — every journal, platform, app, portal — systematically ignores that life in favour of the moment it ends. The Garden exists for the life before.
      </p>

      <p>
        There are monetisation pathways. Memberships will make sense eventually, when the infrastructure demands it, when sustainability requires it. But building those pathways now, before the space has had time to discover what it actually is, is precisely how good ideas learn to betray themselves. Solving future problems at the expense of present ones is what the entire technology industry does, and the results are visible: platforms that optimise for growth so aggressively they forget what they were growing. The Garden will be free. Not free as a promotional period. Free as a founding condition — because the thing it protects, the unperformed inner life of a writer, should not require a subscription.
      </p>

      {/* Section II */}
      <SectionDivider number="II" />

      <p>
        Here is how the current literary ecosystem functions:
      </p>

      <p>
        Substack charges ten per cent to speak to an audience you assembled yourself and markets this as creative independence. Instagram rewards the photograph of the open notebook — the Moleskine, the coffee, the morning light across a ruled page — more generously than anything written inside it. The creator economy invites writers to monetise their interiority until interiority means whatever fits a tiered pricing model. Sixty-nine per cent of creators report financial instability linked directly to their work; sixty-two per cent experience burnout "sometimes or often." The feedback loop is structural: if output slows, reach declines; if reach declines, revenue drops; exhaustion becomes an economic risk, which produces more exhaustion, which the platform interprets as disengagement.
      </p>

      <p>
        Even the quiet literary spaces participate. Journals open submission windows. Contests set deadlines. The verb is always <em>submit</em> — a word whose other meaning, which is obedience, is doing more work than anyone acknowledges. The result is a culture in which every writer is performing the act of having written. The submissions are polished. The vulnerability is metered. The mess has been cleaned before arrival.
      </p>

      <p>
        Women understand this cost fastest. Online, women writers are structurally rewarded for vulnerability and structurally tolerated for expertise. The platforms never say <em>show us your wound</em>; they say <em>authenticity</em> and <em>relatability</em>, and the algorithm translates. A woman who bleeds on cue is "brave." A woman who speaks with authority is "a lot." This is not a feeling. It is a pattern, visible in engagement metrics, in the language of submission guidelines that request "emotional honesty" but never "intellectual command," in the quiet calculus by which women learn to sand down their certainty before pressing publish.
      </p>

      <p className="font-serif text-lg italic pl-8 border-l-2 border-foreground/20 my-8">
        The Garden draws one line: is this generative for the person making it? That is the only metric. Not whether it performs well. Not whether it is vulnerable on schedule. Whether it is alive for its maker.
      </p>

      {/* Section III */}
      <SectionDivider number="III" />

      <p>
        When someone dies, the rough drafts go first. The note on the counter that trails off mid-sentence. The notebook with three pages of furious handwriting then nothing. The browser tabs nobody will close in the right order. The dreams that were never recorded because who records dreams. Everything interior — the recurring images, the questions asked at three in the morning and abandoned by 3:02, the paragraph that was going somewhere — exits the world without ceremony. We keep the finished work. We keep the photographs. We lose the rough draft, which is to say we lose the actual person, because the actual person was always the rough draft: contradictory, unfinished, mid-thought.
      </p>

      <p>
        This is not a metaphor. This is what happened, repeatedly, during a period of serious illness. When the scaffolding of a literary life — deadline, submission, output, performance — collapsed, what remained was not a career. What remained was fragments. Notes. The margins of things. And the recognition that every structure built for writers intercepts the work only after it has performed the miracle of existing. Nothing holds the mind in the act of making.
      </p>

      <p>
        The Page Gallery was the first attempt to hold it. A literary journal built to honour the inner worlds of writers, to treat every fragment of thought as material that mattered. The Gallery publishes writing that feels "honest, unexpected, and emotionally resonant," with no themes and no formulas. Submissions are always open. The editorial philosophy is that if it matters to the writer, it matters. The Gallery does not reject; it invites.
      </p>

      {/* Section IV */}
      <SectionDivider number="IV" />

      <p>
        The Garden and The Page Gallery are two separate worlds with a door between them.
      </p>

      <p>
        The Gallery is a stage. The lights are chosen. The curation is careful. Finished work stands up straight there, held in context. The Garden is everything that happens before a piece survives long enough to walk out under those lights.
      </p>

      <p>
        In the Garden, each writer tends a private landscape of text: notes, drafts, fragments, proto-essays, marginalia, obsessive lists, forms that refuse to declare their genre. Pieces exist in states — seed, sprout, bloom — because most writing is not finished; it is interrupted. There are no character limits. No public metrics. No like counts, share counts, follower tallies, or trending indicators. A seed can sit for six months without the system penalising it for underperforming. The only numbers a writer sees are reflective: the topics they keep circling, the drafts they revisit, the tags that keep magnetising each other across time.
      </p>

      <p>
        Connection replaces chronology. A line tagged <em>grief, mothers, sea</em> can quietly pull a paragraph written four months later into orbit, and the writer discovers they have been writing the same tidal thought all year without knowing it. The system can surface that pattern. It cannot have the recognition for you.
      </p>

      {/* Section V */}
      <SectionDivider number="V" />

      <p>
        Digital gardening, as Maggie Appleton has documented it, is the practice of maintaining a collection of evolving, interlinked notes that refuses the time-stamp logic of the feed. Where the stream shows you only the zeitgeist of the last twenty-four hours and is not designed to accumulate knowledge or mature over time, the garden grows slowly, connects by association, and treats the unfinished as a feature rather than a defect.
      </p>

      <p>
        But digital gardening has remained, until now, largely a practice for technologists and knowledge workers — people whose primary material is information. The Garden takes the ethos and builds it for people whose primary material is language. Paragraphs, lineated fragments, essays, poems, marginalia. The difference matters. A knowledge worker's garden organises information toward eventual use. A writer's garden holds language in states of becoming, with no guarantee of use, and the absence of that guarantee is the point.
      </p>

      <p className="font-serif text-lg italic pl-8 border-l-2 border-foreground/20 my-8">
        Every design choice refuses the stream.
      </p>

      {/* Section VI */}
      <SectionDivider number="VI" />

      <p>
        Creativity is connecting things. Not talent. Not mystical capacity. The willingness to notice that two apparently unrelated objects are in conversation, and to follow that conversation long enough for it to become something you did not expect. What this requires is not genius. It is wonder. <em>Where is your innate wonder?</em> That is the only question.
      </p>

      <p>
        Joan Didion said she wrote to find out what she was thinking. The sentence has been quoted so many times it has become a decorative object — attractive, inert, no longer doing work. The caution is this: the first draft records the impulse. The real thinking happens in the rewriting. When you return to a sentence and discover it was wrong, or truer than you intended, or actually about something else entirely, writing stops being transcription and becomes cognition. The Garden is built for both the first scrawl and the long return.
      </p>

      {/* Section VII */}
      <SectionDivider number="VII" />

      <p>
        Mediocrity is the road, not the obstacle on it. If shaming yourself for being mediocre is more compelling than sifting through the mediocrity for whatever might be glinting underneath, you have not found the thing yet. The thing — the question, the form, the image that will have you coming back even when you hate what you've made — converts the humiliation of being bad at something into data about what you are actually trying to do.
      </p>

      <p>
        Finishing is a separate skill. Unrelated to talent, unrelated to inspiration. A craft that can only be practised by finishing things that are not good enough, and doing it anyway, and learning from the specific quality of each failure. The fear of being misunderstood is not an error in the creative process. It <em>is</em> the creative process.
      </p>

      {/* Section VIII */}
      <SectionDivider number="VIII" />

      <p>
        The loud anxiety about AI "stealing creativity" consistently misidentifies the threat. The machine is not coming for the novel. The machine is coming for the conditions under which a novel could ever be written: the long undirected research, the unproductive afternoon, the boredom that sends you into a library stack nobody has tagged. Automating the output is a parlour trick. Automating the input — curating what you encounter, pre-selecting what you find interesting, systematically eliminating the boredom from which every genuinely surprising thought has ever emerged — is the actual danger.
      </p>

      <p>
        We do not use AI to read or sort submissions. Automating attention is the same as withdrawing it. A model can cluster text by topic. It cannot experience the slow, bodily recognition that two apparently unrelated submissions belong together because reading them in sequence does something to the nervous system that neither piece does alone. That recognition is editing. That is not outsourceable.
      </p>

      {/* Section IX */}
      <SectionDivider number="IX" />

      <p>
        I and several members of my editorial team live with chronic illnesses. When the body refuses the culture's demand for relentless output — when the feedback loop of produce-more-to-earn-more-to-produce-more breaks down at the level of the nervous system — you learn that speed is a preference masquerading as a value. The masquerade only holds as long as the body cooperates. Ours do not always cooperate. Our slowness is not a failure we are engineering around. It is the founding condition of everything The Garden believes.
      </p>

      <p>
        The Garden is not a smoother machine for doing what the existing machines already do. It is a different kind of space altogether.
      </p>

      {/* Section X */}
      <SectionDivider number="X" />

      <p>
        This is a bet that the most important part of a creative life is the part no one sees. The years of fragments. The ideas that never became "pieces." The daily rotation through mediocrity, the dogged returning, the slow accumulation of connections only you could have made because only you were paying that particular quality of attention to that particular set of obsessions for that particular duration of time. That is not the preamble to the work. That is the work.
      </p>

      <p>
        The Page Gallery will continue to be the room where finished pieces stand in clean light. The Garden will be the terrain underneath: overgrown, uneven, full of false starts, and therefore accurate. Every feature — from private analytics to the way submissions are managed to the refusal of public engagement metrics — is an attempt to give institutional shape to something that has always been treated as private and disposable: the mind in the act of making.
      </p>

      <p className="font-serif text-xl md:text-2xl italic text-center py-10 leading-relaxed">
        Not a feed, but a garden. Not a brand, but a consciousness. Not a chart, but the one thing a chart was never built to measure — which is, in the end, the only thing worth building for.
      </p>

      <div className="border-t-2 border-foreground mt-8 pt-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          ✦ End of Manifesto ✦
        </p>
      </div>
    </div>
  );
}

function SectionDivider({ number }) {
  return (
    <div className="py-8 text-center">
      <span className="font-serif text-2xl font-bold text-foreground/30">{number}.</span>
    </div>
  );
}