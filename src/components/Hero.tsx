import React from 'react';
import { ArrowDown, BookOpen } from 'lucide-react';
import { Ebook } from '../data/books';

interface HeroProps {
  featuredBook: Ebook;
  onExploreClick: () => void;
  onViewBook: (book: Ebook) => void;
}

export const Hero: React.FC<HeroProps> = ({ featuredBook, onExploreClick, onViewBook }) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            <div className="inline-flex items-center gap-2.5 text-[10px] uppercase tracking-[0.25em] font-semibold text-neutral-400">
              <span className="w-5 h-[1px] bg-neutral-300" />
              <span>Independent Digital Bookstore</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-neutral-950 leading-[1.1] text-balance">
              Ideas Worth <br />
              <span className="italic font-normal">Reading.</span>
            </h1>

            <p className="text-base sm:text-xl text-neutral-500 font-light leading-relaxed max-w-lg text-balance">
              Explore thoughtfully crafted ebooks designed to inspire creativity, expand knowledge, and spark new ideas.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 text-[11px] font-bold tracking-widest uppercase text-white bg-neutral-950 hover:bg-neutral-800 rounded-full transition-all shadow-sm active:scale-[0.98] inline-flex items-center gap-2"
              >
                Explore Collection
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onViewBook(featuredBook)}
                className="px-6 py-3 text-[11px] font-bold tracking-widest uppercase text-neutral-800 bg-white border border-neutral-200 hover:border-neutral-900 rounded-full transition-all active:scale-[0.98] inline-flex items-center gap-2"
              >
                Featured: {featuredBook.title}
              </button>
            </div>

            {/* Publication guarantees */}
            <div className="pt-6 border-t border-neutral-200/40 flex flex-wrap items-center gap-y-2 gap-x-6 text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
              <span>DRM-Free ePub & PDF</span>
              <span className="w-1 h-1 rounded-full bg-neutral-200" />
              <span>Instant Digital Fulfillment</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div
              onClick={() => onViewBook(featuredBook)}
              className="group relative cursor-pointer max-w-[280px] sm:max-w-[320px] w-full"
            >
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-white/60 rounded-3xl border border-neutral-100 rotate-1 group-hover:rotate-0 transition-transform duration-700 -z-10" />

              {/* Book Showcase */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden book-shadow group-hover:book-shadow-hover transition-all duration-700 group-hover:-translate-y-2 bg-neutral-100">
                <img
                  src={featuredBook.coverImage}
                  alt={featuredBook.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/20 via-white/5 to-transparent pointer-events-none" />
                <div className="absolute inset-0 border border-black/10 rounded-2xl pointer-events-none" />

                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-neutral-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-neutral-400 block font-bold">Featured Volume</span>
                    <span className="text-xs font-serif font-bold text-neutral-900 block truncate">{featuredBook.title}</span>
                  </div>
                  <span className="text-[11px] font-bold text-neutral-900 bg-neutral-50 px-2 py-1 rounded tabular-nums">${featuredBook.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                  Click to inspect preview →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
