"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { productById } from "@/lib/data";

type CompareCtx = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string, model: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  toast: string | null;
};

const Ctx = createContext<CompareCtx | null>(null);
const STORAGE_KEY = "10mc.compare";

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          setIds(parsed.filter((x): x is string => typeof x === "string" && !!productById(x)));
        }
      }
    } catch {
      /* ignore unavailable storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [ids]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const toggle = useCallback(
    (id: string, model: string) => {
      setIds((cur) => {
        if (cur.includes(id)) return cur.filter((x) => x !== id);
        if (cur.length >= 4) {
          showToast("Maximum 4 machines comparées");
          return cur;
        }
        showToast(model + " ajoutée au comparateur ✓");
        return [...cur, id];
      });
    },
    [showToast],
  );

  const remove = useCallback((id: string) => setIds((cur) => cur.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);
  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const value = useMemo<CompareCtx>(
    () => ({ ids, has, toggle, remove, clear, toast }),
    [ids, has, toggle, remove, clear, toast],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCompare(): CompareCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompare must be used within <CompareProvider>");
  return ctx;
}
