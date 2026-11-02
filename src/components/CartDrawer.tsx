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
  onCheckout: (book: Ebook) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  catalog,
  onRemoveItem,
  onClearCart,
  onCheckout
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
      setError('Provide a valid email.');
      return;
    }

    const order = generateOrderConfirmation(items, catalog, email, customerName);
    setCompletedOrder(order);
    setCheckoutStep('success');
    onClearCart();
  };

  const handleSimulateDownload = (title: string, format: string) => {
    const content = `====================================\nARF EBOOK STORE\nTitle: ${title}\nEdition: DRM-Free ${format}\n====================================`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_arf.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-neutral-950/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-sm bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between border-l border-neutral-200 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200/60 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-neutral-900" />
            <h2 className="text-base font-serif font-bold text-neutral-950">
              {checkoutStep === 'cart' && `Bag (${totals.itemCount})`}
              {checkoutStep === 'checkout' && 'Checkout'}
              {checkoutStep === 'success' && 'Success'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors">
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {checkoutStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Empty Bag</p>
                  <button onClick={onClose} className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-900 bg-white border border-neutral-200 rounded-full hover:border-neutral-950">Browse Titles</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => {
                    const book = catalog.find((b) => b.id === item.bookId);
                    if (!book) return null;
                    return (
                      <div key={item.bookId} className="flex gap-4 p-3 bg-white rounded-xl border border-neutral-100 items-center justify-between shadow-xs">
                        <img src={book.coverImage} alt={book.title} className="w-12 aspect-[3/4] object-cover rounded-md bg-neutral-200 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[13px] font-serif font-bold text-neutral-950 truncate">{book.title}</h4>
                          <span className="text-[10px] text-neutral-400 block tabular-nums">${book.price.toFixed(2)}</span>
                        </div>
                        <button onClick={() => onRemoveItem(item.bookId)} className="p-1.5 text-neutral-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors shrink-0">
                          <Trash2 className="w-3.5 h-3.5" />
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
              {error && <p className="p-2 text-[10px] text-rose-600 bg-rose-50 border border-rose-100 rounded-lg">{error}</p>}
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Email for Delivery</label>
                  <input
                    id="checkout-delivery-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-950 transition-all"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-white bg-neutral-950 hover:bg-neutral-800 rounded-full transition-all flex items-center justify-center gap-2">
                Complete Order <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button type="button" onClick={() => setCheckoutStep('cart')} className="w-full py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-950">Back</button>
            </form>
          )}

          {checkoutStep === 'success' && completedOrder && (
            <div className="space-y-6 text-center py-6">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-neutral-950">Thank You.</h3>
              <p className="text-xs text-neutral-500">Order <span className="font-mono">{completedOrder.orderId}</span> is ready.</p>
              <div className="space-y-2 pt-2">
                {completedOrder.books.map((book) => (
                  <div key={book.id} className="p-3 bg-white rounded-xl border border-neutral-100 flex items-center justify-between gap-3 shadow-xs">
                    <span className="text-[12px] font-serif font-bold text-neutral-950 truncate flex-1 text-left">{book.title}</span>
                    <button onClick={() => handleSimulateDownload(book.title, book.format)} className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white bg-neutral-950 hover:bg-neutral-800 rounded-md transition-colors flex items-center gap-1.5 shrink-0">
                      <Download className="w-3 h-3" /> Download
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => { setCheckoutStep('cart'); onClose(); }} className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-900 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors">Close</button>
            </div>
          )}
        </div>

        {/* Footer */}
        {checkoutStep === 'cart' && items.length > 0 && (
          <div className="p-5 border-t border-neutral-200/60 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">Total</span>
              <span className="text-lg font-serif font-bold text-neutral-950 tabular-nums">${totals.total.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => {
                const book = catalog.find(b => b.id === items[0].bookId);
                if (book) onCheckout(book);
              }} 
              className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-white bg-neutral-950 hover:bg-neutral-800 rounded-full transition-all flex items-center justify-center gap-2"
            >
              Checkout <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
