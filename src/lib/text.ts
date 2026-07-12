/** Strip HTML tags for use in meta descriptions / OG images (which can't render markup). */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/** Rough reading time from rich-text content, ~200 words/min, floor of 4 minutes. */
export function estimateReadTime(html: string): string {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  const minutes = Math.max(4, Math.round(words / 200));
  return `${minutes} min read`;
}
