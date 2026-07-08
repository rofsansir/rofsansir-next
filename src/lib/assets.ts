/**
 * Asset URL resolution for large files offloaded to Cloudflare R2.
 *
 * The heavy PDFs (past papers + downloadable resources) live in the
 * `rofsansir-assets` R2 bucket, keyed exactly as their original public path
 * (e.g. `assets/past-paper/2024/3204_s24_qp_02.pdf`). They are NOT shipped with
 * the Cloudflare Pages deploy.
 *
 * Served from the custom domain `cdn.rofsansir.com` (bound to the bucket).
 * The base is baked in as a default because the URL is public + stable and the
 * repo has no committed env mechanism (`.env*` is gitignored). Override with
 * `NEXT_PUBLIC_R2_BASE` to point elsewhere, or set it to "" to fall back to the
 * local `/assets/...` path (offline dev, if the PDFs are restored to public/).
 */
const R2_BASE = (process.env.NEXT_PUBLIC_R2_BASE ?? "https://cdn.rofsansir.com")
  .replace(/\/+$/, "");

/**
 * Resolve an asset that has been offloaded to R2.
 * Accepts the leading-slash form (`/assets/...`) or the relative form
 * (`assets/...`); the R2 object key is the `assets/...` portion verbatim.
 * Path segments are percent-encoded (filenames contain spaces / Bengali chars).
 */
export function assetUrl(pathOrKey: string): string {
  const key = pathOrKey.replace(/^\/+/, ""); // -> "assets/..."
  if (!R2_BASE) return `/${key}`;
  // Encode each segment but preserve the "/" separators.
  const encoded = key.split("/").map(encodeURIComponent).join("/");
  return `${R2_BASE}/${encoded}`;
}
