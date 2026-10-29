import Link from 'next/link';
import { IconChevronRight } from './Icons';

export interface Crumb { label: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((item, i) =>
        i === items.length - 1 ? (
          <span key={i} aria-current="page">{item.label}</span>
        ) : (
          <span key={i}>
            <Link href={item.href!}>{item.label}</Link>
            <IconChevronRight />
          </span>
        )
      )}
    </nav>
  );
}
