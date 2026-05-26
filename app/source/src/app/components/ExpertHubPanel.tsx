import React, { useMemo, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ArrowLeft, CalendarClock, MessageCircle, Star } from 'lucide-react';

type DetailTab = 'reviews' | 'chat';
type HubView = 'grid' | 'expert';

interface ExpertReview {
  name: string;
  rating: number;
  review: string;
}

interface ExpertAdvisor {
  id: string;
  name: string;
  initials: string;
  rating: number;
  sessions: number;
  costPerQuestion: number;
  costPerHour: number;
  expertise: string[];
  reviews: ExpertReview[];
}

interface ChatMessage {
  id: string;
  role: 'user' | 'advisor';
  text: string;
  timestamp: number;
}

interface ExpertChatThread {
  id: string;
  advisorId: string;
  advisorName: string;
  status: 'active' | 'closed';
  updatedAt: number;
  messages: ChatMessage[];
}

const ADVISORS: ExpertAdvisor[] = [
  {
    id: 'sarah-lee',
    name: 'Sarah Lee',
    initials: 'SL',
    rating: 4.8,
    sessions: 212,
    costPerQuestion: 10,
    costPerHour: 50,
    expertise: ['Work permit', 'Inside Canada', 'Extension', 'Family-based'],
    reviews: [
      { name: 'Amir K.', rating: 5, review: 'Very clear guidance and quick replies in chat.' },
      { name: 'Mei T.', rating: 4.5, review: 'Helped me organize documents before submission.' }
    ]
  },
  {
    id: 'daniel-khan',
    name: 'Daniel Khan',
    initials: 'DK',
    rating: 4.6,
    sessions: 167,
    costPerQuestion: 12,
    costPerHour: 60,
    expertise: ['Study permit', 'Visitor visa', 'PR', 'Inside Canada'],
    reviews: [
      { name: 'Lara M.', rating: 4.5, review: 'Good strategy suggestions for my study case.' },
      { name: 'Nima R.', rating: 4, review: 'Explained risks and timeline well.' }
    ]
  },
  {
    id: 'olivia-chen',
    name: 'Olivia Chen',
    initials: 'OC',
    rating: 4.7,
    sessions: 289,
    costPerQuestion: 15,
    costPerHour: 75,
    expertise: ['PR', 'Family-based', 'Work permit', 'Visitor visa'],
    reviews: [
      { name: 'Rami H.', rating: 5, review: 'Great detail, especially on family sponsorship docs.' },
      { name: 'Sana F.', rating: 4.5, review: 'Meeting was practical and focused on next steps.' }
    ]
  },
  {
    id: 'farah-ahmadi',
    name: 'Farah Ahmadi',
    initials: 'FA',
    rating: 4.5,
    sessions: 141,
    costPerQuestion: 9,
    costPerHour: 45,
    expertise: ['Visitor visa', 'Family-based', 'Inside Canada'],
    reviews: [
      { name: 'Leo J.', rating: 4.5, review: 'Clear answers and practical checklist updates.' },
      { name: 'Mina O.', rating: 4, review: 'Fast support during a tight submission timeline.' }
    ]
  },
  {
    id: 'noah-santos',
    name: 'Noah Santos',
    initials: 'NS',
    rating: 4.4,
    sessions: 119,
    costPerQuestion: 11,
    costPerHour: 55,
    expertise: ['Study permit', 'Extension', 'Outside Canada'],
    reviews: [
      { name: 'Tara P.', rating: 4.5, review: 'Useful guidance on LOA and document consistency.' },
      { name: 'Ivy K.', rating: 4, review: 'Good support for my second submission.' }
    ]
  },
  {
    id: 'camila-rivera',
    name: 'Camila Rivera',
    initials: 'CR',
    rating: 4.7,
    sessions: 254,
    costPerQuestion: 13,
    costPerHour: 65,
    expertise: ['Work permit', 'PR', 'Inside Canada'],
    reviews: [
      { name: 'Nour A.', rating: 5, review: 'Strong strategy and very actionable next steps.' },
      { name: 'Ali B.', rating: 4.5, review: 'Excellent for complex work permit scenarios.' }
    ]
  },
  {
    id: 'henry-choi',
    name: 'Henry Choi',
    initials: 'HC',
    rating: 4.6,
    sessions: 198,
    costPerQuestion: 10,
    costPerHour: 52,
    expertise: ['Visitor visa', 'Study permit', 'Outside Canada'],
    reviews: [
      { name: 'Sara N.', rating: 4.5, review: 'Provided strong review before final submission.' },
      { name: 'Omid R.', rating: 4.5, review: 'Explained refusal risk clearly.' }
    ]
  },
  {
    id: 'elena-smith',
    name: 'Elena Smith',
    initials: 'ES',
    rating: 4.9,
    sessions: 301,
    costPerQuestion: 18,
    costPerHour: 90,
    expertise: ['PR', 'Family-based', 'Extension', 'Inside Canada'],
    reviews: [
      { name: 'Hana L.', rating: 5, review: 'Highly strategic and detail-focused.' },
      { name: 'Ravi T.', rating: 4.8, review: 'Very confident recommendation path.' }
    ]
  },
  {
    id: 'omar-hassan',
    name: 'Omar Hassan',
    initials: 'OH',
    rating: 4.3,
    sessions: 88,
    costPerQuestion: 8,
    costPerHour: 40,
    expertise: ['Visitor visa', 'Family-based', 'Outside Canada'],
    reviews: [
      { name: 'Neda S.', rating: 4.5, review: 'Affordable and clear first-round advice.' },
      { name: 'Yuri C.', rating: 4, review: 'Solid chat support for document prep.' }
    ]
  },
  {
    id: 'julia-ng',
    name: 'Julia Ng',
    initials: 'JN',
    rating: 4.7,
    sessions: 177,
    costPerQuestion: 14,
    costPerHour: 70,
    expertise: ['Study permit', 'PR', 'Extension'],
    reviews: [
      { name: 'Arezoo F.', rating: 4.5, review: 'Great support with PAL/TAL questions.' },
      { name: 'Ben D.', rating: 5, review: 'Practical and fast feedback on funding docs.' }
    ]
  },
  {
    id: 'samir-patel',
    name: 'Samir Patel',
    initials: 'SP',
    rating: 4.6,
    sessions: 226,
    costPerQuestion: 12,
    costPerHour: 58,
    expertise: ['Work permit', 'Inside Canada', 'Family-based'],
    reviews: [
      { name: 'Moe E.', rating: 4.5, review: 'Very helpful for employer-specific permits.' },
      { name: 'Celine W.', rating: 4.5, review: 'Clear checklist and fast turnaround.' }
    ]
  },
  {
    id: 'lina-farouk',
    name: 'Lina Farouk',
    initials: 'LF',
    rating: 4.8,
    sessions: 244,
    costPerQuestion: 16,
    costPerHour: 80,
    expertise: ['PR', 'Study permit', 'Work permit', 'Visitor visa'],
    reviews: [
      { name: 'Dana Q.', rating: 5, review: 'High quality review and risk mitigation advice.' },
      { name: 'Hamid V.', rating: 4.5, review: 'Strong knowledge across multiple visa paths.' }
    ]
  }
];

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function createAdvisorReply(advisorName: string): ChatMessage {
  return {
    id: `advisor-${Date.now()}`,
    role: 'advisor',
    text: `Thanks for your question. I can review your case details and suggest the best next step. - ${advisorName}`,
    timestamp: Date.now()
  };
}

export function ExpertHubPanel() {
  const [view, setView] = useState<HubView>('grid');
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<string>(ADVISORS[0].id);
  const [detailTab, setDetailTab] = useState<DetailTab>('reviews');
  const [meetingNote, setMeetingNote] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [threads, setThreads] = useState<ExpertChatThread[]>([
    {
      id: 'thread-sarah',
      advisorId: 'sarah-lee',
      advisorName: 'Sarah Lee',
      status: 'active',
      updatedAt: Date.now() - 1000 * 60 * 40,
      messages: [
        {
          id: 'm1',
          role: 'advisor',
          text: 'Hello, I can help with your work permit and extension questions.',
          timestamp: Date.now() - 1000 * 60 * 40
        }
      ]
    },
    {
      id: 'thread-julia',
      advisorId: 'julia-ng',
      advisorName: 'Julia Ng',
      status: 'active',
      updatedAt: Date.now() - 1000 * 60 * 15,
      messages: [
        {
          id: 'm2',
          role: 'advisor',
          text: 'Share your latest checklist and I will review it today.',
          timestamp: Date.now() - 1000 * 60 * 15
        }
      ]
    }
  ]);
  const [activeThreadId, setActiveThreadId] = useState<string>('thread-julia');

  const selectedAdvisor = useMemo(() => ADVISORS.find((advisor) => advisor.id === selectedAdvisorId) || ADVISORS[0], [selectedAdvisorId]);
  const sortedThreads = useMemo(() => [...threads].sort((a, b) => a.updatedAt - b.updatedAt), [threads]);
  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeThreadId) || sortedThreads[sortedThreads.length - 1] || null,
    [threads, sortedThreads, activeThreadId]
  );
  const selectedAdvisorThread = useMemo(() => {
    if (!threads.length) return null;
    const advisorThreads = threads.filter((thread) => thread.advisorId === selectedAdvisor.id);
    if (!advisorThreads.length) return null;
    if (activeThread && activeThread.advisorId === selectedAdvisor.id) return activeThread;
    return advisorThreads.sort((a, b) => b.updatedAt - a.updatedAt)[0];
  }, [threads, activeThread, selectedAdvisor.id]);

  const upsertThread = (advisor: ExpertAdvisor): string => {
    const existing = threads.find((thread) => thread.advisorId === advisor.id);
    if (existing) {
      setActiveThreadId(existing.id);
      return existing.id;
    }

    const now = Date.now();
    const newThread: ExpertChatThread = {
      id: `thread-${advisor.id}-${now}`,
      advisorId: advisor.id,
      advisorName: advisor.name,
      status: 'active',
      updatedAt: now,
      messages: [
        {
          id: `init-${now}`,
          role: 'advisor',
          text: `Hi, I am ${advisor.name}. Ask me anything about your visa pathway.`,
          timestamp: now
        }
      ]
    };
    setThreads((prev) => [...prev, newThread]);
    setActiveThreadId(newThread.id);
    return newThread.id;
  };

  const openAdvisorPage = (advisorId: string) => {
    setSelectedAdvisorId(advisorId);
    setView('expert');
    setDetailTab('reviews');
    setMeetingNote('');
  };

  const handleAskQuestion = () => {
    setDetailTab('chat');
    upsertThread(selectedAdvisor);
  };

  const handleSetMeeting = () => {
    setMeetingNote(`Meeting request started with ${selectedAdvisor.name}. Discuss the final scope and cost in chat.`);
    upsertThread(selectedAdvisor);
  };

  const handleSendMessage = () => {
    const trimmed = chatInput.trim();
    if (!trimmed) return;

    const advisor = ADVISORS.find((item) => item.id === selectedAdvisor.id) || selectedAdvisor;
    const threadId = activeThread?.advisorId === advisor.id ? activeThread.id : upsertThread(advisor);
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: Date.now()
    };
    const advisorReply = createAdvisorReply(advisor.name);

    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id !== threadId) return thread;
        return {
          ...thread,
          messages: [...thread.messages, userMessage, advisorReply],
          updatedAt: advisorReply.timestamp
        };
      })
    );
    setActiveThreadId(threadId);
    setChatInput('');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background px-6 py-5">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Expert Hub</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse advisors, open an expert profile, and continue your chat on the right panel.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <section>
          {view === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {ADVISORS.map((advisor) => (
                <Card
                  key={advisor.id}
                  className="cursor-pointer border border-border p-4 transition hover:border-[#E9692C]/60"
                  onClick={() => openAdvisorPage(advisor.id)}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9692C]/15 text-sm font-semibold text-[#E9692C]">
                      {advisor.initials}
                    </div>
                    <div>
                      <p className="font-semibold">{advisor.name}</p>
                      <p className="text-xs text-muted-foreground">Sessions: {advisor.sessions}</p>
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="flex items-center gap-1 text-sm">
                      {advisor.rating}
                      <Star className="h-4 w-4 fill-[#E9692C] text-[#E9692C]" />
                    </p>
                    <p className="text-sm text-muted-foreground">${advisor.costPerQuestion} per 1 question</p>
                    <p className="text-sm text-muted-foreground">${advisor.costPerHour} per 1 hour meeting</p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-border p-5">
              <div className="mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0"
                  aria-label="Back to experts"
                  onClick={() => setView('grid')}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E9692C]/15 text-xl font-semibold text-[#E9692C]">
                  {selectedAdvisor.initials}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedAdvisor.name}</h2>
                  <p className="mt-1 flex items-center gap-1 text-base">
                    {selectedAdvisor.rating}
                    <Star className="h-4 w-4 fill-[#E9692C] text-[#E9692C]" />
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xl">
                  Sessions:{' '}
                  <span className="text-2xl font-bold text-foreground">{selectedAdvisor.sessions}</span>
                </p>
                <p className="text-lg">
                  Chat:{' '}
                  <span className="text-2xl font-bold text-foreground">${selectedAdvisor.costPerQuestion}</span>{' '}
                  / question
                </p>
                <p className="text-lg">
                  Meeting:{' '}
                  <span className="text-2xl font-bold text-foreground">${selectedAdvisor.costPerHour}</span>{' '}
                  / hour
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedAdvisor.expertise.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={handleAskQuestion}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Ask your question
                </Button>
                <Button variant="outline" onClick={handleSetMeeting}>
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Set a meeting
                </Button>
              </div>
              {meetingNote ? <p className="mt-3 text-sm text-muted-foreground">{meetingNote}</p> : null}

              <div className="my-5 border-t border-border" />

              <div className="mb-4 border-b border-border" role="tablist" aria-label="Expert details tabs">
                <button
                  type="button"
                  role="tab"
                  aria-selected={detailTab === 'reviews'}
                  className={`px-3 py-2 text-sm font-medium transition ${
                    detailTab === 'reviews'
                      ? 'border-b-2 border-[#E9692C] text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setDetailTab('reviews')}
                >
                  Customer reviews
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={detailTab === 'chat'}
                  className={`ml-3 px-3 py-2 text-sm font-medium transition ${
                    detailTab === 'chat'
                      ? 'border-b-2 border-[#E9692C] text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setDetailTab('chat')}
                >
                  Chat
                </button>
              </div>

              {detailTab === 'reviews' ? (
                <div className="space-y-3">
                  {selectedAdvisor.reviews.map((review, index) => (
                    <div key={`${review.name}-${index}`} className="rounded-md border border-border p-3">
                      <p className="text-sm font-medium">
                        {review.name} · {review.rating}
                        <Star className="ml-1 inline h-3.5 w-3.5 fill-[#E9692C] text-[#E9692C]" />
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{review.review}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {(selectedAdvisorThread?.messages || []).map((message) => (
                    <div key={message.id} className={`rounded-md p-3 text-sm ${message.role === 'user' ? 'bg-accent' : 'bg-muted/50'}`}>
                      <p className="font-medium">{message.role === 'user' ? 'You' : selectedAdvisor.name}</p>
                      <p className="mt-1">{message.text}</p>
                    </div>
                  ))}
                  {!selectedAdvisorThread ? (
                    <p className="text-sm text-muted-foreground">
                      No chat started yet. Click "Ask your question" to start.
                    </p>
                  ) : null}
                </div>
              )}
            </Card>
          )}
        </section>

        <aside>
          <Card className="flex h-[calc(100vh-10rem)] flex-col border border-border p-4">
            <h2 className="text-lg font-semibold">Chat with expert</h2>

            <div className="mt-3 space-y-2 overflow-y-auto border-b border-border pb-3">
              {sortedThreads.map((thread) => (
                <button
                  key={thread.id}
                  type="button"
                  className={`w-full rounded-md border p-2 text-left transition ${
                    activeThread?.id === thread.id ? 'border-[#E9692C] bg-[#E9692C]/10' : 'border-border'
                  }`}
                  onClick={() => {
                    setActiveThreadId(thread.id);
                    setSelectedAdvisorId(thread.advisorId);
                    setView('expert');
                    setDetailTab('chat');
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{thread.advisorName}</p>
                    <Badge variant={thread.status === 'active' ? 'default' : 'outline'}>{thread.status}</Badge>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                    {thread.messages[thread.messages.length - 1]?.text || 'No messages yet'}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{formatTime(thread.updatedAt)}</p>
                </button>
              ))}
            </div>

            <div className="mt-3 flex-1 space-y-2 overflow-y-auto">
              {activeThread ? (
                activeThread.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[92%] rounded-md px-3 py-2 text-sm ${
                      message.role === 'user' ? 'ml-auto bg-accent' : 'bg-muted/60'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{formatTime(message.timestamp)}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Select an advisor and start a chat.</p>
              )}
            </div>

            <div className="mt-3 space-y-2 border-t border-border pt-3">
              <Input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Type your question..."
              />
              <Button className="w-full" onClick={handleSendMessage}>
                Send
              </Button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
