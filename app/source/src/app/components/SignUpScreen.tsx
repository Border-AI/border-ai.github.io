import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Logo } from './Logo';
import { Switch } from './ui/switch';
import { validatePassword, DEMO_USER } from '../utils/constants';
import { Check, X, CircleAlert, Sparkles } from 'lucide-react';

interface SignUpScreenProps {
  onSignUp: (isDemoUser?: boolean, signupData?: { fullName: string; email: string }) => void;
  onNavigateToLogin: () => void;
}

export function SignUpScreen({ onSignUp, onNavigateToLogin }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });
  const [demoMode, setDemoMode] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    errors: [] as string[],
  });
  const [error, setError] = useState('');

  // Auto-fill when demo mode is turned on
  useEffect(() => {
    if (demoMode) {
      setFormData({
        fullName: DEMO_USER.fullName,
        email: DEMO_USER.email,
        password: DEMO_USER.password,
        confirmPassword: DEMO_USER.password,
        agreedToTerms: true,
      });
      setError('');
    } else {
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false,
      });
    }
  }, [demoMode]);

  // Validate password as user types
  useEffect(() => {
    if (formData.password) {
      const validation = validatePassword(formData.password);
      setPasswordValidation(validation);
    } else {
      setPasswordValidation({ isValid: false, errors: [] });
    }
  }, [formData.password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate password
    if (!passwordValidation.isValid) {
      setError('Password does not meet requirements');
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check if terms are agreed
    if (!formData.agreedToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    // If demo mode, sign up as demo user, otherwise pass signup data
    onSignUp(demoMode, demoMode ? undefined : { fullName: formData.fullName, email: formData.email });
  };

  const handleFocusInput = (field: keyof typeof formData) => {
    if (demoMode && !formData[field]) {
      if (field === 'fullName') {
        setFormData({ ...formData, fullName: DEMO_USER.fullName });
      } else if (field === 'email') {
        setFormData({ ...formData, email: DEMO_USER.email });
      } else if (field === 'password') {
        setFormData({ ...formData, password: DEMO_USER.password });
      } else if (field === 'confirmPassword') {
        setFormData({ ...formData, confirmPassword: DEMO_USER.password });
      }
    }
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'One lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'One number', met: /[0-9]/.test(formData.password) },
    { text: 'One symbol (!@#$%^&*, etc.)', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="mb-2">Create Your Account</h1>
        </div>

        {/* Demo Mode Toggle */}
        <div
          className={`mb-4 p-3 rounded-lg border transition-colors ${
            demoMode ? 'bg-orange-50 border-orange-200' : 'bg-gray-100 border-gray-200 text-gray-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className={`w-4 h-4 ${demoMode ? 'text-[#E9692C]' : 'text-gray-400'}`} />
              <div>
                <p className={`text-sm font-medium ${demoMode ? 'text-gray-900' : 'text-gray-500'}`}>
                  Demo mode — {demoMode ? 'active' : 'inactive'}
                </p>
                <p className={`text-xs ${demoMode ? 'text-gray-600' : 'text-gray-500'}`}>
                  Auto-fill with sample data when active
                </p>
              </div>
            </div>
            <Switch
              checked={demoMode}
              onCheckedChange={setDemoMode}
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center gap-2">
              <CircleAlert className="w-4 h-4 text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              onFocus={() => handleFocusInput('fullName')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => handleFocusInput('email')}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onFocus={() => {
                handleFocusInput('password');
                setPasswordFocused(true);
              }}
              onBlur={() => setPasswordFocused(false)}
              required
            />
            
            {/* Password Requirements */}
            {(passwordFocused || formData.password) && (
              <div className="mt-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-xs font-medium text-gray-700 mb-2">Password requirements:</p>
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {req.met ? (
                        <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                      ) : (
                        <X className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={`text-xs ${req.met ? 'text-green-700' : 'text-gray-600'}`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              onFocus={() => handleFocusInput('confirmPassword')}
              required
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <X className="w-3 h-3" />
                Passwords do not match
              </p>
            )}
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Passwords match
              </p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={formData.agreedToTerms}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, agreedToTerms: checked as boolean })
              }
            />
            <Label htmlFor="terms" className="text-sm font-normal leading-relaxed cursor-pointer">
              I agree to the Terms of Service and Privacy Policy. I understand that Border AI provides information assistance, not legal advice.
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={!formData.agreedToTerms || !passwordValidation.isValid}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-[#E9692C] hover:underline"
            >
              Log in
            </button>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-gray-500 text-center">
            By creating an account, you acknowledge that Border AI is not intended for collecting personally identifiable information (PII) or securing highly sensitive data.
          </p>
        </div>
      </Card>
    </div>
  );
}
