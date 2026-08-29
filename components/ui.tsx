import type { CSSProperties, ReactNode } from "react";

/** Serif display face used for headings (matches the canvas). */
export const serif = "var(--font-serif), Georgia, serif";
/** Monospace face used for kickers / labels. */
export const mono = "var(--font-mono), ui-monospace, monospace";

/** Kicker label — uppercase mono caption above section titles. */
export const kicker: CSSProperties = {
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#77716C",
};

/** Hatched placeholder standing in for a photo, exactly as in the canvas. */
export function Photo({
  label,
  ratio = "4 / 3",
  radius = 0,
  border = false,
  style,
  children,
}: {
  label?: ReactNode;
  ratio?: string;
  radius?: number;
  border?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: ratio,
        borderRadius: radius,
        border: border ? "1px solid #E8E1D6" : undefined,
        background: "repeating-linear-gradient(135deg,#F7F3EC 0 12px,#F1EBE0 12px 24px)",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        fontFamily: mono,
        fontSize: 11,
        color: "#8C837A",
        textAlign: "center",
        lineHeight: 1.7,
        ...style,
      }}
    >
      {label}
      {children}
    </div>
  );
}

/** Editorial score bars (used on home top-picks and the comparateur rows). */
export function MiniBar({ value, width, color }: { value: string; width: string; color: string }) {
  return (
    <div
      style={{
        height: 4,
        borderRadius: 999,
        background: "#EDE6DA",
        marginTop: 5,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          borderRadius: 999,
          transition: "width .7s cubic-bezier(.2,.7,.3,1)",
          width,
          background: color,
        }}
      />
    </div>
  );
}
