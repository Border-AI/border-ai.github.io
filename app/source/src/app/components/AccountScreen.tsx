import React from 'react';
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

interface AccountScreenProps {
  isDemoUser?: boolean;
  userData?: UserData | null;
  onClose?: () => void;
}

export function AccountScreen({ isDemoUser = false, userData, onClose }: AccountScreenProps) {
  // Get user data based on whether it's demo user or from userData prop
  const accountData = userData
    ? {
        name: userData.fullName,
        email: userData.email,
        phone: '+1 (555) 123-4567', // Default phone
        country: userData.country || 'canada',
      }
    : isDemoUser
    ? {
        name: DEMO_USER.fullName,
        email: DEMO_USER.email,
        phone: DEMO_USER.phone,
        country: DEMO_USER.country,
      }
    : {
        name: 'Zahra Ahmed',
        email: 'zahra@example.com',
        phone: '+1 (555) 123-4567',
        country: 'india',
      };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with close button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Account</h1>
            <p className="text-sm text-muted-foreground">
              Manage your account information
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

        {/* Account Information Card */}
        <Card className="p-6 shadow-sm border border-border">
          <h2 className="text-base font-medium mb-6">Personal Information</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={accountData.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={accountData.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue={accountData.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country of Residence</Label>
              <Select defaultValue={accountData.country}>
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

        {/* Password Section */}
        <Card className="p-6 shadow-sm border border-border mt-6">
          <h2 className="text-base font-medium mb-6">Password</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-[#E9692C] hover:bg-[#d15a24]">
                Update Password
              </Button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 shadow-sm border border-red-200 mt-6">
          <h2 className="text-base font-medium mb-4 text-red-600">Danger Zone</h2>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}