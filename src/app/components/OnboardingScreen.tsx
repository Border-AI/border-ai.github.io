import React from 'react';
import { Gauge, FileText, Sparkles } from 'lucide-react';
const logoImage = "/border-ai-logo.svg";
import { Button } from './ui/button';

interface OnboardingScreenProps {
  onEstimateChance: () => void;
  onLogin?: () => void;
}

const FEATURES = [
  {
    title: 'Approval chance estimation',
    description: 'AI scoring to gauge your readiness in seconds.',
    icon: Gauge,
  },
  {
    title: 'Doc preparation',
    description: 'Auto-organized forms, checklists, and evidence.',
    icon: FileText,
  },
  {
    title: 'Data-based suggestions',
    description: 'Guidance grounded in IRCC updates and case data.',
    icon: Sparkles,
  },
];

export function OnboardingScreen({ onEstimateChance, onLogin }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
      <div className="max-w-5xl w-full space-y-16 text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              src={logoImage}
              alt="Border AI Logo"
              className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-xl"
            />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-semibold">Your AI visa assistant and advisor</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Personalized pathways, crystal-clear requirements, and AI-powered prep for Canadian visas.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 text-left">
          {FEATURES.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-2xl border bg-card/60 p-7 shadow-sm space-y-3">
              <div className="w-14 h-14 rounded-3xl bg-slate-100 border border-white/70 text-[#E9692C] flex items-center justify-center shadow-inner">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-base text-muted-foreground leading-snug">{description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <Button
            size="lg"
            className="w-full max-w-md text-lg py-7"
            onClick={onEstimateChance}
          >
            Estimate your chance
          </Button>
          {onLogin && (
            <button
              type="button"
              onClick={onLogin}
              className="text-muted-foreground hover:text-foreground transition text-base font-medium"
            >
              Already have an account? Log in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
