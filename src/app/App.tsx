import React, { useEffect, useState } from 'react';
import { SignUpScreen } from './components/SignUpScreen';
import { LoginScreen } from './components/LoginScreen';
import { SetupQuestionnaire, QuestionnaireData } from './components/SetupQuestionnaire';
import { InitialApplicationOverview } from './components/InitialApplicationOverview';
import { ReviewPage } from './components/ReviewPage';
import { ResultPage } from './components/ResultPage';
import { WorkspaceDashboard } from './components/WorkspaceDashboard';
import { SettingsScreen } from './components/SettingsScreen';
import { HelpScreen } from './components/HelpScreen';
import { PlansScreen } from './components/PlansScreen';
import { AccountScreen } from './components/AccountScreen';
import { BackButton } from './components/BackButton';
import { TopNav } from './components/TopNav';
import { DEMO_USER } from './utils/constants';
import { OnboardingScreen } from './components/OnboardingScreen';

export type Screen =
  | 'onboarding'
  | 'signup'
  | 'login'
  | 'setup-questionnaire'
  | 'review'
  | 'result'
  | 'initial-overview'
  | 'workspace'
  | 'settings'
  | 'plans'
  | 'account'
  | 'help';

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
  profileStage1Complete?: boolean; // Track if user completed Stage 1
}

// Mock user accounts database
const USER_ACCOUNTS: Record<string, { password: string; userData: UserData }> = {
  'dan.fisher@example.com': {
    password: 'password123',
    userData: {
      fullName: 'Dan Fisher',
      email: 'dan.fisher@example.com',
      initials: 'DF',
      country: 'South Africa',
      profileStage1Complete: true, // Dan has completed Stage 1
    },
  },
  'zahra.ahmed@example.com': {
    password: 'password123',
    userData: {
      fullName: 'Zahra Ahmed',
      email: 'zahra.ahmed@example.com',
      initials: 'ZA',
      country: 'United Arab Emirates',
      profileStage1Complete: false, // Zahra hasn't completed Stage 1
    },
  },
};

function getInitialScreen(): Screen {
  if (typeof window === 'undefined') {
    return 'login';
  }
  const params = new URLSearchParams(window.location.search);
  const screen = params.get('screen');
  if (screen === 'login' || screen === 'signup' || screen === 'onboarding') {
    return screen;
  }
  return 'login';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(() => getInitialScreen());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<Screen[]>([]);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [isDemoUser, setIsDemoUser] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (url.searchParams.has('screen')) {
      url.searchParams.delete('screen');
      const query = url.searchParams.toString();
      const nextUrl = `${url.pathname}${query ? `?${query}` : ''}${url.hash}`;
      window.history.replaceState({}, '', nextUrl);
    }
  }, []);

  const handleLogin = (isDemoUserFlag?: boolean, email?: string, password?: string) => {
    // Check if user account exists and password matches
    if (!isDemoUserFlag && email && password) {
      const account = USER_ACCOUNTS[email];
      if (!account || account.password !== password) {
        // Invalid credentials - in a real app, you'd show an error
        // For now, we'll just return and not log in
        return false;
      }
      
      // Valid login - set user data from account
      setIsAuthenticated(true);
      setSetupComplete(true);
      setIsDemoUser(false);
      setUserData(account.userData);
      
      // Route to workspace
      navigateWithHistory('workspace');
      return true;
    }
    
    // Demo user login
    if (isDemoUserFlag) {
      setIsAuthenticated(true);
      setSetupComplete(true);
      setIsDemoUser(true);
      setUserData({
        fullName: DEMO_USER.fullName,
        email: DEMO_USER.email,
        initials: DEMO_USER.avatarInitials,
        profileStage1Complete: true,
      });
      navigateWithHistory('workspace');
      return true;
    }
    
    return false;
  };

  const handleSignUp = (isDemoUserFlag?: boolean, signupData?: { fullName: string; email: string }) => {
    setIsAuthenticated(true);
    setSetupComplete(false); // New users need to complete setup
    setIsDemoUser(isDemoUserFlag || false);
    
    // Set user data from signup form
    if (isDemoUserFlag) {
      setUserData({
        fullName: DEMO_USER.fullName,
        email: DEMO_USER.email,
        initials: DEMO_USER.avatarInitials,
      });
    } else if (signupData) {
      const nameParts = signupData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts[nameParts.length - 1] || '';
      const initials = firstName.charAt(0).toUpperCase() + (lastName && lastName !== firstName ? lastName.charAt(0).toUpperCase() : '');
      
      setUserData({
        fullName: signupData.fullName,
        email: signupData.email,
        initials,
      });
    }
    navigateWithHistory('setup-questionnaire');
  };

  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    setQuestionnaireData(data);
    navigateWithHistory('review');
  };

  const handleSeeResult = () => {
    navigateWithHistory('result');
  };

  const handleEditAnswers = () => {
    navigateWithHistory('setup-questionnaire');
  };

  const handleResultContinue = () => {
    setSetupComplete(true); // Mark setup as complete
    navigateWithHistory('workspace');
  };

  const handleResultReset = () => {
    setQuestionnaireData(null);
    setCurrentScreen('setup-questionnaire');
    setNavigationHistory([]);
  };

  const handleStartApplication = () => {
    setSetupComplete(true); // Mark setup as complete
    navigateWithHistory('workspace');
  };

  const navigateWithHistory = (screen: Screen) => {
    setNavigationHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
  };

  const handleNavigate = (screen: Screen) => {
    navigateWithHistory(screen);
  };

  const handleGoBack = () => {
    if (navigationHistory.length > 0) {
      const previousScreen = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
    }
  };

  const handleProfileComplete = () => {
    // Mark Stage 1 as complete
    if (userData) {
      setUserData({ ...userData, profileStage1Complete: true });
    }
    navigateWithHistory('workspace');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSetupComplete(false);
    setUserData(null);
    setIsDemoUser(false);
    setCurrentScreen('login');
    setNavigationHistory([]);
  };

  // Pre-auth screens
  if (!isAuthenticated) {
    if (currentScreen === 'onboarding') {
      return (
        <OnboardingScreen
          onEstimateChance={() => navigateWithHistory('signup')}
          onLogin={() => navigateWithHistory('login')}
        />
      );
    }

    if (currentScreen === 'signup') {
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
          />
        </div>
      );
    }

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
          />
        </div>
      );
    }
  }

  // Setup screens (authenticated but setup not complete)
  if (isAuthenticated && !setupComplete) {
    if (currentScreen === 'setup-questionnaire') {
      return <SetupQuestionnaire onComplete={handleQuestionnaireComplete} />;
    }

    if (currentScreen === 'initial-overview' && questionnaireData) {
      return (
        <InitialApplicationOverview
          data={questionnaireData}
          onStartApplication={handleStartApplication}
          onReset={handleResetQuestionnaire}
        />
      );
    }

    if (currentScreen === 'review' && questionnaireData) {
      return (
        <ReviewPage
          data={questionnaireData}
          onSeeResult={handleSeeResult}
          onEditAnswers={handleEditAnswers}
        />
      );
    }

    if (currentScreen === 'result' && questionnaireData) {
      return (
        <ResultPage
          data={questionnaireData}
          onContinue={handleResultContinue}
          onReset={handleResultReset}
        />
      );
    }
  }

  // Post-auth screens with layout (authenticated and setup complete)
  if (currentScreen === 'workspace') {
    const userInfo = userData || {
      fullName: 'Dan Fisher',
      email: 'dan.fisher@example.com',
      initials: 'DF',
    };
    return (
      <WorkspaceDashboard
        userName={userInfo.fullName}
        userInitials={userInfo.initials}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
    );
  }

  // Settings, Plans, and Help use simple top nav layout
  if (currentScreen === 'settings' || currentScreen === 'plans' || currentScreen === 'account' || currentScreen === 'help') {
    const userInfo = userData
      ? {
          initials: userData.initials,
          fullName: userData.fullName,
          email: userData.email,
        }
      : {
          initials: 'ZA',
          fullName: 'Zahra Ahmed',
          email: 'zahra.ahmed@example.com',
        };

    const handleClosePage = () => {
      // Navigate back to workspace when closing settings/plans/account pages
      handleGoBack();
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
          {currentScreen === 'settings' && <SettingsScreen isDemoUser={isDemoUser} userData={userData} onClose={handleClosePage} />}
          {currentScreen === 'plans' && <PlansScreen isDemoUser={isDemoUser} onClose={handleClosePage} />}
          {currentScreen === 'account' && <AccountScreen isDemoUser={isDemoUser} userData={userData} onClose={handleClosePage} />}
          {currentScreen === 'help' && <HelpScreen />}
        </div>
      </div>
    );
  }

  // Fallback to workspace if no match
  return <WorkspaceDashboard />;
}
