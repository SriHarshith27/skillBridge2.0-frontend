'use client';

import { useAuthStore } from '@/store/auth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  Users,
  Settings,
  BarChart3,
  FileText,
  Video,
  Award,
  Home,
  PlusCircle,
  UserCheck,
  Shield,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();

  const getMenuItems = () => {
    const baseItems = [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home,
      },
    ];

    switch (user?.role) {
      case 'ADMIN':
        return [
          ...baseItems,
          {
            title: 'User Management',
            href: '/dashboard/users',
            icon: Users,
          },
          {
            title: 'Course Management',
            href: '/dashboard/courses',
            icon: BookOpen,
          },
          {
            title: 'Analytics',
            href: '/dashboard/analytics',
            icon: BarChart3,
          },
          {
            title: 'System Settings',
            href: '/dashboard/settings',
            icon: Settings,
          },
        ];

      case 'MENTOR':
        return [
          ...baseItems,
          {
            title: 'My Courses',
            href: '/dashboard/courses',
            icon: BookOpen,
          },
          {
            title: 'Create Course',
            href: '/dashboard/courses/create',
            icon: PlusCircle,
          },
          {
            title: 'Students',
            href: '/dashboard/students',
            icon: UserCheck,
          },
          {
            title: 'Assignments',
            href: '/dashboard/assignments',
            icon: FileText,
          },
          {
            title: 'Content Upload',
            href: '/dashboard/upload',
            icon: Video,
          },
        ];

      case 'USER':
      default:
        return [
          ...baseItems,
          {
            title: 'My Courses',
            href: '/dashboard/courses',
            icon: BookOpen,
          },
          {
            title: 'Browse Courses',
            href: '/courses',
            icon: BookOpen,
          },
          {
            title: 'Assignments',
            href: '/dashboard/assignments',
            icon: FileText,
          },
          {
            title: 'Achievements',
            href: '/dashboard/achievements',
            icon: Award,
          },
          {
            title: 'Profile',
            href: '/dashboard/profile',
            icon: Settings,
          },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className={cn('pb-12 w-64', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">SkillBridge</h2>
          </div>
          
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="px-3 py-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}