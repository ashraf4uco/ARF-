import React, { useEffect } from 'react';
import { Ebook } from '../data/books';
import { Heart, X, Trash2, ShoppingBag, Eye, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  catalog: Ebook[];
  onRemoveFromWishlist: (bookId: string) => void;
  onClearWishlist: () => void;
  onAddToCart: (book: Ebook) => void;
  onViewBook: (book: Ebook) => void;
  isBookInCart: (bookId: string) => boolean;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  catalog,
  onRemoveFromWishlist,
  onClearWishlist,
  onAddToCart,
  onViewBook,
  isBookInCart
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const wishlistedBooks = wishlistIds
    .map((id) => catalog.find((book) => book.id === id))
    .filter((book): book is Ebook => book !== undefined);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-neutral-950/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-sm bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between border-l border-neutral-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200/60 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <h2 className="text-base font-serif font-bold text-neutral-950">
              Wishlist ({wishlistedBooks.length})
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors">
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {wishlistedBooks.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">No Saved Titles</p>
              <button onClick={onClose} className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-900 bg-white border border-neutral-200 rounded-full hover:border-neutral-950 transition-colors">Explore Collection</button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-neutral-400 pb-2 border-b border-neutral-200/40">
                <span>{wishlistedBooks.length} Items</span>
                <button onClick={onClearWishlist} className="hover:text-rose-500 transition-colors uppercase tracking-widest">Clear All</button>
              </div>

              {wishlistedBooks.map((book) => {
                const inCart = isBookInCart(book.id);
                return (
                  <div key={book.id} className="p-4 bg-white rounded-xl border border-neutral-100 shadow-xs space-y-3">
                    <div className="flex gap-4 items-start">
                      <img src={book.coverImage} alt={book.title} className="w-12 aspect-[3/4] object-cover rounded-md bg-neutral-200 shrink-0 shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-serif font-bold text-neutral-950 truncate leading-tight">{book.title}</h4>
                        <p className="text-[10px] font-serif italic text-neutral-400 truncate mb-1">{book.subtitle}</p>
                        <span className="text-[12px] font-serif font-bold text-neutral-950 tabular-nums">${book.price.toFixed(2)}</span>
                      </div>
                      <button onClick={() => onRemoveFromWishlist(book.id)} className="p-1.5 text-neutral-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="pt-2 border-t border-neutral-100 flex items-center gap-2">
                      <button onClick={() => { onViewBook(book); onClose(); }} className="flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-600 bg-neutral-50 hover:bg-neutral-100 rounded-md transition-colors text-center">View</button>
                      <button onClick={() => onAddToCart(book)} className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${inCart ? 'bg-neutral-800 text-white' : 'bg-neutral-950 text-white hover:bg-neutral-800'}`}>
                        {inCart ? 'In Bag' : 'Add to Bag'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistedBooks.length > 0 && (
          <div className="p-5 border-t border-neutral-200/60 bg-white">
            <button
              onClick={() => {
                wishlistedBooks.forEach((book) => { if (!isBookInCart(book.id)) onAddToCart(book); });
                onClose();
              }}
              className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-white bg-neutral-950 hover:bg-neutral-800 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              Add All to Bag <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
