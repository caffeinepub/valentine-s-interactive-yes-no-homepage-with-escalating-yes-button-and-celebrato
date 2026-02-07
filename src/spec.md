# Specification

## Summary
**Goal:** Let the homepage prompt use the correctly capitalized name, and allow users to pick and preview a custom image inside the success modal.

**Planned changes:**
- Update the homepage headline text to use “Annammooo” instead of “annammooo”, with no other wording changes.
- Add a client-side image picker/upload control to the success modal so users can select an image from their device and preview it.
- Show inline, user-friendly English errors in the success modal when a non-image file is selected, or when the image is too large/can’t be previewed.
- Keep existing success modal close behaviors (Esc, backdrop click, X) working and ensure the new modal picker does not interfere with the existing homepage image picker.

**User-visible outcome:** The homepage headline displays “Annammooo will you be my valentine”, and when the success modal appears, the user can choose an image from their device and immediately preview it in the modal (with clear inline errors for invalid/unsupported selections).
