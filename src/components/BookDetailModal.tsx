import React, { useEffect } from 'react';
import { Ebook } from '../data/books';
import { X, Check, ShoppingBag, BookOpen, Clock, Download, ArrowRight } from 'lucide-react';

interface BookDetailModalProps {
  book: Ebook | null;
  onClose: () => void;
  onAddToCart: (book: Ebook) => void;
  isInCart: boolean;
  onInstantBuy: (book: Ebook) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onAddToCart,
  isInCart,
  onInstantBuy
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (book) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [book, onClose]);

  if (!book) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-book-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-[#FAF9F6] rounded-3xl shadow-2xl border border-neutral-300/80 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span className="font-serif font-bold text-neutral-950">ARF</span>
            <span aria-hidden="true">/</span>
            <span>{book.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Header Row: Cover + Quick Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
            <div className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden book-shadow bg-neutral-100">
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-white/10 to-transparent pointer-events-none" />
              <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
            </div>

            <div className="sm:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-neutral-400 block mb-1">
                  Author: {book.author}
                </span>
                <h3
                  id="modal-book-title"
                  className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight mb-1"
                >
                  {book.title}
                </h3>
                <p className="text-sm font-serif italic text-neutral-500 mb-4">
                  {book.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                  {book.longDescription}
                </p>
              </div>

              {/* Specs strip */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-200/60 text-xs text-neutral-600">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Length & Size</span>
                  <span className="font-semibold text-neutral-900">{book.pages} pages ({book.downloadSize})</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Read Time</span>
                  <span className="font-semibold text-neutral-900">{book.readTime}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Format</span>
                  <span className="font-semibold text-neutral-900">{book.format}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Language</span>
                  <span className="font-semibold text-neutral-900">{book.language}</span>
                </div>
              </div>

              {/* Price & Primary Action */}
              <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-neutral-400 block uppercase tracking-wider font-semibold">
                    Digital License
                  </span>
                  <span className="text-2xl font-serif font-bold text-neutral-950 tabular-nums">
                    ${book.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(book)}
                    className="px-4 py-2.5 text-xs font-semibold text-neutral-800 bg-white border border-neutral-300 hover:border-neutral-950 rounded-full transition-colors active:scale-95 flex items-center gap-1.5"
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        In Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add to Bag
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onInstantBuy(book)}
                    className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-950 hover:bg-neutral-800 rounded-full transition-all duration-200 active:scale-95 shadow-sm flex items-center gap-1.5"
                  >
                    Buy Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents Section */}
          <div className="p-6 bg-white rounded-2xl border border-neutral-200/80">
            <h4 className="text-xs font-bold font-serif uppercase tracking-widest text-neutral-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-neutral-700" />
              Table of Contents Overview
            </h4>
            <div className="space-y-2">
              {book.chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-100 last:border-0"
                >
                  <span className="text-neutral-400 font-serif w-8">0{index + 1}.</span>
                  <span className="text-neutral-800 font-medium flex-1">{chapter}</span>
                  <span className="text-neutral-400 text-[11px]">Included</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Reading Excerpt */}
          <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-200/50">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-900/80 mb-2">
              Sample Reading Excerpt
            </h4>
            <blockquote className="text-sm text-neutral-800 italic font-serif leading-relaxed">
              "{book.sampleExcerpt}"
            </blockquote>
            <p className="text-xs text-neutral-500 mt-2 font-sans">
              — From Chapter 1 of <span className="font-semibold text-neutral-900">{book.title}</span> by ASHRAF
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
