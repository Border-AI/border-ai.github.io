import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Logo } from './Logo';
import { Switch } from './ui/switch';
import { checkCredentials, DEMO_USER } from '../utils/constants';
import { CircleAlert, Check, Sparkles } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (isDemoUser?: boolean, email?: string, password?: string) => boolean;
  onNavigateToSignUp: () => void;
}

export function LoginScreen({ onLogin, onNavigateToSignUp }: LoginScreenProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [demoMode, setDemoMode] = useState(false);
  const [error, setError] = useState('');

  // Auto-fill when demo mode is turned on
  useEffect(() => {
    if (demoMode) {
      setFormData({
        email: DEMO_USER.email,
        password: DEMO_USER.password,
      });
      setError('');
    } else {
      setFormData({
        email: '',
        password: '',
      });
    }
  }, [demoMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    // Check credentials
    const isValidCredentials = checkCredentials(formData.email, formData.password);
    
    if (isValidCredentials) {
      onLogin(true, formData.email, formData.password); // Login as demo user
    } else {
      // Try to login with provided credentials
      const loginSuccess = onLogin(false, formData.email, formData.password);
      if (!loginSuccess) {
        setError('The account does not exist or password is wrong');
      }
    }
  };

  const handleFocusInput = (field: 'email' | 'password') => {
    if (demoMode && !formData[field]) {
      if (field === 'email') {
        setFormData({ ...formData, email: DEMO_USER.email });
      } else {
        setFormData({ ...formData, password: DEMO_USER.password });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-600">Log in to continue your application</p>
        </div>

        {/* Demo Mode Toggle */}
        <div className="mb-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E9692C]" />
              <div>
                <p className="text-sm font-medium text-gray-900">Demo Mode</p>
                <p className="text-xs text-gray-600">Auto-fill with sample data</p>
              </div>
            </div>
            <Switch
              checked={demoMode}
              onCheckedChange={setDemoMode}
            />
          </div>
        </div>

        {demoMode && (
          <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">Demo user: Dan Fisher</p>
                <p>Email: {DEMO_USER.email}</p>
                <p>Password: {DEMO_USER.password}</p>
              </div>
            </div>
          </div>
        )}

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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                className="text-sm text-[#E9692C] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onFocus={() => handleFocusInput('password')}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToSignUp}
              className="text-[#E9692C] hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}