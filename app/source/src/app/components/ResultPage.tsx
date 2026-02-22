import React from 'react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { CheckCircle2, AlertCircle, Info, RotateCcw } from 'lucide-react';

interface ResultPageProps {
  data: {
    visaType: string;
    approvalChance: number;
    hasStoredResult?: boolean;
  };
  onContinue: () => void;
  onReset: () => void;
}

export function ResultPage({ data, onContinue, onReset }: ResultPageProps) {
  const approvalChance = Math.max(0, Math.min(100, Math.round(data.approvalChance)));

  const getApprovalLevel = () => {
    if (approvalChance >= 80) return { label: 'High', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
    if (approvalChance >= 60) return { label: 'Moderate', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    if (approvalChance >= 40) return { label: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
    return { label: 'Low', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
  };

  const level = getApprovalLevel();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <Logo />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">Eligibility check result</h1>
              <p className="text-gray-600">
                This page shows your eligibility check result based on your completed questionnaire.
              </p>
            </div>

            {/* Visa Type */}
            <div className="mb-8 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <Info className="w-5 h-5 text-[#E9692C]" />
                <h2 className="text-lg font-semibold text-gray-900">User Visa type</h2>
              </div>
              <p className="text-xl font-medium text-[#E9692C]">{data.visaType}</p>
            </div>

            {/* Approval Chance */}
            <div className={`mb-8 p-6 ${level.bgColor} rounded-lg border ${level.borderColor}`}>
              <div className="flex items-center gap-3 mb-4">
                {approvalChance >= 60 ? (
                  <CheckCircle2 className={`w-6 h-6 ${level.color}`} />
                ) : (
                  <AlertCircle className={`w-6 h-6 ${level.color}`} />
                )}
                <h2 className="text-lg font-semibold text-gray-900">User Approval chance rate</h2>
              </div>
              <div className="flex items-end gap-4 mb-4">
                <div className="text-5xl font-bold text-gray-900">{approvalChance}%</div>
                <div className={`text-xl font-medium ${level.color} mb-2`}>{level.label}</div>
              </div>
              <div className="w-full bg-white rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 transition-all duration-500 ${
                    approvalChance >= 80 ? 'bg-green-500' :
                    approvalChance >= 60 ? 'bg-blue-500' :
                    approvalChance >= 40 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${approvalChance}%` }}
                ></div>
              </div>
            </div>

            {!data.hasStoredResult && (
              <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  We could not find a saved eligibility result from your pre-signup flow. Click reset and repeat to start from the first question.
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong>Disclaimer:</strong> This assessment is for informational purposes only and does not constitute legal advice. 
                Actual approval depends on many factors and is determined solely by Immigration, Refugees and Citizenship Canada (IRCC). 
                Border AI is not affiliated with IRCC.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={onReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset and Repeat
              </Button>
              <Button
                onClick={onContinue}
                className="flex-1 bg-[#E9692C] hover:bg-[#d15a24] text-lg py-6"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
