/**
 * Build a deployment-safe public asset URL that works with any base path.
 * Uses Vite's BASE_URL to ensure assets resolve correctly in production.
 * 
 * @param path - Relative path from the public directory (e.g., 'assets/generated/image.jpg')
 * @returns Full URL to the asset
 */
export function getAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure base ends with slash
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}
