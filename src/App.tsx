import React, { useState, useRef } from 'react';
import { INITIAL_BOOKS, Ebook } from './data/books';
import { CartItem } from './utils/ebookStore';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EbookCollection } from './components/EbookCollection';
import { AboutAuthor } from './components/AboutAuthor';
import { NewsletterSection } from './components/NewsletterSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookDetailModal } from './components/BookDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { LegalModal } from './components/LegalModals';

export default function App() {
  const [books] = useState<Ebook[]>(INITIAL_BOOKS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Ebook | null>(null);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const featuredBook = books[0] || INITIAL_BOOKS[0];
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (book: Ebook) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.bookId === book.id);
      if (existing) {
        return prev;
      }
      return [...prev, { bookId: book.id, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleInstantBuy = (book: Ebook) => {
    handleAddToCart(book);
    setSelectedBook(null);
    setIsCartOpen(true);
  };

  const handleRemoveItem = (bookId: string) => {
    setCartItems((prev) => prev.filter((item) => item.bookId !== bookId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const isBookInCart = (bookId: string) => {
    return cartItems.some((item) => item.bookId === bookId);
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchFocus = () => {
    scrollToCollection();
    const inputEl = document.querySelector("input[aria-label='Search collection']") as HTMLInputElement | null;
    if (inputEl) {
      setTimeout(() => inputEl.focus(), 300);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Minimal Navigation */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onExploreClick={scrollToCollection}
        onSearchClick={handleSearchFocus}
      />

      <main className="flex-1">
        {/* Aesthetic Editorial Hero Section */}
        <Hero
          featuredBook={featuredBook}
          onExploreClick={scrollToCollection}
          onViewBook={(book) => setSelectedBook(book)}
        />

        {/* Featured Collection (STRICT 2-COLUMN GRID) */}
        <EbookCollection
          books={books}
          onSelectBook={(book) => setSelectedBook(book)}
          onAddToCart={handleAddToCart}
          isBookInCart={isBookInCart}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Minimal Author Profile Section (ASHRAF) */}
        <AboutAuthor />

        {/* Newsletter Section: "Stay Inspired." */}
        <NewsletterSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Minimal Bookstore Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModal('privacy')}
        onOpenTerms={() => setLegalModal('terms')}
      />

      {/* Book Details Modal */}
      <BookDetailModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddToCart={handleAddToCart}
        isInCart={selectedBook ? isBookInCart(selectedBook.id) : false}
        onInstantBuy={handleInstantBuy}
      />

      {/* Slide-over Shopping Cart & Instant Digital Download Fulfillment */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        catalog={books}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Privacy Policy & Terms Modal */}
      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
      />
    </div>
  );
}
