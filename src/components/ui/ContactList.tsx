import { IconPhone, IconMail, IconLink, IconUser, IconInfo } from './Icons';
import type { Insurer } from '@/lib/data';

export function ContactList({ insurer }: { insurer: Insurer | null }) {
  if (!insurer) return null;
  const rows: React.ReactNode[] = [];

  if (insurer.phone) {
    rows.push(
      <a key="phone" className="contact-row" href={`tel:${insurer.phone.replace(/[^+\d]/g, '')}`}>
        <span className="contact-row__icon"><IconPhone /></span>
        <span><span className="contact-row__k">Phone</span><span className="contact-row__v">{insurer.phone}</span></span>
      </a>
    );
  }
  if (insurer.email) {
    rows.push(
      <a key="email" className="contact-row" href={`mailto:${insurer.email}`}>
        <span className="contact-row__icon"><IconMail /></span>
        <span><span className="contact-row__k">Email</span><span className="contact-row__v">{insurer.email}</span></span>
      </a>
    );
  }
  if (insurer.website) {
    rows.push(
      <a key="web" className="contact-row" href={insurer.website} target="_blank" rel="noopener noreferrer">
        <span className="contact-row__icon"><IconLink /></span>
        <span><span className="contact-row__k">Website</span><span className="contact-row__v">{insurer.website.replace(/^https?:\/\//, '')}</span></span>
      </a>
    );
  }
  if (insurer.intermediary) {
    rows.push(
      <div key="int" className="contact-row">
        <span className="contact-row__icon"><IconUser /></span>
        <span><span className="contact-row__k">Intermediary route</span><span className="contact-row__v" style={{ fontWeight: 500 }}>{insurer.intermediary}</span></span>
      </div>
    );
  }
  if (rows.length === 0) {
    rows.push(
      <div key="none" className="contact-row">
        <span className="contact-row__icon"><IconInfo /></span>
        <span><span className="contact-row__k">Not verified</span><span className="contact-row__v" style={{ fontWeight: 500 }}>No verified phone, email or website is supplied for this demonstration record.</span></span>
      </div>
    );
  }
  return <div className="contact-list">{rows}</div>;
}
