import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { COUNTRIES, DEMO_USER } from '../utils/constants';
import { UserData } from '../App';

export function SettingsScreen({ 
  isDemoUser = false, 
  userData,
  onClose 
}: { 
  isDemoUser?: boolean; 
  userData?: UserData | null;
  onClose?: () => void;
}) {
  const [activeSection, setActiveSection] = useState('account');

  // Get user data based on whether it's demo user or from userData prop
  const settingsData = userData
    ? {
        name: userData.fullName,
        email: userData.email,
        phone: '+1 (555) 123-4567', // Default phone
        country: userData.country || 'canada',
        timezone: 'est',
        dateFormat: 'mdy',
        language: 'en',
        region: 'ca',
      }
    : isDemoUser
    ? {
        name: DEMO_USER.fullName,
        email: DEMO_USER.email,
        phone: DEMO_USER.phone,
        country: DEMO_USER.country,
        timezone: DEMO_USER.timezone,
        dateFormat: DEMO_USER.dateFormat,
        language: DEMO_USER.language,
        region: DEMO_USER.region,
      }
    : {
        name: 'Zahra Ahmed',
        email: 'zahra@example.com',
        phone: '+1 (555) 123-4567',
        country: 'india',
        timezone: 'est',
        dateFormat: 'mdy',
        language: 'en',
        region: 'ca',
      };

  const sections = [
    { id: 'account', label: 'Account' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'language', label: 'Language' },
    { id: 'privacy', label: 'Privacy' },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your account settings and preferences
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

        <div className="flex gap-6">
          {/* Left Navigation */}
          <div className="w-48 flex-shrink-0">
            <nav className="space-y-0.5">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-accent text-foreground font-medium'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content Panel */}
          <div className="flex-1">
            {activeSection === 'account' && (
              <Card className="p-6 shadow-sm border border-border">
                <h2 className="text-base font-medium mb-6">Account</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={settingsData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={settingsData.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue={settingsData.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country of Residence</Label>
                    <Select defaultValue={settingsData.country}>
                      <SelectTrigger id="country">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-[#E9692C] hover:bg-[#d15a24]">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'preferences' && (
              <Card className="p-6 shadow-sm border border-border">
                <h2 className="text-base font-medium mb-6">Preferences</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue={settingsData.timezone}>
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                        <SelectItem value="gmt">GMT</SelectItem>
                        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue={settingsData.dateFormat}>
                      <SelectTrigger id="date-format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <div>
                      <p className="text-sm font-medium">Show tips and suggestions</p>
                      <p className="text-xs text-muted-foreground">
                        Display helpful tips throughout the application
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-[#E9692C] cursor-pointer">
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transform translate-x-4 transition-transform" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <div>
                      <p className="text-sm font-medium">Auto-save documents</p>
                      <p className="text-xs text-muted-foreground">
                        Automatically save your work every few minutes
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-[#E9692C] cursor-pointer">
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transform translate-x-4 transition-transform" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-[#E9692C] hover:bg-[#d15a24]">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'notifications' && (
              <Card className="p-6 shadow-sm border border-border">
                <h2 className="text-base font-medium mb-6">Notification Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="text-sm font-medium">Email notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Receive email updates about your applications
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-[#E9692C] cursor-pointer">
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transform translate-x-4 transition-transform" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="text-sm font-medium">Document updates</p>
                      <p className="text-xs text-muted-foreground">
                        Get notified when documents need attention
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-[#E9692C] cursor-pointer">
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transform translate-x-4 transition-transform" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="text-sm font-medium">Deadline reminders</p>
                      <p className="text-xs text-muted-foreground">
                        Receive reminders for upcoming deadlines
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-[#E9692C] cursor-pointer">
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transform translate-x-4 transition-transform" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="text-sm font-medium">AI analysis complete</p>
                      <p className="text-xs text-muted-foreground">
                        Get notified when AI finishes analyzing documents
                      </p>
                    </div>
                    <div className="relative inline-block w-10 h-6 rounded-full bg-gray-300 cursor-pointer">
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'language' && (
              <Card className="p-6 shadow-sm border border-border">
                <h2 className="text-base font-medium mb-6">Language & Region</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Display Language</Label>
                    <Select defaultValue={settingsData.language}>
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français (French)</SelectItem>
                        <SelectItem value="es">Español (Spanish)</SelectItem>
                        <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                        <SelectItem value="zh">中文 (Chinese)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Select defaultValue={settingsData.region}>
                      <SelectTrigger id="region">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-[#E9692C] hover:bg-[#d15a24]">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'privacy' && (
              <Card className="p-6 shadow-sm border border-border">
                <h2 className="text-base font-medium mb-6">Privacy & Security</h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div>
                        <p className="text-sm font-medium">Two-factor authentication</p>
                        <p className="text-xs text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div>
                        <p className="text-sm font-medium">Data retention</p>
                        <p className="text-xs text-muted-foreground">
                          Manage how long we keep your data
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div>
                        <p className="text-sm font-medium">Download your data</p>
                        <p className="text-xs text-muted-foreground">
                          Get a copy of all your information
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div>
                        <p className="text-sm font-medium">Delete account</p>
                        <p className="text-xs text-muted-foreground">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}