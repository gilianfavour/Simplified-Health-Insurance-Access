import { IconChevronDown } from './Icons';
import type { FaqEntry } from '@/lib/data';

export function Accordion({ items }: { items: FaqEntry[] }) {
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <details key={i} className="acc">
          <summary>
            {item.q}
            <IconChevronDown />
            <span className="sr-only">— expand answer</span>
          </summary>
          <div className="acc__body"><p>{item.a}</p></div>
        </details>
      ))}
    </div>
  );
}
