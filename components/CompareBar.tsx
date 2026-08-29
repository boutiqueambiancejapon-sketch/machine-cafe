"use client";

import Link from "next/link";
import { useCompare } from "@/components/CompareProvider";
import { productById } from "@/lib/data";

export function CompareBar() {
  const { ids, remove, clear, toast } = useCompare();

  return (
    <>
      {ids.length > 0 && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 80,
            background: "#241B17",
            color: "#F7F3EC",
            boxShadow: "0 -18px 40px -30px rgba(36,27,23,.9)",
            animation: "sheetUp .3s cubic-bezier(.2,.7,.3,1) both",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "16px 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontSize: 14.5, fontWeight: 700 }}>
                {ids.length} {ids.length > 1 ? "machines sélectionnées" : "machine sélectionnée"}
              </span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ids.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => remove(id)}
                    className="h-chip"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#33251E",
                      border: "1px solid #4A3830",
                      borderRadius: 10,
                      padding: "8px 12px",
                      fontSize: 12.5,
                      color: "#F7F3EC",
                      animation: "popIn .2s ease-out both",
                    }}
                  >
                    {productById(id)?.model ?? id} <span style={{ color: "#9A8E84" }}>×</span>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                onClick={clear}
                style={{ background: "none", border: "none", fontSize: 13.5, color: "#9A8E84", padding: 0 }}
              >
                Tout retirer
              </button>
              <Link
                href="/comparatifs"
                className="h-amazon-solid"
                style={{
                  background: "#B77945",
                  color: "#FCFBF8",
                  border: "none",
                  borderRadius: 11,
                  padding: "13px 20px",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Comparer maintenant →
              </Link>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            right: 28,
            bottom: 110,
            zIndex: 90,
            background: "#FCFBF8",
            border: "1px solid #E8E1D6",
            borderRadius: 12,
            padding: "14px 18px",
            fontSize: 14,
            fontWeight: 600,
            color: "#241B17",
            boxShadow: "0 20px 44px -30px rgba(36,27,23,.8)",
            animation: "riseIn .25s cubic-bezier(.2,.7,.3,1) both",
          }}
        >
          {toast}
        </div>
      )}
    </>
  );
}
