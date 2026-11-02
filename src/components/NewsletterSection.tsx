import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';
import { validateEmail } from '../utils/ebookStore';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Provide a valid email.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF9F6] border-t border-neutral-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
        <div className="bg-white rounded-3xl border border-neutral-200/70 p-8 sm:p-14 shadow-xs">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
            <Mail className="w-3.5 h-3.5" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-normal text-neutral-950 tracking-tight mb-3">
            Stay Inspired.
          </h2>

          <p className="text-sm sm:text-base text-neutral-500 font-light max-w-sm mx-auto mb-6 leading-relaxed">
            Get updates about new ebooks, ideas, and releases.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-50 border border-neutral-100 text-neutral-900 rounded-full text-[11px] font-semibold uppercase tracking-wider">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Joined successfully</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-xs sm:max-w-md mx-auto space-y-3">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address..."
                  className="w-full pl-4 pr-24 py-2.5 text-[12px] text-neutral-900 bg-neutral-50/50 border border-neutral-200 rounded-full focus:outline-none focus:ring-1 focus:ring-neutral-950 transition-all placeholder:text-neutral-400"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-4 text-[10px] font-bold uppercase tracking-widest text-white bg-neutral-950 hover:bg-neutral-800 rounded-full transition-all active:scale-95"
                >
                  Join
                </button>
              </div>

              {error && (
                <p className="text-[10px] text-rose-600 font-medium">{error}</p>
              )}

              <p className="text-[9px] text-neutral-300 font-medium uppercase tracking-[0.05em]">
                Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
