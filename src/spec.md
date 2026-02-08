# Specification

## Summary
**Goal:** Use the two user-uploaded images as the default images shown on the homepage and in the popup modal.

**Planned changes:**
- Add `IMG_20260208_030749.jpg` and `image.jpg` to `frontend/public/assets/generated/` so they ship as static frontend assets in production.
- Update the homepage default/fallback couple photo to load `/assets/generated/IMG_20260208_030749.jpg` before any user selects a different image via the homepage file picker.
- Update the popup modal default/fallback image to load `/assets/generated/image.jpg` before any user selects a different image via the modal file picker.

**User-visible outcome:** On first load, the homepage displays `IMG_20260208_030749.jpg` by default, and when opening the modal it displays `image.jpg` by default; both can still be replaced using the existing image pickers.
