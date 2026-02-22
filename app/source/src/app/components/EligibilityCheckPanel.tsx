import React from 'react';
import { Button } from './ui/button';
import { AlertTriangle, AlertCircle, RotateCcw } from 'lucide-react';
import { EligibilityPageCopy } from '../utils/pageContent';

export interface EligibilitySummaryItem {
  question: string;
  answer: string;
}

export interface EligibilityPanelData {
  visaLabel: string;
  approval: number;
  redFlags: string[];
  yellowFlags: string[];
  summary: EligibilitySummaryItem[];
  hasStoredResult: boolean;
}

interface EligibilityCheckPanelProps {
  data: EligibilityPanelData;
  onRepeat: () => void;
  copy?: EligibilityPageCopy;
}

function getApprovalLabel(score: number): string {
  if (score >= 80) return 'High';
  if (score >= 60) return 'Moderate';
  if (score >= 40) return 'Fair';
  return 'Low';
}

export function EligibilityCheckPanel({ data, onRepeat, copy }: EligibilityCheckPanelProps) {
  const score = Math.max(0, Math.min(100, Math.round(data.approval)));
  const scoreLabel = getApprovalLabel(score);
  const resultTitle = copy?.resultTitle || 'Eligibility check result';
  const visaTypeLabel = copy?.visaTypeLabel || 'Visa type';
  const approvalRateLabel = copy?.approvalRateLabel || 'Your Approval chance rate';
  const redFlagsTitle = copy?.redFlagsTitle || 'Red flags';
  const yellowFlagsTitle = copy?.yellowFlagsTitle || 'Other risks';
  const summaryTitle = copy?.summaryTitle || 'Summary';
  const repeatButtonLabel = copy?.repeatButtonLabel || 'Repeat';
  const disclaimer =
    copy?.disclaimer ||
    'Disclaimer: This assessment is for informational purposes only and does not constitute legal advice. Actual approval depends on many factors and is determined solely by Immigration, Refugees and Citizenship Canada (IRCC). Border AI is not affiliated with IRCC.';

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-6">{resultTitle}</h1>

          <div className="space-y-1 mb-6">
            <p className="text-sm text-muted-foreground">{visaTypeLabel}</p>
            <h2 className="text-2xl font-semibold text-[#E9692C]">{data.visaLabel}</h2>
          </div>

          <div className="space-y-1 mb-6">
            <p className="text-sm text-muted-foreground">{approvalRateLabel}</p>
            <h2 className="text-4xl font-bold">
              {scoreLabel} {score}%
            </h2>
          </div>

          {!data.hasStoredResult && (
            <div className="mb-6 border border-amber-200 bg-amber-50 rounded-lg p-4 text-sm text-amber-900">
              No saved test result found yet. Click repeat to run your eligibility check.
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={onRepeat}>
              <RotateCcw className="h-4 w-4 mr-2" />
              {repeatButtonLabel}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-red-200 bg-red-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-700" />
              <h3 className="font-semibold text-red-900">{redFlagsTitle}</h3>
            </div>
            <ul className="space-y-2 text-sm text-red-900">
              {(data.redFlags.length ? data.redFlags : ['No high-risk signals detected.']).map((item, index) => (
                <li key={`red-${index}`}>- {item}</li>
              ))}
            </ul>
          </div>

          <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-amber-700" />
              <h3 className="font-semibold text-amber-900">{yellowFlagsTitle}</h3>
            </div>
            <ul className="space-y-2 text-sm text-amber-900">
              {(data.yellowFlags.length ? data.yellowFlags : ['No medium-risk signals detected.']).map((item, index) => (
                <li key={`yellow-${index}`}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">{summaryTitle}</h3>
          <div className="space-y-3">
            {(data.summary.length ? data.summary : [{ question: 'No summary available yet.', answer: '' }]).map((entry, index) => (
              <div key={`summary-${index}`} className="border border-border rounded-md p-3">
                <p className="text-sm font-medium mb-1">
                  {index + 1}. {entry.question}
                </p>
                {entry.answer ? <p className="text-sm text-muted-foreground">{entry.answer}</p> : null}
              </div>
            ))}
          </div>
        </div>

        <footer className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            {disclaimer}
          </p>
        </footer>
      </div>
    </div>
  );
}
