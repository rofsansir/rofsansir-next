/**
 * Homepage content that can be swapped without a code deploy.
 *
 * Gallery, Hall of Fame, Videos, and Past Papers read live PUBLISHED entries
 * from the Revolop Institute dynamic-form engine (api.rofsansir.com's
 * admin-managed forms) - edit them via the revolopinstitute-admin dashboard,
 * no code deploy needed. Past papers' PDFs stay in the existing R2 bucket
 * (referenced by storage key, not re-uploaded) since they were already
 * hosted there. Tips still read the older R2-hosted JSON manifest and keep
 * a fallback (see getTipArticles) - it isn't dynamic-form-backed.
 *
 * Gallery, Hall of Fame, Videos, and Past Papers show nothing rather than
 * substituting old static content when the live source is unreachable or
 * has no published entries - showing stale placeholder photos/names/papers
 * as if they were real would be misleading.
 */
import { assetUrl } from "@/lib/assets";
import type { Achiever, GalleryItem } from "@/data/home";
import type { Video } from "@/data/videos";
import type { PastPaper } from "@/data/past-papers";
import { fallbackTipArticles, type TipArticle } from "@/data/tip-articles";
import { estimateReadTime } from "@/lib/text";

const REVALIDATE_SECONDS = 300;

const DYNAMIC_FORMS_API = (
  process.env.NEXT_PUBLIC_DYNAMIC_FORMS_API ?? "https://api.rofsansir.com"
).replace(/\/+$/, "");

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

type DynamicFormValue<T> = {
  publicId: string;
  displayOrder: number;
  values: T;
};

/** PUBLISHED entries of a dynamic form, sorted by admin-set display order. */
async function fetchDynamicFormValues<T>(
  formKey: string,
): Promise<DynamicFormValue<T>[] | null> {
  try {
    const res = await fetch(
      `${DYNAMIC_FORMS_API}/api/public/dynamic-forms/${formKey}`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as DynamicFormValue<T>[];
    if (!Array.isArray(data)) return null;
    return data.slice().sort((a, b) => a.displayOrder - b.displayOrder);
  } catch {
    return null;
  }
}

/** IMAGE/FILE field values come back either as an absolute URL or a path relative to the API host. */
function resolveDynamicFormAsset(pathOrUrl: string): string {
  if (/^(https?:|data:|blob:)/i.test(pathOrUrl)) return pathOrUrl;
  return `${DYNAMIC_FORMS_API}/${pathOrUrl.replace(/^\/+/, "")}`;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const entries = await fetchDynamicFormValues<{ photo: string; title: string }>(
    "gallery",
  );
  if (!entries) return [];
  return entries.map((e) => ({
    src: resolveDynamicFormAsset(e.values.photo),
    alt: e.values.title,
    title: e.values.title,
  }));
}

export async function getAchievers(): Promise<Achiever[]> {
  const entries = await fetchDynamicFormValues<{
    name: string;
    grade: string;
    meta: string;
    image: string;
  }>("hall-of-fame");
  if (!entries) return [];
  return entries.map((e) => ({
    name: e.values.name,
    grade: e.values.grade,
    meta: e.values.meta,
    image: resolveDynamicFormAsset(e.values.image),
  }));
}

export async function getVideos(): Promise<Video[]> {
  const entries = await fetchDynamicFormValues<{
    videoId: string;
    title: string;
    duration: string;
    category: string;
  }>("videos");
  if (!entries) return [];
  return entries.map((e, i) => ({ id: String(i + 1), ...e.values }));
}

export async function getPastPapers(): Promise<PastPaper[]> {
  const entries = await fetchDynamicFormValues<{
    title: string;
    slug: string;
    year: number;
    session: string;
    paperType: string;
    description: string;
    fileSize: number;
    file: string;
  }>("past-papers");
  if (!entries) return [];

  return entries
    .map((e, i) => ({
      id: i,
      title: e.values.title,
      slug: e.values.slug,
      year: e.values.year,
      session: e.values.session || null,
      paperType: e.values.paperType,
      fileName: e.values.file.split("/").pop() ?? "",
      filePath: e.values.file,
      url: resolveDynamicFormAsset(e.values.file),
      fileSize: e.values.fileSize,
      description: e.values.description,
      metaKeywords: "",
      downloadCount: 0,
      viewCount: 0,
      isActive: 1,
    }))
    .sort((a, b) => b.year - a.year || a.paperType.localeCompare(b.paperType));
}

export async function getTipArticles(): Promise<(TipArticle & { readTime: string })[]> {
  const remote = await fetchManifest<TipArticle[]>("assets/data/tips.json");
  const raw = Array.isArray(remote) && remote.length > 0 ? remote : fallbackTipArticles;
  return raw
    .filter((a) => a.isActive === 1)
    .map((a) => ({ ...a, thumb: assetUrl(a.thumb), readTime: estimateReadTime(a.contentHtml) }));
}
