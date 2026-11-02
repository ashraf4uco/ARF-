import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AUTHOR_DETAILS } from '../data/books';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-[#141414] text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800/80 items-start">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-serif font-bold text-white tracking-wider">
                ARF
              </span>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                · Digital Bookstore
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
              Curated digital publications crafted to inspire creativity, expand knowledge, and spark new ideas. Independent works published by ASHRAF.
            </p>
            <div className="pt-2 text-xs">
              <span className="text-neutral-500 block mb-1">Direct Correspondence</span>
              <a
                href={`mailto:${AUTHOR_DETAILS.email}`}
                className="text-neutral-200 hover:text-white transition-colors underline"
              >
                {AUTHOR_DETAILS.email}
              </a>
            </div>
          </div>

          {/* About & Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400 block mb-3">
              About & Explore
            </span>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Explore Books
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About the Author
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Channels */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400 block mb-3">
              Social Media & Profiles
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {AUTHOR_DETAILS.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>{social.name}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Legal Policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <div>
            © {new Date().getFullYear()} ARF Bookstore. All rights reserved. Author: ASHRAF.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-neutral-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-neutral-300 transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
