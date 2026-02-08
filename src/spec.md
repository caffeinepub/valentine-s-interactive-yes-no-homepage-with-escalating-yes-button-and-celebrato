# Specification

## Summary
**Goal:** Show only one photo on the homepage and move the secondary static photo into the “Yes” success popup modal.

**Planned changes:**
- Update `frontend/src/App.tsx` to render exactly one photo on the homepage (the existing file picker/preview photo) and remove the secondary static photo currently shown from `getAssetUrl('assets/image-2.jpg')`.
- Adjust the homepage layout as needed to remain visually balanced without affecting the Yes/No interaction or the Yes-button growth behavior.
- Update `frontend/src/components/ValentineModal.tsx` so the modal’s default image (shown after clicking “Yes”) uses the secondary static photo that was removed from the homepage, while preserving the modal’s existing image picker/preview, validation, and inline error handling.
- Ensure default static image URLs continue to be built via `getAssetUrl(...)` (no absolute root paths).

**User-visible outcome:** The homepage shows only one picture (the one tied to the homepage image picker). After clicking “Yes,” the success popup opens and shows the other static photo by default, with the option to pick and preview a different image in the modal.
