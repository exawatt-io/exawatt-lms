"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Play, 
  Users, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/app/dashboard',
    icon: Home,
  },
  {
    id: 'courses',
    label: 'Courses',
    href: '/app/courses',
    icon: BookOpen,
  },
  {
    id: 'simulations',
    label: 'Simulations',
    href: '/app/simulations',
    icon: Play,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/app/analytics',
    icon: BarChart3,
    badge: 'Pro'
  },
  {
    id: 'community',
    label: 'Community',
    href: '/app/community',
    icon: Users,
  }
];

const bottomItems: NavItem[] = [
  {
    id: 'help',
    label: 'Help & Support',
    href: '/app/help',
    icon: HelpCircle,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/app/settings',
    icon: Settings,
  }
];

interface AppSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function AppSidebar({ collapsed = false, onToggleCollapse }: AppSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/app/dashboard') {
      return pathname === '/app' || pathname === '/app/dashboard';
    }
    return pathname.startsWith(href);
  };

  const NavItemComponent = ({ item }: { item: NavItem }) => {
    const active = isActive(item.href);

    return (
      <div key={item.id}>
        <div className="relative">
          <Link
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
              active 
                ? 'bg-electric-600 text-white shadow-lg' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <item.icon className={`h-5 w-5 flex-shrink-0 ${
              active ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
            }`} />
            
            {!collapsed && (
              <>
                <span className="flex-1 truncate">{item.label}</span>
                
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-power-500 text-black rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
          
          {active && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-electric-400 rounded-r-full" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-electric-500 to-power-400 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-black" />
            </div>
            <span className="font-bold text-white">ExaWatt</span>
          </div>
        )}
        
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigationItems.map(item => (
          <NavItemComponent key={item.id} item={item} />
        ))}
      </div>

      {/* Bottom Items */}
      <div className="border-t border-slate-800 p-3 space-y-1">
        {bottomItems.map(item => (
          <NavItemComponent key={item.id} item={item} />
        ))}
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-electric-500 to-power-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-black">JS</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">Student</div>
              <div className="text-xs text-slate-400 truncate">Learning Mode</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}