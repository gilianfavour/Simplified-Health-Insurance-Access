// Migrated from assets/js/ui.js ICONS map

const S = (d: string, extra?: string) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" ${extra ?? ''}>${d}</svg>`;

// We expose as React SVG components for proper JSX usage
type IconProps = { className?: string };

function Svg({ d, size = 18, strokeWidth = 1.75, children }: { d?: string; size?: number; strokeWidth?: number; children?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={size} height={size}>
      {children}
    </svg>
  );
}

export function IconLogo({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={22} height={22} className={className}><path d="M12 3l7.5 3.2v6.1c0 4.4-3.1 8-7.5 9.7-4.4-1.7-7.5-5.3-7.5-9.7V6.2z" /><path d="M12 9v6M9 12h6" /></svg>;
}
export function IconSearch({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={18} height={18} className={className}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></svg>;
}
export function IconArrow({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={18} height={18} className={className}><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}
export function IconChevronRight({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={14} height={14} className={className}><path d="M9 6l6 6-6 6" /></svg>;
}
export function IconChevronDown({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={18} height={18} className={className}><path d="M6 9l6 6 6-6" /></svg>;
}
export function IconMenu({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={20} height={20} className={className}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}
export function IconClose({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={18} height={18} className={className}><path d="M6 6l12 12M18 6L6 18" /></svg>;
}
export function IconGlobe({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={16} height={16} className={className}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" /></svg>;
}
export function IconCheck({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={15} height={15} className={className}><path d="m4 12.5 5 5L20 6.5" /></svg>;
}
export function IconCross({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={14} height={14} className={className}><path d="M6 6l12 12M18 6L6 18" /></svg>;
}
export function IconQuestion({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={14} height={14} className={className}><circle cx="12" cy="12" r="9" /><path d="M9.6 9.2a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1.1 1-1.1 1.8v.3" /><path d="M12 17.2h.01" /></svg>;
}
export function IconAlert({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={17} height={17} className={className}><path d="M12 3.6 21 19.5H3z" /><path d="M12 9.6v4M12 16.6h.01" /></svg>;
}
export function IconInfo({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={17} height={17} className={className}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
}
export function IconPlus({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={16} height={16} className={className}><path d="M12 5v14M5 12h14" /></svg>;
}
export function IconDoc({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={17} height={17} className={className}><path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5z" /><path d="M13.5 3v5.5H19M8.5 13h7M8.5 17h4" /></svg>;
}
export function IconPrinter({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={17} height={17} className={className}><path d="M7 9V4h10v5" /><rect x="4" y="9" width="16" height="7" rx="2" /><path d="M7 14h10v6H7z" /></svg>;
}
export function IconPhone({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={16} height={16} className={className}><path d="M6.6 3.7h2.8l1.4 3.7-1.9 1.4a11.5 11.5 0 0 0 5.4 5.4l1.4-1.9 3.7 1.4v2.8a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.9a2 2 0 0 1 2-2.2z" /></svg>;
}
export function IconMail({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={16} height={16} className={className}><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m3.8 7 8.2 5.6L20.2 7" /></svg>;
}
export function IconLink({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={16} height={16} className={className}><path d="M10 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7L11 6.9" /><path d="M14 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1.3-1.3" /></svg>;
}
export function IconUser({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={21} height={21} className={className}><circle cx="12" cy="8" r="3.6" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" /></svg>;
}
export function IconEye({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={17} height={17} className={className}><path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" /><circle cx="12" cy="12" r="2.6" /></svg>;
}
export function IconBan({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={15} height={15} className={className}><circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" /></svg>;
}
export function IconCompare({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={22} height={22} className={className}><rect x="3" y="5" width="7.5" height="14" rx="1.6" /><rect x="13.5" y="5" width="7.5" height="14" rx="1.6" /></svg>;
}
export function IconBriefcase({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={21} height={21} className={className}><rect x="3" y="7.5" width="18" height="12" rx="2" /><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 12.5h18" /></svg>;
}
export function IconFamily({ className }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={21} height={21} className={className}><circle cx="8.5" cy="8.5" r="2.8" /><circle cx="16.5" cy="9.5" r="2.2" /><path d="M3.4 19.5a5.2 5.2 0 0 1 10.2 0" /><path d="M15 19.5a4.2 4.2 0 0 1 5.8-3.9" /></svg>;
}
