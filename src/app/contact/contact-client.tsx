'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { makeT } from '@/lib/i18n';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { IconArrow } from '@/components/ui/Icons';

export function ContactClient() {
  const { lang } = useApp();
  const t = makeT(lang);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!values.message.trim()) errs.message = t('form.errorMessage');
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
      errs.email = t('form.errorEmail');
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSent(true);
  }

  function copyMessage() {
    const text = `Message: ${values.message}\nFrom: ${values.name || 'Anonymous'} ${values.email}`;
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: t('nav.home'), href: '/' }, { label: t('nav.contact') }]} />
        <div style={{ margin: '22px 0 26px', maxWidth: 660 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4.4vw,2.5rem)' }}>{t('contact.title')}</h1>
          <p className="muted" style={{ marginTop: 10 }}>{t('contact.lead')}</p>
        </div>

        <div className="detail-layout">
          <div className="card card--pad">
            {sent && (
              <div className="success">
                <b>{t('form.successTitle')}</b> {t('form.successBody')}
              </div>
            )}
            <form className="form" onSubmit={handleSubmit} noValidate style={{ marginTop: sent ? 16 : 0 }}>
              <div className="form__row">
                <div className="field">
                  <label htmlFor="c-name">
                    {t('form.name')} <span className="muted">({t('form.nameHint')})</span>
                  </label>
                  <input
                    id="c-name" name="name" type="text"
                    value={values.name} autoComplete="name"
                    onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label htmlFor="c-email">
                    {t('form.email')} <span className="muted">({t('form.emailHint')})</span>
                  </label>
                  <input
                    id="c-email" name="email" type="email"
                    value={values.email} autoComplete="email"
                    aria-invalid={!!errors.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  />
                  {errors.email && <span className="field__error">{errors.email}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-message">{t('form.message')}</label>
                <textarea
                  id="c-message" name="message"
                  value={values.message}
                  aria-invalid={!!errors.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                />
                {errors.message && <span className="field__error">{errors.message}</span>}
                <span className="field__hint">{t('form.privacyHint')}</span>
              </div>
              <button className="btn" type="submit">{t('form.send')}</button>
            </form>
            {sent && (
              <div className="field" style={{ marginTop: 18 }}>
                <label htmlFor="copybox">{t('form.copy')}</label>
                <textarea
                  id="copybox" readOnly rows={6}
                  value={`Message: ${values.message}\nFrom: ${values.name || 'Anonymous'} ${values.email}`}
                  onChange={() => {}}
                />
                <button className="btn btn--secondary btn--sm" type="button" onClick={copyMessage}>
                  {t('form.copy')}
                </button>
              </div>
            )}
          </div>

          <aside>
            <div className="side-card">
              <h2 style={{ fontSize: '.95rem' }}>{t('contact.title')}</h2>
              <p className="small muted" style={{ marginTop: 6 }}>
                This prototype has no verified platform phone number or email address.
              </p>
              <hr />
              <Link className="linkish" href="/guide">{t('guide.glossaryTitle')} <IconArrow /></Link>
              <hr />
              <p className="small muted">{t('form.privacyHint')}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
