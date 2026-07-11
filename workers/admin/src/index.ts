import {
  GALLERY_KEY,
  HALL_OF_FAME_KEY,
  getManifest,
  putManifest,
  sanitizeFilename,
  type Achiever,
  type GalleryItem,
} from "./manifest";

export interface Env {
  ASSETS: R2Bucket;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
}

const CDN_BASE = "https://cdn.rofsansir.com";

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

function loginPage(): string {
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
  label { display: block; margin-bottom: .3rem; font-weight: 500; font-size: .9rem; }
  input { width: 100%; padding: .5rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; box-sizing: border-box; margin-bottom: 1rem; }
  button { width: 100%; padding: .6rem; background: #111; color: white; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; font-weight: 500; }
  button:hover { background: #333; }
</style>
</head>
<body>
  <div class="login-box">
    <h1>Rofsan Sir Admin</h1>
    <form method="post" action="/login">
      <label>Username <input type="text" name="username" required autofocus /></label>
      <label>Password <input type="password" name="password" required /></label>
      <button type="submit">Login</button>
    </form>
  </div>
</body>
</html>`;
}

function page(gallery: GalleryItem[], achievers: Achiever[]): string {
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
  .row { display: flex; align-items: center; gap: .75rem; padding: .5rem 0; border-bottom: 1px solid #eee; }
  .row img { width: 56px; height: 56px; object-fit: cover; border-radius: 6px; flex-shrink: 0; }
  .meta { flex: 1; font-size: .9rem; }
  .inline { display: inline; }
  button { cursor: pointer; border: 1px solid #ccc; background: #fff; border-radius: 6px; padding: .3rem .6rem; font-size: .85rem; }
  button.danger { color: #b91c1c; border-color: #f3c5c5; }
  form.add { margin-top: 1rem; padding: 1rem; background: #f7f7f7; border-radius: 10px; display: grid; gap: .5rem; max-width: 420px; }
  form.add input[type="text"], form.add input[type="file"] { padding: .4rem; border: 1px solid #ccc; border-radius: 6px; }
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

      return new Response(loginPage(), {
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
      const [gallery, achievers] = await Promise.all([
        getManifest<GalleryItem>(env.ASSETS, GALLERY_KEY),
        getManifest<Achiever>(env.ASSETS, HALL_OF_FAME_KEY),
      ]);
      return new Response(page(gallery, achievers), {
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

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
