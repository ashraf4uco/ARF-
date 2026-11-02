import React from 'react';
import { AUTHOR_DETAILS } from '../data/books';
import { Mail, ArrowUpRight } from 'lucide-react';

export const AboutAuthor: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#FAF9F6] border-t border-neutral-200/60">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 lg:p-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Author Portrait with fine border */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square max-w-[340px] mx-auto rounded-2xl overflow-hidden book-shadow bg-neutral-100">
                <img
                  src={AUTHOR_DETAILS.portraitUrl}
                  alt={`Author portrait of ${AUTHOR_DETAILS.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs font-serif italic text-neutral-500">
                  ASHRAF — Independent Author & Creator
                </span>
              </div>
            </div>

            {/* Right: Bio & Verified Social Links */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-neutral-500">
                <span>The Author</span>
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                <span>ARF Publications</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-neutral-950 tracking-tight">
                {AUTHOR_DETAILS.name}
              </h2>

              {/* Exact Prompt Required Description */}
              <p className="text-lg sm:text-xl font-serif italic text-neutral-800 leading-relaxed border-l border-neutral-400 pl-5 py-1">
                "{AUTHOR_DETAILS.bio}"
              </p>

              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                {AUTHOR_DETAILS.extendedBio}
              </p>

              {/* Connected Platforms Links */}
              <div className="pt-4 border-t border-neutral-100">
                <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
                  Connected Platforms & Channels
                </span>

                <div className="flex flex-wrap gap-2 text-xs">
                  {AUTHOR_DETAILS.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full bg-neutral-50 hover:bg-neutral-950 hover:text-white text-neutral-700 border border-neutral-200/90 transition-all duration-200 inline-flex items-center gap-1.5"
                    >
                      <span>{social.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
