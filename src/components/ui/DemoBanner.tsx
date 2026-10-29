import { IconAlert } from './Icons';
import { SOURCES_NOTE } from '@/lib/data';

export function DemoBanner({ text }: { text?: string }) {
  return (
    <div className="demo-banner">
      <IconAlert />
      <div>
        <b>DEMONSTRATION DATA — NOT A REAL INSURANCE OFFER.</b>{' '}
        {text ?? SOURCES_NOTE}
      </div>
    </div>
  );
}

export function DemoPill() {
  return <span className="pill pill--demo">Demonstration data</span>;
}
