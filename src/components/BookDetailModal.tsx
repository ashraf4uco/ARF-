import React, { useEffect } from 'react';
import { Ebook } from '../data/books';
import { X, Check, ShoppingBag, BookOpen, Clock, Download, ArrowRight, Heart } from 'lucide-react';

interface BookDetailModalProps {
  book: Ebook | null;
  onClose: () => void;
  onAddToCart: (book: Ebook) => void;
  isInCart: boolean;
  isInWishlist: boolean;
  onToggleWishlist: (bookId: string) => void;
  onInstantBuy: (book: Ebook) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onAddToCart,
  isInCart,
  isInWishlist,
  onToggleWishlist,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-white/95 backdrop-blur-md border-b border-neutral-200/60">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
            <span className="text-neutral-950 font-serif">ARF</span>
            <span aria-hidden="true">/</span>
            <span>{book.category}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleWishlist(book.id)}
              className={`p-2 rounded-full transition-colors ${
                isInWishlist
                  ? 'text-rose-500 bg-rose-50'
                  : 'text-neutral-400 hover:text-rose-500 hover:bg-neutral-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-8 items-start">
            <div className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden book-shadow bg-neutral-100">
              <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
              <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/20 via-white/5 to-transparent pointer-events-none" />
            </div>

            <div className="sm:col-span-7 flex flex-col gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-1">Author: {book.author}</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 tracking-tight leading-tight">{book.title}</h3>
                <p className="text-sm font-serif italic text-neutral-500 mt-1">{book.subtitle}</p>
                <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed mt-3">{book.longDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-4 border-t border-neutral-200/60 text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                <div><span className="text-neutral-300 block mb-0.5">Length</span><span className="text-neutral-900">{book.pages} Pages</span></div>
                <div><span className="text-neutral-300 block mb-0.5">Time</span><span className="text-neutral-900">{book.readTime}</span></div>
                <div><span className="text-neutral-300 block mb-0.5">Format</span><span className="text-neutral-900">{book.format}</span></div>
                <div><span className="text-neutral-300 block mb-0.5">Size</span><span className="text-neutral-900">{book.downloadSize}</span></div>
              </div>

              <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between gap-4">
                <span className="text-2xl font-serif font-bold text-neutral-950 tabular-nums">${book.price.toFixed(2)}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => onAddToCart(book)} className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-700 bg-white border border-neutral-200 hover:border-neutral-950 rounded-full transition-all flex items-center gap-1.5">
                    {isInCart ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                    {isInCart ? 'In Bag' : 'Add'}
                  </button>
                  <button onClick={() => onInstantBuy(book)} className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-white bg-neutral-950 hover:bg-neutral-800 rounded-full transition-all flex items-center gap-1.5 shadow-sm">
                    Buy <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-neutral-200/60">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Contents Overview
            </h4>
            <div className="space-y-1.5">
              {book.chapters.map((chapter, index) => (
                <div key={index} className="flex items-center justify-between text-[11px] py-1.5 border-b border-neutral-50 last:border-0">
                  <span className="text-neutral-300 font-serif w-6">0{index + 1}</span>
                  <span className="text-neutral-700 font-medium flex-1">{chapter}</span>
                  <span className="text-neutral-300">Included</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-amber-50/40 rounded-2xl border border-amber-100/40">
            <blockquote className="text-sm text-neutral-800 italic font-serif leading-relaxed">"{book.sampleExcerpt}"</blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};
