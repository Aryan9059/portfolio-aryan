import phiLauncherReadme from './raw/phi-launcher.md';
import pixelfiReadme     from './raw/pixelfi.md';
import gradloopReadme    from './raw/gradloop.md';
import hypePassReadme      from './raw/hypePass.md';
import howToDriveReadme     from './raw/howToDrive.md';
import codeRunnerReadme  from './raw/coderunner.md';
import phinanceReadme     from './raw/phinance.md';
import huddleReadme    from './raw/huddleReadme.md';
import fscReadme    from './raw/fscReadme.md';
import ffReadme    from './raw/ffReadme.md';
import alumxReadme from './raw/alumx.md';
import pixelReadme from './raw/pixel.md';

export type Project = {
  id: string;
  title: string;
  year: string;
  index: string;
  tag: string;
  category: 'android' | 'web' | 'fullstack' | 'tool';
  link: string;
  github?: string;
  tools: string[];
  desc: string;
  logo: string;
  bgColor: string;
  bgGlow: string;
  accent: string;
  featured: boolean;
  stats?: { label: string; value: string }[];
  readme: string;
};

export const projects: Project[] = [
  {
    id: 'phi-launcher',
    title: 'Phi Launcher',
    year: '2025',
    index: '01',
    tag: 'Android Launcher',
    category: 'android',
    link: 'https://play.google.com/store/apps/details?id=com.launcher.hype',
    github: 'https://www.philauncher.com',
    tools: ['Kotlin', 'Jetpack Compose', 'Room DB', 'DataStore', 'GraphQL', 'MVVM'],
    desc: '27,000+ downloads. 4.4★ rating. ₹1.5L+ gross revenue on Play Store.',
    logo: '/philauncher.png',
    bgColor: '#0a1628',
    bgGlow: '#00D4FF',
    accent: '#1E90FF',
    featured: true,
    stats: [
      { label: 'Downloads', value: '27,000+' },
      { label: 'Rating', value: '4.5 ★' },
      { label: 'Revenue', value: '₹1.5L+' },
      { label: 'Platform', value: 'Android' },
    ],
    readme: phiLauncherReadme,
  },

  {
    id: 'pixelfi',
    title: 'PixelFi',
    year: '2024',
    index: '02',
    tag: 'Full-stack · FinTech',
    category: 'fullstack',
    link: '#',
    github: 'https://github.com/Aryan9059/pixelfi',
    tools: ['Next.js', 'FastAPI', 'Apache Kafka', 'Docker', 'Python', 'Clerk', 'ML', 'PostgreSQL'],
    desc: 'Financial portfolio tracker with ML-powered market predictions and a microservices backend.',
    logo: '/pixelfi.webp',
    bgColor: '#1a0a14',
    bgGlow: '#FF1493',
    accent: '#9932CC',
    featured: true,
    stats: [
      { label: 'Services', value: '5 Micro' },
      { label: 'ML Model', value: 'LSTM' },
      { label: 'Latency', value: '<120ms' },
      { label: 'Stack', value: 'Full' },
    ],
    readme: pixelfiReadme,
  },

  {
    id: 'gradloop',
    title: 'GradLoop',
    year: '2026',
    index: '03',
    tag: 'Student-Alumni Platform',
    category: 'fullstack',
    link: 'https://grad-loop-iiita.vercel.app/',
    github: 'https://github.com/Aryan9059/grad-loop',
    tools: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'WebSockets', 'Gen AI'],
    desc: 'Alumni networking platform with real-time chat, AI resume generation/analysis, and profile recommendation.',
    logo: '/gradloop.webp',
    bgColor: '#021a10',
    bgGlow: '#FF4500',
    accent: '#0066FF',
    featured: true,
    stats: [
      { label: 'Stack', value: 'Next.js' },
      { label: 'Gen AI', value: 'Mistral AI' },
      { label: 'Database', value: 'Supabase' },
      { label: 'Type', value: 'Full-stack' },
    ],
    readme: gradloopReadme,
  },

  {
    id: 'hype.pass',
    title: 'hype.pass',
    year: '2024',
    index: '04',
    tag: 'Password Manager',
    category: 'android',
    link: '#',
    github: 'https://github.com/Aryan9059/hype.pass',
    tools: ['Kotlin', 'Compose', 'SHA-256', 'Device Biometrics'],
    desc: 'Open-source Jetpack Compose component library with 30+ battle-tested UI components.',
    logo: '/hypePass.webp',
    bgColor: '#1A0D1F',
    bgGlow: '#F4A6D7',
    accent: '#C8A2FF',
    featured: false,
    stats: [
      { label: 'Security', value: 'SHA-256' },
      { label: 'Language', value: 'Kotlin' },
      { label: 'Platform', value: 'Android' },
      { label: 'Advantage', value: 'Offline & Secure' },
    ],
    readme: hypePassReadme,
  },

  {
    id: 'howToDrive',
    title: 'How To Drive',
    year: '2026',
    index: '05',
    tag: 'Driving Simulator',
    category: 'web',
    link: '#',
    github: 'https://github.com/Aryan9059/notifiq',
    tools: ['TypeScript', 'WebGL', 'Cannon.js', 'Three.js'],
    desc: 'An interactive Three.js game helping you to learn driving car, plane & helicopter in detail.',
    logo: '/howToDrive.svg',
    bgColor: '#1a0a0a',
    bgGlow: '#FF3333',
    accent: '#FF3333',
    featured: false,
    stats: [
      { label: 'Physics', value: 'Cannon.js' },
      { label: 'Shaders', value: 'WebGL' },
      { label: 'GenAI', value: 'Mistral AI' },
      { label: 'Rendering', value: 'React-Three-Fiber' },
    ],
    readme: howToDriveReadme,
  },

  {
    id: 'text-to-judge',
    title: 'TextToJudge',
    year: '2026',
    index: '06',
    tag: 'Coding Platform',
    category: 'web',
    link: 'https://text-tojudge.vercel.app/',
    github: 'https://github.com/MishtiGarg250/textTojudge',
    tools: ['Next.js', 'TypeScript', 'Judge0 API', 'Monaco Editor', 'Tailwind CSS'],
    desc: 'Converts vague problem statements in Leetcode-styled interface for practising problems.',
    logo: '/text-to-judge.png',
    bgColor: '#000000',
    bgGlow: '#FF9900',
    accent: '#FF9900',
    featured: false,
    stats: [
      { label: 'Languages', value: '40+' },
      { label: 'Editor', value: 'Monaco' },
      { label: 'Judge', value: 'Judge0' },
      { label: 'Type', value: 'Web App' },
    ],
    readme: codeRunnerReadme,
  },

  {
    id: 'phinance',
    title: 'PhiNance',
    year: '2026',
    index: '07',
    tag: 'Android · Finance',
    category: 'android',
    link: '#',
    github: 'https://github.com/Aryan9059/PhiNance',
    tools: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Room DB'],
    desc: 'Minimalist financial expenditures tracker with intuitive and easy UI/UX and split-wise functionality.',
    logo: '',
    bgColor: '#0a1628',
    bgGlow: '#00D4FF',
    accent: '#1E90FF',
    featured: false,
    stats: [
      { label: 'Published By', value: 'Phi Apps' },
      { label: 'Development', value: 'Under Progress' },
      { label: 'Design', value: 'Material You' },
      { label: 'Language', value: 'Kotlin' },
    ],
    readme: phinanceReadme,
  },

  {
    id: 'huddle',
    title: 'Huddle',
    year: '2024',
    index: '08',
    tag: 'Project Management',
    category: 'android',
    link: '#',
    github: 'https://github.com/opencodeiiita/Huddle',
    tools: ['Kotlin', 'XML', 'Firebase', 'Figma'],
    desc: 'An Android app built during OpenCode `24 used to manage large teams in a project.',
    logo: '/huddle.png',
    bgColor: '#0a1628',
    bgGlow: '#87CEEB',
    accent: '#87CEEB',
    featured: false,
    stats: [
      { label: 'APIs', value: '3 Sources' },
      { label: 'Charts', value: 'Recharts' },
      { label: 'Cache', value: 'SWR' },
      { label: 'Type', value: 'Dashboard' },
    ],
    readme: huddleReadme,
  },

  {
    id: 'fsc',
    title: 'Fizanyatik Sports Club',
    year: '2022',
    index: '09',
    tag: 'Cricket',
    category: 'android',
    link: 'https://github.com/Aryan9059/FSC/releases/latest',
    github: 'https://github.com/Aryan9059/FSC',
    tools: ['Java', 'XML', 'Firebase', 'Adobe Illustrator'],
    desc: 'Official Android app of FSC, used for scoring and maintaining statistics of players.',
    logo: '/fsc.png',
    bgColor: '#1a0a0a',
    bgGlow: '#FF6B6B',
    accent: '#F4C542',
    featured: false,
    stats: [
      { label: 'Language', value: 'Java' },
      { label: 'Sports', value: 'Cricket' },
    ],
    readme: fscReadme,
  },

  {
    id: 'ff',
    title: 'Fizanto Fuzz',
    year: '2021',
    index: '10',
    tag: 'YouTube Channel',
    category: 'android',
    link: 'https://github.com/Aryan9059/fizanto-fuzz/releases/latest',
    github: 'https://github.com/Aryan9059/fizanto-fuzz',
    tools: ['Java', 'XML', 'Firebase', 'YouTube API'],
    desc: 'Official Android app of Fizanto Fuzz, a YouTube channel offering Gaming & Roast videos',
    logo: '/ff.webp',
    bgColor: '#0a0008',
    bgGlow: '#FFFFE0',
    accent: '#C85A79',
    featured: false,
    stats: [
      { label: 'Language', value: 'Java' },
      { label: 'Genre', value: 'Gaming & Roast' },
    ],
    readme: ffReadme,
  },

  {
    id: 'alumx',
    title: 'AlumX',
    year: '2025',
    index: '11',
    tag: 'OpenCode 2026',
    category: 'android',
    link: 'https://github.com/opencodeiiita/Alum-X-Frontend',
    github: 'https://github.com/opencodeiiita/Alum-X-Backend',
    tools: ['Kotlin', 'Jetpack Compose', 'Spring Boot', 'GenAI'],
    desc: 'A student-alumni network app mentored by me built during OpenCode 2026.',
    logo: '/alumx.png',
    bgColor: '#07162D',
    bgGlow: '#A7C7FF',
    accent: '#5B8DEF',
    featured: false,
    stats: [
      { label: 'Language', value: 'Kotlin' },
      { label: 'Backend', value: 'Spring Boot' },
      { label: 'UI/UX', value: 'Jetpack Compose' },
      { label: 'GenAI', value: 'Grok AI' },
    ],
    readme: alumxReadme,
  },

  {
    id: 'pixelperfect',
    title: 'Pixel Perfect',
    year: '2024',
    index: '12',
    tag: 'Educational',
    category: 'web',
    link: 'https://pixel-perfect-1.vercel.app/',
    github: 'https://github.com/MishtiGarg250/PixelPerfect2.0',
    tools: ['Next.js', 'Tailwind', 'Clerk', 'MongoDB'],
    desc: 'An all-in-one website with articles and roadmaps helping juniors learn development and coding.',
    logo: '/pixelperfect.png',
    bgColor: '#1a0a14',
    bgGlow: '#FF1493',
    accent: '#9932CC',
    featured: false,
    stats: [
      { label: 'Framework', value: 'Next.js' },
      { label: 'Speciality', value: 'Android Roadmap' },
    ],
    readme: pixelReadme,
  },
];

export const featuredProjects = projects.filter(p => p.featured);

export const getProjectById = (id: string) => projects.find(p => p.id === id);
