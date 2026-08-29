"use client";

import type { CSSProperties } from "react";
import { useCompare } from "@/components/CompareProvider";

type Variant = "pill" | "block";

export function CompareButton({
  id,
  model,
  variant = "pill",
  style,
}: {
  id: string;
  model: string;
  variant?: Variant;
  style?: CSSProperties;
}) {
  const { has, toggle } = useCompare();
  const selected = has(id);

  const base: CSSProperties =
    variant === "block"
      ? { borderRadius: 10, padding: 11, fontSize: 13.5, fontWeight: 700, width: "100%" }
      : { borderRadius: 10, padding: "12px 14px", fontSize: 13.5, fontWeight: 700 };

  return (
    <button
      type="button"
      onClick={() => toggle(id, model)}
      style={{
        ...base,
        border: selected ? "1px solid #3E6B55" : "1px solid #E8E1D6",
        background: selected ? "#F4F7F5" : "transparent",
        color: selected ? "#3E6B55" : "#45413E",
        transition: "border-color .2s, background .2s, color .2s",
        ...style,
      }}
    >
      {selected ? "Ajoutée ✓" : "Comparer"}
    </button>
  );
}
