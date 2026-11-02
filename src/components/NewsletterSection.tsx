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
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF9F6] border-t border-neutral-200/60">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-14 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-700">
            <Mail className="w-4 h-4" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-950 tracking-tight mb-3">
            Stay Inspired.
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 font-light max-w-md mx-auto mb-8 leading-relaxed">
            Get updates about new ebooks, ideas, and releases.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-neutral-50 border border-neutral-200 text-neutral-900 rounded-full text-xs font-medium">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>You're subscribed! We will notify you when new titles release.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-3">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-5 pr-32 py-3.5 text-xs text-neutral-900 bg-neutral-50/70 border border-neutral-300 rounded-full focus:outline-none focus:ring-1 focus:ring-neutral-950 focus:border-neutral-950 transition-all placeholder:text-neutral-400"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-950 hover:bg-neutral-800 rounded-full transition-all duration-200 shadow-xs inline-flex items-center gap-1.5"
                >
                  Join
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {error && (
                <p className="text-xs text-rose-600 mt-2">{error}</p>
              )}

              <p className="text-[11px] text-neutral-400 font-light">
                No spam. Unsubscribe at any time with one click.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
