export interface Ebook {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  longDescription: string;
  price: number;
  coverImage: string;
  category: string;
  pages: number;
  format: string;
  language: string;
  readTime: string;
  chapters: string[];
  sampleExcerpt: string;
  downloadSize: string;
  publishedYear: number;
  isFeatured?: boolean;
}

export const INITIAL_BOOKS: Ebook[] = [
  {
    id: 'the-art-of-focus',
    title: 'The Art of Focus',
    subtitle: 'Finding Clarity in a Noisy World',
    author: 'ASHRAF',
    description: 'A practical framework to eliminate mental clutter, protect your deep attention, and build creative momentum every day.',
    longDescription:
      'In an age of relentless digital stimulation, genuine focus is the rarest and most valuable skill. "The Art of Focus" examines the psychology of distraction, intentional digital architecture, and the daily rituals that enable deep work. ASHRAF breaks down practical methods to design quiet focus spaces, structure distraction-free work blocks, and reclaim your cognitive sovereignty.',
    price: 18.0,
    coverImage: '/src/assets/images/book_art_of_focus_1793581924516.jpg',
    category: 'Focus & Mindset',
    pages: 184,
    format: 'PDF + EPUB (DRM-Free)',
    language: 'English',
    readTime: '2.5 hrs',
    chapters: [
      'The Cost of Fragmentation',
      'Cognitive Sanctuaries & Digital Space',
      'The 90-Minute Attention Rhythm',
      'Guarding the Perimeter: Saying No With Grace',
      'Sustaining Effort Without Burnout'
    ],
    sampleExcerpt:
      'Focus is not the ability to sit still when everything is quiet; focus is the quiet you carry within you when the world refuses to stop moving. When you strip away the extraneous, what remains is not an empty schedule, but the space where your best thoughts take root.',
    downloadSize: '12.4 MB',
    publishedYear: 2026,
    isFeatured: true
  },
  {
    id: 'digital-craftsmanship',
    title: 'Digital Craftsmanship',
    subtitle: 'The Art of Creating in the Modern Age',
    author: 'ASHRAF',
    description: 'Principles, ethics, and aesthetic standards for builders and creators who care about lasting quality and refined utility.',
    longDescription:
      '"Digital Craftsmanship" is an ode to deliberate creation. Rather than churning out disposable content, ASHRAF advocates for enduring digital artifacts—written words, thoughtful systems, and refined creative projects that age gracefully. Learn how to combine speed with taste, cultivate your personal standard of excellence, and build a body of work that endures.',
    price: 22.0,
    coverImage: '/src/assets/images/book_digital_craftsmanship_1793581923973.jpg',
    category: 'Creative Craft',
    pages: 216,
    format: 'PDF + EPUB (DRM-Free)',
    language: 'English',
    readTime: '3.2 hrs',
    chapters: [
      'The Philosophy of the Digital Artisan',
      'Taste as a Competitive Advantage',
      'Designing for Ten Years, Not Ten Minutes',
      'Frictionless Tooling vs. Mindful Restraint',
      'The Living Archive: Cataloging Your Evolution'
    ],
    sampleExcerpt:
      'True craftsmanship is not about overcomplicating simple tools. It is the quiet discipline of polishing the joints that no one sees, because the creator knows they are there.',
    downloadSize: '15.8 MB',
    publishedYear: 2026,
    isFeatured: true
  },
  {
    id: 'the-minimalist-creator',
    title: 'The Minimalist Creator',
    subtitle: 'Designing a Life of Focus, Purpose, and Meaning',
    author: 'ASHRAF',
    description: 'How to build an impactful creative practice with fewer tools, less noise, zero burn-out, and high intellectual leverage.',
    longDescription:
      'Too many creators drown in complex productivity stacks, endless subscriptions, and algorithmic anxiety. "The Minimalist Creator" resets the board. ASHRAF presents a streamlined approach to ideation, content delivery, and audience trust founded on minimalism: doing fewer things exceptionally well, publishing timeless ideas, and maintaining peace of mind.',
    price: 16.0,
    coverImage: '/src/assets/images/book_minimalist_creator_1793581925652.jpg',
    category: 'Productivity & Systems',
    pages: 160,
    format: 'PDF + EPUB (DRM-Free)',
    language: 'English',
    readTime: '2.1 hrs',
    chapters: [
      'The Myth of the 12-App Stack',
      'One Notebook, One Idea, One Day',
      'Quiet Publishing: Reaching the Right 1,000 People',
      'Energy Management over Time Management',
      'The Peaceful Studio'
    ],
    sampleExcerpt:
      'Minimalism is not about deprivation. It is the deliberate subtraction of everything that does not serve your craft, until only the signal remains.',
    downloadSize: '9.6 MB',
    publishedYear: 2026
  },
  {
    id: 'beyond-the-screen',
    title: 'Beyond the Screen',
    subtitle: 'A Modern Guide to Presence, Connection, and Well-being',
    author: 'ASHRAF',
    description: 'An insightful exploration of digital balance, tactile living, and reconnecting with the real world while working online.',
    longDescription:
      'How do we live deeply when our work lives inside glowing glass rectangles? "Beyond the Screen" offers an intimate, philosophical guide to reclaiming physical reality, tactile hobbies, deep conversational habits, and grounded health without abandoning the digital tools that power modern careers.',
    price: 20.0,
    coverImage: '/src/assets/images/book_beyond_the_screen_1793581925981.jpg',
    category: 'Living & Philosophy',
    pages: 198,
    format: 'PDF + EPUB (DRM-Free)',
    language: 'English',
    readTime: '2.8 hrs',
    chapters: [
      'The Glass Prism: How Screens Shape Perception',
      'Tactile Anchors: Physical Objects & Sensory Grounding',
      'The Architecture of Real Conversation',
      'Evening Boundaries and the Sacred Sunset',
      'Living in Two Worlds at Once'
    ],
    sampleExcerpt:
      'We do not need to retreat to a cave in the woods to feel alive. We only need the courage to look up from the screen, take a full breath, and remember that our senses were made for the open air.',
    downloadSize: '13.1 MB',
    publishedYear: 2026
  }
];

export const AUTHOR_DETAILS = {
  name: 'ASHRAF',
  role: 'Independent Creator & Author',
  bio: 'An independent creator sharing knowledge, ideas, and inspiration through digital content and ebooks.',
  extendedBio:
    'Focused on intentional digital living, creative craftsmanship, and modern philosophy, ASHRAF crafts thoughtful publications that cut through the digital noise. With an audience spanning multiple platforms, his work explores the intersection of disciplined focus, authentic creative expression, and high-leverage digital systems.',
  location: 'Global / Independent Publisher',
  email: 'iashraf.ltd@gmail.com',
  portraitUrl: '/src/assets/images/author_ashraf_portrait_1793581925668.jpg',
  stats: [
    { label: 'Published Titles', value: '4 Works' },
    { label: 'Readers Worldwide', value: '12,000+' },
    { label: 'Format Compatibility', value: 'PDF & ePub' },
    { label: 'Delivery Speed', value: 'Instant Download' }
  ],
  socials: [
    { name: 'Instagram', url: 'https://www.instagram.com/ashraf4uco', handle: '@ashraf4uco' },
    { name: 'X', url: 'https://www.x.com/ashraf4uco', handle: '@ashraf4uco' },
    { name: 'YouTube', url: 'https://www.youtube.com/@ashraf4uco', handle: '@ashraf4uco' },
    { name: 'Facebook', url: 'https://www.facebook.com/ashraf4uco', handle: 'ashraf4uco' },
    { name: 'Pinterest', url: 'https://pin.it/2tfmFZU5K', handle: 'ASHRAF' },
    { name: 'Pexels', url: 'https://www.pexels.com/@ASHRAF-2163633523', handle: 'ASHRAF' },
    { name: 'Jaaspire', url: 'https://jaaspire.com/arf', handle: 'arf' },
    { name: 'Vulnn', url: 'https://api.vuinn.com/share/profile/2d57f5aa-0cff-4816-b0d6-17bf3db7efdf', handle: 'Ashraf Profile' },
    { name: 'Email', url: 'mailto:iashraf.ltd@gmail.com', handle: 'iashraf.ltd@gmail.com' }
  ]
};
