/**
 * R2-backed manifest read/write. Mirrors the GalleryItem/Achiever shapes in
 * the Next.js repo's src/data/home.ts, since these JSON files are what
 * src/lib/remote-content.ts fetches on the live site.
 */

export type GalleryItem = { src: string; alt: string };

export type Achiever = {
  name: string;
  meta: string;
  grade: string;
  image: string;
};

export const GALLERY_KEY = "assets/data/gallery.json";
export const HALL_OF_FAME_KEY = "assets/data/hall-of-fame.json";

export async function getManifest<T>(bucket: R2Bucket, key: string): Promise<T[]> {
  const obj = await bucket.get(key);
  if (!obj) return [];
  try {
    const data = await obj.json<T[]>();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function putManifest<T>(bucket: R2Bucket, key: string, items: T[]): Promise<void> {
  await bucket.put(key, JSON.stringify(items, null, 2), {
    httpMetadata: { contentType: "application/json" },
  });
}

/** Strip anything that isn't safe in an R2 key / URL path segment. */
export function sanitizeFilename(name: string): string {
  const trimmed = name.trim().replace(/\s+/g, "-");
  return trimmed.replace(/[^a-zA-Z0-9._-]/g, "") || "file";
}
