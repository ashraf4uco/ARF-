import React from 'react';
import { ArrowDown, BookOpen, Compass, Sparkles } from 'lucide-react';
import { Ebook } from '../data/books';

interface HeroProps {
  featuredBook: Ebook;
  onExploreClick: () => void;
  onViewBook: (book: Ebook) => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredBook, onExploreClick, onViewBook }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.2em] font-medium text-neutral-500">
              <span className="w-6 h-[1px] bg-neutral-400" />
              <span>Independent Digital Bookstore</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              <span>By ASHRAF</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-7xl font-serif font-normal tracking-tight text-neutral-950 leading-[1.05] text-balance">
              Ideas Worth <br className="hidden sm:inline" />
              <span className="italic font-normal">Reading.</span>
            </h1>

            {/* Supporting text */}
            <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed max-w-xl text-balance">
              Explore thoughtfully crafted ebooks designed to inspire creativity, expand knowledge, and spark new ideas.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-neutral-950 hover:bg-neutral-800 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
              >
                Explore Collection
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onViewBook(featuredBook)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-neutral-800 bg-white border border-neutral-300 hover:border-neutral-900 rounded-full transition-all duration-200 active:scale-[0.98]"
              >
                <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
                Featured: {featuredBook.title}
              </button>
            </div>

            {/* Subtle editorial publication guarantees */}
            <div className="pt-8 border-t border-neutral-200/60 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-neutral-500 font-light">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                <span>DRM-Free ePub & PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                <span>Instant Digital Fulfillment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-neutral-400" />
                <span>Read on iPad, Kindle & Phone</span>
              </div>
            </div>
          </div>

          {/* Right Column: Subtle Floating Book Showcase Element */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              onClick={() => onViewBook(featuredBook)}
              className="group relative cursor-pointer max-w-[340px] w-full"
            >
              {/* Soft decorative background frame */}
              <div className="absolute -inset-4 bg-white/70 rounded-3xl border border-neutral-200/60 -rotate-1 group-hover:rotate-0 transition-transform duration-500 -z-10 shadow-sm" />

              {/* Physical Ebook Card with Book Spine & Tactile Shadow */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden book-shadow group-hover:book-shadow-hover transition-all duration-500 group-hover:-translate-y-2 bg-neutral-100">
                <img
                  src={featuredBook.coverImage}
                  alt={featuredBook.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                {/* Book spine highlight gradient */}
                <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 border border-black/10 rounded-2xl pointer-events-none" />

                {/* Subtle floating badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-neutral-200/80 shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">
                      Featured Volume
                    </span>
                    <span className="text-sm font-serif font-bold text-neutral-900 block truncate">
                      {featuredBook.title}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md tabular-nums">
                    ${featuredBook.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium group-hover:text-neutral-700 transition-colors">
                  Click to inspect book preview & excerpt →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
