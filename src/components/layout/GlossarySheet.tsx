'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import { GLOSSARY } from '@/lib/data';
import { IconClose } from '@/components/ui/Icons';

export function GlossarySheet() {
  const { lang, glossaryTermId, closeTerm } = useApp();
  const t = makeT(lang);
  const open = !!glossaryTermId;
  const entry = glossaryTermId ? GLOSSARY.find(g => g.id === glossaryTermId || g.term.toLowerCase() === glossaryTermId.toLowerCase()) : null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeTerm(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeTerm]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div
        className={`sheet-back${open ? ' is-open' : ''}`}
        id="sheetBack"
        onClick={closeTerm}
        aria-hidden="true"
        hidden={!open}
      />
      <aside
        className={`sheet${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheetTitle"
        aria-hidden={!open}
      >
        <div className="sheet__grab" />
        <h3 id="sheetTitle">{entry?.term ?? ''}</h3>
        <p>{entry?.definition ?? ''}</p>
        {entry?.example && (
          <div className="example">
            <b>{t('guide.example')}:</b> {entry.example}
          </div>
        )}
        <div className="sheet__foot">
          <Link className="btn btn--secondary btn--block" href="/guide" onClick={closeTerm}>
            {t('nav.guide')}
          </Link>
          <button className="btn" type="button" onClick={closeTerm}>
            {t('common.close')}
          </button>
        </div>
      </aside>
    </>
  );
}
