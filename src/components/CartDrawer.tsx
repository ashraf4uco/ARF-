import React, { useState, useEffect } from 'react';
import { Ebook } from '../data/books';
import { CartItem, calculateCartTotals, validateEmail, generateOrderConfirmation } from '../utils/ebookStore';
import { X, Trash2, ArrowRight, Download, Check, ShieldCheck, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  catalog: Ebook[];
  onRemoveItem: (bookId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  catalog,
  onRemoveItem,
  onClearCart
}) => {
  const [email, setEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [error, setError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<ReturnType<typeof generateOrderConfirmation> | null>(null);

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

  const totals = calculateCartTotals(items, catalog);

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    setCheckoutStep('checkout');
    setError('');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please provide a valid email for your digital download link.');
      return;
    }

    const order = generateOrderConfirmation(items, catalog, email, customerName);
    setCompletedOrder(order);
    setCheckoutStep('success');
    onClearCart();
  };

  const handleSimulateDownload = (title: string, format: string) => {
    // Generate a downloadable text/markdown receipt blob so the user genuinely receives a file
    const content = `====================================
ARF EBOOK STORE — DIGITAL PURCHASE
Author: ASHRAF
Title: ${title}
Edition: DRM-Free ${format}
Delivery: Instant Verified Download
Customer: ${completedOrder?.customerEmail || email}
Order ID: ${completedOrder?.orderId || 'ARF-ONLINE'}
====================================

Thank you for supporting independent author ASHRAF and the ARF publication imprint.

Your full reading bundle is verified and ready.
Visit: https://jaaspire.com/arf
Direct Author: iashraf.ltd@gmail.com
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_arf_ebook.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-neutral-200 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-950" />
            <h2 id="cart-drawer-title" className="text-lg font-bold font-display text-neutral-950">
              {checkoutStep === 'cart' && `Your Bag (${totals.itemCount})`}
              {checkoutStep === 'checkout' && 'Instant Checkout'}
              {checkoutStep === 'success' && 'Order Confirmed!'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900">Your bag is empty</h3>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                    Explore our curated collection of ebooks by ASHRAF to begin reading.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const book = catalog.find((b) => b.id === item.bookId);
                    if (!book) return null;

                    return (
                      <div
                        key={item.bookId}
                        className="flex gap-4 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 items-center justify-between"
                      >
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-14 h-18 object-cover rounded-lg bg-neutral-200 shrink-0 shadow-xs"
                        />

                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="text-sm font-bold font-display text-neutral-950 truncate">
                            {book.title}
                          </h4>
                          <span className="text-[11px] text-neutral-500 block truncate">
                            {book.format}
                          </span>
                          <span className="text-xs font-semibold text-neutral-900 tabular-nums">
                            ${book.price.toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.bookId)}
                          className="p-2 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-neutral-100 transition-colors shrink-0"
                          aria-label={`Remove ${book.title} from bag`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 text-xs text-neutral-600 mb-4">
                Enter your details to generate your verified digital download links instantly.
              </div>

              {error && (
                <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label htmlFor="checkout-delivery-email" className="block text-xs font-semibold text-neutral-700 mb-1">
                  Email for Digital Delivery <span className="text-neutral-400 font-normal">(Required)</span>
                </label>
                <input
                  id="checkout-delivery-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
                  required
                />
              </div>

              <div className="pt-2 text-xs text-neutral-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure 256-bit instant digital fulfillment</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 text-xs font-semibold tracking-wide text-white bg-neutral-950 hover:bg-neutral-800 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
              >
                Complete & Access Downloads
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="w-full py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
              >
                Back to Bag
              </button>
            </form>
          )}

          {checkoutStep === 'success' && completedOrder && (
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-neutral-950 mb-1">
                  Thank You, {completedOrder.customerName}!
                </h3>
                <p className="text-xs text-neutral-500">
                  Order ID: <span className="font-mono font-semibold text-neutral-800">{completedOrder.orderId}</span>
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Sent to: <span className="font-semibold text-neutral-800">{completedOrder.customerEmail}</span>
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Your Digital Downloads
                </div>

                {completedOrder.books.map((book) => (
                  <div
                    key={book.id}
                    className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold font-display text-neutral-950 truncate">
                        {book.title}
                      </h4>
                      <span className="text-[11px] text-neutral-500 block">
                        {book.format} · {book.downloadSize}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSimulateDownload(book.title, book.format)}
                      className="px-3 py-2 text-xs font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 text-xs text-amber-900 space-y-1">
                <p className="font-semibold">Lifetime Download Policy</p>
                <p className="text-amber-800/90 leading-relaxed">
                  Your downloads never expire. For questions or replacement links, contact ASHRAF directly at{' '}
                  <a href="mailto:iashraf.ltd@gmail.com" className="underline font-semibold">
                    iashraf.ltd@gmail.com
                  </a>.
                </p>
              </div>

              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="w-full py-3 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors"
              >
                Close & Return to Store
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer (Subtotal & Actions) */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-6 border-t border-neutral-100 bg-neutral-50/70 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">Subtotal</span>
              <span className="font-bold font-display text-neutral-950 tabular-nums text-lg">
                ${totals.total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 text-xs font-semibold tracking-wide text-white bg-neutral-950 hover:bg-neutral-800 rounded-xl transition-all duration-200 shadow-sm flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              Proceed to Instant Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
