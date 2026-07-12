/**
 * Second-pass allowlist sanitizer for tip `contentHtml` before it's rendered
 * with dangerouslySetInnerHTML. The primary sanitizer runs in the admin
 * Worker (workers/admin/src/sanitize.ts, using Workers-native HTMLRewriter)
 * before every write - this is defense in depth against a regression there,
 * so it's implemented with plain string ops (no Workers-only globals) since
 * it must also run under `next dev`'s Node runtime.
 */

const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u",
  "h2", "h3", "ul", "ol", "li", "a", "blockquote",
]);

const STRIP_ENTIRELY = ["script", "style", "iframe", "object", "embed", "svg", "form", "button", "input", "textarea"];

export function sanitizeHtml(html: string): string {
  let out = html;

  for (const tag of STRIP_ENTIRELY) {
    out = out.replace(new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi"), "");
    out = out.replace(new RegExp(`<${tag}[^>]*\\/?>`, "gi"), "");
  }

  out = out.replace(/<(\/?)([a-zA-Z0-9]+)([^>]*)>/g, (match, closingSlash, tagRaw, attrs) => {
    const tag = tagRaw.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (closingSlash) return `</${tag}>`;

    if (tag === "a") {
      const hrefMatch = /href\s*=\s*"([^"]*)"|href\s*=\s*'([^']*)'/i.exec(attrs);
      const href = (hrefMatch?.[1] ?? hrefMatch?.[2] ?? "").trim();
      if (href && /^(https?:|mailto:)/i.test(href)) {
        return `<a href="${href.replace(/"/g, "&quot;")}" rel="noopener noreferrer" target="_blank">`;
      }
      return "<a>";
    }

    return `<${tag}>`;
  });

  return out;
}
