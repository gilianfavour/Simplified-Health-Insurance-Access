import { IconCheck, IconCross, IconQuestion } from './Icons';
import type { BenefitStatus } from '@/lib/data';

interface Props {
  status: BenefitStatus;
  label?: string;
}

const MAP: Record<BenefitStatus, { cls: string; Icon: React.ComponentType }> = {
  covered:     { cls: 'pill pill--covered', Icon: IconCheck },
  'not-covered': { cls: 'pill pill--not',   Icon: IconCross },
  'check-first': { cls: 'pill pill--check', Icon: IconQuestion },
};

export function StatusPill({ status, label }: Props) {
  const { cls, Icon } = MAP[status] ?? MAP['check-first'];
  return (
    <span className={cls}>
      <Icon />
      {label}
    </span>
  );
}
