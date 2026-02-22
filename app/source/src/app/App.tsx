import React, { useEffect, useState } from 'react';
import { SignUpScreen } from './components/SignUpScreen';
import { LoginScreen } from './components/LoginScreen';
import { WorkspaceDashboard, WorkspaceTab } from './components/WorkspaceDashboard';
import { EligibilityPanelData, EligibilitySummaryItem } from './components/EligibilityCheckPanel';
import { SettingsScreen } from './components/SettingsScreen';
import { HelpScreen } from './components/HelpScreen';
import { PlansScreen } from './components/PlansScreen';
import { AccountScreen } from './components/AccountScreen';
import { BackButton } from './components/BackButton';
import { TopNav } from './components/TopNav';
import { DEMO_USER } from './utils/constants';
import { AppPageCopy, fetchAppPageCopy, readInitialAppPageCopy } from './utils/pageContent';

export type Screen = 'signup' | 'login' | 'eligibilitycheck' | 'workspace' | 'settings' | 'plans' | 'account' | 'help';

export interface IntakeData {
  goal: string;
  personalInfo: any;
  travelHistory: any;
  finances: any;
  ties: any;
  background: any;
  constraints: any;
}

export interface UserData {
  fullName: string;
  email: string;
  initials: string;
  country?: string;
  profileStage1Complete?: boolean;
}

interface EligibilityResultData {
  visaLabel: string;
  approval: number;
  branch?: string;
  redFlags: string[];
  yellowFlags: string[];
  summary: EligibilitySummaryItem[];
  createdAt?: string;
}

const ELIGIBILITY_RESULT_STORAGE_KEY = 'border_ai_eligibility_result';
const DEFAULT_ELIGIBILITY_RESULT: EligibilityResultData = {
  visaLabel: 'Visitor visa',
  approval: 65,
  redFlags: [],
  yellowFlags: [],
  summary: []
};

const SCREEN_PATHS: Record<Screen, string> = {
  signup: '/app/signup',
  login: '/app/login',
  eligibilitycheck: '/app/eligibilitycheck',
  workspace: '/app/dashboard',
  settings: '/app/dashboard',
  plans: '/app/dashboard',
  account: '/app/dashboard',
  help: '/app/dashboard'
};

const USER_ACCOUNTS: Record<string, { password: string; userData: UserData }> = {
  'dan.fisher@example.com': {
    password: 'password123',
    userData: {
      fullName: 'Dan Fisher',
      email: 'dan.fisher@example.com',
      initials: 'DF',
      country: 'South Africa',
      profileStage1Complete: true
    }
  },
  'zahra.ahmed@example.com': {
    password: 'password123',
    userData: {
      fullName: 'Zahra Ahmed',
      email: 'zahra.ahmed@example.com',
      initials: 'ZA',
      country: 'United Arab Emirates',
      profileStage1Complete: false
    }
  }
};

function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

function screenFromPath(pathname: string): Screen {
  const path = normalizePath(pathname);
  if (path === '/app/login') return 'login';
  if (path === '/app/eligibilitycheck') return 'eligibilitycheck';
  if (path === '/app/dashboard') return 'workspace';
  return 'signup';
}

function pushPathForScreen(screen: Screen, replace = false) {
  if (typeof window === 'undefined') return;
  const path = SCREEN_PATHS[screen];
  if (replace) {
    window.history.replaceState({}, '', path);
    return;
  }
  window.history.pushState({}, '', path);
}

function readStoredEligibilityResult(): EligibilityResultData | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(ELIGIBILITY_RESULT_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as EligibilityResultData;
    if (!parsed || typeof parsed.visaLabel !== 'string') return null;
    const approval = Number(parsed.approval);
    if (!Number.isFinite(approval)) return null;
    const redFlags = Array.isArray(parsed.redFlags) ? parsed.redFlags.filter((item) => typeof item === 'string') : [];
    const yellowFlags = Array.isArray(parsed.yellowFlags) ? parsed.yellowFlags.filter((item) => typeof item === 'string') : [];
    const summary = Array.isArray(parsed.summary)
      ? parsed.summary
          .filter((entry) => entry && typeof entry.question === 'string')
          .map((entry) => ({
            question: String(entry.question),
            answer: typeof entry.answer === 'string' ? entry.answer : 'Not answered'
          }))
      : [];
    return {
      ...parsed,
      approval: Math.max(0, Math.min(100, Math.round(approval))),
      redFlags,
      yellowFlags,
      summary
    };
  } catch {
    return null;
  }
}

function clearStoredEligibilityResult() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(ELIGIBILITY_RESULT_STORAGE_KEY);
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(() => {
    if (typeof window === 'undefined') return 'signup';
    return screenFromPath(window.location.pathname);
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>([]);
  const [isDemoUser, setIsDemoUser] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResultData | null>(() => readStoredEligibilityResult());
  const [pageCopy, setPageCopy] = useState<AppPageCopy>(() => readInitialAppPageCopy());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    pushPathForScreen(currentScreen, true);

    const onPopState = () => {
      setCurrentScreen(screenFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const path = SCREEN_PATHS[currentScreen];
    if (!path || typeof window === 'undefined') return;
    let cancelled = false;
    fetchAppPageCopy(path).then((copy) => {
      if (cancelled || !copy || Object.keys(copy).length === 0) return;
      setPageCopy(copy);
    });
    return () => {
      cancelled = true;
    };
  }, [currentScreen]);

  useEffect(() => {
    if (!isAuthenticated && currentScreen !== 'signup' && currentScreen !== 'login') {
      setCurrentScreen('signup');
      pushPathForScreen('signup', true);
    }
  }, [isAuthenticated, currentScreen]);

  const navigateWithHistory = (screen: Screen, options?: { replace?: boolean; trackHistory?: boolean }) => {
    const replace = options?.replace ?? false;
    const trackHistory = options?.trackHistory ?? true;

    if (trackHistory) {
      setNavigationHistory((prev) => [...prev, currentScreen]);
    }
    setCurrentScreen(screen);
    pushPathForScreen(screen, replace);
  };

  const handleLogin = (isDemoUserFlag?: boolean, email?: string, password?: string) => {
    if (!isDemoUserFlag && email && password) {
      const account = USER_ACCOUNTS[email];
      if (!account || account.password !== password) {
        return false;
      }

      setIsAuthenticated(true);
      setIsDemoUser(false);
      setUserData(account.userData);
      navigateWithHistory('workspace', { trackHistory: false, replace: true });
      return true;
    }

    if (isDemoUserFlag) {
      setIsAuthenticated(true);
      setIsDemoUser(true);
      setUserData({
        fullName: DEMO_USER.fullName,
        email: DEMO_USER.email,
        initials: DEMO_USER.avatarInitials,
        profileStage1Complete: true
      });
      navigateWithHistory('workspace', { trackHistory: false, replace: true });
      return true;
    }

    return false;
  };

  const handleSignUp = (isDemoUserFlag?: boolean, signupData?: { fullName: string; email: string }) => {
    setIsAuthenticated(true);
    setIsDemoUser(isDemoUserFlag || false);

    if (isDemoUserFlag) {
      setUserData({
        fullName: DEMO_USER.fullName,
        email: DEMO_USER.email,
        initials: DEMO_USER.avatarInitials
      });
    } else if (signupData) {
      const nameParts = signupData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts[nameParts.length - 1] || '';
      const initials = firstName.charAt(0).toUpperCase() + (lastName && lastName !== firstName ? lastName.charAt(0).toUpperCase() : '');

      setUserData({
        fullName: signupData.fullName,
        email: signupData.email,
        initials
      });
    }

    setEligibilityResult(readStoredEligibilityResult());
    navigateWithHistory('eligibilitycheck', { trackHistory: false, replace: true });
  };

  const handleNavigate = (screen: Screen) => {
    navigateWithHistory(screen);
  };

  const handleWorkspaceTabChange = (tab: WorkspaceTab) => {
    if (tab === 'eligibility-check') {
      if (currentScreen !== 'eligibilitycheck') {
        navigateWithHistory('eligibilitycheck', { trackHistory: false, replace: true });
      }
      return;
    }

    if (currentScreen !== 'workspace') {
      navigateWithHistory('workspace', { trackHistory: false, replace: true });
    }
  };

  const handleRepeatEligibility = () => {
    const params = new URLSearchParams({
      mode: 'eligibility-only',
      destination: 'app'
    });

    if (eligibilityResult?.branch) {
      params.set('branch', eligibilityResult.branch);
    }

    window.location.href = `/eligibility-check/?${params.toString()}`;
  };

  const eligibilityPanelData: EligibilityPanelData = {
    visaLabel: (eligibilityResult || DEFAULT_ELIGIBILITY_RESULT).visaLabel,
    approval: (eligibilityResult || DEFAULT_ELIGIBILITY_RESULT).approval,
    redFlags: (eligibilityResult || DEFAULT_ELIGIBILITY_RESULT).redFlags,
    yellowFlags: (eligibilityResult || DEFAULT_ELIGIBILITY_RESULT).yellowFlags,
    summary: (eligibilityResult || DEFAULT_ELIGIBILITY_RESULT).summary,
    hasStoredResult: Boolean(eligibilityResult)
  };

  const handleGoBack = () => {
    if (!navigationHistory.length) return;
    const previousScreen = navigationHistory[navigationHistory.length - 1];
    setNavigationHistory((prev) => prev.slice(0, -1));
    setCurrentScreen(previousScreen);
    pushPathForScreen(previousScreen, true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setIsDemoUser(false);
    setCurrentScreen('login');
    setNavigationHistory([]);
    pushPathForScreen('login', true);
  };

  if (!isAuthenticated) {
    if (currentScreen === 'login') {
      return (
        <div>
          {navigationHistory.length > 0 && (
            <div className="absolute top-4 left-4 z-10">
              <BackButton onBack={handleGoBack} />
            </div>
          )}
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToSignUp={() => navigateWithHistory('signup')}
            copy={pageCopy.login}
          />
        </div>
      );
    }

    return (
      <div>
        {navigationHistory.length > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <BackButton onBack={handleGoBack} />
          </div>
        )}
        <SignUpScreen
          onSignUp={handleSignUp}
          onNavigateToLogin={() => navigateWithHistory('login')}
          copy={pageCopy.signup}
        />
      </div>
    );
  }

  if (currentScreen === 'workspace' || currentScreen === 'eligibilitycheck') {
    const userInfo = userData || {
      fullName: 'Dan Fisher',
      email: 'dan.fisher@example.com',
      initials: 'DF'
    };
    return (
      <WorkspaceDashboard
        userName={userInfo.fullName}
        userInitials={userInfo.initials}
        initialTab={currentScreen === 'eligibilitycheck' ? 'eligibility-check' : 'home'}
        eligibilityData={eligibilityPanelData}
        eligibilityCopy={pageCopy.eligibility}
        dashboardCopy={pageCopy.dashboard}
        onRepeatEligibility={handleRepeatEligibility}
        onTabChange={handleWorkspaceTabChange}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
    );
  }

  if (currentScreen === 'settings' || currentScreen === 'plans' || currentScreen === 'account' || currentScreen === 'help') {
    const userInfo = userData
      ? {
          initials: userData.initials,
          fullName: userData.fullName,
          email: userData.email
        }
      : {
          initials: 'ZA',
          fullName: 'Zahra Ahmed',
          email: 'zahra.ahmed@example.com'
        };

    return (
      <div className="flex flex-col h-screen bg-background">
        <TopNav
          caseName="Canada Work Permit (Sample)"
          userInitials={userInfo.initials}
          userName={userInfo.fullName}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <div className="flex-1 overflow-auto">
          {currentScreen === 'settings' && <SettingsScreen isDemoUser={isDemoUser} userData={userData} onClose={handleGoBack} />}
          {currentScreen === 'plans' && <PlansScreen isDemoUser={isDemoUser} onClose={handleGoBack} />}
          {currentScreen === 'account' && <AccountScreen isDemoUser={isDemoUser} userData={userData} onClose={handleGoBack} />}
          {currentScreen === 'help' && <HelpScreen />}
        </div>
      </div>
    );
  }

  return (
    <WorkspaceDashboard
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    />
  );
}
