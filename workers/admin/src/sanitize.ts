/**
 * Allowlist HTML sanitizer for admin-authored rich text (tip articles).
 * Runs server-side via the Workers-native HTMLRewriter (no dependency) before
 * every write to R2, so stored content is safe even though only one trusted
 * admin can write it - it's later injected with dangerouslySetInnerHTML on
 * the public site.
 */

const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "b", "em", "i", "u",
  "h2", "h3", "ul", "ol", "li", "a", "blockquote",
]);

// Tags whose content (not just the tag) must never survive.
const STRIP_ENTIRELY = new Set([
  "script", "style", "iframe", "object", "embed", "svg", "form", "button", "input", "textarea",
]);

class ElementSanitizer {
  element(element: Element) {
    const tag = element.tagName.toLowerCase();

    if (STRIP_ENTIRELY.has(tag)) {
      element.remove();
      return;
    }

    if (!ALLOWED_TAGS.has(tag)) {
      element.removeAndKeepContent();
      return;
    }

    const attrNamesToRemove: string[] = [];
    for (const [name] of element.attributes) {
      if (tag === "a" && name === "href") continue;
      attrNamesToRemove.push(name);
    }
    for (const name of attrNamesToRemove) {
      element.removeAttribute(name);
    }

    if (tag === "a") {
      const href = element.getAttribute("href")?.trim();
      if (!href || !/^(https?:|mailto:)/i.test(href)) {
        element.removeAttribute("href");
      }
    }
  }
}

export async function sanitizeHtml(html: string): Promise<string> {
  const rewriter = new HTMLRewriter()
    .on("*", new ElementSanitizer())
    .onDocument({ comments: (comment) => { comment.remove(); } });
  const res = rewriter.transform(
    new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } }),
  );
  return await res.text();
}
