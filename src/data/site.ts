// Single source of truth for personal details shown across the site.
// Tibetan strings were reconstructed from the PDF — ask Rigzen to proofread them.

/** Change once a custom domain is connected in Vercel. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rigzen-phintso-bhutia.vercel.app';

export const site = {
  name: 'Rigzen Phintso Bhutia',
  first: 'Rigzen',
  tibetanName: 'རིག་འཛིན་ཕུན་ཚོགས་བྷོ་ཊི་ཡ།',
  role: '4th Year Architecture Student',
  school: 'Manipal School of Architecture & Planning',
  origin: 'Sikkim, India',
  email: 'rigzenphintso@gmail.com',
  description:
    'Architecture portfolio of Rigzen Phintso Bhutia — a 4th-year architecture student from Sikkim at Manipal School of Architecture & Planning. Selected works 2023–2026.',
  coverTibetan: 'བཟོ་བཀོད་ ལས་རྩོམ།', // "architecture · works"
  thanksTibetan: 'ཐུགས་རྗེ་ཆེ།', // "thank you"
  years: ['2023', '2026'] as const,
  /**
   * Hero self-portrait. Drop an animated drawing into /public (e.g. public/self-portrait.mp4
   * or .gif / .webp) and put its path here to replace the photo in the hero.
   */
  selfPortrait: null as null | string,
};

export const nav = [
  { href: '/', label: 'Home', note: 'Introduction', tibetan: 'མགོ་ཤོག' },
  { href: '/work', label: 'Work', note: 'Selected works', tibetan: 'ལས་རྩོམ།' },
  { href: '/about', label: 'About', note: 'The student', tibetan: 'ངོ་སྤྲོད།' },
  { href: '/contact', label: 'Contact', note: 'Write a note', tibetan: 'འབྲེལ་བ།' },
];

export const statement = [
  'I see architecture as more than designing buildings — it is a way of expressing ideas, emotions and stories through spaces.',
  'My university journey has encouraged me to think creatively, experiment with forms and colours, and explore different ways of seeing the world. With a love for drawing and visual exploration, I enjoy translating ideas into designs while discovering the balance between creativity and functionality.',
  'I look forward to learning beyond the classroom and gaining hands-on experience in the field of architecture.',
];

export const education = [
  { years: '2023 — now', place: 'Manipal School of Architecture & Planning', where: 'Manipal, Karnataka' },
  { years: '2011 — 2023', place: "St Paul's School", where: 'Darjeeling, West Bengal' },
  { years: '2008 — 2011', place: 'Himalayan Baptist English School', where: 'Gyalshing, Sikkim' },
];

export const skills: { group: string; items: { name: string; level: number }[] }[] = [
  { group: 'Technical Drawing', items: [{ name: 'AutoCAD', level: 6 }, { name: 'Rayon', level: 10 }] },
  { group: '3D Modeling', items: [{ name: 'Revit', level: 9 }, { name: 'SketchUp', level: 4 }, { name: 'Feather', level: 4 }] },
  { group: 'Rendering', items: [{ name: 'D5 Render', level: 7 }, { name: 'Twinmotion', level: 5 }] },
  {
    group: 'Design & Post-Production',
    items: [{ name: 'Procreate', level: 9 }, { name: 'Clip Studio Paint', level: 6 }, { name: 'Canva', level: 9 }],
  },
];

export const languages = [
  { name: 'English', level: 'Advanced mastery' },
  { name: 'Bhutia', level: 'Native language' },
  { name: 'Nepali', level: 'Native language' },
  { name: 'Hindi', level: 'Upper intermediate' },
  { name: 'Tibetan', level: 'Basic proficiency' },
];

export const interests = ['Table Tennis', 'Quizzing', 'Sketching', 'Singing', 'Graphics', 'Reading', 'Painting'];

export const events = [
  { year: '2026', what: 'Participating in the annual NASA Trophy' },
  { year: '2025', what: '120 hours competition' },
];

export const achievements = [
  { year: '2022 — 23', what: "St Paul's School Captain (Head Boy)" },
  { year: '2019', what: 'Trinity Grade A Choir Assessment' },
  { year: '2018', what: 'GTA annual quiz tournament — runners-up (Best Quizzer)' },
];
