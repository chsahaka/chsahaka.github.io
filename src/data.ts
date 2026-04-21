import { Briefcase, Award, GraduationCap, LucideIcon } from 'lucide-react';

// --- NAVIGATION DATA ---
export const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { name: 'TIMELINE', path: '/timeline' },
  { name: 'PROJECTS', path: '/projects' },
];

// --- ABOUT ME DATA ---
export const aboutData = {
  biography: "I am a multifaceted engineer specializing in Electrical, Computer, and Mechatronics Engineering. My primary focus is bridging the gap between physical hardware and digital logic. I design systems that are not only highly functional but elegantly optimized, combining mechanical precision with computational power to solve complex, real-world problems.",
  skills: {
    Hardware: ['PCB Design', 'Soldering', 'Circuit Analysis', 'FPGA', 'Oscilloscopes', 'Microcontrollers'],
    Software: ['C/C++', 'Python', 'TypeScript', 'React', 'ROS', 'Embedded C'],
    Mechatronics: ['Control Systems', 'Kinematics', 'Sensor Integration', 'Actuators', 'CAD/SolidWorks', '3D Printing']
  },
  philosophy: [
    "Continuous Learning: Dedicated to expanding my technical knowledge base and staying at the forefront of engineering innovation.",
    "Precision & Reliability: Committed to designing robust systems where every component serves a clear, optimized purpose.",
    "Cross-Disciplinary Integration: Believing that the best solutions emerge at the intersection of mechanical, electrical, and software engineering."
  ]
};

// --- TYPES ---
export type Category = 'Electrical' | 'Computer' | 'Mechatronics' | 'Mathematics' | 'Physics' | 'Logic';

export interface TimelineEvent {
  id: string;
  type: 'experience' | 'achievement' | 'education';
  categories: Category[];
  date: string;
  title: string;
  organization: string;
  description: string;
  extendedDescription?: string;
  icon: LucideIcon;
  inProgress?: boolean;
}

export interface ProjectStep {
  title: string;
  description: string;
  media_url: string;
  media_type: 'image' | 'video' | 'code';
}

export interface Project {
  id: string;
  title: string;
  date: string;
  categories: Category[];
  thumbnail_image: string;
  tech_stack: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time_to_complete: string;
  link_to_template: string;
  hardware: string[];
  software: string[];
  steps: ProjectStep[];
  inProgress?: boolean;
}

// --- TIMELINE DATA ---
export const timelineData: TimelineEvent[] = [
  {
    id: 'ach-1',
    type: 'achievement',
    categories: ['Logic', 'Physics', 'Mathematics'],
    date: 'Jan 11, 2025',
    title: 'Gold Medalist - IGC',
    organization: 'Bright Education',
    description: 'Placed gold in the International Genius Competition (IGC) hosted by Bright Education, competing in logic, physics, and mathematics.',
    extendedDescription: 'Competed against top students internationally and secured the gold medal through rigorous problem-solving and technical demonstrations.',
    icon: Award,
  },
  {
    id: 'ach-2',
    type: 'achievement',
    categories: ['Mathematics'],
    date: 'Aug 31, 2025',
    title: 'BMMC Math Competition',
    organization: 'BrightKambuja EDU',
    description: 'Participated and achieved recognition in the BMMC math competition held by BrightKambuja EDU.',
    extendedDescription: 'Demonstrated strong mathematical problem-solving skills in a competitive environment.',
    icon: Award,
  },
  {
    id: 'ach-3',
    type: 'achievement',
    categories: ['Mathematics'],
    date: 'Future',
    title: 'Math Kangaroo Competition',
    organization: 'Bright Education',
    description: 'Planning to participate in the upcoming Math Kangaroo competition.',
    extendedDescription: 'Preparing to compete internationally in this rigorous mathematical problem-solving contest.',
    icon: Award,
    inProgress: true,
  },
  {
    id: 'ach-4',
    type: 'achievement',
    categories: ['Mathematics'],
    date: 'Future',
    title: 'Angkor Mathematics Competition',
    organization: 'Bright Education',
    description: 'Planning to participate in the upcoming Angkor Mathematics Competition.',
    extendedDescription: 'Preparing to showcase mathematical proficiency and analytical skills in this regional competition.',
    icon: Award,
    inProgress: true,
  },
  {
    id: 'edu-1',
    type: 'education',
    categories: ['Electrical', 'Computer', 'Mechatronics'],
    date: 'Present',
    title: 'High School Diploma (BACII)',
    organization: 'Sovannaphumi School',
    description: 'Finished Sovannaphumi School with an expected BACII score of B.',
    extendedDescription: 'Maintained a strong academic record throughout high school, focusing heavily on STEM subjects to prepare for a career in engineering.',
    icon: GraduationCap,
    inProgress: true,
  }
];

// --- PROJECTS DATA ---
export const projectsData: Project[] = [
  {
    id: 'proj-bos',
    title: 'Background Oriented Schlieren',
    date: 'Apr 2026',
    categories: ['Mechatronics', 'Electrical'],
    thumbnail_image: 'https://picsum.photos/seed/schlieren/800/600',
    tech_stack: ['Optics', 'Fluid Dynamics', 'Image Processing'],
    difficulty: 'Intermediate',
    time_to_complete: '2 Weeks',
    link_to_template: '/projects/proj-bos',
    hardware: ['High-Resolution Camera', 'Hair Dryer', 'Paper Plane', 'Textured Background'],
    software: ['Python', 'OpenCV', 'PIVlab'],
    inProgress: true,
    steps: [
      {
        title: 'Project Overview',
        description: 'Visualizing air density gradients and thermal flow around a paper plane using Background Oriented Schlieren (BOS) with a hair dryer as a heat source. Detailed information coming soon...',
        media_url: 'https://picsum.photos/seed/schlieren1/800/600',
        media_type: 'image'
      }
    ]
  },
  {
    id: 'proj-jacobs-ladder',
    title: "Jacob's Ladder",
    date: 'May 2026',
    categories: ['Electrical'],
    thumbnail_image: 'https://picsum.photos/seed/jacob/800/600',
    tech_stack: ['High Voltage', 'Electromagnetism'],
    difficulty: 'Advanced',
    time_to_complete: '3 Weeks',
    link_to_template: '/projects/proj-jacobs-ladder',
    hardware: ['Neon Sign Transformer (NST)', 'Copper Electrodes', 'Insulated Base'],
    software: [],
    inProgress: true,
    steps: [
      {
        title: 'Project Overview',
        description: "Constructing a high-voltage traveling arc device to demonstrate dielectric breakdown and the continuous rising of a plasma arc due to thermal buoyancy. Detailed information coming soon...",
        media_url: 'https://picsum.photos/seed/jacob1/800/600',
        media_type: 'image'
      }
    ]
  },
  {
    id: 'proj-voltage-analysis',
    title: "Voltage Analysis of Jacob's Ladder",
    date: 'Jun 2026',
    categories: ['Electrical', 'Computer'],
    thumbnail_image: 'https://picsum.photos/seed/voltage/800/600',
    tech_stack: ['Data Acquisition', 'Signal Processing'],
    difficulty: 'Advanced',
    time_to_complete: '4 Weeks',
    link_to_template: '/projects/proj-voltage-analysis',
    hardware: ['High Voltage Probe', 'Digital Oscilloscope', "Jacob's Ladder"],
    software: ['Python', 'SciPy', 'Matplotlib'],
    inProgress: true,
    steps: [
      {
        title: 'Project Overview',
        description: "Measuring and analyzing the breakdown voltage and dynamic voltage changes across the electrodes as the plasma arc ascends and lengthens. Detailed information coming soon...",
        media_url: 'https://picsum.photos/seed/voltage1/800/600',
        media_type: 'image'
      }
    ]
  },
  {
    id: 'proj-temp-analysis',
    title: 'Temperature Analysis of Plasma using a Spectroscope',
    date: 'Jul 2026',
    categories: ['Electrical', 'Mechatronics'],
    thumbnail_image: 'https://picsum.photos/seed/plasma/800/600',
    tech_stack: ['Spectroscopy', 'Thermodynamics'],
    difficulty: 'Advanced',
    time_to_complete: '5 Weeks',
    link_to_template: '/projects/proj-temp-analysis',
    hardware: ['Optical Spectrometer', 'Fiber Optic Cable', "Jacob's Ladder"],
    software: ['SpectraSuite', 'Python'],
    inProgress: true,
    steps: [
      {
        title: 'Project Overview',
        description: "Utilizing optical emission spectroscopy to determine the electron and gas temperature of the Jacob's ladder plasma arc. Detailed information coming soon...",
        media_url: 'https://picsum.photos/seed/plasma1/800/600',
        media_type: 'image'
      }
    ]
  },
  {
    id: 'proj-bos-jacobs',
    title: "Background Oriented Schlieren of Jacob's Ladder",
    date: 'Aug 2026',
    categories: ['Electrical', 'Computer'],
    thumbnail_image: 'https://picsum.photos/seed/bosjacob/800/600',
    tech_stack: ['Optics', 'High Voltage', 'Image Processing'],
    difficulty: 'Advanced',
    time_to_complete: '4 Weeks',
    link_to_template: '/projects/proj-bos-jacobs',
    hardware: ['High-Speed Camera', 'Textured Background', "Jacob's Ladder"],
    software: ['Python', 'OpenCV'],
    inProgress: true,
    steps: [
      {
        title: 'Project Overview',
        description: "Applying Background Oriented Schlieren imaging to visualize the intense thermal gradients and convective air currents surrounding the high-voltage traveling arc. Detailed information coming soon...",
        media_url: 'https://picsum.photos/seed/bosjacob1/800/600',
        media_type: 'image'
      }
    ]
  },
  {
    id: 'proj-emission-spectroscopy',
    title: 'Plasma Emission Spectroscopy',
    date: 'Sep 2026',
    categories: ['Electrical', 'Computer'],
    thumbnail_image: 'https://picsum.photos/seed/emission/800/600',
    tech_stack: ['Spectroscopy', 'Data Analysis'],
    difficulty: 'Advanced',
    time_to_complete: '3 Weeks',
    link_to_template: '/projects/proj-emission-spectroscopy',
    hardware: ['Spectrometer', "Jacob's Ladder"],
    software: ['Python', 'Pandas', 'Matplotlib'],
    inProgress: true,
    steps: [
      {
        title: 'Project Overview',
        description: "Analyzing the spectral lines emitted by the Jacob's ladder arc to identify the excited atmospheric species and understand the plasma composition. Detailed information coming soon...",
        media_url: 'https://picsum.photos/seed/emission1/800/600',
        media_type: 'image'
      }
    ]
  },
  {
    id: 'proj-arc-ascent',
    title: 'Arc Ascent Velocity',
    date: 'Oct 2026',
    categories: ['Electrical', 'Mechatronics'],
    thumbnail_image: 'https://picsum.photos/seed/arc/800/600',
    tech_stack: ['Kinematics', 'Computer Vision'],
    difficulty: 'Intermediate',
    time_to_complete: '3 Weeks',
    link_to_template: '/projects/proj-arc-ascent',
    hardware: ['High-Speed Camera', "Jacob's Ladder"],
    software: ['Tracker Video Analysis', 'Python'],
    inProgress: true,
    steps: [
      {
        title: 'Project Overview',
        description: "Investigating the kinematic properties of the rising plasma arc, measuring its ascent velocity as a function of electrode geometry and power input. Detailed information coming soon...",
        media_url: 'https://picsum.photos/seed/arc1/800/600',
        media_type: 'image'
      }
    ]
  }
];
