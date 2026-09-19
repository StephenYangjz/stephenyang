export const personalInfo = {
  name: 'Stephen Yang',
  fullName: 'Stephen Jiezhi Yang',
  profilePicture: '/profile.jpg',
  role: 'Research Scientist',
  university: 'Wayve',
  universityWebsite: 'https://wayve.ai/',
  location: 'London, UK',

  // One line, used for the hero sub-head and the page description.
  tagline: '3D foundation models and world models for embodied agents.',

  socialMedia: [
    { name: 'Email', url: 'mailto:stephenyang@berkeley.edu' },
    {
      name: 'Google Scholar',
      url: 'https://scholar.google.com/citations?user=BzyVxVUAAAAJ&hl=en',
    },
    { name: 'GitHub', url: 'https://github.com/StephenYangjz' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/stephenyangjz/' },
    { name: 'Twitter', url: 'https://x.com/Stepenyang' },
  ],

  academicService: [
    'Reviewer, CVPR 2025 & 2026',
    'Reviewer, ICLR 2025',
    'Reviewer, ICCV 2025',
  ],

  talks: [
    {
      title: 'Diving in CARFF (ECCV 2024)',
      venue: 'Harvard Computational Robotics Group',
      date: 'Nov 2024',
    },
    {
      title: 'World Representations to Spatial Intelligence',
      venue: 'Analog Devices',
      date: 'Oct 2024',
    },
  ],

  teaching: [
    { title: 'CS182: Deep Learning', term: 'Spring', year: 2023 },
    { title: 'CS188: Introduction to AI', term: 'Summer', year: 2022 },
    { title: 'CS61B: Data Structures', term: 'Spring', year: 2022 },
  ],

  experience: [
    {
      position: 'Research Scientist',
      company: 'Wayve',
      location: 'London, UK',
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

export const websiteInfo = {
  title: personalInfo.name,
  description: `${personalInfo.fullName} — ${personalInfo.role} at ${personalInfo.university}. ${personalInfo.tagline}`,
  url: 'https://stephenjyang.com',
  teaserImage: '/profile.jpg',
};

export const navigations = [
  { name: 'Publications', route: '/#publications' },
  { name: 'Experience', route: '/#experience' },
  { name: 'Misc', route: '/misc' },
];


export const fontStyle = 'sans'; // "sans" | "serif" | "mono"
