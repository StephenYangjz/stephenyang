/* ═══════════════════════════════════════════════════════════════════════
   SITE CONTENT — everything you are likely to want to edit lives here.

   This file:   name, role, links, experience, education, honors,
                photography, reading, notes, and every page's headings.
   data/home/About.mdx          your bio (prose, supports links)
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
  university: 'Wayve',
  universityWebsite: 'https://wayve.ai/',
  location: 'Sunnyvale, CA',

  // One line, used for the hero sub-head and the page description.
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
        'Feed-forward 3D reconstruction and driving world models.',
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
        '3D scene forecasting for driving.',
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
  year: '2024',
};

export const photography = [
  {
    src: '/photos/skogafoss.webp',
    caption: 'Skógafoss',
    place: 'Iceland',
    year: '2025',
  },
  {
    src: '/photos/placeholder-01.svg',
    caption: 'Replace with your strongest frame',
    place: 'Qingdao',
    year: '2023',
  },
  {
    src: '/photos/placeholder-02.svg',
    caption: 'Aerial work',
    place: 'Yellow Sea',
    year: '2023',
  },
  {
    src: '/photos/placeholder-03.svg',
    caption: 'Caption goes here',
    place: 'Cambridge',
    year: '2024',
  },
  {
    src: '/photos/placeholder-04.svg',
    caption: 'Caption goes here',
    place: 'Berkeley',
    year: '2023',
  },
  {
    src: '/photos/placeholder-05.svg',
    caption: 'Caption goes here',
    place: 'London',
    year: '2026',
  },
  {
    src: '/photos/placeholder-06.svg',
    caption: 'Caption goes here',
    place: 'Mountain View',
    year: '2025',
  },
];


export const reading = [
  {
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    // A line from the book itself. Worth checking the wording against your
    // own copy before this goes public.
    quote: 'You are not your mind.',
    note: "Tolle's actual claim is narrower than the self-help shelf around it suggests: that the voice narrating your life is not the same thing as you, and that a great deal of suffering is the interest paid on confusing the two. What stayed with me is that he treats this as a problem of attention rather than of belief — you do not argue the mind into silence, you just stop accepting its commentary as testimony. I remain unconvinced by the metaphysics and fairly convinced by the practice, which may be the only honest way to read it.",
  },
  {
    title: 'The Let Them Theory',
    author: 'Mel Robbins',
    quote: 'Let them. Then let me.',
    note: "Two words carrying the weight of the Stoic dichotomy of control. The useful half is not the first one but the second: once you stop spending attention on what other people are going to do anyway, you notice how little of it you had been spending on what you actually choose. Less original than it presents itself as, and lighter than the idea deserves — but the reframe survives its own packaging, which is more than most books of this kind manage.",
  },
];

export const notes = [
  {
    text: 'The mind is very good at presenting its own commentary as perception. Most of what I have learned about thinking clearly has really been learning to notice that gap — a thought arriving does not make it a finding.',
    date: '2026',
  },
  {
    text: 'We are reliably wrong about how much is ours to control. Almost none of it reaches other people; nearly all of it is in where attention goes next. Most unhappiness I can account for comes from having those two figures swapped.',
    date: '2026',
  },
  {
    text: 'Meaning seems less like something discovered or invented than something maintained. It decays if you stop attending to it — an oddly practical conclusion for a question that sounds so grand.',
    date: '2025',
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


