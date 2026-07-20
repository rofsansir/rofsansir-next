#!/usr/bin/env node
/**
 * One-off migration: creates the "examiner-tips" dynamic form (revolopinstitute-admin's
 * generic content-type builder, api.rofsansir.com) and populates it with the 8 articles
 * currently bundled as static fallback data (src/data/tip-articles.json), so
 * getTipArticles() in src/lib/remote-content.ts can read them from the admin-managed
 * source instead - see that file's docstring for the fallback chain this replaces.
 *
 * Run yourself, not by an agent - reads admin credentials from your own shell env so
 * no password ever needs to be typed into or seen by anything else:
 *
 *   ADMIN_IDENTIFIER=... ADMIN_PASSWORD=... node scripts/migrate-tips-to-dynamic-form.mjs
 *
 * Safe to re-run: every step checks for an already-existing form/field/entry first and
 * skips it rather than erroring or duplicating.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const API_BASE = (process.env.API_BASE ?? "https://api.rofsansir.com").replace(/\/+$/, "");
const FORM_KEY = "examiner-tips";

const IDENTIFIER = process.env.ADMIN_IDENTIFIER;
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!IDENTIFIER || !PASSWORD) {
  console.error("Set ADMIN_IDENTIFIER and ADMIN_PASSWORD in your shell before running this.");
  process.exit(1);
}

// --- Reconstruct the same derived article shape tip-articles.ts produces, without
// needing a TS runner for this one-off script - keep in sync with that file if it changes. ---

/** @type {Record<number, string>} */
const slugById = {
  1: "problems-without-o-level-bangla",
  2: "academic-career-impact-of-o-level-bangla",
  3: "how-o-level-bangla-improves-english",
  4: "common-parent-myths-o-level-bangla",
  5: "when-to-start-o-level-bangla",
  6: "why-students-lose-marks",
  7: "how-to-prepare-paper-01",
  8: "how-to-prepare-paper-02",
};

/** @type {Record<number, string>} */
const ogTitleById = {
  1: "What Happens If You Don't Take O Level Bangla?",
  2: "The Academic & Career Cost of Skipping O Level Bangla",
};

/** @type {Record<number, string>} */
const categoryById = {
  1: "Parents",
  2: "Parents",
  3: "Students",
  4: "Parents",
  5: "Students",
  6: "Examiner Insight",
  7: "Paper 1",
  8: "Paper 2",
};

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function loadArticles() {
  const raw = JSON.parse(await readFile(path.join(ROOT, "src/data/tip-articles.json"), "utf8"));
  return raw.map((a) => ({
    id: a.id,
    slug: slugById[a.id] ?? `article-${a.id}`,
    title: a.title,
    ogTitle: ogTitleById[a.id] ?? a.title,
    subtitle: a.subtitle,
    category: categoryById[a.id] ?? "General",
    contentHtml: a.content.map((p) => `<p>${escapeHtml(p)}</p>`).join(""),
    thumbPath: path.join(ROOT, "public/assets/tips", `${a.id}.jpg`),
  }));
}

// --- API helpers ---

async function login() {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: IDENTIFIER, password: PASSWORD }),
  });
  if (!res.ok) {
    throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  }
  const { token } = await res.json();
  return token;
}

function authedFetch(token) {
  return async (pathname, options = {}) => {
    const res = await fetch(`${API_BASE}${pathname}`, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` },
    });
    return res;
  };
}

async function ensureForm(call) {
  const existing = await call(`/api/admin/dynamic-forms/${FORM_KEY}`);
  if (existing.ok) {
    console.log(`Form "${FORM_KEY}" already exists - reusing it.`);
    return existing.json();
  }
  console.log(`Creating form "${FORM_KEY}"...`);
  const res = await call("/api/admin/dynamic-forms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: FORM_KEY,
      title: "Examiner Tips",
      description: "Long-form articles behind the Examiner Tips page on rofsansir.com.",
      active: true,
      menuPath: "Content/Examiner Tips",
    }),
  });
  if (!res.ok) throw new Error(`Create form failed: ${res.status} ${await res.text()}`);
  return res.json();
}

const FIELD_DEFS = [
  { key: "title", label: "Title", fieldType: "TEXT", required: true },
  { key: "ogTitle", label: "OG Title (English)", fieldType: "TEXT", required: false, helpText: "Used for the share-card image when the real title has no Latin glyphs (e.g. Bengali). Falls back to Title if left blank." },
  { key: "subtitle", label: "Subtitle", fieldType: "TEXT", required: false },
  { key: "category", label: "Category", fieldType: "TEXT", required: true },
  { key: "contentHtml", label: "Content", fieldType: "RICHTEXT", required: true },
  { key: "thumb", label: "Thumbnail", fieldType: "IMAGE", required: true },
  { key: "slug", label: "Slug", fieldType: "TEXT", required: true, helpText: "Used in the article URL: /examiner-tips/<slug>" },
];

async function ensureFields(call, form) {
  const existingKeys = new Set((form.fields ?? []).map((f) => f.key));
  for (const [i, def] of FIELD_DEFS.entries()) {
    if (existingKeys.has(def.key)) {
      console.log(`Field "${def.key}" already exists - skipping.`);
      continue;
    }
    console.log(`Creating field "${def.key}" (${def.fieldType})...`);
    const res = await call(`/api/admin/dynamic-forms/${FORM_KEY}/fields`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: def.key,
        label: def.label,
        fieldType: def.fieldType,
        required: def.required,
        displayOrder: i,
        helpText: def.helpText ?? "",
        options: [],
      }),
    });
    if (!res.ok) throw new Error(`Create field "${def.key}" failed: ${res.status} ${await res.text()}`);
  }
}

async function uploadThumb(call, thumbPath) {
  const bytes = await readFile(thumbPath);
  const form = new FormData();
  form.append("file", new Blob([bytes]), path.basename(thumbPath));
  form.append("fieldKind", "IMAGE");
  form.append("formKey", FORM_KEY);
  const res = await call("/api/admin/dynamic-forms/uploads", { method: "POST", body: form });
  if (!res.ok) throw new Error(`Thumbnail upload failed (${thumbPath}): ${res.status} ${await res.text()}`);
  const { storageKey } = await res.json();
  return storageKey;
}

async function ensureEntries(call, articles) {
  const existing = await call(`/api/admin/dynamic-forms/${FORM_KEY}/values`);
  if (!existing.ok) throw new Error(`List entries failed: ${existing.status} ${await existing.text()}`);
  const existingSlugs = new Set((await existing.json()).map((v) => v.values?.slug));

  for (const [i, article] of articles.entries()) {
    if (existingSlugs.has(article.slug)) {
      console.log(`Entry "${article.slug}" already exists - skipping.`);
      continue;
    }
    console.log(`Uploading thumbnail for "${article.slug}"...`);
    const storageKey = await uploadThumb(call, article.thumbPath);

    console.log(`Creating entry "${article.slug}"...`);
    const res = await call(`/api/admin/dynamic-forms/${FORM_KEY}/values`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        values: {
          title: article.title,
          ogTitle: article.ogTitle,
          subtitle: article.subtitle,
          category: article.category,
          contentHtml: article.contentHtml,
          thumb: storageKey,
          slug: article.slug,
        },
        displayOrder: i,
        status: "PUBLISHED",
      }),
    });
    if (!res.ok) throw new Error(`Create entry "${article.slug}" failed: ${res.status} ${await res.text()}`);
  }
}

async function main() {
  const articles = await loadArticles();
  console.log(`Loaded ${articles.length} articles from tip-articles.json.`);

  const token = await login();
  console.log("Logged in.");
  const call = authedFetch(token);

  const form = await ensureForm(call);
  await ensureFields(call, form);
  const freshForm = await (await call(`/api/admin/dynamic-forms/${FORM_KEY}`)).json();
  await ensureEntries(call, articles);

  console.log(
    `\nDone. Form "${FORM_KEY}" has ${freshForm.fields.length} fields; ${articles.length} article(s) processed.`,
  );
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
