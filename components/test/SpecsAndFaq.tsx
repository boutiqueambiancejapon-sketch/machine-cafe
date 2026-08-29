"use client";

import { useState } from "react";
import { specsData, faqData } from "@/lib/data";
import { serif } from "@/components/ui";

export function SpecsAccordion() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid #E8E1D6", borderRadius: 20, marginTop: 24, overflow: "hidden" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          padding: "26px 34px",
          fontSize: 18,
          fontWeight: 700,
          color: "#241B17",
          textAlign: "left",
        }}
      >
        Voir toutes les caractéristiques{" "}
        <span
          style={{
            fontSize: 20,
            color: "#B77945",
            transition: "transform .3s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ⌄
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 34px 30px", animation: "fadeIn .25s ease-out both" }}>
          {specsData.map((s) => (
            <div
              key={s.k}
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: 20,
                padding: "11px 0",
                borderTop: "1px solid #EDE6DA",
                fontSize: 14,
              }}
            >
              <div style={{ color: "#77716C" }}>{s.k}</div>
              <div style={{ color: "#241B17", fontWeight: 600 }}>{s.v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number>(0);
  return (
    <div style={{ marginTop: 40 }}>
      <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 32, color: "#241B17", margin: "0 0 18px" }}>
        Questions fréquentes
      </h2>
      <div style={{ border: "1px solid #E8E1D6", borderRadius: 16, overflow: "hidden" }}>
        {faqData.map((f, i) => {
          const on = openIdx === i;
          return (
            <div key={f.q} style={{ borderTop: i === 0 ? "none" : "1px solid #EDE6DA" }}>
              <button
                type="button"
                onClick={() => setOpenIdx(on ? -1 : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 20,
                  background: "none",
                  border: "none",
                  padding: "20px 24px",
                  textAlign: "left",
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: "#241B17",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "inherit", fontWeight: "inherit", color: "inherit", lineHeight: 1.4 }}>
                  {f.q}
                </h3>{" "}
                <span
                  style={{
                    fontSize: 18,
                    color: "#B77945",
                    transition: "transform .3s",
                    flexShrink: 0,
                    transform: on ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ⌄
                </span>
              </button>
              {on && (
                <div
                  style={{
                    padding: "0 24px 22px",
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "#45413E",
                    animation: "fadeIn .22s ease-out both",
                  }}
                >
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
