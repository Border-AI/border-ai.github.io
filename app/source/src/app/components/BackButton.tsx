import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface BackButtonProps {
  onBack: () => void;
  className?: string;
}

export function BackButton({ onBack, className = '' }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onBack}
      className={`gap-2 text-gray-600 hover:text-gray-900 ${className}`}
    >
      <ArrowLeft className="size-4" />
      Back
    </Button>
  );
}
