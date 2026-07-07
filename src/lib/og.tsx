import type { ReactElement } from "react";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Branded OG card JSX (plum/marigold). Shared by every route's
 * opengraph-image.tsx so each shareable URL gets its own title + description.
 * Satori-safe (every multi-child div is flex).
 */
export function ogCard({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}): ReactElement {
  const desc = (description ?? "").slice(0, 160);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "76px 80px",
        background: "linear-gradient(135deg, #382033 0%, #221a15 100%)",
        color: "#f3ede1",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: 14,
          height: "100%",
          background: "linear-gradient(180deg,#e2a039,#b97a23)",
        }}
      />

      {/* top row: eyebrow + brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#f1c878",
            fontWeight: 700,
          }}
        >
          {eyebrow ?? "O Level Bengali"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#e2a039",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              color: "#f3ede1",
            }}
          >
            Rofsan Sir
          </div>
        </div>
      </div>

      {/* title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 62,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: -1.5,
          maxWidth: 980,
          color: "#f3ede1",
        }}
      >
        {title}
      </div>

      {/* bottom row: description + url */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        {desc ? (
          <div
            style={{
              display: "flex",
              fontSize: 27,
              lineHeight: 1.35,
              color: "#f3ede1",
              opacity: 0.82,
              maxWidth: 760,
            }}
          >
            {desc}
          </div>
        ) : (
          <div style={{ display: "flex" }} />
        )}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#f1c878",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          rofsansir.com
        </div>
      </div>
    </div>
  );
}
