import React, { useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { Ebook } from '../data/books';
import { ShoppingBag, ArrowRight, ShieldCheck, Mail, Phone, MapPin, User as UserIcon } from 'lucide-react';

interface CheckoutPageProps {
  book: Ebook;
  onBack: () => void;
  onComplete: (details: CheckoutDetails) => void;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  paymentMethod: string;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ book, onBack, onComplete }) => {
  const { user } = useAuth();
  const [details, setDetails] = useState<CheckoutDetails>({
    fullName: user?.displayName || '',
    email: user?.email || '',
    whatsapp: '',
    country: 'India',
    paymentMethod: 'razorpay'
  });
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    onComplete(details);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Summary */}
        <div className="lg:col-span-5 space-y-8">
          <button onClick={onBack} className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 hover:text-neutral-950 transition-colors">
            ← Back to Store
          </button>
          
          <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-serif font-bold text-neutral-950">Purchase Summary</h2>
            
            <div className="flex gap-4">
              <div className="w-24 aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 shadow-sm shrink-0">
                <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-serif font-bold text-neutral-950 leading-tight">{book.title}</h3>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">{book.category}</p>
                <div className="mt-4 text-xl font-serif font-bold text-neutral-950 tabular-nums">
                  ${book.price.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Digital Delivery</span>
                <span className="text-neutral-950 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-serif font-bold pt-2 border-t border-neutral-50">
                <span>Total Amount</span>
                <span>${book.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-950">Secure Transaction</p>
                <p className="text-[10px] text-neutral-500 leading-relaxed mt-1">
                  Your payment is processed securely via Razorpay. We do not store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-neutral-950 mb-8">Buyer Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <UserIcon className="w-3 h-3" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={details.fullName}
                  onChange={e => setDetails({...details, fullName: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950 text-sm transition-all"
                  placeholder="ASHRAF"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  value={details.email}
                  onChange={e => setDetails({...details, email: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950 text-sm transition-all"
                  placeholder="johndoe@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <Phone className="w-3 h-3" /> WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  value={details.whatsapp}
                  onChange={e => setDetails({...details, whatsapp: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950 text-sm transition-all"
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Country
                </label>
                <select
                  value={details.country}
                  onChange={e => setDetails({...details, country: e.target.value})}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950 text-sm transition-all appearance-none"
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-neutral-200 text-neutral-950 focus:ring-neutral-950"
                />
                <span className="text-[11px] text-neutral-500 leading-relaxed">
                  I agree to the <a href="#" className="text-neutral-950 underline decoration-neutral-200 hover:decoration-neutral-950">Terms & Conditions</a> and understand that I am purchasing a digital ebook for instant fulfillment.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!agreed}
              className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 disabled:bg-neutral-200 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg shadow-neutral-950/10 active:scale-[0.98]"
            >
              Complete Purchase <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
