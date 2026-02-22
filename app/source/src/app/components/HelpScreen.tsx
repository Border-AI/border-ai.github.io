import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Search, MessageCircle, Mail, ExternalLink, BookOpen, Video, FileQuestion } from 'lucide-react';

export function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'What is Border AI and how does it help with visa applications?',
      answer: 'Border AI is an AI-powered assistant designed to help Canadian visa applicants navigate the complex application process. We provide personalized guidance, document preparation assistance, compliance checks, and case-specific recommendations based on official IRCC requirements and best practices.',
    },
    {
      question: 'Is Border AI affiliated with Immigration, Refugees and Citizenship Canada (IRCC)?',
      answer: 'No, Border AI is an independent service and is not affiliated with IRCC or the Canadian government. We provide information and assistance based on official IRCC guidelines, but we are not a government agency or regulated immigration consultant.',
    },
    {
      question: 'Can Border AI guarantee my visa will be approved?',
      answer: 'No service can guarantee visa approval. Border AI helps you prepare a strong, compliant application by identifying potential issues and providing guidance. Final decisions are made by IRCC visa officers based on their assessment of your application.',
    },
    {
      question: 'Is my personal information secure on Border AI?',
      answer: 'We take data security seriously and implement industry-standard security measures. However, Border AI is not intended for collecting highly sensitive personally identifiable information (PII). Always exercise caution when sharing sensitive data online.',
    },
    {
      question: 'How accurate is the AI analysis and feedback?',
      answer: 'Our AI is trained on official IRCC guidelines and common application patterns. While we strive for accuracy, AI-generated suggestions should be reviewed and verified. Always cross-reference recommendations with official IRCC sources.',
    },
    {
      question: 'Do I still need to hire an immigration consultant or lawyer?',
      answer: 'Border AI provides information and document-prep assistance, not legal advice. For complex cases, previous refusals, or legal questions, we recommend consulting with a licensed Regulated Canadian Immigration Consultant (RCIC) or immigration lawyer.',
    },
    {
      question: 'What visa types does Border AI support?',
      answer: 'Currently, Border AI supports Canadian temporary visas and permits including visitor visas, study permits, work permits, and permanent residency applications (Express Entry, PNP, etc.).',
    },
    {
      question: 'How do I upload my documents?',
      answer: 'Navigate to the Document Hub from the main menu. Click "Upload Document," select your file (PDF, JPG, PNG), choose the appropriate category, and upload. Our AI will automatically extract key information from your documents.',
    },
    {
      question: 'What should I do if the AI flags an issue in my application?',
      answer: 'Review the AI Feedback screen for detailed explanations of each issue, including rationale, potential impact, and suggested fixes. Address high-priority items first, and consult official IRCC sources or a professional if needed.',
    },
    {
      question: 'Can I save my progress and come back later?',
      answer: 'Yes! Your progress is automatically saved. You can log out at any time and resume where you left off. We recommend completing your intake in one sitting when possible, but you can use the "Save & Continue Later" option.',
    },
    {
      question: 'How do I know what documents I need for my application?',
      answer: 'After completing the intake wizard, visit the Project Plan > Requirements tab for a personalized document checklist based on your specific case. We also provide category-based organization in the Document Hub.',
    },
    {
      question: 'What is the Document Generator and how do I use it?',
      answer: 'The Document Generator creates AI-powered drafts of supporting letters (Letter of Explanation, Study Plan, etc.) based on your intake data. You can customize the tone, length, and content before downloading or adding to your Document Hub.',
    },
    {
      question: 'How often should I run the AI Analysis?',
      answer: 'Run analysis after major updates: completing intake, uploading new documents, or making significant changes. This helps catch issues early and ensures your application stays on track.',
    },
    {
      question: 'What does "Ready to Submit" mean?',
      answer: 'This screen shows your application completion percentage and any critical issues blocking submission. Aim for 100% completion before submitting to IRCC. It provides a final checklist and summary of your entire application.',
    },
    {
      question: 'How do I contact Border AI support?',
      answer: 'Use the contact form on this page or email us directly. For urgent issues, use the in-app chat feature. We typically respond within 24-48 hours.',
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="mb-2">Help & Support</h1>
        <p className="text-gray-600">Find answers and get assistance</p>
      </div>

      {/* Search */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search for help..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="mb-2">Live Chat</h3>
          <p className="text-sm text-gray-600 mb-4">
            Chat with our support team for quick answers
          </p>
          <Button size="sm" variant="outline" className="w-full">
            Start Chat
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="mb-2">Email Support</h3>
          <p className="text-sm text-gray-600 mb-4">
            Send us a detailed question via email
          </p>
          <Button size="sm" variant="outline" className="w-full">
            Send Email
          </Button>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="mb-2">User Guide</h3>
          <p className="text-sm text-gray-600 mb-4">
            Comprehensive guide to using Border AI
          </p>
          <Button size="sm" variant="outline" className="w-full">
            View Guide
          </Button>
        </Card>
      </div>

      {/* FAQ */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileQuestion className="w-6 h-6 text-[#E9692C]" />
          <h2>Frequently Asked Questions</h2>
        </div>

        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No results found for "{searchQuery}"</p>
            <p className="text-sm mt-1">Try different keywords or browse all questions</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Card>

      {/* Resources */}
      <Card className="p-6">
        <h2 className="mb-6">Official Resources</h2>

        <div className="space-y-4">
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-[#E9692C]" />
              <div>
                <p className="font-medium">IRCC Official Website</p>
                <p className="text-sm text-gray-600">Immigration, Refugees and Citizenship Canada</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>

          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-[#E9692C]" />
              <div>
                <p className="font-medium">Study in Canada</p>
                <p className="text-sm text-gray-600">Official study permit information</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>

          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-[#E9692C]" />
              <div>
                <p className="font-medium">Work in Canada</p>
                <p className="text-sm text-gray-600">Official work permit information</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>

          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-[#E9692C]" />
              <div>
                <p className="font-medium">Processing Times</p>
                <p className="text-sm text-gray-600">Check current application processing times</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        </div>
      </Card>

      {/* Contact Form */}
      <Card className="p-6">
        <h2 className="mb-6">Contact Support</h2>

        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="your@email.com" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Input placeholder="How can we help?" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <textarea
              className="w-full min-h-[120px] px-3 py-2 border rounded-lg resize-none"
              placeholder="Describe your issue or question..."
            />
          </div>

          <div className="flex justify-end">
            <Button>Send Message</Button>
          </div>
        </form>
      </Card>

      <Card className="p-4 bg-amber-50 border-amber-200">
        <p className="text-sm text-gray-700">
          <strong>Disclaimer:</strong> Border AI provides information and document-prep assistance, not legal advice. For legal questions or complex cases, please consult a licensed Regulated Canadian Immigration Consultant (RCIC) or immigration lawyer.
        </p>
      </Card>
    </div>
  );
}
