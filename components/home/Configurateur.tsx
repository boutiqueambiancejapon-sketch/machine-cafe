"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { steps, recoIds, recoTags, productById } from "@/lib/data";
import { euro, num } from "@/lib/format";
import { mono, serif } from "@/components/ui";

const caption: CSSProperties = {
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#B77945",
};

export function Configurateur() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);

  const current = steps[Math.min(step, 5)];
  const picked = answers[step];
  const progressPct = Math.round(((step + (picked ? 1 : 0)) / 6) * 100) + "%";

  const recos = useMemo(
    () =>
      recoIds.map((id, i) => {
        const p = productById(id)!;
        return {
          tag: recoTags[i],
          brand: p.brand,
          model: p.model,
          pro: p.pros[0],
          con: p.con,
          scoreText: num(p.score),
          priceText: euro(p.price),
          delay: i * 100 + "ms",
        };
      }),
    [],
  );

  const profileSummary =
    "Profil retenu : " +
    (Object.values(answers).join(" · ") || "aucune réponse, classement par défaut") +
    ".";

  function nextStep() {
    if (step === 5) setDone(true);
    else setStep(step + 1);
  }
  function prevStep() {
    setStep(Math.max(0, step - 1));
  }
  function restart() {
    setDone(false);
    setStep(0);
    setAnswers({});
  }

  return (
    <section id="configurateur" style={{ background: "#241B17", color: "#F7F3EC", scrollMarginTop: 60 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 40px" }}>
        <div
          data-r="two"
          style={{ display: "grid", gridTemplateColumns: ".85fr 1.15fr", gap: 56, alignItems: "start" }}
        >
          <div>
            <div style={caption}>Configurateur</div>
            <h2
              style={{
                fontFamily: serif,
                fontWeight: 400,
                fontSize: 44,
                lineHeight: 1.08,
                margin: "14px 0 0",
                color: "#F7F3EC",
              }}
            >
              Trouvez la vôtre en six questions
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "#C9BDB1", maxWidth: "38ch" }}>
              Pas de formulaire, pas d&apos;e-mail. On vous demande comment vous buvez votre café, on vous répond
              avec trois modèles et les raisons du choix.
            </p>
            <div style={{ marginTop: 28, fontSize: 13, color: "#8E8177", lineHeight: 1.7 }}>
              Les recommandations s&apos;appuient sur nos notes éditoriales et les spécifications constructeur.{" "}
              <a href="#" style={{ color: "#B77945", borderBottom: "1px solid rgba(183,121,69,.4)" }}>
                Comment nous évaluons
              </a>
            </div>
          </div>

          <div
            style={{
              background: "#FCFBF8",
              borderRadius: 24,
              padding: 34,
              color: "#45413E",
              minHeight: 430,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!done ? (
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: mono,
                    fontSize: 11.5,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    color: "#77716C",
                  }}
                >
                  <span>Étape {step + 1} / 6</span>
                  <span>{current.k}</span>
                </div>
                <div
                  style={{
                    height: 4,
                    borderRadius: 999,
                    background: "#E8E1D6",
                    marginTop: 12,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "#B77945",
                      borderRadius: 999,
                      transition: "width .5s cubic-bezier(.2,.7,.3,1)",
                      width: progressPct,
                    }}
                  />
                </div>

                <div
                  key={"step" + step}
                  style={{ marginTop: 28, flex: 1, animation: "slideNext .32s cubic-bezier(.2,.7,.3,1) both" }}
                >
                  <h3
                    style={{
                      fontFamily: serif,
                      fontWeight: 400,
                      fontSize: 30,
                      lineHeight: 1.15,
                      color: "#241B17",
                      margin: 0,
                    }}
                  >
                    {current.q}
                  </h3>
                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 22 }}
                  >
                    {current.o.map((opt) => {
                      const on = picked === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAnswers({ ...answers, [step]: opt })}
                          className="h-chip-lift"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 10,
                            textAlign: "left",
                            background: "#FCFBF8",
                            borderRadius: 12,
                            padding: "14px 16px",
                            fontSize: 14.5,
                            fontWeight: 600,
                            border: on ? "1px solid #241B17" : "1px solid #E8E1D6",
                            color: on ? "#241B17" : "#45413E",
                          }}
                        >
                          <span>{opt}</span>
                          <span style={{ fontSize: 13, color: "#3E6B55" }}>{on ? "✓" : ""}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 24,
                    paddingTop: 20,
                    borderTop: "1px solid #E8E1D6",
                  }}
                >
                  <button
                    type="button"
                    onClick={prevStep}
                    className="h-tlink-dark"
                    style={{ background: "none", border: "none", fontSize: 14, fontWeight: 600, color: "#77716C", padding: 0 }}
                  >
                    ← Retour
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="h-dark"
                    style={{
                      background: "#241B17",
                      color: "#F7F3EC",
                      border: "none",
                      borderRadius: 10,
                      padding: "12px 20px",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {step === 5 ? "Voir mes recommandations" : "Suivant →"}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", flex: 1, animation: "fadeIn .3s ease-out both" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 30, color: "#241B17", margin: 0 }}>
                    Nos recommandations pour vous
                  </h3>
                  <button
                    type="button"
                    onClick={restart}
                    className="h-tlink-amber"
                    style={{ background: "none", border: "none", fontSize: 13, fontWeight: 600, color: "#77716C", padding: 0 }}
                  >
                    Recommencer
                  </button>
                </div>
                <p style={{ margin: "10px 0 0", fontSize: 14, color: "#77716C" }}>{profileSummary}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
                  {recos.map((r) => (
                    <div
                      key={r.model}
                      style={{
                        border: "1px solid #E8E1D6",
                        borderRadius: 16,
                        padding: 16,
                        display: "grid",
                        gridTemplateColumns: "84px 1fr auto",
                        gap: 16,
                        alignItems: "center",
                        animation: "riseIn .4s cubic-bezier(.2,.7,.3,1) both",
                        animationDelay: r.delay,
                      }}
                    >
                      <div
                        style={{
                          aspectRatio: "1",
                          borderRadius: 10,
                          background: "repeating-linear-gradient(135deg,#F7F3EC 0 8px,#F1EBE0 8px 16px)",
                          display: "grid",
                          placeItems: "center",
                          fontFamily: mono,
                          fontSize: 9,
                          color: "#8C837A",
                        }}
                      >
                        PHOTO
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: mono,
                            fontSize: 10.5,
                            letterSpacing: ".1em",
                            textTransform: "uppercase",
                            color: "#B77945",
                          }}
                        >
                          {r.tag}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#241B17", marginTop: 3 }}>
                          {r.brand} {r.model}
                        </div>
                        <div style={{ fontSize: 13, color: "#3E6B55", marginTop: 4 }}>✓ {r.pro}</div>
                        <div style={{ fontSize: 13, color: "#77716C" }}>× {r.con}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: serif, fontSize: 26, color: "#241B17", lineHeight: 1 }}>
                          {r.scoreText}
                        </div>
                        <div style={{ fontSize: 12.5, color: "#77716C", marginBottom: 8 }}>{r.priceText}</div>
                        <a
                          href="/tests/magnifica-evo"
                          className="h-bordered-amber"
                          style={{
                            display: "inline-block",
                            background: "#F7F3EC",
                            border: "1px solid #E8E1D6",
                            borderRadius: 9,
                            padding: "8px 12px",
                            fontSize: 12.5,
                            fontWeight: 700,
                            color: "#241B17",
                          }}
                        >
                          Voir la machine
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
