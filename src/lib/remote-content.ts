/**
 * Homepage content that can be swapped without a code deploy: Gallery and
 * Hall of Fame read a JSON manifest from the same R2 bucket used for PDFs
 * (`assets/data/gallery.json`, `assets/data/hall-of-fame.json`). Updating a
 * manifest or its images in R2 is enough to change the site - see
 * src/data/home.ts for the fallback used when the manifest is unreachable.
 */
import { assetUrl } from "@/lib/assets";
import {
  achievers as fallbackAchievers,
  gallery as fallbackGallery,
  type Achiever,
  type GalleryItem,
} from "@/data/home";

const REVALIDATE_SECONDS = 300;

async function fetchManifest<T>(key: string): Promise<T | null> {
  try {
    const res = await fetch(assetUrl(key), {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const remote = await fetchManifest<GalleryItem[]>("assets/data/gallery.json");
  const items = Array.isArray(remote) && remote.length > 0 ? remote : fallbackGallery;
  return items.map((item) => ({ ...item, src: assetUrl(item.src) }));
}

export async function getAchievers(): Promise<Achiever[]> {
  const remote = await fetchManifest<Achiever[]>("assets/data/hall-of-fame.json");
  const items = Array.isArray(remote) && remote.length > 0 ? remote : fallbackAchievers;
  return items.map((item) => ({ ...item, image: assetUrl(item.image) }));
}
