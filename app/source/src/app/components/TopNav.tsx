import React, { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from './ui/dropdown-menu';

interface TopNavProps {
  caseName: string;
  userInitials: string;
  userName: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function TopNav({ caseName, userInitials, userName, onNavigate, onLogout }: TopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: '1',
      unread: true,
      title: 'Document needs review',
      description: 'Proof of Funds',
      time: '2 hours ago',
    },
    {
      id: '2',
      unread: true,
      title: 'Checklist updated',
      description: 'Based on new rule',
      time: '5 hours ago',
    },
    {
      id: '3',
      unread: false,
      title: 'Draft letter generated',
      description: 'Letter of Explanation ready',
      time: '1 day ago',
    },
  ];

  return (
    <div className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <Logo />
      </div>

      {/* Center: Case Name */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="text-sm font-medium text-foreground">{caseName}</span>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-2">
        {/* Notifications Dropdown */}
        <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
              <Bell className="h-4 w-4" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#E9692C] rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-sm font-medium">Notifications</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="px-3 py-3 hover:bg-accent cursor-pointer border-b border-border last:border-0"
                >
                  <div className="flex gap-3">
                    {notification.unread && (
                      <div className="w-2 h-2 bg-[#E9692C] rounded-full mt-1.5 flex-shrink-0" />
                    )}
                    {!notification.unread && <div className="w-2 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{notification.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
        <DropdownMenu open={showProfile} onOpenChange={setShowProfile}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E9692C] to-orange-600 flex items-center justify-center">
                <span className="text-white text-xs font-medium">{userInitials}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-foreground">{userName}</p>
            </div>
            <DropdownMenuItem onClick={() => onNavigate('account')}>
              <span className="text-sm">Account</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onNavigate('settings')}>
              <span className="text-sm">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate('plans')}>
              <span className="text-sm">Plans</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <span className="text-sm">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}