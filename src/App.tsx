import React, { useState, useEffect } from 'react';
import { INITIAL_BOOKS, Ebook } from './data/books';
import {
  CartItem,
  loadWishlistFromStorage,
  saveWishlistToStorage,
  toggleWishlistBook,
  isBookInWishlist
} from './utils/ebookStore';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EbookCollection } from './components/EbookCollection';
import { AboutAuthor } from './components/AboutAuthor';
import { NewsletterSection } from './components/NewsletterSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookDetailModal } from './components/BookDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { LegalModal } from './components/LegalModals';
import { AuthProvider, useAuth } from './utils/AuthProvider';
import { CheckoutPage, CheckoutDetails } from './components/CheckoutPage';
import { AdminDashboard } from './components/AdminDashboard';
import { db, handleFirestoreError, OperationType, auth, googleProvider } from './utils/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';

function AppContent() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [books, setBooks] = useState<Ebook[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(() => loadWishlistFromStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Ebook | null>(null);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'store' | 'checkout' | 'admin'>('store');
  const [checkoutBook, setCheckoutBook] = useState<Ebook | null>(null);
  const [loadingBooks, setLoadingBooks] = useState(true);

  // Persist wishlist whenever it changes
  useEffect(() => {
    saveWishlistToStorage(wishlist);
  }, [wishlist]);

  // Fetch books from Firestore
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const snap = await getDocs(query(collection(db, 'books'), where('isPublished', '==', true)));
        if (snap.empty) {
          // Fallback to initial books for seeding if DB is empty
          setBooks(INITIAL_BOOKS);
        } else {
          setBooks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)));
        }
      } catch (error) {
        console.error("Fetch books failed:", error);
        setBooks(INITIAL_BOOKS);
      } finally {
        setLoadingBooks(false);
      }
    };
    fetchBooks();
  }, []);

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
    setCheckoutBook(book);
    setView('checkout');
    setSelectedBook(null);
  };

  const handleStartCheckout = (book: Ebook) => {
    setCheckoutBook(book);
    setView('checkout');
    setIsCartOpen(false);
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

  const handleToggleWishlist = (bookId: string) => {
    setWishlist((prev) => toggleWishlistBook(prev, bookId));
  };

  const handleClearWishlist = () => {
    setWishlist([]);
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

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setView('store');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCheckoutComplete = async (details: CheckoutDetails) => {
    if (!checkoutBook) return;

    try {
      // 1. Create a pending order in Firestore
      const orderRef = await addDoc(collection(db, 'orders'), {
        bookId: checkoutBook.id,
        userId: user?.uid || null,
        buyerName: details.fullName,
        buyerEmail: details.email,
        buyerWhatsApp: details.whatsapp,
        amount: checkoutBook.price,
        status: 'pending',
        createdAt: serverTimestamp(),
        token: Math.random().toString(36).substring(2) + Date.now().toString(36)
      });

      // 2. Initialize Razorpay Checkout
      const loadRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        alert("Payment system failed to load. Please check your connection.");
        return;
      }

      // 3. Create Order on Backend Proxy
      const proxyRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: checkoutBook.price,
          receipt: orderRef.id
        })
      });
      const proxyData = await proxyRes.json();

      if (!proxyData.success) {
        alert("Failed to initialize payment. Try again.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: proxyData.order.amount,
        currency: proxyData.order.currency,
        name: 'ARF Ebook Store',
        description: `Purchase of ${checkoutBook.title}`,
        order_id: proxyData.order.id,
        handler: async function (response: any) {
          // Verify on backend
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });
          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            // Update Firestore is handled by webhook ideally, but for now we confirm
            alert("Payment successful! You will receive an email with your download link.");
            setView('store');
            setCheckoutBook(null);
          }
        },
        prefill: {
          name: details.fullName,
          email: details.email,
          contact: details.whatsapp
        },
        theme: { color: '#141414' }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Something went wrong with the checkout process.");
    }
  };

  if (view === 'admin' && isAdmin) {
    return <AdminDashboard />;
  }

  // Admin bootstrap utility for the user provided email
  const handleBootstrapAdmin = async () => {
    if (user && user.email === 'ashraf4uco@gmail.com') {
      try {
        await setDoc(doc(db, 'admins', user.uid), { email: user.email });
        alert("You are now an Admin. Please refresh.");
        window.location.reload();
      } catch (error) {
        console.error("Bootstrap failed:", error);
      }
    }
  };

  if (view === 'checkout' && checkoutBook) {
    return (
      <CheckoutPage 
        book={checkoutBook} 
        onBack={() => setView('store')} 
        onComplete={handleCheckoutComplete}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Minimal Navigation with Wishlist */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onExploreClick={scrollToCollection}
        onSearchClick={handleSearchFocus}
        user={user}
        isAdmin={isAdmin}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onAdminClick={() => setView('admin')}
      />

      <main className="flex-1">
        {/* Aesthetic Editorial Hero Section */}
        <Hero
          featuredBook={featuredBook}
          onExploreClick={scrollToCollection}
          onViewBook={(book) => setSelectedBook(book)}
        />

        {/* Featured Collection (STRICT 2-COLUMN GRID WITH WISHLIST HEARTS) */}
        {loadingBooks ? (
          <div className="py-24 text-center font-serif italic text-neutral-400">Loading Collection...</div>
        ) : (
          <EbookCollection
            books={books}
            onSelectBook={(book) => setSelectedBook(book)}
            onAddToCart={handleAddToCart}
            isBookInCart={isBookInCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={(bookId) => isBookInWishlist(wishlist, bookId)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {user && user.email === 'ashraf4uco@gmail.com' && !isAdmin && (
          <div className="py-8 text-center">
            <button 
              onClick={handleBootstrapAdmin}
              className="px-6 py-2 border border-rose-200 text-rose-500 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-rose-50 transition-all"
            >
              Bootstrap Admin Access
            </button>
          </div>
        )}

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
        isInWishlist={selectedBook ? isBookInWishlist(wishlist, selectedBook.id) : false}
        onToggleWishlist={handleToggleWishlist}
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
        onCheckout={handleStartCheckout}
      />

      {/* Slide-over Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        catalog={books}
        onRemoveFromWishlist={handleToggleWishlist}
        onClearWishlist={handleClearWishlist}
        onAddToCart={handleAddToCart}
        onViewBook={(book) => setSelectedBook(book)}
        isBookInCart={isBookInCart}
      />

      {/* Privacy Policy & Terms Modal */}
      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
