/* ═══════════════════════════════════════════════════════════════════════
   SITE CONTENT — everything you are likely to want to edit lives here.

   This file:   name, role, bio, tagline, links, experience, education,
                honors, photography, reading, and every page's heading.

   The bio is `personalInfo.bio`, one string per paragraph. Write links as
   [text](url) — they are rendered as real anchors.

   Still in markdown, because they are lists:

   data/home/News.mdx           the news list
   data/home/Miscellaneous.mdx  the personal bullet points
   data/bib/Publications.bib    papers and patents (BibTeX)
   public/                      images, photos/, and the CV PDF

   Nothing else contains user-facing text. After editing, run
   `npm run dev` to preview or `npm run build` to produce out/.
   ═══════════════════════════════════════════════════════════════════════ */

export const personalInfo = {
  name: 'Stephen Yang',
  fullName: 'Stephen Jiezhi Yang',
  profilePicture: '/portrait-skogafoss.webp',
  role: 'Research Scientist',
  university: 'Wayve Labs',
  universityWebsite: 'https://wayve.ai/',
  location: 'Sunnyvale, CA',

  // The bio, one string per paragraph. `[text](url)` becomes a link.
  bio: [
    "Stephen Jiezhi Yang is a research scientist at [Wayve Labs](https://wayve.ai/), where he works on the Spatial Intelligence team. His research is about recovering the world from sparse observations, predicting how it will evolve, and turning both into something an agent can act on.",
    "Most recently, he was at [Google XR](https://www.google.com/) building 3D foundation models and code as robot policies. Before that, he joined [Applied Intuition](https://www.appliedintuition.com/) as one of its early researchers advised by Chief Scientist [Dr. Wei Zhan](https://zhanwei.site/), and interned at [Qualcomm AI Research](https://www.qualcomm.com/research/artificial-intelligence/ai-research) and [Robert Bosch Research](https://www.bosch.com/).",
    "He earned his S.M. in Computational Science and Engineering from [Harvard](https://www.harvard.edu/), cross-registering at [MIT](https://www.mit.edu/), and before that graduated with high distinction from the [EECS Honors Program](https://eecs.berkeley.edu/resources/undergrads/honors) at [UC Berkeley](https://www.berkeley.edu/) with a B.A. in Computer Science and Cognitive Science. He is grateful to have learned from exceptional people at [BAIR](https://bair.berkeley.edu/) under Prof. [Joseph Gonzalez](https://people.eecs.berkeley.edu/~jegonzal/) and Prof. [Trevor Darrell](https://people.eecs.berkeley.edu/~trevor/), and at Harvard's [Computational Robotics Group](https://computationalrobotics.seas.harvard.edu/) under Prof. [Heng Yang](https://hankyang.seas.harvard.edu/).",
  ],

  // One line, used for the hero sub-head, the page description and the
  // At a glance card.
  tagline: 'Building geometric foundation models and spatial intelligence.',

  socialMedia: [
    { name: 'Email', url: 'mailto:stephenyang@berkeley.edu' },
    {
      name: 'Google Scholar',
      url: 'https://scholar.google.com/citations?user=BzyVxVUAAAAJ&hl=en',
    },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/stephenyangjz/' },
    { name: 'X', url: 'https://x.com/Stepenyang' },
    { name: 'GitHub', url: 'https://github.com/StephenYangjz' },
  ],




  experience: [
    {
      position: 'Research Scientist',
      company: 'Wayve',
      location: 'Sunnyvale, CA',
      startDate: '2026',
      endDate: null,
      responsibilities: ['End-to-end driving foundation models.'],
    },
    {
      position: 'Research Engineer',
      company: 'Google XR',
      location: 'Mountain View, CA',
      startDate: '2026',
      endDate: '2026',
      responsibilities: [
        '3D foundation models for streaming reconstruction.',
      ],
    },
    {
      position: 'Research Engineer',
      company: 'Applied Intuition',
      location: 'Mountain View, CA',
      startDate: '2024',
      endDate: '2026',
      responsibilities: [
        '4D reconstruction, vision-action model pretraining, and driving world models.',
        'Four papers at CVPR and ECCV 2026.',
      ],
    },
    {
      position: 'Research Intern',
      company: 'Qualcomm AI Research',
      location: 'Santa Clara, CA',
      startDate: '2024',
      endDate: '2024',
      responsibilities: [
        'Deep learning for new sensor perception systems.',
        'US patent filed.',
      ],
    },
    {
      position: 'Research Assistant',
      company: 'Harvard University',
      location: 'Cambridge, MA',
      startDate: '2023',
      endDate: '2024',
      responsibilities: [
        'Pose-free, online, feed-forward 3D reconstruction.',
        'Diffusion policy and robotics projects.',
      ],
    },
    {
      position: 'Research Assistant',
      company: 'Berkeley AI Research',
      location: 'Berkeley, CA',
      startDate: '2022',
      endDate: '2023',
      responsibilities: [
        '3D scene forecasting for uncertainty estimation.',
        'Diffusion and NeRF projects.',
      ],
    },
    {
      position: 'Research Intern',
      company: 'Robert Bosch Research',
      location: null,
      startDate: '2022',
      endDate: '2022',
      responsibilities: [
        'Perception algorithms for infrastructure-based autonomous driving.',
      ],
    },
  ],

  education: [
    {
      degree: 'S.M.',
      field: 'Computational Science & Engineering',
      institution: 'Harvard University',
      institutionWebsite: 'https://www.harvard.edu/',
      startYear: '2023',
      endYear: '2025',
      note: 'Cross-registered at MIT',
    },
    {
      degree: 'B.A.',
      field: 'Computer Science & Cognitive Science',
      institution: 'UC Berkeley',
      institutionWebsite: 'https://www.berkeley.edu/',
      startYear: '2019',
      endYear: '2023',
      note: 'EECS Honors Program, High Distinction',
    },
  ],

  cvUrl: '/Resume_StephenYang.pdf',

  honors: [
    { title: 'EECS Honors Program', year: '2023', institution: 'UC Berkeley' },
    { title: 'High Distinction', year: '2023', institution: 'UC Berkeley' },
    {
      title: 'Sky Lab Research Fellowship',
      year: '2023',
      institution: 'UC Berkeley',
    },
    {
      title: 'Honors Society',
      year: '2022',
      institution: 'Upsilon Pi Epsilon, Berkeley Chapter',
    },
    {
      title: 'RISELab Research Fellowship',
      year: '2022',
      institution: 'UC Berkeley',
    },
    { title: 'Valedictorian', year: '2019', institution: 'Southlands Schools' },
  ],
};

/* ───────────────────────────────────────────────────────────────────────
   The personal side. Photography renders on the homepage; reading and
   notes render on /misc.

   PHOTOGRAPHY — drop files in `public/photos/` and point `src` at them.
   The first entry is the large tile in the mosaic, so lead with your
   strongest frame. Six entries fill the grid exactly; fewer is fine, more
   will keep tiling in the same rhythm.

   READING and NOTES below are placeholder text — replace with your own.
   ─────────────────────────────────────────────────────────────────────── */
// The full-bleed photograph at the top of /personal. Kept separate from the
// gallery so the lead can be chosen for impact rather than being whichever
// frame happens to sit first in the list.
export const leadPhoto = {
  src: '/photos/bixby-night.jpg',
  caption: 'Bixby Bridge',
  place: 'Big Sur, California',
  year: '2026',
};

// `aspect` is the frame's own shape. The rail sizes each card to its
// photograph rather than cropping every photograph to one card, so a
// landscape frame stays landscape and the upright one stays upright.
//
// No caption here: the rail only ever shows `place · year`, and a field that
// is written but never read is a field that quietly goes stale. Alt text is
// built from place and year instead. (leadPhoto does keep a caption — that
// one is genuinely displayed, at the top of the personal page.)
export const photography = [
  {
    src: '/photos/water-lantern-san-jose.jpg',
    place: 'Water Lantern Festival, San Jose, California',
    aspect: '3 / 2',
    year: '2026',
  },
  {
    src: '/photos/pinnacles-airglow.jpg',
    place: 'Pinnacles National Park, California',
    aspect: '3 / 2',
    year: '2026',
  },
  {
    src: '/photos/pinnacles-milky-way.jpg',
    place: 'The Meteor Shower, California',
    aspect: '3 / 2',
    year: '2026',
  },
  {
    src: '/photos/yosemite-valley.jpg',
    place: 'Yosemite National Park',
    aspect: '3 / 2',
    year: '2026',
  },
  {
    src: '/photos/hearst-castle-roman-pool.jpg',
    place: 'Hearst Castle, California',
    aspect: '3 / 2',
    year: '2026',
  },
  {
    src: '/photos/rocky-mountain-lake.jpg',
    place: 'Rocky Mountain National Park, Colorado',
    aspect: '3 / 2',
    year: '2026',
  },
  {
    src: '/photos/sf-golden-gate.jpg',
    place: 'Golden Gate Bridge, California',
    aspect: '3 / 2',
    year: '2026',
  },
  {
    src: '/photos/sf-skyline.jpg',
    place: 'San Francisco, California',
    aspect: '3 / 2',
    year: '2026',
  },
  {
    src: '/photos/sf-california-street.jpg',
    place: 'California Street, California',
    aspect: '2 / 3',
    year: '2026',
  },
  {
    src: '/photos/iceland-strokkur.jpg',
    place: 'Strokkur Geyser, Haukadalur, Iceland',
    aspect: '3 / 2',
    year: '2025',
  },
  {
    src: '/photos/iceland-vatnajokull-ice-cave.jpg',
    place: 'Vatnajökull Glacier, Iceland',
    aspect: '3 / 2',
    year: '2025',
  },
  {
    src: '/photos/iceland-jokulsarlon.jpg',
    place: 'Jökulsárlón Glacier Lagoon, Iceland',
    aspect: '3 / 2',
    year: '2025',
  },
];


export const reading = [
  {
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    quote:
      'Whenever you are able to observe your mind, you are no longer trapped in it.',
    note: "Tolle's actual claim is narrower than the shelf around it suggests: the voice narrating your life is not the same thing as you, and much of what we call suffering is the interest paid on confusing the two. The mind is very good at presenting its own commentary as perception, and most of what I have learned about thinking clearly has really been learning to notice that gap — a thought arriving does not make it a finding. He treats this as a problem of attention rather than of belief, which is why the practice survives even when the metaphysics does not. Meaning, read this way, is less something discovered than something maintained: it decays if you stop attending to it, which is an oddly practical conclusion for a question that sounds so grand.",
  },
  {
    title: 'The Let Them Theory',
    author: 'Mel Robbins',
    quote: 'You will never be able to control what is happening around you.',
    note: "Two words carrying the weight of the Stoic dichotomy of control. We are reliably wrong about how much is ours to begin with — almost none of it reaches other people, nearly all of it sits in where attention goes next, and most unhappiness I can account for comes from having those two figures swapped. The useful half is not the first word but the second: once you stop spending attention on what other people were going to do anyway, you notice how little of it you had been spending on what you actually choose. Less original than it presents itself as, and lighter than the idea deserves — but the reframe survives its own packaging.",
  },
  {
    title: 'The Startup of You',
    author: 'Reid Hoffman & Ben Casnocha',
    quote: 'For life in permanent beta, the trick is to never stop starting.',
    note: "The frame is that a career should be run like a start-up, and what is worth keeping is what that implies about time. A plan assumes the world will hold still long enough to be planned for; permanent beta assumes it will not, and treats a life as something iterated rather than designed. That turns a lifetime goal from a destination into a direction — its value is not arrival but knowing which way to lean when the ground moves, which is most of what a goal is for. Identity, read this way, is closer to a practice than a possession: you are whatever you are still willing to revise. The metaphor does wear thin at the edges. A company can pivot away from its past and a person cannot, and the parts of a life that compound hardest — people, commitments, patience — are precisely the ones that suffer from being iterated on.",
  },
];



/* ───────────────────────────────────────────────────────────────────────
   PAGE HEADINGS AND SECTION LABELS
   Every visible heading on the site. Section labels are the small
   uppercase words in the left rail.
   ─────────────────────────────────────────────────────────────────────── */
export const pages = {
  home: {
    aboutLabel: 'At a glance',
    newsLabel: 'News',
    elsewhereLabel: 'Elsewhere',
    // Cards at the foot of the homepage
    elsewhere: [
      ['Research', 'Papers, patents, and other work', '/publications'],
      ['CV', 'Experience, education, and honors', '/cv'],
      ['Personal', 'Photography, reading, and notes', '/personal'],
    ],
  },

  research: {
    kicker: 'Research',
    title: 'Research',
    note: 'Geometric foundation models, world models, among others.',
  },

  cv: {
    kicker: 'Background',
    title: 'CV',
    downloadLabel: 'Download CV (PDF)',
    experienceLabel: 'Experience',
    educationLabel: 'Education',
    honorsLabel: 'Honors',
  },

  personal: {
    kicker: 'Off the clock',
    title: 'Personal',
    note: 'Photography, things worth reading, and thoughts that have not gone anywhere yet.',
    photographyLabel: 'Photography',
    // Shown beside the gallery heading and under the lead photograph.
    // Set to '' to drop it.
    photoCredit: '© Stephen Yang',
    readingLabel: 'Reading & notes',
    elsewhereLabel: 'Elsewhere',
  },
};

/* Order the "keep scrolling" links follow at the foot of each page. */
export const readingOrder = [
  { href: '/', label: 'Home', kicker: 'Start' },
  { href: '/publications', label: 'Research', kicker: 'Research' },
  { href: '/cv', label: 'CV', kicker: 'Background' },
  { href: '/personal', label: 'Personal', kicker: 'Off the clock' },
];

/* The four facts in the "At a glance" card. */
export const glanceFacts = (info) => [
  ['Role', `${info.role}, ${info.university}`],
  ['Based in', info.location],
  ['Focus', info.tagline],
  ['Previously', 'Google XR · Applied Intuition · Harvard · BAIR'],
];

/* ───────────────────────────────────────────────────────────────────────
   VISITOR MAP — optional, third party.

   Set `script` to '' and nothing renders, and nothing is downloaded.

   ClustrMaps and RevolverMaps both went dark (2026 and 2024), taking their
   users' visitor history with them. MapMyVisitors is the surviving one; it
   is reasonable to assume it will go the same way eventually. The component
   renders nothing if the script is removed, so that failure is quiet.

   It only offers a script embed, so this does run third-party code on the
   page — loaded lazily, once the footer comes near the viewport. It also
   geolocates visitors by IP, which is personal data under GDPR.
   ─────────────────────────────────────────────────────────────────────── */
// Footer visitor map.
//
// This is the plain <img> embed, not the globe. Requesting the image is what
// records the visit, so the whole feature is one 14KB PNG and no third-party
// JavaScript on the page at all. (The globe embed was tried first and
// abandoned: it pulls 168KB plus jQuery, and its data call returns HTML
// instead of JSONP, so it draws an empty circle.)
//
// The PNG is generated per request, so it can be themed to match the page:
//   cl  land colour      co  background      ct  caption colour
//   t=n drops the caption strip     w  pixel width
// The background cannot be made transparent, hence one URL per theme; the
// component renders whichever matches, so only one is ever fetched.
export const visitorMap = {
  enabled: true,
  href: 'https://mapmyvisitors.com/web/1c8cn',
  // Not shown on the page any more — this is the link's accessible name
  // and its hover tooltip.
  label: 'Where this page has been read',
  light: 'https://mapmyvisitors.com/map.png?d=yMi8GeyXCIVG4js4eQOb-sOwDTaIaUncwULQtGRFoKA&cl=c8c8cf&co=f5f5f7&ct=71717a&t=n&w=200',
  dark: 'https://mapmyvisitors.com/map.png?d=yMi8GeyXCIVG4js4eQOb-sOwDTaIaUncwULQtGRFoKA&cl=33333c&co=0c0c0e&ct=8a8a93&t=n&w=200',
};

export const websiteInfo = {
  description: `${personalInfo.fullName} — ${personalInfo.role} at ${personalInfo.university}. ${personalInfo.tagline}`,
  url: 'https://stephenjyang.com',
  teaserImage: '/profile.jpg',
};

export const navigations = [
  { name: 'Research', route: '/publications' },
  { name: 'CV', route: '/cv' },
  { name: 'Personal', route: '/personal' },
];


