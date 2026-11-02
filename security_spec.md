# ARF Ebook Store Security Specification

## Data Invariants
1. A book's price cannot be negative.
2. An order must reference a valid book.
3. Only admins can create or modify books.
4. Users can only read their own orders (matched by UID or secure token).
5. Payment status can only be updated to 'paid' via authorized backend verification.

## The Dirty Dozen Payloads

1. **Price Manipulation**: Attempt to create a book with a negative price.
2. **Unauthorized Book Edit**: Attempt to update a book price as a guest.
3. **Identity Spoofing**: Attempt to create an order for another user's ID.
4. **Token Injection**: Attempt to create an order with a pre-set 'paid' status.
5. **PII Leak**: Attempt to list all orders in the database.
6. **Admin Escalation**: Attempt to add oneself to the `/admins` collection.
7. **Orphaned Order**: Create an order for a non-existent book ID.
8. **Malicious Metadata**: Inject a 2MB string into the book description.
9. **Status Shortcut**: Update a 'pending' order to 'paid' directly via client SDK.
10. **Book Deletion**: Attempt to delete a book as a standard user.
11. **ID Poisoning**: Use `../../auth/users` as a book ID to probe rules.
12. **Guest Order Scraping**: Attempt to fetch a guest order without a valid token.

## Test Strategy
- Verify that admin operations are blocked for non-admins.
- Verify that `isOwner` and `hasToken` gates function correctly for orders.
- Ensure validation helpers enforce `maxLength` and `type` safety.
