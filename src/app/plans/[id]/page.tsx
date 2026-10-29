// Server Component — resolves params, then hands off to the Client Component
export const instant = false;

import { notFound } from 'next/navigation';
import { planById } from '@/lib/data';
import { PlanDetailClient } from './plan-detail-client';

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plan = planById(id);
  if (!plan) notFound();
  return <PlanDetailClient plan={plan} />;
}
