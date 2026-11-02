import React, { useState } from 'react';
import { Ebook } from '../data/books';
import { filterBooks } from '../utils/ebookStore';
import { Eye, ShoppingBag, BookOpen, Clock, Check, Search, X, Heart } from 'lucide-react';

interface EbookCollectionProps {
  books: Ebook[];
  onSelectBook: (book: Ebook) => void;
  onAddToCart: (book: Ebook) => void;
  isBookInCart: (bookId: string) => boolean;
  onToggleWishlist: (bookId: string) => void;
  isWishlisted: (bookId: string) => boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const EbookCollection: React.FC<EbookCollectionProps> = ({
  books,
  onSelectBook,
  onAddToCart,
  isBookInCart,
  onToggleWishlist,
  isWishlisted,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Titles' },
    { id: 'Focus', label: 'Focus' },
    { id: 'Creative', label: 'Creative' },
    { id: 'Productivity', label: 'Productivity' },
    { id: 'Living', label: 'Philosophy' }
  ];

  const filteredBooks = filterBooks(books, searchQuery, selectedCategory);

  return (
    <section id="collection" className="py-12 md:py-24 bg-[#FAF9F6] border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 mb-1">
              <span>Curated</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span>Independent</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-neutral-950 mb-2">
              Explore the Collection
            </h2>
            <p className="text-[13px] sm:text-lg text-neutral-500 font-light">
              Digital reads for curious minds.
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-8 py-2 text-[11px] text-neutral-900 bg-white border border-neutral-200 rounded-full focus:outline-none focus:ring-1 focus:ring-neutral-950 transition-all shadow-xs"
              aria-label="Search collection"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none border-b border-neutral-200/40">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all whitespace-nowrap shrink-0 border ${
                selectedCategory === cat.id
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                  : 'bg-white text-neutral-400 border-neutral-200 hover:text-neutral-950'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ABSOLUTE 2-COLUMN GRID FORCED VIA INLINE STYLE TO GUARANTEE COMPLIANCE */}
        <div 
          className="grid gap-x-2 gap-y-4 sm:gap-8 lg:gap-12"
          style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
        >
          {filteredBooks.map((book) => {
            const inCart = isBookInCart(book.id);
            const inWishlist = isWishlisted(book.id);

            return (
              <article
                key={book.id}
                className="group bg-white rounded-xl sm:rounded-3xl border border-neutral-100 p-2 sm:p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative min-w-0 overflow-hidden"
              >
                <div className="flex flex-col gap-2 sm:gap-5">
                  <div className="relative aspect-[3/4] rounded-lg sm:rounded-2xl overflow-hidden shadow-sm bg-neutral-100">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      onClick={() => onSelectBook(book)}
                      className="w-full h-full object-cover cursor-pointer"
                      loading="lazy"
                    />
                    <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleWishlist(book.id); }}
                      className={`absolute top-1.5 right-1.5 p-1.5 sm:p-2 rounded-full transition-all ${
                        inWishlist ? 'bg-rose-500 text-white' : 'bg-white/80 text-neutral-400'
                      }`}
                    >
                      <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${inWishlist ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-0.5 sm:gap-2">
                    <h3
                      onClick={() => onSelectBook(book)}
                      className="text-[11px] sm:text-lg font-serif font-bold text-neutral-950 tracking-tight leading-tight line-clamp-1 cursor-pointer"
                    >
                      {book.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] sm:text-base font-serif font-bold text-neutral-950 tabular-nums">
                        ${book.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 sm:mt-5 pt-2 sm:pt-4 border-t border-neutral-50 flex items-center gap-1 sm:gap-3">
                  <button
                    onClick={() => onSelectBook(book)}
                    className="flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500 bg-neutral-50 rounded-lg"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onAddToCart(book)}
                    className={`flex-1 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-1 ${
                      inCart ? 'bg-neutral-800 text-white' : 'bg-neutral-950 text-white'
                    }`}
                  >
                    {inCart ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                    <span>{inCart ? 'Bagged' : 'Buy'}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
