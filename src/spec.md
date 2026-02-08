# Specification

## Summary
**Goal:** Add the newly uploaded photos to public frontend assets and update the homepage to display them using deployment-safe asset URLs.

**Planned changes:**
- Add `IMG_20260208_030749-3.jpg` and `image-1.jpg` to `frontend/public/assets/generated/` with the exact same filenames.
- Update `frontend/src/App.tsx` to load the main default couple photo from `getAssetUrl('assets/generated/IMG_20260208_030749-3.jpg')` before any user file selection.
- Render `image-1.jpg` on the homepage as an additional visible photo element, loaded via `getAssetUrl('assets/generated/image-1.jpg')`, positioned so it does not overlap or block the Yes/No buttons (including when the Yes button scales after multiple No clicks).

**User-visible outcome:** The homepage shows the new uploaded couple photo by default and also displays a second photo, with all existing Yes/No interactions continuing to work normally.
