import React from 'react';
import { AUTHOR_DETAILS } from '../data/books';
import { Mail, ArrowUpRight } from 'lucide-react';

export const AboutAuthor: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-[#FAF9F6] border-t border-neutral-200/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl border border-neutral-200/70 p-6 sm:p-12 lg:p-16 shadow-xs relative overflow-hidden">
          {/* Subtle background flair */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAF9F6] rounded-bl-full -z-0 opacity-50" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10">
            {/* Left: Author Portrait */}
            <div className="lg:col-span-5">
              <div className="relative aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden book-shadow bg-neutral-100">
                <img
                  src={AUTHOR_DETAILS.portraitUrl}
                  alt={AUTHOR_DETAILS.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
              </div>
              <div className="mt-3 text-center">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                  Independent Author & Creator
                </span>
              </div>
            </div>

            {/* Right: Bio */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">
                <span>The Author</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-normal text-neutral-950 tracking-tight">
                {AUTHOR_DETAILS.name}
              </h2>

              <p className="text-base sm:text-lg font-serif italic text-neutral-800 leading-relaxed border-l-2 border-neutral-200 pl-4 py-0.5">
                "{AUTHOR_DETAILS.bio}"
              </p>

              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                {AUTHOR_DETAILS.extendedBio}
              </p>

              {/* Social Links as small capsules */}
              <div className="pt-4 border-t border-neutral-100">
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold block mb-3">
                  Connect & Follow
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {AUTHOR_DETAILS.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-neutral-50 hover:bg-neutral-950 hover:text-white text-neutral-600 border border-neutral-200/80 transition-all duration-200 inline-flex items-center gap-1.5 text-[11px] font-medium"
                    >
                      {social.name}
                      <ArrowUpRight className="w-3 h-3 opacity-40 group-hover:opacity-100" />
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
