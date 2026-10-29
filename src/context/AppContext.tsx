'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { LangCode } from '@/lib/i18n';
import { PLANS } from '@/lib/data';

// ─── State shape ─────────────────────────────────────────────────────────────

interface AppState {
  lang: LangCode;
  compare: string[];          // plan IDs, max 3
  enrol: number[];            // checked step indices
  glossaryTermId: string | null; // open glossary sheet
}

interface AppActions {
  setLang: (l: LangCode) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  toggleEnrol: (idx: number) => void;
  resetEnrol: () => void;
  openTerm: (id: string) => void;
  closeTerm: () => void;
}

const defaultState: AppState = {
  lang: 'en',
  compare: [],
  enrol: [],
  glossaryTermId: null,
};

const Ctx = createContext<AppState & AppActions>({
  ...defaultState,
  setLang: () => {},
  toggleCompare: () => {},
  clearCompare: () => {},
  toggleEnrol: () => {},
  resetEnrol: () => {},
  openTerm: () => {},
  closeTerm: () => {},
});

// ─── Storage helpers ──────────────────────────────────────────────────────────

function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota / private browsing */ }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en');
  const [compare, setCompare] = useState<string[]>([]);
  const [enrol, setEnrol] = useState<number[]>([]);
  const [glossaryTermId, setGlossaryTermId] = useState<string | null>(null);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    const storedLang = load<LangCode>('hcu.lang', 'en');
    const storedCompare = (load<string[]>('hcu.compare', [])).filter(id => PLANS.some(p => p.id === id)).slice(0, 3);
    const storedEnrol = load<number[]>('hcu.enrol', []);
    setLangState(storedLang);
    setCompare(storedCompare);
    setEnrol(storedEnrol);
  }, []);

  const setLang = useCallback((l: LangCode) => {
    setLangState(l);
    save('hcu.lang', l);
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompare(prev => {
      const idx = prev.indexOf(id);
      let next: string[];
      if (idx >= 0) next = prev.filter(x => x !== id);
      else if (prev.length >= 3) return prev; // max 3
      else next = [...prev, id];
      save('hcu.compare', next);
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompare([]);
    save('hcu.compare', []);
  }, []);

  const toggleEnrol = useCallback((idx: number) => {
    setEnrol(prev => {
      const next = prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx];
      save('hcu.enrol', next);
      return next;
    });
  }, []);

  const resetEnrol = useCallback(() => {
    setEnrol([]);
    save('hcu.enrol', []);
  }, []);

  const openTerm = useCallback((id: string) => setGlossaryTermId(id), []);
  const closeTerm = useCallback(() => setGlossaryTermId(null), []);

  return (
    <Ctx.Provider value={{ lang, compare, enrol, glossaryTermId, setLang, toggleCompare, clearCompare, toggleEnrol, resetEnrol, openTerm, closeTerm }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  return useContext(Ctx);
}
