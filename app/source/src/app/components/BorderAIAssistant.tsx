import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from './ui/utils';
import {
  Sparkles,
  Send,
  Paperclip,
  Image as ImageIcon,
  Plus,
  ChevronRight,
  Settings,
  History,
  MessageSquare,
  X,
} from 'lucide-react';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface BorderAIAssistantProps {
  className?: string;
}

export function BorderAIAssistant({ className }: BorderAIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm Border AI. Upload a document or ask a question to get started.",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: '2',
      type: 'user',
      content: 'What documents do I need for a work permit?',
      timestamp: new Date(Date.now() - 150000),
    },
    {
      id: '3',
      type: 'ai',
      content:
        'For a Canadian work permit, you typically need: valid passport, job offer letter, LMIA (if required), proof of qualifications, and financial documents. Upload your documents and I will extract key details.',
      timestamp: new Date(Date.now() - 120000),
    },
    {
      id: '4',
      type: 'user',
      content: 'Can you generate my checklist?',
      timestamp: new Date(Date.now() - 90000),
    },
    {
      id: '5',
      type: 'ai',
      content:
        "Yes! I have generated a personalized checklist based on your profile. Want me to generate your checklist now?",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '6',
      type: 'user',
      content: 'Yes, please!',
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: '7',
      type: 'ai',
      content:
        "Checklist created! I flagged 2 missing items—tap to review them in your Document Hub.",
      timestamp: new Date(Date.now() - 10000),
    },
  ]);

  const [input, setInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFileName, setUploadFileName] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const suggestedPrompts = [
    'Check my eligibility',
    'Generate my checklist',
    'Draft explanation letter',
    'What am I missing?',
  ];

  const handleSendMessage = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: `I can help you with that. Based on your case, here's what I recommend...`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handlePromptClick = (prompt: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Mock AI responses based on prompt
    setTimeout(() => {
      let aiContent = '';
      switch (prompt) {
        case 'Check my eligibility':
          aiContent =
            'Based on your profile, you meet the basic eligibility requirements for a Canadian work permit. Your education and work experience align well with the NOC code.';
          break;
        case 'Generate my checklist':
          aiContent =
            '✓ Generated your personalized document checklist! You need: passport copy, job offer letter, educational credentials, and proof of funds. 2 items are missing.';
          break;
        case 'Draft explanation letter':
          aiContent =
            'I can draft your Letter of Explanation. Please tell me: What is the main purpose of this letter? (e.g., explaining gaps in employment, clarifying travel history)';
          break;
        case 'What am I missing?':
          aiContent =
            '🔴 Missing: Police clearance certificate, Medical exam results. 📋 In progress: Reference letters. ✅ Complete: Passport, job offer, bank statements.';
          break;
        default:
          aiContent = 'I can help you with that!';
      }

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: aiContent,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = (type: 'document' | 'image') => {
    setShowUploadModal(false);
    setIsUploading(true);
    setUploadFileName(type === 'document' ? 'resume.pdf' : 'passport-photo.jpg');
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Add AI response after upload
          setTimeout(() => {
            const aiMessage: Message = {
              id: `ai-${Date.now()}`,
              type: 'ai',
              content: `File uploaded successfully! I have extracted key information from your ${
                type === 'document' ? 'document' : 'image'
              }. The data has been added to your profile.`,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
          }, 500);

          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 'welcome',
        type: 'ai',
        content: "Hi! I'm Border AI. Upload a document or ask a question to get started.",
        timestamp: new Date(),
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Mobile floating button
  const MobileFloatingButton = () => (
    <Button
      onClick={() => setIsMobileOpen(true)}
      className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg md:hidden z-50 bg-[#E9692C] hover:bg-[#E9692C]/90"
    >
      <MessageSquare className="h-6 w-6 text-white" />
    </Button>
  );

  // Upload Modal
  const UploadModal = () => (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowUploadModal(false)}
    >
      <div
        className="bg-card rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Upload File</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUploadModal(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start h-auto py-4"
            onClick={() => handleFileUpload('document')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Paperclip className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">Document</p>
                <p className="text-xs text-muted-foreground">PDF, DOC, DOCX</p>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-auto py-4"
            onClick={() => handleFileUpload('image')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">Image</p>
                <p className="text-xs text-muted-foreground">JPG, PNG</p>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );

  // Chat History Panel
  const ChatHistoryPanel = () => (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-end z-50"
      onClick={() => setShowChatHistory(false)}
    >
      <div
        className="bg-card h-full w-80 shadow-xl p-6 animate-in slide-in-from-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Chat History</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowChatHistory(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {['Today', 'Yesterday', 'Last Week'].map((period) => (
            <div key={period}>
              <p className="text-xs font-medium text-muted-foreground mb-2">{period}</p>
              <div className="space-y-1">
                {[1, 2, 3].map((i) => (
                  <Button
                    key={`${period}-${i}`}
                    variant="ghost"
                    className="w-full justify-start text-sm h-auto py-2"
                  >
                    <div className="text-left truncate">
                      <p className="font-medium truncate">Work permit questions</p>
                      <p className="text-xs text-muted-foreground">3 messages</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const mainContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E9692C] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Border AI Assistant</h3>
              <div className="flex items-center gap-1.5">
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNewChat}
              title="New chat"
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" title="Settings" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileOpen(false)}
              className="h-8 w-8 p-0 md:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Context Chip - View Chat History */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowChatHistory(true)}
          className="w-full justify-start h-auto py-2"
        >
          <History className="h-4 w-4 mr-2" />
          <span className="text-sm">View chat history</span>
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300',
              message.type === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.type === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-[#E9692C] flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[75%] rounded-xl px-4 py-2.5',
                message.type === 'user'
                  ? 'bg-gray-200 text-gray-900 rounded-br-sm'
                  : 'bg-gray-100 text-foreground rounded-bl-sm'
              )}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2">
            <div className="w-7 h-7 rounded-full bg-[#E9692C] flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="bg-gray-100 rounded-xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Uploading State */}
      {isUploading && (
        <div className="px-4 py-3 border-t border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <Paperclip className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium mb-1">{uploadFileName}</p>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E9692C] transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{uploadProgress}%</span>
          </div>
        </div>
      )}

      {/* Suggested Prompts */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <Button
              key={prompt}
              variant="outline"
              size="sm"
              onClick={() => handlePromptClick(prompt)}
              className="text-xs h-auto py-1.5 px-3 rounded-full"
              disabled={isTyping}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border flex-shrink-0">
        <div className="flex gap-2">
          {/* Upload Buttons */}
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowUploadModal(true)}
              title="Upload file"
              className="h-8 w-8 p-0 flex-shrink-0"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowUploadModal(true)}
              title="Add image"
              className="h-8 w-8 p-0 flex-shrink-0"
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your application"
              className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[40px] max-h-[120px]"
              rows={1}
              disabled={isTyping}
            />
          </div>

          {/* Send Button */}
          <Button
            type="button"
            size="sm"
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="h-10 w-10 p-0 flex-shrink-0 bg-[#E9692C] hover:bg-[#E9692C]/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          'hidden md:flex flex-col border-l border-border bg-card transition-all duration-300 h-full',
          isCollapsed ? 'w-0 overflow-hidden' : 'w-[400px]',
          className
        )}
      >
        {mainContent}
      </div>

      {/* Mobile Floating Button */}
      {!isMobileOpen && <MobileFloatingButton />}

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card shadow-xl flex flex-col animate-in slide-in-from-right">
            {mainContent}
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && <UploadModal />}

      {/* Chat History Panel */}
      {showChatHistory && <ChatHistoryPanel />}
    </>
  );
}