import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onExploreClick: () => void;
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onExploreClick,
  onSearchClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-neutral-200/60 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: ARF Logo / Brand Wordmark */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-2xl font-bold font-serif tracking-[0.05em] text-neutral-950 hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
            aria-label="ARF Home"
          >
            ARF
          </a>
          <span className="hidden sm:inline-block text-neutral-300 font-serif text-lg select-none">
            /
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-neutral-500 font-medium">
            Digital Bookstore
          </span>
        </div>

        {/* Zone 2: Minimal Navigation Links (desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <a
            href="#"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </a>
          <a
            href="#collection"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
          >
            Explore Books
          </a>
          <a
            href="#about"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Search + Shopping Cart + Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Icon Trigger */}
          <button
            onClick={onSearchClick}
            className="p-2 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/50 rounded-full transition-colors"
            aria-label="Search ebooks collection"
          >
            <Search className="w-4 h-4 stroke-[1.8]" />
          </button>

          {/* Shopping Cart Icon with subtle badge */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/50 rounded-full transition-colors"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4.5 h-4.5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-neutral-950 text-white text-[10px] font-semibold w-4.5 h-4.5 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick CTA */}
          <button
            onClick={onExploreClick}
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-neutral-900 border border-neutral-300 hover:border-neutral-950 rounded-full transition-all duration-200 whitespace-nowrap shrink-0 hover:bg-neutral-950 hover:text-white"
          >
            Explore Books
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-950 rounded-lg"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200/70 bg-[#FAF9F6] px-6 py-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-neutral-800">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-neutral-950"
            >
              Home
            </a>
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-neutral-950"
            >
              Explore Books
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-neutral-950"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-neutral-950"
            >
              Contact
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExploreClick();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-neutral-950 rounded-full"
              >
                Explore Collection
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
