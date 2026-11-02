import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotals,
  filterBooks,
  validateEmail,
  generateOrderConfirmation
} from './ebookStore';
import { INITIAL_BOOKS } from '../data/books';

test('calculateCartTotals computes subtotal and total accurately', () => {
  const items = [
    { bookId: 'the-art-of-focus', quantity: 1 }, // 18.00
    { bookId: 'digital-craftsmanship', quantity: 2 } // 22.00 * 2 = 44.00
  ];
  const totals = calculateCartTotals(items, INITIAL_BOOKS);

  assert.equal(totals.itemCount, 3);
  assert.equal(totals.subtotal, 62.0);
  assert.equal(totals.discount, 0);
  assert.equal(totals.total, 62.0);
});

test('calculateCartTotals handles percentage discounts cleanly', () => {
  const items = [{ bookId: 'the-art-of-focus', quantity: 1 }]; // 18.00
  const totals = calculateCartTotals(items, INITIAL_BOOKS, 10); // 10% off

  assert.equal(totals.subtotal, 18.0);
  assert.equal(totals.discount, 1.8);
  assert.equal(totals.total, 16.2);
});

test('filterBooks filters by keyword query and category', () => {
  const queryResult = filterBooks(INITIAL_BOOKS, 'craftsmanship');
  assert.equal(queryResult.length, 1);
  assert.equal(queryResult[0].id, 'digital-craftsmanship');

  const categoryResult = filterBooks(INITIAL_BOOKS, '', 'Mindset');
  assert.equal(categoryResult.length, 1);
  assert.equal(categoryResult[0].id, 'the-art-of-focus');

  const allResult = filterBooks(INITIAL_BOOKS, '');
  assert.equal(allResult.length, 4);
});

test('validateEmail validates format strictly', () => {
  assert.equal(validateEmail('iashraf.ltd@gmail.com'), true);
  assert.equal(validateEmail('user@domain.co'), true);
  assert.equal(validateEmail('notanemail'), false);
  assert.equal(validateEmail(''), false);
  assert.equal(validateEmail('user@'), false);
});

test('generateOrderConfirmation produces complete order model with downloads', () => {
  const items = [{ bookId: 'the-minimalist-creator', quantity: 1 }];
  const confirmation = generateOrderConfirmation(
    items,
    INITIAL_BOOKS,
    'reader@example.com',
    'Ahmad'
  );

  assert.match(confirmation.orderId, /^ARF-2026-[A-Z0-9]+$/);
  assert.equal(confirmation.customerEmail, 'reader@example.com');
  assert.equal(confirmation.books.length, 1);
  assert.equal(confirmation.downloadLinks.length, 1);
  assert.equal(confirmation.downloadLinks[0].bookId, 'the-minimalist-creator');
});
