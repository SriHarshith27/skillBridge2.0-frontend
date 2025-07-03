'use client';

import { useAuthStore } from '@/store/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function DashboardHeader() {
  const { user } = useAuthStore();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrator';
      case 'MENTOR':
        return 'Mentor';
      case 'USER':
        return 'Student';
      default:
        return role;
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, assignments..."
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.username}</p>
              <p className="text-xs text-muted-foreground">
                {user?.role ? getRoleDisplay(user.role) : 'User'}
              </p>
            </div>
            <Avatar>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>
                {user?.username ? getInitials(user.username) : 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}