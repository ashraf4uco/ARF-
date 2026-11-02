import React, { useState } from 'react';
import { Ebook } from '../data/books';
import { filterBooks } from '../utils/ebookStore';
import { Eye, ShoppingBag, BookOpen, Clock, Check, Search, X } from 'lucide-react';

interface EbookCollectionProps {
  books: Ebook[];
  onSelectBook: (book: Ebook) => void;
  onAddToCart: (book: Ebook) => void;
  isBookInCart: (bookId: string) => boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const EbookCollection: React.FC<EbookCollectionProps> = ({
  books,
  onSelectBook,
  onAddToCart,
  isBookInCart,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Titles' },
    { id: 'Focus', label: 'Focus & Mindset' },
    { id: 'Creative', label: 'Creative Craft' },
    { id: 'Productivity', label: 'Productivity & Systems' },
    { id: 'Living', label: 'Living & Philosophy' }
  ];

  const filteredBooks = filterBooks(books, searchQuery, selectedCategory);

  return (
    <section id="collection" className="py-20 md:py-28 bg-[#FAF9F6] border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-neutral-500 mb-2">
              <span>Curated Catalogue</span>
              <span className="w-1 h-1 rounded-full bg-neutral-400" />
              <span>Independent Editions</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-neutral-950 mb-3">
              Explore the Collection
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              Digital reads for curious minds.
            </p>
          </div>

          {/* Quick Search in Header */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, chapter, or idea..."
              className="w-full pl-10 pr-9 py-2.5 text-xs text-neutral-900 bg-white border border-neutral-300 rounded-full focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950 transition-all placeholder:text-neutral-400"
              aria-label="Search collection"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-800"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-neutral-200/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200 hover:border-neutral-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* CRITICAL MANDATE: EXACTLY 2-COLUMN GRID ON DESKTOP & TABLET */}
        {filteredBooks.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200/80 p-8">
            <p className="text-neutral-600 mb-4 font-serif text-lg">No ebooks match your query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {filteredBooks.map((book) => {
              const inCart = isBookInCart(book.id);

              return (
                <article
                  key={book.id}
                  className="group bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-neutral-400 hover:shadow-xl hover:-translate-y-1 relative"
                >
                  <div>
                    {/* Top Section: Large Ebook Cover + Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start mb-6">
                      {/* Large, Beautiful Ebook Cover (Consistent 3:4 Proportions) */}
                      <div
                        onClick={() => onSelectBook(book)}
                        className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer book-shadow group-hover:book-shadow-hover transition-all duration-500 bg-neutral-100 shrink-0"
                      >
                        <img
                          src={book.coverImage}
                          alt={`Cover for ${book.title}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        {/* Realistic spine edge highlight */}
                        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
                      </div>

                      {/* Book Details */}
                      <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-3">
                        <div>
                          {/* Category Badge & Pages */}
                          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium mb-1">
                            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                              {book.category}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{book.pages} pages</span>
                          </div>

                          {/* Title */}
                          <h3
                            onClick={() => onSelectBook(book)}
                            className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 tracking-tight cursor-pointer hover:text-neutral-700 transition-colors leading-tight"
                          >
                            {book.title}
                          </h3>

                          {/* Subtitle */}
                          <p className="text-xs font-serif italic text-neutral-500 mt-1">
                            {book.subtitle}
                          </p>

                          {/* Short Description */}
                          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed line-clamp-3 mt-3">
                            {book.description}
                          </p>
                        </div>

                        {/* Format & Read time badges */}
                        <div className="pt-3 border-t border-neutral-100 text-xs text-neutral-500 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{book.format}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{book.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom / Action Row */}
                  <div className="pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block">
                        Digital License
                      </span>
                      <span className="text-2xl font-serif font-bold text-neutral-950 tabular-nums">
                        ${book.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectBook(book)}
                        className="px-4 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200/90 rounded-full transition-colors active:scale-95 inline-flex items-center gap-1.5"
                        aria-label={`View Details for ${book.title}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Details
                      </button>

                      <button
                        onClick={() => onAddToCart(book)}
                        className={`px-5 py-2.5 text-xs font-semibold rounded-full transition-all duration-200 active:scale-95 shadow-xs inline-flex items-center gap-1.5 ${
                          inCart
                            ? 'bg-neutral-800 text-white hover:bg-neutral-900'
                            : 'bg-neutral-950 text-white hover:bg-neutral-800'
                        }`}
                        aria-label={inCart ? `${book.title} added to bag` : `Buy Now: ${book.title}`}
                      >
                        {inCart ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            In Bag
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Buy Now
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
