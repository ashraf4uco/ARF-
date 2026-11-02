import React, { useEffect } from 'react';
import { X, Shield } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-white">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-neutral-900" />
            <h3 id="legal-modal-title" className="text-base font-bold font-display text-neutral-950">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Effective Date:</strong> January 2026
              </p>
              <h4 className="font-bold text-neutral-900 text-sm">1. Digital Privacy Commitment</h4>
              <p>
                ARF and author ASHRAF respect your privacy. We only collect the minimal contact details (such as email address) strictly necessary to deliver digital publications, invoices, and customer support.
              </p>
              <h4 className="font-bold text-neutral-900 text-sm">2. Data Usage & Protection</h4>
              <p>
                We do not sell, rent, or trade your personal email address or reading information to any third party. Your information is securely handled exclusively for DRM-free ebook fulfillment and communication regarding your purchase.
              </p>
              <h4 className="font-bold text-neutral-900 text-sm">3. Inquiries</h4>
              <p>
                For any privacy questions or data deletion requests, email us directly at <a href="mailto:iashraf.ltd@gmail.com" className="text-neutral-950 underline font-semibold">iashraf.ltd@gmail.com</a>.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Effective Date:</strong> January 2026
              </p>
              <h4 className="font-bold text-neutral-900 text-sm">1. Licensing & Ownership</h4>
              <p>
                All ebooks published under ARF are the intellectual property of ASHRAF. When purchasing an ebook, you are granted a personal, non-exclusive, DRM-free license to read and store the files on your devices.
              </p>
              <h4 className="font-bold text-neutral-900 text-sm">2. Non-Redistribution</h4>
              <p>
                You may not publicly redistribute, resell, re-host, or sub-license the ebook files or chapters without explicit written permission from ASHRAF.
              </p>
              <h4 className="font-bold text-neutral-900 text-sm">3. Refund Policy & Replacements</h4>
              <p>
                Because our publications are instant digital downloads, standard returns are handled on a case-by-case basis. If you experience technical formatting issues, contact <a href="mailto:iashraf.ltd@gmail.com" className="text-neutral-950 underline font-semibold">iashraf.ltd@gmail.com</a> for immediate replacement or full resolution.
              </p>
            </>
          )}
        </div>

        <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-neutral-950 rounded-full hover:bg-neutral-800 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
