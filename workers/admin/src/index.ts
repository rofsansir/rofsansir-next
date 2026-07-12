import {
  GALLERY_KEY,
  HALL_OF_FAME_KEY,
  PAST_PAPERS_KEY,
  VIDEOS_KEY,
  getManifest,
  putManifest,
  sanitizeFilename,
  slugify,
  type Achiever,
  type GalleryItem,
  type PastPaperItem,
  type VideoItem,
} from "./manifest";

export interface Env {
  ASSETS: R2Bucket;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
}

const CDN_BASE = "https://cdn.rofsansir.com";

const videoThumb = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

function formatBytes(bytes: number): string {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getCookie(request: Request, name: string): string | null {
  const cookie = request.headers.get("cookie");
  if (!cookie) return null;
  const match = cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return match ? match.split("=")[1] : null;
}

function isAuthenticated(request: Request): boolean {
  const session = getCookie(request, "admin_session");
  return session === "true";
}

function setSessionCookie(): string {
  return "admin_session=true; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000";
}

function clearSessionCookie(): string {
  return "admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0";
}

function loginPage(showError = false): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Rofsan Sir - Admin Login</title>
<style>
  body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f5f5f5; margin: 0; }
  .login-box { background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); width: 100%; max-width: 340px; }
  h1 { font-size: 1.3rem; margin: 0 0 1.5rem 0; text-align: center; }
  .error { background: #fee; border: 1px solid #fcc; color: #c00; padding: .75rem; border-radius: 6px; margin-bottom: 1rem; font-size: .9rem; text-align: center; }
  label { display: block; margin-bottom: .3rem; font-weight: 500; font-size: .9rem; }
  input { width: 100%; padding: .5rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; box-sizing: border-box; margin-bottom: 1rem; }
  button { width: 100%; padding: .6rem; background: #111; color: white; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; font-weight: 500; }
  button:hover { background: #333; }
</style>
</head>
<body>
  <div class="login-box">
    <h1>Rofsan Sir Admin</h1>
    ${showError ? '<div class="error">Invalid username or password</div>' : ""}
    <form method="post" action="/login">
      <label>Username <input type="text" name="username" required autofocus /></label>
      <label>Password <input type="password" name="password" required /></label>
      <button type="submit">Login</button>
    </form>
  </div>
</body>
</html>`;
}

function page(
  gallery: GalleryItem[],
  achievers: Achiever[],
  videos: VideoItem[],
  pastPapers: PastPaperItem[],
): string {
  const galleryRows = gallery
    .map(
      (g, i) => `
        <div class="row">
          <img src="${CDN_BASE}${escapeHtml(g.src)}" alt="" />
          <div class="meta">${escapeHtml(g.alt)}</div>
          ${moveButtons("gallery", i, gallery.length)}
          <form method="post" action="/api/gallery/delete" class="inline">
            <input type="hidden" name="index" value="${i}" />
            <button type="submit" class="danger">Delete</button>
          </form>
        </div>`,
    )
    .join("");

  const achieverRows = achievers
    .map(
      (a, i) => `
        <div class="row">
          <img src="${CDN_BASE}${escapeHtml(a.image)}" alt="" />
          <div class="meta"><strong>${escapeHtml(a.name)}</strong> - ${escapeHtml(a.grade)} - ${escapeHtml(a.meta)}</div>
          ${moveButtons("hall-of-fame", i, achievers.length)}
          <form method="post" action="/api/hall-of-fame/delete" class="inline">
            <input type="hidden" name="index" value="${i}" />
            <button type="submit" class="danger">Delete</button>
          </form>
        </div>`,
    )
    .join("");

  const videoRows = videos
    .map(
      (v, i) => `
        <div class="row">
          <img src="${escapeHtml(videoThumb(v.videoId))}" alt="" />
          <div class="meta"><strong>${escapeHtml(v.title)}</strong> - ${escapeHtml(v.category)} - ${escapeHtml(v.duration)}</div>
          ${moveButtons("videos", i, videos.length)}
          <form method="post" action="/api/videos/delete" class="inline">
            <input type="hidden" name="index" value="${i}" />
            <button type="submit" class="danger">Delete</button>
          </form>
        </div>`,
    )
    .join("");

  const papersByYear = new Map<number, PastPaperItem[]>();
  pastPapers.forEach((p) => {
    const list = papersByYear.get(p.year) ?? [];
    list.push(p);
    papersByYear.set(p.year, list);
  });
  const paperYears = [...papersByYear.keys()].sort((a, b) => b - a);

  const paperSections = paperYears
    .map((year) => {
      const rows = (papersByYear.get(year) ?? [])
        .map((p) => {
          const index = pastPapers.indexOf(p);
          return `
        <div class="row">
          <div class="meta">
            <strong>${escapeHtml(p.title)}</strong> - ${escapeHtml(p.paperType)}${p.session ? ` - ${escapeHtml(p.session)}` : ""} - ${formatBytes(p.fileSize)}
            ${p.isActive ? "" : '<span style="color:#b91c1c;font-weight:600;"> (inactive)</span>'}
          </div>
          <form method="post" action="/api/past-papers/toggle" class="inline">
            <input type="hidden" name="index" value="${index}" />
            <button type="submit">${p.isActive ? "Deactivate" : "Activate"}</button>
          </form>
          <form method="post" action="/api/past-papers/delete" class="inline">
            <input type="hidden" name="index" value="${index}" />
            <button type="submit" class="danger">Delete</button>
          </form>
        </div>`;
        })
        .join("");
      return `<h3>${year}</h3>${rows}`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Rofsan Sir - Admin</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 860px; margin: 2rem auto; padding: 0 1rem; color: #222; }
  h1 { font-size: 1.4rem; }
  h2 { margin-top: 2.5rem; border-bottom: 1px solid #ddd; padding-bottom: .5rem; }
  h3 { margin-top: 1.5rem; font-size: 1rem; color: #555; }
  .row { display: flex; align-items: center; gap: .75rem; padding: .5rem 0; border-bottom: 1px solid #eee; }
  .row img { width: 56px; height: 56px; object-fit: cover; border-radius: 6px; flex-shrink: 0; }
  .meta { flex: 1; font-size: .9rem; }
  .inline { display: inline; }
  button { cursor: pointer; border: 1px solid #ccc; background: #fff; border-radius: 6px; padding: .3rem .6rem; font-size: .85rem; }
  button.danger { color: #b91c1c; border-color: #f3c5c5; }
  form.add { margin-top: 1rem; padding: 1rem; background: #f7f7f7; border-radius: 10px; display: grid; gap: .5rem; max-width: 420px; }
  form.add input[type="text"], form.add input[type="file"], form.add input[type="number"], form.add select, form.add textarea { padding: .4rem; border: 1px solid #ccc; border-radius: 6px; font: inherit; }
  form.add button { background: #111; color: #fff; border: none; padding: .5rem; }
</style>
</head>
<body>
  <div style="text-align: right; margin-bottom: 1.5rem;">
    <a href="/logout" style="color: #666; text-decoration: none; font-size: .9rem;">Logout</a>
  </div>
  <h1>Rofsan Sir - Content Admin</h1>
  <p>Edit Gallery and Hall of Fame photos. Changes appear on the site within ~5 minutes.</p>

  <h2>Gallery</h2>
  ${galleryRows || "<p>No items yet.</p>"}
  <form class="add" method="post" action="/api/gallery/add" enctype="multipart/form-data">
    <label>Photo <input type="file" name="file" accept="image/*" required /></label>
    <label>Alt text <input type="text" name="alt" required /></label>
    <button type="submit">Add to Gallery</button>
  </form>

  <h2>Hall of Fame</h2>
  ${achieverRows || "<p>No items yet.</p>"}
  <form class="add" method="post" action="/api/hall-of-fame/add" enctype="multipart/form-data">
    <label>Photo <input type="file" name="file" accept="image/*" required /></label>
    <label>Name <input type="text" name="name" required /></label>
    <label>Meta (e.g. "O Level - 2025") <input type="text" name="meta" required /></label>
    <label>Grade (e.g. "A*") <input type="text" name="grade" required /></label>
    <button type="submit">Add to Hall of Fame</button>
  </form>

  <h2>Videos</h2>
  ${videoRows || "<p>No videos yet.</p>"}
  <form class="add" method="post" action="/api/videos/add">
    <label>YouTube Video ID (e.g. n4pKaLL-fyE) <input type="text" name="videoId" required /></label>
    <label>Title <input type="text" name="title" required /></label>
    <label>Duration (e.g. "5:40") <input type="text" name="duration" required /></label>
    <label>Category (e.g. "Paper 1") <input type="text" name="category" required /></label>
    <button type="submit">Add Video</button>
  </form>

  <h2>Past Papers</h2>
  ${paperSections || "<p>No papers yet.</p>"}
  <form class="add" method="post" action="/api/past-papers/add" enctype="multipart/form-data">
    <label>PDF <input type="file" name="file" accept="application/pdf" required /></label>
    <label>Title <input type="text" name="title" required /></label>
    <label>Year <input type="number" name="year" required /></label>
    <label>Session (e.g. "May/June", optional) <input type="text" name="session" /></label>
    <label>Paper Type
      <select name="paperType" required>
        <option>Paper 1</option>
        <option>Paper 2</option>
        <option>Mark Scheme</option>
        <option>General</option>
      </select>
    </label>
    <label>Description <textarea name="description" rows="2" required></textarea></label>
    <label>Meta keywords <input type="text" name="metaKeywords" /></label>
    <button type="submit">Add Past Paper</button>
  </form>
</body>
</html>`;
}

function moveButtons(section: string, index: number, total: number): string {
  const up = index > 0
    ? `<form method="post" action="/api/${section}/move" class="inline"><input type="hidden" name="index" value="${index}" /><input type="hidden" name="direction" value="up" /><button type="submit">Up</button></form>`
    : "";
  const down = index < total - 1
    ? `<form method="post" action="/api/${section}/move" class="inline"><input type="hidden" name="index" value="${index}" /><input type="hidden" name="direction" value="down" /><button type="submit">Down</button></form>`
    : "";
  return up + down;
}

function redirectHome(): Response {
  return new Response(null, { status: 303, headers: { Location: "/" } });
}

function move<T>(items: T[], index: number, direction: string): T[] {
  const target = direction === "up" ? index - 1 : index + 1;
  if (index < 0 || index >= items.length || target < 0 || target >= items.length) return items;
  const copy = items.slice();
  [copy[index], copy[target]] = [copy[target], copy[index]];
  return copy;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === "/login" && request.method === "GET") {
      return new Response(loginPage(), {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    if (pathname === "/login" && request.method === "POST") {
      const form = await request.formData();
      const username = String(form.get("username") ?? "");
      const password = String(form.get("password") ?? "");

      if (username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD) {
        return new Response(null, {
          status: 303,
          headers: { Location: "/", "Set-Cookie": setSessionCookie() },
        });
      }

      return new Response(loginPage(true), {
        status: 401,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "Set-Cookie": clearSessionCookie(),
        },
      });
    }

    if (pathname === "/logout" && request.method === "GET") {
      return new Response(null, {
        status: 303,
        headers: { Location: "/login", "Set-Cookie": clearSessionCookie() },
      });
    }

    if (!isAuthenticated(request)) {
      return new Response(null, {
        status: 303,
        headers: { Location: "/login" },
      });
    }

    if (request.method === "GET" && pathname === "/") {
      const [gallery, achievers, videos, pastPapers] = await Promise.all([
        getManifest<GalleryItem>(env.ASSETS, GALLERY_KEY),
        getManifest<Achiever>(env.ASSETS, HALL_OF_FAME_KEY),
        getManifest<VideoItem>(env.ASSETS, VIDEOS_KEY),
        getManifest<PastPaperItem>(env.ASSETS, PAST_PAPERS_KEY),
      ]);
      return new Response(page(gallery, achievers, videos, pastPapers), {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    if (request.method === "POST" && pathname === "/api/gallery/add") {
      const form = await request.formData();
      const file = form.get("file");
      const alt = String(form.get("alt") ?? "");
      if (!(file instanceof File) || !alt) return new Response("Missing file or alt", { status: 400 });
      const key = `assets/gallery/${sanitizeFilename(file.name)}`;
      await env.ASSETS.put(key, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type || "application/octet-stream" },
      });
      const items = await getManifest<GalleryItem>(env.ASSETS, GALLERY_KEY);
      items.push({ src: `/${key}`, alt });
      await putManifest(env.ASSETS, GALLERY_KEY, items);
      return redirectHome();
    }

    if (request.method === "POST" && pathname === "/api/gallery/delete") {
      const form = await request.formData();
      const index = Number(form.get("index"));
      const items = await getManifest<GalleryItem>(env.ASSETS, GALLERY_KEY);
      if (Number.isInteger(index) && index >= 0 && index < items.length) {
        const deleted = items[index];
        await env.ASSETS.delete(deleted.src.startsWith("/") ? deleted.src.slice(1) : deleted.src);
        items.splice(index, 1);
        await putManifest(env.ASSETS, GALLERY_KEY, items);
      }
      return redirectHome();
    }

    if (request.method === "POST" && pathname === "/api/gallery/move") {
      const form = await request.formData();
      const index = Number(form.get("index"));
      const direction = String(form.get("direction") ?? "");
      const items = await getManifest<GalleryItem>(env.ASSETS, GALLERY_KEY);
      await putManifest(env.ASSETS, GALLERY_KEY, move(items, index, direction));
      return redirectHome();
    }

    if (request.method === "POST" && pathname === "/api/hall-of-fame/add") {
      const form = await request.formData();
      const file = form.get("file");
      const name = String(form.get("name") ?? "");
      const meta = String(form.get("meta") ?? "");
      const grade = String(form.get("grade") ?? "");
      if (!(file instanceof File) || !name || !meta || !grade) {
        return new Response("Missing required field", { status: 400 });
      }
      const key = `assets/hall-of-fame/${sanitizeFilename(file.name)}`;
      await env.ASSETS.put(key, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type || "application/octet-stream" },
      });
      const items = await getManifest<Achiever>(env.ASSETS, HALL_OF_FAME_KEY);
      items.push({ name, meta, grade, image: `/${key}` });
      await putManifest(env.ASSETS, HALL_OF_FAME_KEY, items);
      return redirectHome();
    }

    if (request.method === "POST" && pathname === "/api/hall-of-fame/delete") {
      const form = await request.formData();
      const index = Number(form.get("index"));
      const items = await getManifest<Achiever>(env.ASSETS, HALL_OF_FAME_KEY);
      if (Number.isInteger(index) && index >= 0 && index < items.length) {
        const deleted = items[index];
        await env.ASSETS.delete(deleted.image.startsWith("/") ? deleted.image.slice(1) : deleted.image);
        items.splice(index, 1);
        await putManifest(env.ASSETS, HALL_OF_FAME_KEY, items);
      }
      return redirectHome();
    }

    if (request.method === "POST" && pathname === "/api/hall-of-fame/move") {
      const form = await request.formData();
      const index = Number(form.get("index"));
      const direction = String(form.get("direction") ?? "");
      const items = await getManifest<Achiever>(env.ASSETS, HALL_OF_FAME_KEY);
      await putManifest(env.ASSETS, HALL_OF_FAME_KEY, move(items, index, direction));
      return redirectHome();
    }

    if (request.method === "POST" && pathname === "/api/videos/add") {
      const form = await request.formData();
      const videoId = String(form.get("videoId") ?? "").trim();
      const title = String(form.get("title") ?? "").trim();
      const duration = String(form.get("duration") ?? "").trim();
      const category = String(form.get("category") ?? "").trim();
      if (!videoId || !title || !duration || !category) {
        return new Response("Missing required field", { status: 400 });
      }
      const items = await getManifest<VideoItem>(env.ASSETS, VIDEOS_KEY);
      const nextId = items.reduce((max, v) => Math.max(max, Number(v.id) || 0), 0) + 1;
      items.push({ id: String(nextId), videoId, title, duration, category });
      await putManifest(env.ASSETS, VIDEOS_KEY, items);
      return redirectHome();
    }

    if (request.method === "POST" && pathname === "/api/videos/delete") {
      const form = await request.formData();
      const index = Number(form.get("index"));
      const items = await getManifest<VideoItem>(env.ASSETS, VIDEOS_KEY);
      if (Number.isInteger(index) && index >= 0 && index < items.length) {
        items.splice(index, 1);
        await putManifest(env.ASSETS, VIDEOS_KEY, items);
      }
      return redirectHome();
    }

    if (request.method === "POST" && pathname === "/api/videos/move") {
      const form = await request.formData();
      const index = Number(form.get("index"));
      const direction = String(form.get("direction") ?? "");
      const items = await getManifest<VideoItem>(env.ASSETS, VIDEOS_KEY);
      await putManifest(env.ASSETS, VIDEOS_KEY, move(items, index, direction));
      return redirectHome();
    }

    if (request.method === "POST" && pathname === "/api/past-papers/add") {
      const form = await request.formData();
      const file = form.get("file");
      const title = String(form.get("title") ?? "").trim();
      const year = Number(form.get("year"));
      const session = String(form.get("session") ?? "").trim() || null;
      const paperType = String(form.get("paperType") ?? "").trim();
      const description = String(form.get("description") ?? "").trim();
      const metaKeywords = String(form.get("metaKeywords") ?? "").trim();
      if (!(file instanceof File) || !title || !year || !paperType || !description) {
        return new Response("Missing required field", { status: 400 });
      }
      const items = await getManifest<PastPaperItem>(env.ASSETS, PAST_PAPERS_KEY);
      const fileName = sanitizeFilename(file.name);
      const filePath = `assets/past-paper/${year}/${fileName}`;
      await env.ASSETS.put(filePath, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type || "application/pdf" },
      });
      const nextId = items.reduce((max, p) => Math.max(max, p.id), 0) + 1;
      const baseSlug = slugify(`${title}-${year}-${paperType}`);
      const slug = items.some((p) => p.slug === baseSlug) ? `${baseSlug}-${nextId}` : baseSlug;
      items.push({
        id: nextId,
        title,
        slug,
        year,
        session,
        paperType,
        fileName,
        filePath: `/${filePath}`,
        fileSize: file.size,
        description,
        metaKeywords,
        downloadCount: 0,
        viewCount: 0,
        isActive: 1,
      });
      await putManifest(env.ASSETS, PAST_PAPERS_KEY, items);
      return redirectHome();
    }

    if (request.method === "POST" && pathname === "/api/past-papers/toggle") {
      const form = await request.formData();
      const index = Number(form.get("index"));
      const items = await getManifest<PastPaperItem>(env.ASSETS, PAST_PAPERS_KEY);
      if (Number.isInteger(index) && index >= 0 && index < items.length) {
        items[index].isActive = items[index].isActive ? 0 : 1;
        await putManifest(env.ASSETS, PAST_PAPERS_KEY, items);
      }
      return redirectHome();
    }

    if (request.method === "POST" && pathname === "/api/past-papers/delete") {
      const form = await request.formData();
      const index = Number(form.get("index"));
      const items = await getManifest<PastPaperItem>(env.ASSETS, PAST_PAPERS_KEY);
      if (Number.isInteger(index) && index >= 0 && index < items.length) {
        const deleted = items[index];
        await env.ASSETS.delete(deleted.filePath.startsWith("/") ? deleted.filePath.slice(1) : deleted.filePath);
        items.splice(index, 1);
        await putManifest(env.ASSETS, PAST_PAPERS_KEY, items);
      }
      return redirectHome();
    }

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
