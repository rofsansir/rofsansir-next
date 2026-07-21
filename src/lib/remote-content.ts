/**
 * Homepage content that can be swapped without a code deploy.
 *
 * Gallery, Hall of Fame, Videos, Past Papers, and Examiner Tips all read live
 * PUBLISHED entries from the Revolop Institute dynamic-form engine
 * (api.rofsansir.com's admin-managed forms) - edit them via the
 * revolopinstitute-admin dashboard, no code deploy needed. Past papers' PDFs
 * stay in the existing R2 bucket (referenced by storage key, not
 * re-uploaded) since they were already hosted there.
 *
 * All five show nothing rather than substituting old static content when the
 * live source is unreachable or has no published entries - showing stale
 * placeholder photos/names/articles as if they were real would be
 * misleading. Examiner Tips used to be the exception (a bundled static-JSON
 * fallback, migrated onto the dynamic-form engine - see
 * plan/examiner-tips-dynamic-form-migration.md in revolop-institute-workspace);
 * once the migration was verified live, that fallback was removed.
 */
import type { Achiever, GalleryItem } from "@/data/home";
import type { Video } from "@/data/videos";
import type { PastPaper } from "@/data/past-papers";
import type { TipArticle } from "@/data/tip-articles";
import { estimateReadTime } from "@/lib/text";

const REVALIDATE_SECONDS = 300;

const DYNAMIC_FORMS_API = (
  process.env.NEXT_PUBLIC_DYNAMIC_FORMS_API ?? "https://api.rofsansir.com"
).replace(/\/+$/, "");

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
  const dynamicEntries = await fetchDynamicFormValues<{
    title: string;
    ogTitle?: string;
    subtitle?: string;
    category: string;
    contentHtml: string;
    thumb: string;
    slug: string;
  }>("examiner-tips");
  if (!dynamicEntries) return [];

  return dynamicEntries.map((e, i) => ({
    id: i + 1,
    slug: e.values.slug,
    title: e.values.title,
    ogTitle: e.values.ogTitle || e.values.title,
    subtitle: e.values.subtitle ?? "",
    category: e.values.category,
    contentHtml: e.values.contentHtml,
    thumb: resolveDynamicFormAsset(e.values.thumb),
    isActive: 1,
    readTime: estimateReadTime(e.values.contentHtml),
  }));
}
