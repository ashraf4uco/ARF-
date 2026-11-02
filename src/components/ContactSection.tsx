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
      setError('Provide a valid email.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter your message.');
      return;
    }

    setError('');
    setSent(true);

    const subject = encodeURIComponent(`Inquiry from ${name} via ARF Ebook Store`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Left Column */}
          <div className="md:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400 mb-2">
              Direct Contact
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal tracking-tight text-neutral-950 mb-4">
              Get in Touch
            </h2>
            <p className="text-sm text-neutral-500 font-light leading-relaxed mb-6">
              Have questions about any of the ebooks, bulk licensing, editorial inquiries, or creative collaborations? Reach out directly.
            </p>

            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 mb-6">
              <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                Primary Email
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${emailAddress}`}
                  className="text-xs font-semibold text-neutral-900 hover:underline break-all"
                >
                  {emailAddress}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-200/40 rounded-lg transition-colors shrink-0"
                  aria-label="Copy"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7 bg-neutral-50/50 p-6 sm:p-8 rounded-3xl border border-neutral-200/60">
            {sent ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-10 h-10 bg-neutral-950 text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-serif text-neutral-950">
                  Message Prepared
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Your email client has been opened.
                </p>
                <button
                  onClick={() => { setSent(false); setMessage(''); }}
                  className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-800 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-neutral-950 mb-1">
                  Send a Quick Note
                </h3>

                {error && (
                  <div className="p-3 text-[10px] text-rose-700 bg-rose-50 border border-rose-100 rounded-xl">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-2 text-[12px] bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950 transition-all placeholder:text-neutral-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      className="w-full px-4 py-2 text-[12px] bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950 transition-all placeholder:text-neutral-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    className="w-full px-4 py-2 text-[12px] bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-950 transition-all placeholder:text-neutral-300 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white bg-neutral-950 hover:bg-neutral-800 rounded-full transition-all shadow-sm active:scale-95 inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-3 h-3" />
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
