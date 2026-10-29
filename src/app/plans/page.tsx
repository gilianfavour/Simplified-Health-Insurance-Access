export const instant = false;

import { Suspense } from 'react';
import { PlansClient } from './plans-client';

export default function PlansPage() {
  return (
    <Suspense fallback={<div className="container" style={{ paddingTop: 40 }}>Loading plans…</div>}>
      <PlansClient />
    </Suspense>
  );
}
