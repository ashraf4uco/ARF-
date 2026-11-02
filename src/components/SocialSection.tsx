import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  handle: string;
  category: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/ashraf4uco',
    handle: '@ashraf4uco',
    category: 'Visual & Stories',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    )
  },
  {
    name: 'X (Twitter)',
    url: 'https://www.x.com/ashraf4uco',
    handle: '@ashraf4uco',
    category: 'Thoughts & Updates',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@ashraf4uco',
    handle: '@ashraf4uco',
    category: 'Video & Longform',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/ashraf4uco',
    handle: 'ashraf4uco',
    category: 'Community',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    name: 'Pexels',
    url: 'https://www.pexels.com/@ASHRAF-2163633523',
    handle: '@ASHRAF-2163633523',
    category: 'Photography Portfolio',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M3.75 3h9.5c3.728 0 6.75 3.022 6.75 6.75S16.978 16.5 13.25 16.5H7.5V21H3.75V3zm3.75 3.75v6h5.75c1.657 0 3-1.343 3-3s-1.343-3-3-3H7.5z" />
      </svg>
    )
  },
  {
    name: 'Pinterest',
    url: 'https://pin.it/2tfmFZU5K',
    handle: 'ASHRAF Inspiration',
    category: 'Visual Moodboards',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
      </svg>
    )
  },
  {
    name: 'Jaaspire',
    url: 'https://jaaspire.com/arf',
    handle: 'jaaspire.com/arf',
    category: 'Brand Hub & Articles',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
      </svg>
    )
  },
  {
    name: 'Vulnn Profile',
    url: 'https://api.vuinn.com/share/profile/2d57f5aa-0cff-4816-b0d6-17bf3db7efdf',
    handle: 'Verified Creator Profile',
    category: 'Digital Identity',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  },
  {
    name: 'Official Email',
    url: 'mailto:iashraf.ltd@gmail.com',
    handle: 'iashraf.ltd@gmail.com',
    category: 'Direct Inquiries',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  }
];

export const SocialSection: React.FC = () => {
  return (
    <section id="social" className="py-20 md:py-28 bg-neutral-50/70 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-2">
            Stay Connected
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-neutral-950 mb-4">
            Connect with ASHRAF
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Follow along across digital platforms for new releases, visual photography, essays, and creator insights.
          </p>
        </div>

        {/* Clean Interactive Social Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="group p-6 bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                aria-label={`Open ${social.name} profile in new tab`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="p-1.5 text-neutral-400 group-hover:text-neutral-950 transition-colors">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <div className="text-xs font-medium text-neutral-400 mb-1">
                    {social.category}
                  </div>
                  <h3 className="text-base font-bold font-display text-neutral-950 mb-1">
                    {social.name}
                  </h3>
                </div>

                <div className="pt-4 border-t border-neutral-100 text-xs font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors truncate">
                  {social.handle}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
