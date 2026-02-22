export interface SignUpPageCopy {
  title?: string;
  submitButton?: string;
  existingAccountLabel?: string;
  loginLinkLabel?: string;
}

export interface LoginPageCopy {
  title?: string;
  subtitle?: string;
  submitButton?: string;
  noAccountLabel?: string;
  signUpLinkLabel?: string;
}

export interface EligibilityPageCopy {
  resultTitle?: string;
  visaTypeLabel?: string;
  approvalRateLabel?: string;
  redFlagsTitle?: string;
  yellowFlagsTitle?: string;
  summaryTitle?: string;
  repeatButtonLabel?: string;
  disclaimer?: string;
}

export interface DashboardPageCopy {
  homeTabLabel?: string;
  eligibilityTabLabel?: string;
  documentsTabLabel?: string;
  applyGuideTabLabel?: string;
}

export interface PlanEntryPageCopy {
  heading?: string;
  backButtonLabel?: string;
  trialTitle?: string;
  trialDescription?: string;
  trialNote?: string;
  startTrialLabel?: string;
  basicButtonLabel?: string;
  proButtonLabel?: string;
}

export interface PaymentPageCopy {
  headerTitle?: string;
  backButtonLabel?: string;
  supportEmail?: string;
  basicFeatures?: string[];
  proFeatures?: string[];
  termsBullets?: string[];
  secondaryButtonLabel?: string;
  secondaryNote?: string;
}

export interface AppPageCopy {
  signup?: SignUpPageCopy;
  login?: LoginPageCopy;
  eligibility?: EligibilityPageCopy;
  dashboard?: DashboardPageCopy;
  planEntry?: PlanEntryPageCopy;
  payment?: PaymentPageCopy;
}

const PAGE_CONTENT_SCRIPT_ID = 'app-page-content';

function parseCopyPayload(raw: string): AppPageCopy {
  const text = raw.trim();
  if (!text) return {};

  try {
    if (text.startsWith('{')) {
      const parsed = JSON.parse(text) as AppPageCopy;
      return parsed && typeof parsed === 'object' ? parsed : {};
    }
  } catch {
    // Fallback to assignment parsing.
  }

  const assignmentMatch = text.match(/window\.appPageContent\s*=\s*({[\s\S]*?})\s*;?\s*$/);
  if (!assignmentMatch) return {};

  try {
    const parsed = JSON.parse(assignmentMatch[1]) as AppPageCopy;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function readFromDocument(doc: Document): AppPageCopy {
  const script = doc.getElementById(PAGE_CONTENT_SCRIPT_ID);
  if (!script?.textContent) return {};
  return parseCopyPayload(script.textContent);
}

export function readInitialAppPageCopy(): AppPageCopy {
  if (typeof window === 'undefined') return {};
  const globalCopy = (window as Window & { appPageContent?: AppPageCopy }).appPageContent;
  if (globalCopy && typeof globalCopy === 'object') {
    return globalCopy;
  }
  return readFromDocument(window.document);
}

export async function fetchAppPageCopy(path: string): Promise<AppPageCopy> {
  if (typeof window === 'undefined') return {};
  try {
    const response = await fetch(path, { credentials: 'same-origin' });
    if (!response.ok) return {};
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return readFromDocument(doc);
  } catch {
    return {};
  }
}
