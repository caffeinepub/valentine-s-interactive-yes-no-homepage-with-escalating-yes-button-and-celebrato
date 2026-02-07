# Specification

## Summary
**Goal:** Build a single-page Valentine-themed homepage with a Yes/No prompt where “No” escalates the “Yes” button size and “Yes” opens a celebratory modal with an image and note.

**Planned changes:**
- Create a responsive single-page layout showing the exact question text: “annammooo will you be my valentine” with “Yes” and “No” buttons.
- Implement “No” click behavior: show an English try-again message and progressively increase the “Yes” button size on each click until the “No” button becomes effectively hidden/unclickable; reset on refresh.
- Implement “Yes” click behavior: open a dismissible modal overlay containing a custom static image and the exact provided note text (with the line break).
- Apply a cohesive Valentine-themed visual design across page, buttons, message, and modal (avoid blue/purple as primary colors).
- Add the generated image under `frontend/public/assets/generated/` and reference it via a static path in the modal.

**User-visible outcome:** Visitors see the Valentine question with Yes/No buttons; clicking “No” repeatedly makes “Yes” grow while showing a try-again message, and clicking “Yes” shows a themed popup with an illustration and the love note.
