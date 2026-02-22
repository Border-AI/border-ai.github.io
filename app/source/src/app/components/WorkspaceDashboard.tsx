import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { TopNav } from './TopNav';
import { BorderAIAssistant } from './BorderAIAssistant';
import {
  Home,
  FileText,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Upload,
  Download,
  Trash2,
  Edit,
  Eye,
  Check,
  Clock,
  AlertCircle,
  Send,
  Sparkles,
  File,
  FileCheck,
  FileX,
  Search,
  Filter,
  X,
  ChevronLeft,
  Paperclip,
  Languages,
  Square,
} from 'lucide-react';
import { cn } from './ui/utils';

type WorkspaceTab = 'home' | 'documents' | 'apply-guide';
type TaskStatus = 'todo' | 'in-progress' | 'waiting' | 'done';
type OutputStatus = 'upload-needed' | 'generating' | 'generated' | 'uploaded';

interface Task {
  id: string;
  item: string;
  owner: 'You' | 'Border AI';
  status: TaskStatus;
  output: OutputStatus;
  category: string;
  details?: {
    whatItIs: string;
    whyItMatters: string;
    howToPrepare: string;
    commonMistakes: string;
  };
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'uploaded' | 'generated' | 'missing';
  lastUpdated: string;
}

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  sources?: string[];
}

interface WorkspaceDashboardProps {
  userName?: string;
  userInitials?: string;
  onNavigate?: (screen: string) => void;
  onLogout?: () => void;
}

export function WorkspaceDashboard({
  userName = 'Dan Fisher',
  userInitials = 'DF',
  onNavigate,
  onLogout,
}: WorkspaceDashboardProps = {}) {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('home');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Identity',
    'Financial',
    'Travel history',
    'Forms',
    'Review',
  ]);
  const [documentFilter, setDocumentFilter] = useState<'all' | 'uploaded' | 'generated' | 'missing'>(
    'all'
  );
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [currentApplyStep, setCurrentApplyStep] = useState(0);
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        "Hi! I'm your Border AI Assistant. I can help you with any questions about your case. What would you like to know?",
      sources: ['IRCC Official Guidelines', 'Canada Immigration Act'],
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [chatStatus, setChatStatus] = useState<'idle' | 'analyzing' | 'saved'>('idle');
  const [isGenerating, setIsGenerating] = useState(false);

  const tasks: Task[] = [
    {
      id: '1',
      item: 'Passport copy',
      owner: 'You',
      status: 'done',
      output: 'uploaded',
      category: 'Identity',
      details: {
        whatItIs: 'A clear copy of your passport bio-data page',
        whyItMatters: 'Required to verify your identity and citizenship',
        howToPrepare: 'Scan or photograph your passport bio-data page in color',
        commonMistakes: 'Blurry images, expired passports, or missing pages',
      },
    },
    {
      id: '2',
      item: 'Bank statement',
      owner: 'You',
      status: 'waiting',
      output: 'upload-needed',
      category: 'Financial',
      details: {
        whatItIs: 'Official bank statements from the last 6 months',
        whyItMatters:
          'Demonstrates you have sufficient funds to support yourself during your stay in Canada',
        howToPrepare:
          'Request official statements from your bank showing your name, account number, and daily balance for the past 6 months',
        commonMistakes:
          'Statements too old, insufficient balance shown, or missing bank letterhead',
      },
    },
    {
      id: '3',
      item: 'Proof of employment',
      owner: 'You',
      status: 'waiting',
      output: 'upload-needed',
      category: 'Financial',
      details: {
        whatItIs: 'An official letter from your employer on company letterhead confirming your employment status, position, salary, and dates of employment',
        whyItMatters: 'Demonstrates stable income and strong ties to your home country, showing you have reasons to return after your visit',
        howToPrepare: 'Request a formal employment letter from your HR department that includes: your full name, job title, date of hire, current salary, employment status (full-time/part-time), and supervisor contact information',
        commonMistakes: 'Missing company letterhead, vague job descriptions, no salary information, unsigned letters, or letters not dated recently',
      },
    },
    {
      id: '4',
      item: 'Travel history document',
      owner: 'Border AI',
      status: 'in-progress',
      output: 'generating',
      category: 'Travel history',
      details: {
        whatItIs: 'Clear, high-resolution photographs or scans of all passport pages showing previous visas, entry/exit stamps, and travel history',
        whyItMatters: 'Proves your compliance with immigration rules in other countries and demonstrates you have a history of returning from international trips',
        howToPrepare: 'Photograph or scan all pages of your current and previous passports that contain stamps, visas, or any markings. Include the bio-data page. Arrange in chronological order',
        commonMistakes: 'Missing pages, unclear stamps, not including expired passports with relevant travel history, or poor image quality that makes dates unreadable',
      },
    },
    {
      id: '5',
      item: 'IMM 5257 (Application form)',
      owner: 'Border AI',
      status: 'done',
      output: 'generated',
      category: 'Forms',
    },
    {
      id: '6',
      item: 'Letter of explanation',
      owner: 'Border AI',
      status: 'in-progress',
      output: 'generating',
      category: 'Forms',
      details: {
        whatItIs: 'A personalized letter explaining the purpose of your visit, your ties to your home country, and any special circumstances in your application',
        whyItMatters: 'Provides context and a narrative to your application that helps immigration officers understand your situation and assess your intent to comply with visa conditions',
        howToPrepare: 'Border AI will generate this for you based on your questionnaire responses. The letter will address: purpose of visit, planned itinerary, financial means, ties to home country, and explanation of any gaps or concerns',
        commonMistakes: 'Generic templates that don\'t address specific circumstances, overly long explanations, not addressing potential red flags, or inconsistencies with other documents',
      },
    },
    {
      id: '7',
      item: 'Final document review',
      owner: 'Border AI',
      status: 'todo',
      output: 'upload-needed',
      category: 'Review',
    },
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'Passport.pdf',
      type: 'Identity',
      status: 'uploaded',
      lastUpdated: '2 hours ago',
    },
    {
      id: '2',
      name: 'IMM_5257.pdf',
      type: 'Forms',
      status: 'generated',
      lastUpdated: '1 day ago',
    },
    {
      id: '3',
      name: 'Letter_of_Explanation.pdf',
      type: 'Forms',
      status: 'generated',
      lastUpdated: '1 day ago',
    },
    {
      id: '4',
      name: 'Bank_Statement.pdf',
      type: 'Financial',
      status: 'missing',
      lastUpdated: '—',
    },
    {
      id: '5',
      name: 'Employment_Letter.pdf',
      type: 'Financial',
      status: 'missing',
      lastUpdated: '—',
    },
  ];

  const applySteps = [
    {
      title: 'Start application (correct stream)',
      instructions:
        'Visit the IRCC website and select "Work Permit" under the correct immigration stream.',
      checklist: ['Navigate to IRCC portal', 'Create or log in to your account', 'Select Work Permit application'],
    },
    {
      title: 'Fill online form',
      instructions: 'Complete the online application form with your personal information.',
      checklist: ['Use your generated IMM 5257 as reference', 'Double-check all dates and spellings', 'Save progress regularly'],
    },
    {
      title: 'Upload documents',
      instructions: 'Upload all required documents in the correct format.',
      checklist: ['Convert all documents to PDF', 'Ensure file sizes are under 4MB', 'Upload in the order shown'],
    },
    {
      title: 'Pay fees',
      instructions: 'Pay the application and biometric fees online.',
      checklist: ['Verify total amount ($155 CAD + $85 CAD biometrics)', 'Use credit/debit card', 'Save receipt'],
    },
    {
      title: 'Final review',
      instructions: 'Review all information before submission.',
      checklist: ['Check all uploaded documents are correct', 'Verify personal information', 'Read declaration'],
    },
    {
      title: 'Submit',
      instructions: 'Submit your application and receive confirmation.',
      checklist: ['Click final submit button', 'Save confirmation number', 'Download receipt'],
    },
  ];

  const categorizedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'done':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'waiting':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-border" />;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    const variants = {
      done: 'bg-green-50 text-green-700 border-green-200',
      'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
      waiting: 'bg-orange-50 text-orange-700 border-orange-200',
      todo: 'bg-gray-50 text-gray-700 border-gray-200',
    };
    const labels = {
      done: 'Done',
      'in-progress': 'In progress',
      waiting: 'Waiting on you',
      todo: 'To do',
    };
    const icons = {
      done: <Check className="h-3 w-3" />,
      'in-progress': <Clock className="h-3 w-3" />,
      waiting: <AlertCircle className="h-3 w-3" />,
      todo: <Square className="h-3 w-3" />,
    };
    return (
      <Badge variant="outline" className={cn('flex items-center gap-1.5', variants[status])}>
        {icons[status]}
        {labels[status]}
      </Badge>
    );
  };

  const getOutputBadge = (output: OutputStatus) => {
    const variants = {
      uploaded: 'bg-white text-gray-900 border-gray-300',
      generated: 'bg-white text-gray-900 border-gray-300',
      generating: 'bg-white text-gray-900 border-gray-300',
      'upload-needed': 'bg-white text-gray-900 border-gray-300',
    };
    const labels = {
      uploaded: 'Uploaded',
      generated: 'Generated',
      generating: 'AI generating',
      'upload-needed': 'Upload needed',
    };
    
    if (output === 'upload-needed') {
      return (
        <Button size="sm" className="bg-[#E9692C] hover:bg-[#D15A1F] text-white border-0">
          <Upload className="h-3.5 w-3.5 mr-1.5" />
          Upload
        </Button>
      );
    }
    
    return (
      <Badge variant="outline" className={variants[output]}>
        {labels[output]}
      </Badge>
    );
  };

  const filteredDocuments = documents.filter(
    (doc) => documentFilter === 'all' || doc.status === documentFilter
  );

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    setChatStatus('analyzing');
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: chatInput,
    };
    setChatMessages([...chatMessages, userMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content:
          "Based on your case details, you'll need to submit your work permit application through the IRCC online portal. I can guide you through each step.",
        sources: ['IRCC Work Permit Guide 2024', 'Immigration Act Section 200'],
      };
      setChatMessages((prev) => [...prev, aiMessage]);
      setChatStatus('idle');
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Navigation */}
      <TopNav
        caseName="Canada Work Permit (Sample)"
        userInitials={userInitials}
        userName={userName}
        onNavigate={onNavigate || (() => {})}
        onLogout={onLogout || (() => {})}
      />

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden bg-background">
        {/* Left Sidebar */}
        <div className="w-56 border-r border-border bg-card flex flex-col">
          <nav className="flex-1 p-2">
            <button
              onClick={() => setActiveTab('home')}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-md text-base transition-colors',
                activeTab === 'home'
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent/50'
              )}
            >
              <Home className="h-5 w-5" />
              Home
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-md text-base transition-colors',
                activeTab === 'documents'
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent/50'
              )}
            >
              <FileText className="h-5 w-5" />
              Documents
            </button>
            <button
              onClick={() => setActiveTab('apply-guide')}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-md text-base transition-colors',
                activeTab === 'apply-guide'
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent/50'
              )}
            >
              <BookOpen className="h-5 w-5" />
              Apply guide
            </button>
          </nav>
        </div>

        {/* Center - Main Work Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Home Tab - Checklist */}
          {activeTab === 'home' && (
            <>
              <div className="border-b border-border bg-card px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h1 className="font-semibold">Case Overview</h1>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export summary
                    </Button>
                    <Button size="sm">Continue preparation</Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden flex">
                {/* Task List Table */}
                <div
                  className={cn(
                    'overflow-y-auto transition-all',
                    selectedTask ? 'w-1/2' : 'w-full'
                  )}
                >
                  {/* Table Header */}
                  <div className="sticky top-0 bg-background border-b border-border px-6 py-3">
                    <div className="grid grid-cols-[1fr_120px_120px_140px] gap-4 items-center">
                      <div className="text-sm font-medium text-muted-foreground">NAME</div>
                      <div className="text-sm font-medium text-muted-foreground">OWNER</div>
                      <div className="text-sm font-medium text-muted-foreground">STATUS</div>
                      <div className="text-sm font-medium text-muted-foreground">OUTPUT</div>
                    </div>
                  </div>

                  {/* Table Rows */}
                  <div className="px-6">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          'grid grid-cols-[1fr_120px_120px_140px] gap-4 items-center py-4 border-b border-border cursor-pointer transition-all duration-200',
                          'hover:bg-accent/70 hover:shadow-sm hover:-translate-y-0.5 hover:border-accent',
                          selectedTask?.id === task.id && 'bg-accent/30 shadow-sm'
                        )}
                        onClick={() => setSelectedTask(task)}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="min-w-0">
                            <p className="text-base font-medium truncate">{task.item}</p>
                            <p className="text-sm text-muted-foreground">{task.category}</p>
                          </div>
                        </div>
                        <div className="text-base text-muted-foreground">{task.owner}</div>
                        <div>{getStatusBadge(task.status)}</div>
                        <div>{getOutputBadge(task.output)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Task Detail Panel */}
                {selectedTask && (
                  <div className="w-1/2 border-l border-border overflow-y-auto bg-card">
                    <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
                      <h2 className="font-semibold">{selectedTask.item}</h2>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedTask(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="p-6 space-y-6">
                      {selectedTask.details ? (
                        <>
                          <div>
                            <h3 className="text-sm font-medium mb-2">What this is</h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedTask.details.whatItIs}
                            </p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">Why it matters</h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedTask.details.whyItMatters}
                            </p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">How to prepare it</h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedTask.details.howToPrepare}
                            </p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium mb-2">Common mistakes</h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedTask.details.commonMistakes}
                            </p>
                          </div>

                          {selectedTask.output === 'upload-needed' && (
                            <div>
                              <h3 className="text-sm font-medium mb-3">Upload area</h3>
                              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer">
                                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                                <p className="text-sm text-muted-foreground mb-1">
                                  Drop your file here or click to upload
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Upload your bank statement as PDF. We'll review it for required dates,
                                  balance, and consistency.
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-3">
                                If you don't have this yet, we'll tell you exactly how to obtain it.
                              </p>
                            </div>
                          )}

                          {selectedTask.output === 'generated' && (
                            <div className="space-y-2">
                              <Button variant="outline" size="sm" className="w-full">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                              <Button variant="outline" size="sm" className="w-full">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="w-full">
                                <Send className="h-4 w-4 mr-2" />
                                Request changes
                              </Button>
                              <Button variant="outline" size="sm" className="w-full">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          )}

                          <Button variant="outline" size="sm" className="w-full">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Ask Border AI about this
                          </Button>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">
                            Details will be available once this task is ready.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <>
              <div className="border-b border-border bg-card px-6 py-4">
                <div className="flex items-center justify-between">
                  <h1 className="font-semibold">Documents</h1>
                  <div className="flex gap-2">
                    <Button
                      variant={documentFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setDocumentFilter('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={documentFilter === 'uploaded' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setDocumentFilter('uploaded')}
                    >
                      Uploaded
                    </Button>
                    <Button
                      variant={documentFilter === 'generated' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setDocumentFilter('generated')}
                    >
                      Generated
                    </Button>
                    <Button
                      variant={documentFilter === 'missing' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setDocumentFilter('missing')}
                    >
                      Missing
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden flex">
                {/* Document List */}
                <div className="w-1/3 border-r border-border overflow-y-auto p-4">
                  <div className="space-y-2">
                    {filteredDocuments.map((doc) => (
                      <Card
                        key={doc.id}
                        className={cn(
                          'p-4 cursor-pointer hover:bg-accent/50 transition-colors',
                          selectedDocument?.id === doc.id && 'ring-2 ring-[#E9692C]'
                        )}
                        onClick={() => setSelectedDocument(doc)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {doc.status === 'uploaded' && <FileCheck className="h-5 w-5 text-green-600" />}
                            {doc.status === 'generated' && <File className="h-5 w-5 text-blue-600" />}
                            {doc.status === 'missing' && <FileX className="h-5 w-5 text-orange-600" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.type}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                variant="outline"
                                className={
                                  doc.status === 'uploaded'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : doc.status === 'generated'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : 'bg-orange-50 text-orange-700 border-orange-200'
                                }
                              >
                                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{doc.lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Document Preview */}
                <div className="flex-1 overflow-y-auto p-6">
                  {selectedDocument ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-semibold">{selectedDocument.name}</h2>
                        <div className="flex gap-2">
                          {selectedDocument.status !== 'missing' && (
                            <>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </>
                          )}
                          {selectedDocument.status === 'uploaded' && (
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Replace
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                      <Card className="p-8 bg-accent/20 border-2 border-dashed flex items-center justify-center h-96">
                        {selectedDocument.name === 'Letter_of_Explanation.pdf' ? (
                          <div className="w-full h-full overflow-y-auto bg-white p-12 rounded shadow-sm">
                            <div className="max-w-2xl mx-auto space-y-6">
                              {/* Header */}
                              <div className="text-right text-sm text-muted-foreground">
                                <p>Dan Fisher</p>
                                <p>123 Main Street</p>
                                <p>Toronto, ON M5H 2N2</p>
                                <p>dan.fisher@email.com</p>
                                <p>+1 (416) 555-0123</p>
                                <p className="mt-4">December 21, 2025</p>
                              </div>

                              {/* Recipient */}
                              <div className="text-sm">
                                <p className="font-medium">Immigration, Refugees and Citizenship Canada</p>
                                <p className="text-muted-foreground">Visa Application Centre</p>
                                <p className="text-muted-foreground">Ottawa, ON</p>
                              </div>

                              {/* Subject */}
                              <div className="text-sm">
                                <p className="font-semibold">Re: Letter of Explanation - Work Permit Application</p>
                              </div>

                              {/* Salutation */}
                              <p className="text-sm">Dear Visa Officer,</p>

                              {/* Body */}
                              <div className="space-y-4 text-sm leading-relaxed">
                                <p>
                                  I am writing to support my application for a Canadian Work Permit. I am a software engineer 
                                  with over five years of experience in web development and cloud infrastructure, and I have been 
                                  offered a position with TechCorp Canada Inc. in Toronto, Ontario.
                                </p>

                                <p className="font-medium mt-6">Purpose of Application</p>
                                <p>
                                  I have accepted a full-time position as a Senior Software Engineer with TechCorp Canada Inc., 
                                  starting March 1, 2026. The role involves leading the development of critical enterprise 
                                  applications and mentoring junior developers. This opportunity aligns perfectly with my career 
                                  goals and allows me to contribute my expertise to Canada's growing technology sector.
                                </p>

                                <p className="font-medium mt-6">Professional Background</p>
                                <p>
                                  Currently, I am employed as a Software Engineer at Global Tech Solutions in the United States, 
                                  where I have worked for the past three years. My experience includes developing scalable web 
                                  applications, implementing cloud infrastructure, and leading cross-functional teams. I hold a 
                                  Bachelor's degree in Computer Science from the University of California, Berkeley.
                                </p>

                                <p className="font-medium mt-6">Financial Means</p>
                                <p>
                                  I have sufficient financial resources to support myself during my transition to Canada. My 
                                  current employment provides a stable income of $95,000 USD annually, and I have savings of 
                                  approximately $45,000 CAD. The employment offer from TechCorp Canada provides a competitive 
                                  salary of $120,000 CAD per year, ensuring my financial stability throughout my stay in Canada.
                                </p>

                                <p className="font-medium mt-6">Ties to Home Country</p>
                                <p>
                                  I maintain strong ties to the United States, including property ownership (my primary residence 
                                  in San Francisco), family members (my parents and siblings reside in California), and ongoing 
                                  professional network relationships. These connections demonstrate my intent to maintain links to 
                                  my home country while working in Canada.
                                </p>

                                <p className="font-medium mt-6">Supporting Documentation</p>
                                <p>
                                  I have enclosed all required documentation including my valid passport, employment offer letter 
                                  from TechCorp Canada Inc., proof of educational credentials, recent bank statements, employment 
                                  verification letter from my current employer, and proof of professional experience.
                                </p>
                              </div>

                              {/* Closing */}
                              <div className="space-y-4 text-sm mt-6">
                                <p>
                                  I am excited about this opportunity to contribute to Canada's technology sector and I am 
                                  committed to complying with all Canadian immigration regulations. I appreciate your time and 
                                  consideration of my application.
                                </p>

                                <p>Sincerely,</p>
                                
                                <div className="mt-8">
                                  <p className="font-medium">Dan Fisher</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-sm text-muted-foreground">Document preview</p>
                          </div>
                        )}
                      </Card>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground">
                          Select a document to preview
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Apply Guide Tab */}
          {activeTab === 'apply-guide' && (
            <>
              <div className="border-b border-border bg-card px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h1 className="font-semibold">Apply Guide</h1>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Stage 3
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                  {applySteps.map((step, index) => (
                    <Card
                      key={index}
                      className={cn(
                        'p-6',
                        index === currentApplyStep && 'ring-2 ring-[#E9692C]'
                      )}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div
                            className={cn(
                              'w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm',
                              index < currentApplyStep
                                ? 'bg-green-100 text-green-700'
                                : index === currentApplyStep
                                ? 'bg-[#E9692C] text-white'
                                : 'bg-gray-100 text-gray-500'
                            )}
                          >
                            {index < currentApplyStep ? <Check className="h-4 w-4" /> : index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{step.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{step.instructions}</p>
                          <div className="space-y-2 mb-4">
                            {step.checklist.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className="w-4 h-4 rounded border-2 border-border mt-0.5" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            {index === currentApplyStep && (
                              <Button
                                size="sm"
                                onClick={() => setCurrentApplyStep(currentApplyStep + 1)}
                              >
                                Mark step complete
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Sparkles className="h-4 w-4 mr-2" />
                              Ask Border AI
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Sidebar - AI Chat */}
        <BorderAIAssistant />
      </div>
    </div>
  );
}