# Implementation Plan — ARF Ebook Store (Full-Stack Upgrade)

Upgrade the existing ARF bookstore into a production-ready digital publishing platform with Firebase (Auth/Firestore), Razorpay payment integration, and a secure admin dashboard.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following technical choices have been aligned with your preferences:
> - **Platform**: Firebase (Firestore for data, Auth for accounts, Storage for ebooks).
> - **Payments**: Razorpay (Optimized for India).
> - **Delivery**: Secure links via email (supported for both guest and registered users).

- **Authentication Strategy**: Signup is optional. Guests can checkout using only an email and WhatsApp number.
- **Admin Access**: A dedicated `/admin` route will be protected via Firebase Security Rules and a verified admin list in Firestore.

## 1. Overview & Core Concept
ARF will transition from a static catalog to a functional e-commerce ecosystem. It maintains its boutique, editorial aesthetic while providing secure transaction flows, order tracking, and automated digital fulfillment.

- **What It Does**: Allows users to browse, purchase, and instantly download ebooks by author ASHRAF.
- **Target Audience**: Curious minds looking for high-quality independent digital publications.

## 2. User Experience & Visual Design

### Key User Flows
1. **Discovery**: Smooth scrolling through a strict 2-column grid of curated ebooks.
2. **Evaluation**: Quick-view or deep-dive modals showing chapters, excerpts, and "Buy" CTAs.
3. **Checkout**: A single-page, mobile-optimized form (Name, Email, WhatsApp) with Razorpay modal integration.
4. **Fulfillment**: Immediate post-payment success screen + automated email with a secure, expiring download link.
5. **Management (Optional)**: Logged-in users can revisit their library; Admins can manage the catalog via a dashboard.

### Visual Identity & Theme
- **Layout**: Mandatory **2-column grid** on all screens. No 1-column mobile reflow.
- **Typography**: Editorial pair — `Cormorant Garamond` (Serif) for headings and `Plus Jakarta Sans` (Sans) for functional UI.
- **Color**: Warm off-white backgrounds (`#FAF9F6`) with charcoal typography (`#141414`).
- **Components**: Compact, elegant buttons with subtle hover states.

## 3. Key Product Decisions & Trade-Offs

- **Relational Data in Firestore**:
  - *Decision*: Use a flat `orders` collection with `userId` and `bookId` references.
  - *Why*: Simplifies guest checkout (null `userId`) and enables high-performance queries for admin reports.
- **Secure File Delivery**:
  - *Decision*: Ebooks are stored in **Private Firebase Storage**.
  - *Chosen Approach*: Backend proxy route generates a signed URL only after verifying `paymentStatus === 'paid'` in Firestore.
- **Payment Verification**:
  - *Chosen Approach*: Two-step verification (Synchronous Frontend Callback + Asynchronous Webhook).
  - *Why*: Ensures orders are marked paid even if the user closes their browser prematurely.

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram
```
┌──────────────────────┐      ┌────────────────────────┐      ┌─────────────────────┐
│    React Frontend    │      │    Express Backend     │      │   Razorpay API      │
│ (Vite + Tailwind 4)  │◀────▶│ (Firebase Admin SDK)   │◀────▶│ (Order / Payment)   │
└──────────────────────┘      └────────────────────────┘      └─────────────────────┘
           │                             │                               ▲
           ▼                             ▼                               │
┌────────────────────────────────────────────────────────┐               │
│               Firebase Cloud Infrastructure            │───────────────┘
│  (Auth / Firestore / Private Storage / Security Rules)  │
└────────────────────────────────────────────────────────┘
```

### Data Model & State
- **Collections**:
  - `books`: Title, description, price, coverUrl, fileLocation, isPublished.
  - `users`: Profile data, registeredDate, roles (admin/buyer).
  - `orders`: OrderId, buyerInfo (Email, WhatsApp), bookId, amount, status (pending/paid), razorpayOrderId, token.

### Interaction Mapping
- **Guest Flow**: User inputs data $\to$ Backend creates Razorpay Order $\to$ Checkout Modal $\to$ Webhook marks Paid $\to$ Email Triggered.
- **Admin Flow**: Login $\to$ Identity Verification (Rules) $\to$ CRUD operations on `books` collection $\to$ Storage upload for PDFs.

## 5. Security & Compliance
- **PII Isolation**: Customer WhatsApp and Email stored in restricted Firestore documents accessible only by the customer or Admin.
- **Payment Safety**: No card/banking details touch our servers. All sensitive data stays within Razorpay's PCI-compliant environment.
- **Download Protection**: Signed URLs with short TTL (Time To Live) prevent public link sharing of purchased books.
