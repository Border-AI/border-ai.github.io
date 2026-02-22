import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';
import { PlanEntryPageCopy } from '../utils/pageContent';

interface PlanEntryPageProps {
  copy?: PlanEntryPageCopy;
  onBack: () => void;
  onStartTrial: () => void;
  onGetBasic: () => void;
  onGetPro: () => void;
}

const BASIC_FEATURES = [
  'AI-powered eligibility check',
  'Personalized visa checklist',
  'Document organization hub',
  'Updates and reminders',
  'Advisor marketplace access',
  'Chat support'
];

const PRO_FEATURES = [
  'Everything in Basic',
  'Unlimited document workspaces',
  'Real-time status insights',
  'Advisor marketplace priority',
  '24/7 customer support'
];

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-base">
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#D9713D]" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export function PlanEntryPage({ copy, onBack, onStartTrial, onGetBasic, onGetPro }: PlanEntryPageProps) {
  const heading = copy?.heading || 'Plans';
  const backButtonLabel = copy?.backButtonLabel || 'Back to eligibility check';
  const trialTitle = copy?.trialTitle || 'Free trial';
  const trialDescription =
    copy?.trialDescription || 'Start your 10 day free trial with basic plans access. No card info is required.';
  const trialNote = copy?.trialNote || '';
  const startTrialLabel = copy?.startTrialLabel || 'Start your free trial';
  const basicButtonLabel = copy?.basicButtonLabel || 'Get Basic';
  const proButtonLabel = copy?.proButtonLabel || 'Get Pro';

  return (
    <div className="min-h-screen bg-[#fdf9f6] text-[#151515]">
      <div className="mx-auto w-full max-w-[76rem] p-6 md:p-8 space-y-8">
        <div className="relative flex h-10 items-center">
          <Button
            aria-label={backButtonLabel}
            variant="outline"
            size="sm"
            className="h-10 w-10 rounded-xl border-[#eadfd8] bg-white p-0 text-[#151515] hover:bg-[#fbe6da]"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="absolute left-1/2 -translate-x-1/2">
            <Logo className="h-12" />
          </div>
        </div>

        <h1 className="text-4xl font-bold leading-tight">{heading}</h1>

        <Card className="w-full rounded-xl border border-[#eadfd8] bg-[#fbe6da] p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
          <h2 className="text-3xl font-bold text-[#b4572b]">{trialTitle}</h2>
          <p className="mt-2 text-lg text-[#151515]">{trialDescription}</p>
          {trialNote ? <p className="mt-1 text-lg text-[#5f5f5f]">{trialNote}</p> : null}
          <Button
            className="mt-5 rounded-xl bg-[#d9713d] px-6 py-2.5 font-semibold text-white shadow-[0_10px_25px_rgba(217,113,61,0.3)] hover:bg-[#c96433]"
            onClick={onStartTrial}
          >
            {startTrialLabel}
          </Button>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="flex h-full flex-col rounded-xl border border-[#eadfd8] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <h2 className="text-3xl font-bold">Basic</h2>
            <p className="mt-2 text-3xl font-semibold">
              $19 <span className="text-base font-normal text-[#5f5f5f]">/m</span>
            </p>
            <p className="mt-2 text-lg text-[#5f5f5f]">Solo applicants validating their pathway.</p>
            <div className="mt-5 flex-1">
              <FeatureList items={BASIC_FEATURES} />
            </div>
            <Button
              className="mt-auto w-full rounded-xl bg-[#d9713d] px-6 py-2.5 font-semibold text-white shadow-[0_10px_25px_rgba(217,113,61,0.3)] hover:bg-[#c96433]"
              onClick={onGetBasic}
            >
              {basicButtonLabel}
            </Button>
          </Card>

          <Card className="flex h-full flex-col rounded-xl border-2 border-[#d9713d] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
            <h2 className="text-3xl font-bold">Pro</h2>
            <p className="mt-2 text-3xl font-semibold">
              $99 <span className="text-base font-normal text-[#5f5f5f]">/m</span>
            </p>
            <p className="mt-2 text-lg text-[#5f5f5f]">Power users and consultants guiding multiple applicants.</p>
            <div className="mt-5 flex-1">
              <FeatureList items={PRO_FEATURES} />
            </div>
            <Button
              className="mt-auto w-full rounded-xl bg-[#d9713d] px-6 py-2.5 font-semibold text-white shadow-[0_10px_25px_rgba(217,113,61,0.3)] hover:bg-[#c96433]"
              onClick={onGetPro}
            >
              {proButtonLabel}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
