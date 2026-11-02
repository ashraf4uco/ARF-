import { Ebook } from '../data/books';

export interface CartItem {
  bookId: string;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
}

export function calculateCartTotals(
  items: CartItem[],
  catalog: Ebook[],
  discountPercent = 0
): CartTotals {
  let subtotal = 0;
  let itemCount = 0;

  for (const item of items) {
    const book = catalog.find((b) => b.id === item.bookId);
    if (book) {
      const qty = Math.max(1, Math.floor(item.quantity));
      subtotal += book.price * qty;
      itemCount += qty;
    }
  }

  // Rounded to 2 decimals
  subtotal = Math.round(subtotal * 100) / 100;
  const discount = Math.round((subtotal * (discountPercent / 100)) * 100) / 100;
  const total = Math.max(0, Math.round((subtotal - discount) * 100) / 100);

  return {
    subtotal,
    discount,
    total,
    itemCount
  };
}

export function filterBooks(
  catalog: Ebook[],
  searchQuery: string,
  selectedCategory = 'all'
): Ebook[] {
  const query = searchQuery.trim().toLowerCase();

  return catalog.filter((book) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      book.category.toLowerCase().includes(selectedCategory.toLowerCase());

    if (!matchesCategory) return false;

    if (!query) return true;

    return (
      book.title.toLowerCase().includes(query) ||
      book.subtitle.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query) ||
      book.chapters.some((c) => c.toLowerCase().includes(query))
    );
  });
}

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
}

export function generateOrderConfirmation(
  items: CartItem[],
  catalog: Ebook[],
  customerEmail: string,
  customerName?: string
) {
  const totals = calculateCartTotals(items, catalog);
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  const orderId = `ARF-${new Date().getFullYear()}-${randomSuffix}`;
  const orderedBooks = items
    .map((item) => catalog.find((b) => b.id === item.bookId))
    .filter((b): b is Ebook => b !== undefined);

  return {
    orderId,
    timestamp: new Date().toISOString(),
    customerEmail: customerEmail.trim(),
    customerName: customerName?.trim() || 'Valued Reader',
    books: orderedBooks,
    totals,
    downloadLinks: orderedBooks.map((b) => ({
      bookId: b.id,
      title: b.title,
      format: b.format,
      downloadUrl: `#download-${b.id}`
    }))
  };
}
