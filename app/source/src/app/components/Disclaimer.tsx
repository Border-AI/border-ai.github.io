import React from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { AlertTriangle } from 'lucide-react';

export function Disclaimer() {
  return (
    <Alert className="bg-amber-50 border-amber-200">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-sm text-gray-700">
        <strong>Disclaimer:</strong> Border AI provides general information, AI-guided assistance, and document-preparation support, not legal advice. This doesn't guarantee approval or eligibility.
      </AlertDescription>
    </Alert>
  );
}