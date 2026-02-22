import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2, X } from 'lucide-react';

export function PlansScreen({ isDemoUser = false, onClose }: { isDemoUser?: boolean; onClose?: () => void }) {
  const basicFeatures = [
    '1 Active case',
    '200 AI chat credits',
    'Approval chance estimation',
  ];

  const proFeatures = [
    '3 Active cases',
    'Unlimited AI chat',
    'Approval chance estimation',
    'AI-powered check & correction',
    'AI-powered document/file generation',
    'Document editing & management',
    'Chat with legal advisor',
  ];

  const freeFeatures = [
    'AI-powered document/file generation',
    'Document editing & management',
  ];

  // Demo user has Pro plan
  const currentPlan = isDemoUser ? 'pro' : 'basic';

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h1 className="text-2xl font-semibold mb-2">Choose Your Plan</h1>
            <p className="text-sm text-muted-foreground">
              Select the plan that best fits your needs
            </p>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <Card className="p-6 shadow-sm border border-border flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Basic</h2>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-semibold">Free</span>
              </div>
            </div>

            <div className="mb-6 flex-1">
              <p className="text-sm font-medium mb-3">Includes:</p>
              <ul className="space-y-3">
                {basicFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E9692C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {currentPlan === 'basic' ? (
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            ) : (
              <Button variant="outline" className="w-full">
                Downgrade to Basic
              </Button>
            )}
          </Card>

          {/* Pro Plan */}
          <Card className={`p-6 shadow-sm ${currentPlan === 'pro' ? 'border-2 border-[#E9692C]' : 'border-2 border-[#E9692C]'} flex flex-col relative`}>
            {currentPlan !== 'pro' && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#E9692C] text-white">
                Recommended
              </Badge>
            )}
            {currentPlan === 'pro' && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white">
                Current Plan
              </Badge>
            )}
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Pro</h2>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Pricing per case:
                </p>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Temporary visa & permits:</span> $25
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Permanent Residency:</span> $120
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6 flex-1">
              <p className="text-sm font-medium mb-3">Includes:</p>
              <ul className="space-y-3">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E9692C] flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {currentPlan === 'pro' ? (
              <Button variant="outline" className="w-full" disabled>
                Current Plan
              </Button>
            ) : (
              <Button className="w-full bg-[#E9692C] hover:bg-[#d15a24]">
                Upgrade to Pro
              </Button>
            )}
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include secure document storage and 24/7 access to your application
          </p>
        </div>
      </div>
    </div>
  );
}