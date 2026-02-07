# Specification

## Summary
**Goal:** Add a couple photo to the homepage’s main question card, matching the existing Valentine theme without breaking any current button interactions.

**Planned changes:**
- Add a new static image asset at `frontend/public/assets/generated/couple-photo.dim_1200x1200.jpg`.
- Update the homepage UI to render the couple photo inside the main question card with rounded corners and a subtle border/shadow consistent with the Valentine styling.
- Ensure the photo is responsive, preserves aspect ratio, stays within the card bounds, and never blocks clicks on the Yes/No buttons (including during Yes-button growth).
- Add an accessible `alt` attribute for the couple photo.

**User-visible outcome:** The homepage shows a themed couple photo within the main card alongside the existing content, while all Yes/No behaviors continue to work normally on mobile and desktop.
