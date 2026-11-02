import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight, Heart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onExploreClick: () => void;
  onSearchClick: () => void;
  user: any;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onAdminClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onExploreClick,
  onSearchClick,
  user,
  isAdmin,
  onLogin,
  onLogout,
  onAdminClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Zone 1: ARF Logo */}
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="#"
            className="text-xl sm:text-2xl font-bold font-serif tracking-[0.05em] text-neutral-950 hover:opacity-80 transition-opacity"
          >
            ARF
          </a>
          <span className="hidden sm:inline-block text-neutral-300 font-serif text-lg select-none">
            /
          </span>
          <span className="hidden lg:inline-block text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-semibold">
            Digital Bookstore
          </span>
        </div>

        {/* Zone 2: Navigation Links (desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-medium text-neutral-500">
          <a href="#" className="hover:text-neutral-950 transition-colors">Home</a>
          <a href="#collection" className="hover:text-neutral-950 transition-colors whitespace-nowrap">Explore</a>
          <button
            onClick={onOpenWishlist}
            className="hover:text-neutral-950 transition-colors inline-flex items-center gap-1.5"
          >
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-rose-100 text-rose-600 rounded-full tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>
          <a href="#about" className="hover:text-neutral-950 transition-colors">About</a>
          <a href="#contact" className="hover:text-neutral-950 transition-colors">Contact</a>
          {isAdmin && (
            <button onClick={onAdminClick} className="text-rose-600 font-bold uppercase tracking-widest text-[11px] border border-rose-100 px-3 py-1 rounded-full hover:bg-rose-50 transition-colors">
              Admin
            </button>
          )}
        </nav>

        {/* Zone 3: Utility Icons */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={onSearchClick}
            className="p-2 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200/40 rounded-full transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-neutral-500 hover:text-rose-600 hover:bg-neutral-200/40 rounded-full transition-colors"
            aria-label="Wishlist"
          >
            <Heart className={`w-4.5 h-4.5 ${wishlistCount > 0 ? 'text-rose-600 fill-rose-600' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-rose-600 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/40 rounded-full transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-neutral-950 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onExploreClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-semibold tracking-wider uppercase text-neutral-900 border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white rounded-full transition-all"
          >
            Browse
          </button>

          {user ? (
            <div className="flex items-center gap-2 ml-1">
              <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-neutral-200" />
              <button onClick={onLogout} className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-950 transition-colors">Logout</button>
            </div>
          ) : (
            <button onClick={onLogin} className="text-[10px] font-bold uppercase tracking-widest text-neutral-950 hover:opacity-70 transition-opacity ml-2">Login</button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-950 rounded-lg ml-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200/50 bg-[#FAF9F6] px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-5 text-sm font-medium text-neutral-600">
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="hover:text-neutral-950">Home</a>
            <a href="#collection" onClick={() => setMobileMenuOpen(false)} className="hover:text-neutral-950">Explore Books</a>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenWishlist(); }}
              className="text-left flex items-center justify-between hover:text-neutral-950"
            >
              <span>Wishlist</span>
              {wishlistCount > 0 && <span className="px-2 py-0.5 text-[10px] font-bold bg-rose-50 text-rose-600 rounded-full">{wishlistCount} saved</span>}
            </button>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-neutral-950">About</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-neutral-950">Contact</a>
            <div className="pt-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onExploreClick(); }}
                className="w-full py-2.5 text-center text-[11px] font-bold tracking-widest uppercase text-white bg-neutral-950 rounded-full"
              >
                Start Reading
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
