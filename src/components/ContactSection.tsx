import React, { useState } from 'react';
import { Mail, Check, Copy, Send } from 'lucide-react';
import { validateEmail } from '../utils/ebookStore';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const emailAddress = 'iashraf.ltd@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter your message.');
      return;
    }

    setError('');
    setSent(true);

    // Also trigger mailto draft
    const subject = encodeURIComponent(`Inquiry from ${name} via ARF Ebook Store`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries info */}
          <div className="md:col-span-5">
            <div className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-2">
              Direct Contact
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-neutral-950 mb-4">
              Get in Touch
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              Have questions about any of the ebooks, bulk licensing, editorial inquiries, or creative collaborations? Reach out directly to ASHRAF.
            </p>

            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200/80 mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                Primary Contact Address
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${emailAddress}`}
                  className="text-sm font-semibold text-neutral-900 hover:underline break-all"
                >
                  {emailAddress}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200/60 rounded-lg transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <span className="text-[11px] text-emerald-600 font-medium block mt-1">
                  Email copied to clipboard!
                </span>
              )}
            </div>

            <div className="text-xs text-neutral-500 space-y-1">
              <p>• Typical response time: Within 24-48 business hours.</p>
              <p>• All ebooks include direct digital reader support.</p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="md:col-span-7 bg-neutral-50/70 p-6 sm:p-8 rounded-3xl border border-neutral-200/80">
            {sent ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-neutral-950 text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-neutral-950">
                  Message Prepared
                </h3>
                <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                  Your email client has been opened with your inquiry addressed to <span className="font-semibold text-neutral-900">{emailAddress}</span>.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setMessage('');
                  }}
                  className="px-5 py-2 text-xs font-semibold text-neutral-800 bg-white border border-neutral-200 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold font-display text-neutral-950 mb-1">
                  Send a Quick Note
                </h3>

                {error && (
                  <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-neutral-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hello ASHRAF, I wanted to ask about..."
                    className="w-full px-4 py-2.5 text-sm bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-all placeholder:text-neutral-400 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-semibold tracking-wide text-white bg-neutral-950 hover:bg-neutral-800 rounded-xl transition-all duration-200 shadow-sm active:scale-[0.99]"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
