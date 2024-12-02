export const personalInfo = {
  name: 'Stephen Yang',
  profilePicture: '/stephenyang/profile.jpg', //optional
  role: 'Research Engineer',
  university: 'Applied Intuition',
  universityWebsite: 'https://www.appliedintuition.com/',
  socialMedia: [
    { name: 'Email', url: 'mailto:stephenyang@berkeley.edu' },
    { name: 'Twitter', url: 'https://x.com/Stepenyang' },
    {
      name: 'GitHub',
      url: 'https://github.com/StephenYangjz',
    },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/stephenyangjz/' },
    // { name: 'ORCID', url: 'https://orcid' },
    { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=BzyVxVUAAAAJ&hl=en' },
  ],

  academicService: [
    "Reviewer for ICLR 2025",
    "Reviewer for CVPR 2025 (Projected)",
  ],
  teaching: [
    {
      title: "CS182: Deep Learning",
      term: "Spring",
      year: 2023,
    },
    {
      title: "CS188: Introduction to AI",
      term: "Summer",
      year: 2022,
    },
    {
      title: "CS61B: Data Structures",
      term: "Spring",
      year: 2022,
    },
  ],
  coursework: [
    {
      title: "Deep Learning",
      number: "UC Berkeley CS182",
    },
    {
      title: "Computer Vision",
      number: "UC Berkeley CS194 & CS280",
    },
  
    {
      title: "ML For Inverse Graphipcs",
      number: "MIT 6.S980",
    },
    {
      title: "Large Language Models",
      number: "MIT 6.S988",
    },
    {
      title: "Embodied Intelligence",
      number: "6.S953",
    },
    {
      title: "Natual Language Processing",
      number: "6.8610",
    },
    {
      title: "Geometric Machine Learning",
      number: "AM220",
    },
    {
      title: "Advanced Computer Networks",
      number: "CS243",
    },
    {
      title: "Machine Learning",
      number: "UC Berkeley CS189",
    },
    {
      title: "Computer Graphics",
      number: "UC Berkeley CS184",
    },
    {
      title: "Optimizations",
      number: "UC Berkeley EECS127",
    },
    {
      title: "Introduction to AI",
      number: "UC Berkeley EECS188",
    },
    {
      title: "Algoritms",
      number: "UC Berkeley CS170",
    },
    {
      title: "Data Structures",
      number: "UC Berkeley CS61B",
    },
  ],

  talks: [
    {
      title: "World Representations to Spatial Intelligence",
      venue: "Analog Devices",
      date: "Oct. 2024",
    },
    {
      title: "Diving in CARFF (ECCV 2024)",
      venue: "Harvard Computational Robotics Group",
      date: "Nov. 2024",
    },
  ],

  experience: [
    {
      position: 'Research Engineer',
      company: 'Applied Intuition',
      location: 'Mountain View, CA',
      startDate: '2025',
      endDate: null, // Use null for "Present"
      responsibilities: [
        'Having fun!',
      ],
    },
    {
      position: 'Research Assistant',
      company: 'Harvard University',
      location: 'Cambridge, MA',
      startDate: '2023',
      endDate: '2024', // Use null for "Present"
      responsibilities: [
        'Pose-free, online, feedforward 3D reconstruction.',
        'Diffusion policy, robotics projects.',
        'Zero-shot 3D human modeling.',
      ],
    },
    {
      position: 'Research Intern',
      company: 'Qualcomm AI Research',
      location: 'Santa Clara, CA',
      startDate: '2024',
      endDate: '2024', // Ongoing job
      responsibilities: [
        'Deep learning for new sensor perception systems.',
        'US Patent filed.',
        'Paper published to MEMS 2025.'
      ],
    },

    {
      position: 'Research Assistant',
      company: 'Berkeley Artificial Intelligence Research',
      location: 'Berkeley, CA',
      startDate: '2022',
      endDate: '2023', // Ongoing job
      responsibilities: [
        '3D scene forecasting for driving.',
        'Diffusion and NeRF projects.',
        'Two top-tier conference papers.'
      ],
    },
  
    {
      position: 'Research Intern',
      company: 'Robert Bosch',
      location: null,
      startDate: '2022',
      endDate: '2022', // Ongoing job
      responsibilities: [
        'Developed perception algorithms and visualization for infrastructure-based autonomous-driving research.',
      ],
    },

    {
      position: 'Co-president',
      company: 'Berkeley China Summit',
      location: 'Berkeley, CA',
      startDate: '2022',
      endDate: '2022', // Ongoing job
      responsibilities: [
        'Led a team to put together conferences discussing tech, science, and others.',
      ],
    },

  ],
  education: [
    {
      degree: 'S.M.',
      field: 'CSE',
      institution: 'Harvard University',
      institutionWebsite: 'https://www.harvard.edu/',
      startYear: '2023',
      endYear: '2025',
    },
    {
      degree: 'B.A.',
      field: 'CS & Cognitive Science',
      institution: 'UC Berkeley',
      institutionWebsite: 'https://www.berkeley.edu/',
      startYear: '2019',
      endYear: '2023',
    }
  ],
  cvUrl: '/Resume_StephenYang.pdf', 
  honors: [

    {
      title: 'EECS Honors Program',
      year: '2023',
      institution: 'UC Berkeley',
    },
    {
      title: 'High Distinction',
      year: '2023',
      institution: 'UC Berkeley',
    },
    {
      title: 'Sky Lab Research Fellowship',
      year: '2023',
      institution: 'UC Berkeley',
    },
    {
      title: 'Honors Society',
      year: '2022',
      institution: 'Upsilon Pi Epsilon Berkeley Chapter',
    },
    {
      title: 'RISELab Research Fellowship',
      year: '2022',
      institution: 'UC Berkeley',
    },
    {
      title: 'Valedictorian',
      year: '2019',
      institution: 'Southlands Schools',
    },
  ],
};

export const websiteInfo = {
  title: personalInfo.name,
  description: 'HCI researcher',
  teaserImage: "/teaser.jpg",
};

export const navigations = [
  { name: 'Publications', route: '/publications' },
  // { name: 'Projects', route: '/projects' },
  { name: "Academics", route: "/academics" },
  { name: 'CV', route: '/cv' },
  { name: 'Misc', route: '/misc' },

];

export const homepageSection = {
  AboutSection: true,
  NewsSection: true,
  // SelectedPublicationsSection: true,
  // ProjectSection: true,
};

export const fontStyle = 'sans'; // "sans" | "serif" | "mono"
